export const metadata = { title: "Tour — The Cowboy Drummer" };

const NOTES = {
  "+": "No Dropout Kings",
  "*": "No VRSTY",
  "#": "Ded Only",
};

const DATES = [
  { date: "July 11", city: "Phoenix, AZ", venue: "The Rebel Lounge", note: "+" },
  { date: "July 13", city: "Lubbock, TX", venue: "Jake's" },
  { date: "July 14", city: "Oklahoma City, OK", venue: "89th St." },
  { date: "July 15", city: "Lawrence, KS", venue: "The Bottleneck", note: "+" },
  { date: "July 17", city: "Mansfield, OH", venue: "Inkcarceration", note: "#" },
  { date: "July 18", city: "Cadott, WI", venue: "Rock Fest", note: "#" },
  { date: "July 19", city: "Minneapolis, MN", venue: "Studio B", note: "+" },
  { date: "July 20", city: "Joliet, IL", venue: "The Forge", note: "+" },
  { date: "July 21", city: "Des Moines, IA", venue: "xBk Live", note: "+" },
  { date: "July 22", city: "Iowa City, IA", venue: "Wildwood" },
  { date: "July 23", city: "Madison, WI", venue: "The Annex", note: "*" },
  { date: "July 24", city: "Westland, MI", venue: "The Token Lounge" },
  { date: "July 25", city: "Rochester, NY", venue: "Montage Music", note: "*" },
  { date: "July 26", city: "Pittsburgh, PA", venue: "The Crafthouse" },
  { date: "July 28", city: "Clifton, NJ", venue: "Dingbatz" },
  { date: "July 29", city: "Boston, MA", venue: "Brighton Music Hall" },
  { date: "July 30", city: "Reading, PA", venue: "Reverb", note: "+" },
  { date: "Aug 1", city: "Lansing, MI", venue: "Rock Lansing Fest", note: "#" },
  { date: "Aug 3", city: "Sauget, IL", venue: "Pop's Venue" },
  { date: "Aug 4", city: "Wichita, KS", venue: "Wave" },
  { date: "Aug 6", city: "Colorado Springs, CO", venue: "Black Sheep" },
  { date: "Aug 7", city: "Denver, CO", venue: "HQ" },
  { date: "Aug 8", city: "Grand Junction, CO", venue: "Mesa Theater" },
];

export default function Tour() {
  return (
    <>
      <div style={{ paddingTop: "120px", paddingBottom: "60px", textAlign: "center", background: "linear-gradient(to bottom, #111 0%, var(--bg) 100%)", borderBottom: "1px solid #1a1a1a" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", letterSpacing: "6px", color: "var(--gold)", marginBottom: "12px" }}>THE ANTI-EVERYTHING TOUR</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,8vw,96px)", letterSpacing: "2px" }}>TOUR DATES</h1>
        <p style={{ color: "var(--muted)", fontSize: "15px", marginTop: "12px" }}>Ded &middot; Dropout Kings &middot; VRSTY</p>
      </div>

      <section>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {DATES.map((d, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px",
                padding: "16px 0", borderBottom: "1px solid #1a1a1a", flexWrap: "wrap",
              }}>
                <span style={{ fontFamily: "var(--font-display)", color: "var(--gold)", letterSpacing: "1px", minWidth: "80px" }}>{d.date}</span>
                <span style={{ flex: 1, color: "var(--white)" }}>
                  {d.city} — {d.venue}
                  {d.note && <span style={{ color: "var(--muted)" }}> {d.note}</span>}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "32px", color: "var(--muted)", fontSize: "13px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {Object.entries(NOTES).map(([symbol, label]) => (
              <span key={symbol}>{symbol} {label}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
