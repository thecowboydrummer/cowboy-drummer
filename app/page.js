import Link from "next/link";

const HERO_LOGO = "/play-it-forward-logo.png";
const BIO_IMG = "/pops-bw.jpg";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/thecowboydrummer/" },
  { label: "TikTok", href: "https://www.tiktok.com/@thecowboydrummer" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCDr-ZqbUexum0ifo1E4Mxuw" },
  { label: "Facebook", href: "https://www.facebook.com/the.cowboy.drummer" },
  { label: "Linktree", href: "https://linktr.ee/Thecowboydrummer" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden", background: "radial-gradient(circle at center, #161616 0%, var(--bg) 70%)" }}>
        <div style={{ position: "relative", zIndex: 1, padding: "0 24px" }}>
          <img src={HERO_LOGO} alt="The Cowboy Drummer" style={{ width: "min(420px, 70vw)", height: "auto", marginBottom: "32px" }} />
          <p style={{ fontSize: "clamp(14px,2vw,18px)", color: "#ccc", letterSpacing: "2px", marginBottom: "40px", fontStyle: "italic" }}>
            Drumming for a purpose. Every day.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/store" className="btn btn-gold">Get Merch</Link>
            <Link href="/contact" className="btn btn-outline">Work With Me</Link>
          </div>
        </div>
      </section>

      {/* SOCIAL STRIP */}
      <div style={{ background: "var(--gold)", padding: "16px 0" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", padding: "0 24px" }}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-display)", fontSize: "16px", letterSpacing: "3px", color: "#000" }}>
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* BIO PREVIEW */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container bio-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <img src={BIO_IMG} alt="Joe Lana Jr." style={{ width: "100%", borderRadius: "4px", objectFit: "cover", aspectRatio: "3/4", filter: "grayscale(20%)" }} />
            <div style={{ position: "absolute", bottom: "-12px", left: "-12px", width: "80px", height: "80px", background: "var(--gold)", zIndex: -1, borderRadius: "2px" }} />
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", letterSpacing: "5px", color: "var(--gold)", marginBottom: "12px" }}>THE STORY</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,64px)", marginBottom: "20px", lineHeight: 1 }}>DRUMMING IS MY PASSION.</h2>
            <p style={{ color: "#aaa", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
              Joe Lana Jr., known as the "Cowboy Drummer," is a musician and influencer from Rochester, New York — raised in a family of musicians and shaped by the influence of his late father and grandfather.
            </p>
            <p style={{ color: "#aaa", fontSize: "16px", lineHeight: 1.8, marginBottom: "32px" }}>
              Ten years clean from opiate addiction, Joe now channels his story into powerful drumming as a member of Dropout Kings and as a social media voice for recovery, resilience, and music.
            </p>
            <Link href="/about" className="btn btn-gold">Full Story</Link>
          </div>
        </div>
      </section>

      {/* MERCH CTA */}
      <section style={{ background: "var(--bg2)", textAlign: "center" }}>
        <div className="container">
          <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", letterSpacing: "5px", color: "var(--gold)", marginBottom: "16px" }}>OFFICIAL MERCH</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,6vw,72px)", marginBottom: "20px" }}>GET TCBD MERCH NOW</h2>
          <p style={{ color: "var(--muted)", fontSize: "16px", maxWidth: "500px", margin: "0 auto 36px" }}>Rep the brand. Support the mission. New drops coming soon.</p>
          <Link href="/store" className="btn btn-gold">Shop Now</Link>
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section style={{ background: "var(--bg3)", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "520px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5vw,48px)", marginBottom: "12px" }}>JOIN THE LIST</h2>
          <p style={{ color: "var(--muted)", marginBottom: "28px", fontSize: "15px" }}>Be the first to know about new merch, shows, and content.</p>
          <form style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <input type="email" placeholder="Your email address" required style={{ flex: "1", minWidth: "200px", padding: "14px 18px", background: "#111", border: "1px solid #333", borderRadius: "4px", color: "var(--white)", fontSize: "15px" }} />
            <button type="submit" className="btn btn-gold" style={{ whiteSpace: "nowrap" }}>Subscribe</button>
          </form>
        </div>
      </section>

      <style>{`@media(max-width:768px){.bio-grid{grid-template-columns:1fr !important;}}`}</style>
    </>
  );
}
