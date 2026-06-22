"use client";
import { useState } from "react";

const PRESETS = [5, 10, 25];

export default function DonateCard() {
  const [amount, setAmount] = useState(10);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function donate() {
    const value = custom ? parseFloat(custom) : amount;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: value }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || "Something went wrong.");
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "var(--bg2)", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "32px", maxWidth: "440px", margin: "0 auto", textAlign: "center" }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", letterSpacing: "4px", color: "var(--gold)", marginBottom: "12px" }}>BUY THE BAND A ROUND</p>
      <p style={{ color: "var(--muted)", fontSize: "15px", marginBottom: "24px" }}>
        If the music's meant something to you, kick in a few bucks to keep it going.
      </p>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "16px" }}>
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => { setAmount(p); setCustom(""); }}
            className="btn"
            style={{
              padding: "10px 20px",
              background: !custom && amount === p ? "var(--gold)" : "transparent",
              color: !custom && amount === p ? "#000" : "var(--white)",
              border: "1px solid var(--gold)",
            }}
          >
            ${p}
          </button>
        ))}
      </div>

      <input
        type="number"
        min="1"
        step="1"
        placeholder="Custom amount"
        value={custom}
        onChange={(e) => setCustom(e.target.value)}
        style={{ width: "100%", padding: "12px 16px", background: "#111", border: "1px solid #333", borderRadius: "4px", color: "var(--white)", fontSize: "15px", marginBottom: "20px" }}
      />

      <button className="btn btn-gold" onClick={donate} disabled={loading} style={{ width: "100%" }}>
        {loading ? "Redirecting…" : "Tip the Drummer"}
      </button>

      {error && <p style={{ color: "var(--gold)", fontSize: "13px", marginTop: "14px" }}>{error}</p>}
    </div>
  );
}
