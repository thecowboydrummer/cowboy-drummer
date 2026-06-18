import Link from "next/link";
export const metadata = { title: "Store — The Cowboy Drummer" };
const FOURTHWALL_URL = "https://thecowboydrummer.fourthwall.com";
export default function Store() {
  return (
    <>
      <div style={{ paddingTop: "120px", paddingBottom: "60px", textAlign: "center", background: "linear-gradient(to bottom, #111 0%, var(--bg) 100%)", borderBottom: "1px solid #1a1a1a" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", letterSpacing: "6px", color: "var(--gold)", marginBottom: "12px" }}>OFFICIAL MERCH</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,8vw,96px)", letterSpacing: "2px" }}>TCBD STORE</h1>
      </div>
      <section style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <div style={{ background: "var(--bg2)", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "60px 40px" }}>
            <p style={{ fontSize: "52px", marginBottom: "20px" }}>🥁</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5vw,48px)", marginBottom: "16px" }}>REP THE BRAND</h2>
            <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: 1.7, marginBottom: "36px" }}>Official Cowboy Drummer merch — hoodies, tees, hats, and more. All orders ship direct. Support the mission.</p>
            <a href={FOURTHWALL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ fontSize: "20px", padding: "16px 40px" }}>Shop Now</a>
          </div>
          <div style={{ marginTop: "48px", padding: "28px", background: "var(--bg3)", borderRadius: "6px", borderLeft: "3px solid var(--gold)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "16px", letterSpacing: "1px", color: "var(--gold)", marginBottom: "8px" }}>QUESTIONS ABOUT AN ORDER?</p>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>Reach out via the <Link href="/contact" style={{ color: "var(--white)", textDecoration: "underline" }}>contact page</Link> or DM on Instagram.</p>
          </div>
        </div>
      </section>
    </>
  );
}
