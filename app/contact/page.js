"use client";
import { useState } from "react";

const socials = [
  { label: "YouTube", href: "https://www.youtube.com/channel/UCDr-ZqbUexum0ifo1E4Mxuw" },
  { label: "Instagram", href: "https://www.instagram.com/thecowboydrummer/" },
  { label: "Facebook", href: "https://www.facebook.com/the.cowboy.drummer" },
  { label: "TikTok", href: "https://www.tiktok.com/@thecowboydrummer" },
];

export default function Contact() {
  const [status, setStatus] = useState("idle");
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const formData = new FormData(e.target);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) e.target.reset();
    } catch { setStatus("error"); }
  }
  return (
    <>
      <div style={{ paddingTop: "120px", paddingBottom: "60px", textAlign: "center", background: "linear-gradient(to bottom, #111 0%, var(--bg) 100%)", borderBottom: "1px solid #1a1a1a" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", letterSpacing: "6px", color: "var(--gold)", marginBottom: "12px" }}>LET'S CONNECT</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,8vw,96px)", letterSpacing: "2px" }}>CONTACT ME</h1>
        <p style={{ color: "var(--muted)", marginTop: "16px", fontSize: "16px" }}>I want to work with you! If you have a project you think I'd be great for — let me know.</p>
      </div>
      <section>
        <div className="container contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[{name:"name",label:"Name",type:"text"},{name:"email",label:"Email",type:"email"},{name:"subject",label:"Subject",type:"text"}].map((f) => (
              <div key={f.name}>
                <label htmlFor={f.name} style={{ display: "block", fontFamily: "var(--font-display)", letterSpacing: "2px", fontSize: "13px", color: "var(--gold)", marginBottom: "6px" }}>{f.label.toUpperCase()}</label>
                <input id={f.name} name={f.name} type={f.type} required style={{ width: "100%", padding: "14px 16px", background: "var(--bg2)", border: "1px solid #2a2a2a", borderRadius: "4px", color: "var(--white)", fontSize: "15px" }} />
              </div>
            ))}
            <div>
              <label htmlFor="message" style={{ display: "block", fontFamily: "var(--font-display)", letterSpacing: "2px", fontSize: "13px", color: "var(--gold)", marginBottom: "6px" }}>MESSAGE</label>
              <textarea id="message" name="message" required rows={6} style={{ width: "100%", padding: "14px 16px", background: "var(--bg2)", border: "1px solid #2a2a2a", borderRadius: "4px", color: "var(--white)", fontSize: "15px", resize: "vertical", fontFamily: "inherit" }} />
            </div>
            <button type="submit" disabled={status==="sending"} className="btn btn-gold" style={{ alignSelf: "flex-start", opacity: status==="sending"?0.7:1 }}>
              {status==="sending" ? "Sending..." : "Send Message"}
            </button>
            {status==="success" && <p style={{ color: "#4ade80", fontFamily: "var(--font-display)", letterSpacing: "1px" }}>✓ Message sent! I'll get back to you soon.</p>}
            {status==="error" && <p style={{ color: "#f87171", fontFamily: "var(--font-display)", letterSpacing: "1px" }}>Something went wrong. Please reach out on social media.</p>}
          </form>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "36px", marginBottom: "16px" }}>FIND ME ON SOCIALS</h2>
            <p style={{ color: "var(--muted)", marginBottom: "32px", fontSize: "15px" }}>The fastest way to reach me is usually through Instagram or TikTok.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", padding: "14px 18px", background: "var(--bg2)", border: "1px solid #222", borderRadius: "4px", fontFamily: "var(--font-display)", fontSize: "17px", letterSpacing: "2px", transition: "border-color 0.2s" }}>
                  → {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr !important;}}`}</style>
    </>
  );
}
