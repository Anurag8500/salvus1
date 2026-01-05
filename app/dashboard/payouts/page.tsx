"use client";

import { useEffect, useState } from "react";

type Payout = {
  beneficiary: string;
  usdcAmount: number;
  inrAmount: number;
  status: string;
  txHash: string;
};

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/payouts")
      .then(res => res.json())
      .then(data => {
        setPayouts(data.data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading payouts...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Relief Payments</h1>

      {payouts.length === 0 && <p>No payouts yet.</p>}

      {payouts.map(p => (
        <div
          key={p.txHash}
          style={{
            border: "1px solid #ddd",
            padding: 12,
            marginBottom: 10,
            borderRadius: 6,
          }}
        >
          <p><b>Beneficiary:</b> {p.beneficiary}</p>
          <p><b>USDC:</b> {p.usdcAmount}</p>
          <p><b>INR:</b> ₹{p.inrAmount}</p>
          <p><b>Status:</b> {p.status}</p>
          <p><b>Tx:</b> {p.txHash.slice(0, 12)}...</p>
        </div>
      ))}
    </div>
  );
}
