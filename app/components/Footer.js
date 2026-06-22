import Link from "next/link";
const socials = [
  { label: "YouTube", href: "https://www.youtube.com/channel/UCDr-ZqbUexum0ifo1E4Mxuw" },
  { label: "Instagram", href: "https://www.instagram.com/thecowboydrummer/" },
  { label: "Facebook", href: "https://www.facebook.com/the.cowboy.drummer" },
  { label: "TikTok", href: "https://www.tiktok.com/@thecowboydrummer" },
];
export default function Footer() {
  return (
    <footer style={{ background: "#050505", borderTop: "1px solid #1a1a1a", padding: "48px 0 32px" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", letterSpacing: "3px", color: "var(--gold)", marginBottom: "24px" }}>
          THE COWBOY DRUMMER
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "32px", flexWrap: "wrap" }}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--muted)", fontSize: "13px", letterSpacing: "1px", fontFamily: "var(--font-display)" }}>
              {s.label}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginBottom: "32px", flexWrap: "wrap" }}>
          {["/", "/about", "/store", "/contact"].map((href, i) => (
            <Link key={href} href={href} style={{ color: "var(--muted)", fontSize: "13px", letterSpacing: "1px", fontFamily: "var(--font-display)" }}>
              {["Home", "About", "Store", "Contact"][i]}
            </Link>
          ))}
        </div>
        <p style={{ color: "#444", fontSize: "12px" }}>© {new Date().getFullYear()} Joe Lana Jr. — The Cowboy Drummer. Rochester, NY.</p>
      </div>
    </footer>
  );
}
