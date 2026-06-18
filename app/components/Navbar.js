"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LOGO = "https://images.squarespace-cdn.com/content/v1/60e5a0e3b2255916783e55b2/1625663679989-5XJ18HKHK3R07GNMQSHH/Stacked+Logo.png?format=1500w";
const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.6)",
      backdropFilter: "blur(12px)",
      borderBottom: scrolled ? "1px solid #222" : "1px solid transparent",
      transition: "all 0.3s",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>
        <Link href="/"><img src={LOGO} alt="The Cowboy Drummer" style={{ height: "44px", width: "auto" }} /></Link>
        <nav style={{ display: "flex", gap: "36px" }} className="desktop-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "var(--font-display)", fontSize: "18px", letterSpacing: "2px",
              color: pathname === l.href ? "var(--gold)" : "var(--white)", transition: "color 0.2s",
            }}>{l.label}</Link>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="hamburger" style={{
          background: "none", border: "none", cursor: "pointer", padding: "8px",
          display: "none", flexDirection: "column", gap: "5px",
        }} aria-label="Toggle menu">
          {[0,1,2].map((i) => (
            <span key={i} style={{
              display: "block", width: "24px", height: "2px", background: "var(--white)", transition: "all 0.3s", transformOrigin: "center",
              transform: open && i===0 ? "translateY(7px) rotate(45deg)" : open && i===1 ? "scaleX(0)" : open && i===2 ? "translateY(-7px) rotate(-45deg)" : "none",
            }} />
          ))}
        </button>
      </div>
      {open && (
        <div style={{ background: "#0d0d0d", borderTop: "1px solid #222", padding: "20px 24px" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{
              display: "block", fontFamily: "var(--font-display)", fontSize: "24px", letterSpacing: "2px",
              padding: "12px 0", color: pathname === l.href ? "var(--gold)" : "var(--white)", borderBottom: "1px solid #1a1a1a",
            }}>{l.label}</Link>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
