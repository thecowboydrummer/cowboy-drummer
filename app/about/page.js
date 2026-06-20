const ABOUT_IMG = "https://images.squarespace-cdn.com/content/v1/60e5a0e3b2255916783e55b2/6cb49071-6ecb-4a1b-b42d-81419c286345/BBA9C789-DB3E-402B-8E2A-3176192607CA.JPG";

export const metadata = { title: "About — The Cowboy Drummer" };

export default function About() {
  return (
    <>
      <div style={{ paddingTop: "120px", paddingBottom: "60px", textAlign: "center", background: "linear-gradient(to bottom, #111 0%, var(--bg) 100%)", borderBottom: "1px solid #1a1a1a" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", letterSpacing: "6px", color: "var(--gold)", marginBottom: "12px" }}>THE STORY</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,8vw,96px)", letterSpacing: "2px" }}>ABOUT JOE</h1>
      </div>
      <section>
        <div className="container about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "64px", alignItems: "start" }}>
          <div>
            <img src={ABOUT_IMG} alt="Joe Lana Jr." style={{ width: "100%", borderRadius: "4px" }} />
            <div style={{ marginTop: "20px", padding: "16px", background: "var(--bg2)", borderLeft: "3px solid var(--gold)", borderRadius: "0 4px 4px 0" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "12px", letterSpacing: "2px", color: "var(--muted)", marginBottom: "8px" }}>PROUD ENDORSED ARTIST</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "15px", letterSpacing: "2px", color: "var(--gold)" }}>Paiste</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "15px", letterSpacing: "2px", color: "var(--gold)" }}>Evans</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "15px", letterSpacing: "2px", color: "var(--gold)" }}>Promark</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "15px", letterSpacing: "2px", color: "var(--gold)" }}>Rock Locks</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "15px", letterSpacing: "2px", color: "var(--gold)" }}>No Nut Cymbal Sleeves</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "15px", letterSpacing: "2px", color: "var(--gold)" }}>SE Microphones</p>
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,4vw,52px)", marginBottom: "32px", lineHeight: 1 }}>DRUMMING IS MY PASSION.</h2>
            {[
              `Joe Lana Jr., also known as the "Cowboy Drummer," is a musician and influencer from Rochester, New York. His musical journey is deeply rooted in his personal history and the profound influence of his late father and grandfather.`,
              `Growing up in a family of musicians, Joe was exposed to the world of music from a young age. His father, Joe Lana Sr., played a pivotal role in shaping his musical talents — instilling in him a deep love for rhythm and percussion.`,
              `Joe's passion for music became a powerful outlet during challenging times. The loss of his father and grandfather deeply affected him, but their memory served as a driving force in his musical pursuits. In their honor, Joe dedicated himself to becoming the best musician he could be.`,
              `Despite facing addiction and its consequences, Joe found the strength to turn his life around. Ten years clean from opiate addiction, his resilience and transformation are a testament to his inner strength and willpower.`,
              `Through his journey, Joe discovered the power of social media as a platform for sharing his story and inspiring others. His openness about his past, coupled with his passion for music, has allowed him to connect with and support countless individuals on their own paths to recovery and personal growth.`,
              `Joe is the drummer for Dropout Kings, based in Phoenix, Arizona — a band blending elements of rock, metal, and hip-hop. His drumming skills and stage presence continue to captivate audiences across the nation.`,
              `Joe Lana's story is one of resilience, redemption, and the transformative power of music. He reminds us it is never too late to change our lives and pursue our passions. I appreciate your love and support!`,
            ].map((para, i) => (
              <p key={i} style={{ color: "#aaa", fontSize: "16px", lineHeight: 1.85, marginBottom: "20px" }}>{para}</p>
            ))}
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr !important;}}`}</style>
    </>
  );
}
