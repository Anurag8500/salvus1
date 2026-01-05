import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Transaction from '@/models/Transaction'
import Beneficiary from '@/models/Beneficiary'
import Campaign from '@/models/Campaign'
import Vendor from '@/models/Vendor'
import SalvusEscrowABI from '@/lib/abis/SalvusEscrow.json'
import { ethers } from 'ethers'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    if (!token) {
      return NextResponse.json({ message: 'Missing token' }, { status: 400 })
    }
    await dbConnect()
    const txn = await Transaction.findOne({ confirmationToken: token })
    if (!txn) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 404 })
    }
    if (txn.status !== 'Pending') {
      return NextResponse.json({ message: 'Transaction already processed' }, { status: 400 })
    }
    const beneficiary = await Beneficiary.findById(txn.beneficiaryId)
    const campaign = await Campaign.findById(txn.campaignId)
    const vendor = await Vendor.findById(txn.vendorId)
    return NextResponse.json({
      transactionId: String(txn._id),
      beneficiaryName: beneficiary?.fullName || '',
      beneficiaryId: beneficiary?.beneficiaryId || String(beneficiary?._id),
      category: (txn as any).category,
      amount: (txn as any).amount,
      campaignName: campaign?.name || '',
      vendorName: vendor?.name || ''
    }, { status: 200 })
  } catch (error) {
    console.error('Vendor Confirm GET Error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()
    if (!token) {
      return NextResponse.json({ message: 'Missing token' }, { status: 400 })
    }
    await dbConnect()
    const txn = await Transaction.findOne({ confirmationToken: token })
    if (!txn) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 404 })
    }
    if (txn.status !== 'Pending') {
      return NextResponse.json({ message: 'Transaction already processed' }, { status: 400 })
    }

    const beneficiary = await Beneficiary.findById(txn.beneficiaryId)
    const campaign = await Campaign.findById(txn.campaignId)
    const vendor = await Vendor.findById(txn.vendorId)
    if (!beneficiary || !campaign || !vendor) {
      return NextResponse.json({ message: 'Invalid transaction data' }, { status: 400 })
    }

    const RPC_URL = process.env.RPC_URL
    const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS
    const BEN_PRIV = process.env.BENEFICIARY_PRIVATE_KEY

    if (!RPC_URL || !ESCROW_ADDRESS || !BEN_PRIV) {
      await Transaction.findByIdAndUpdate(txn._id, { status: 'VendorConfirmed' })
      return NextResponse.json({ success: true, message: 'Vendor confirmed; blockchain pending' }, { status: 200 })
    }

    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL)
      const benSigner = new ethers.Wallet(BEN_PRIV, provider)
      const escrow = new ethers.Contract(ESCROW_ADDRESS, (SalvusEscrowABI as any).abi, benSigner)
      const fxInrPerUsdc = Number(process.env.EXCHANGE_RATE_INR_PER_USDC || 83)
      const usdcFromTxn: number = (txn as any).usdcAmount ?? Number(((txn as any).amount / fxInrPerUsdc).toFixed(6))
      const usdcAmount = ethers.parseUnits(usdcFromTxn.toFixed(6), 6)

      const benAddr = await benSigner.getAddress()
      let remaining = await escrow.getRemainingAllocation(benAddr)
      if (usdcAmount > remaining) {
        const ownerPriv = process.env.PRIVATE_KEY
        if (ownerPriv) {
          const campaignCapUsdc = Number(((campaign.beneficiaryCap || 0) / fxInrPerUsdc).toFixed(6))
          const targetCap = ethers.parseUnits(campaignCapUsdc.toFixed(6), 6)
          const ownerSigner = new ethers.Wallet(ownerPriv, provider)
          const escrowOwner = new ethers.Contract(ESCROW_ADDRESS, (SalvusEscrowABI as any).abi, ownerSigner)
          const benState = await escrow.beneficiaries(benAddr)
          const currentAlloc: bigint = benState.totalAllocation
          if (targetCap > currentAlloc) {
            const setTx = await escrowOwner.setAllocation(benAddr, targetCap)
            await setTx.wait()
            remaining = await escrow.getRemainingAllocation(benAddr)
          }
          if (usdcAmount > remaining) {
            const needed = (benState.totalSpent as bigint) + usdcAmount
            const bumpTx = await escrowOwner.setAllocation(benAddr, needed)
            await bumpTx.wait()
            remaining = await escrow.getRemainingAllocation(benAddr)
          }
        }
        if (usdcAmount > remaining) {
          const remainingHuman = Number(ethers.formatUnits(remaining, 6))
          return NextResponse.json({ message: 'On-chain allocation remaining is less than amount requested', details: { beneficiaryAddress: benAddr, requestedUSDC: usdcFromTxn, remainingUSDC: remainingHuman } }, { status: 400 })
        }
      }

      const usdcTokenAddr = await escrow.usdcToken()
      const usdc = new ethers.Contract(usdcTokenAddr, ["function balanceOf(address) view returns (uint256)"], provider)
      const contractBalance = await usdc.balanceOf(ESCROW_ADDRESS)
      if (contractBalance < usdcAmount) {
        const balanceHuman = Number(ethers.formatUnits(contractBalance, 6))
        return NextResponse.json({ message: 'Escrow on-chain balance is insufficient for this payment', details: { escrowBalanceUSDC: balanceHuman, requestedUSDC: usdcFromTxn } }, { status: 400 })
      }

      const tx = await escrow.requestPayment(usdcAmount)
      await tx.wait()

      await Transaction.findByIdAndUpdate(txn._id, {
        status: 'Completed',
        confirmedAt: new Date(),
        confirmationToken: null
      })
      await Beneficiary.findByIdAndUpdate(beneficiary._id, { $inc: { totalSpent: (txn as any).amount } })
      await Campaign.findByIdAndUpdate(campaign._id, { $inc: { fundsSpent: (txn as any).amount } })

      return NextResponse.json({ success: true, txHash: tx.hash }, { status: 200 })
    } catch (err: any) {
      await Transaction.findByIdAndUpdate(txn._id, { status: 'Failed' })
      const msg = typeof err?.message === 'string' ? err.message : 'Blockchain payment failed'
      return NextResponse.json({ message: msg }, { status: 500 })
    }
  } catch (error) {
    console.error('Vendor Confirm POST Error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
