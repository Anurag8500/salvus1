import nodemailer from 'nodemailer'

export async function sendVendorConfirmationEmail(to: string, params: {
  beneficiaryName: string
  beneficiaryId: string
  category: string
  amount: number
  campaignName: string
  vendorName: string
  token: string
}): Promise<{ previewUrl?: string }> {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  let transporter: nodemailer.Transporter
  let fromAddr: string | undefined = process.env.SMTP_FROM || user || 'no-reply@salvus.local'
  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })
    fromAddr = process.env.SMTP_FROM || user
  } else if (emailUser && emailPass) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass },
    })
    fromAddr = process.env.SMTP_FROM || emailUser
  } else {
    const testAccount = await nodemailer.createTestAccount()
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
    fromAddr = 'no-reply@ethereal.email'
  }

  const rawBase = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const normalizedBase = (() => {
    let b = rawBase.trim()
    if (!/^https?:\/\//i.test(b)) b = 'https://' + b
    return b.replace(/\/+$/, '')
  })()
  const url = `${normalizedBase}/vendor/confirm?token=${encodeURIComponent(params.token)}`

  const subject = `Confirm purchase for ${params.beneficiaryName}`
  const text = [
    `Vendor: ${params.vendorName}`,
    `Campaign: ${params.campaignName}`,
    `Beneficiary: ${params.beneficiaryName} (${params.beneficiaryId})`,
    `Category: ${params.category}`,
    `Amount: ${params.amount}`,
    `Confirm: ${url}`
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 560px; margin: 0 auto;">
      <h2>Confirm Purchase</h2>
      <p><strong>Vendor:</strong> ${params.vendorName}</p>
      <p><strong>Campaign:</strong> ${params.campaignName}</p>
      <p><strong>Beneficiary:</strong> ${params.beneficiaryName} (${params.beneficiaryId})</p>
      <p><strong>Category:</strong> ${params.category}</p>
      <p><strong>Amount:</strong> ${params.amount}</p>
      <p style="margin-top: 16px;">
        <a href="${url}" style="background:#10b981;color:#111827;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:bold">Confirm Purchase</a>
      </p>
    </div>
  `

  const info = await transporter.sendMail({
    from: fromAddr,
    to,
    subject,
    text,
    html,
  })
  const previewUrl = nodemailer.getTestMessageUrl(info) || undefined
  return previewUrl ? { previewUrl } : {}
}
