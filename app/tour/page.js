export const metadata = { title: "Tour — The Cowboy Drummer" };

const DATES = [
  { date: "July 11", city: "Phoenix, AZ", venue: "The Rebel Lounge" },
  { date: "July 12", city: "Roswell, NM", venue: "The Liberty" },
  { date: "July 13", city: "Lubbock, TX", venue: "Jake's Back Room" },
  { date: "July 14", city: "Oklahoma City, OK", venue: "89th Street Collective" },
  { date: "July 15", city: "Lawrence, KS", venue: "The Bottleneck" },
  { date: "July 17", city: "Rapid City, SD", venue: "Abys" },
  { date: "July 18", city: "Sioux Falls, SD", venue: "Club David" },
  { date: "July 19", city: "Minneapolis, MN", venue: "Studio B @ Skyway Theatre" },
  { date: "July 20", city: "Joliet, IL", venue: "The Forge" },
  { date: "July 21", city: "Des Moines, IA", venue: "xBk Live" },
  { date: "July 22", city: "Iowa City, IA", venue: "Wildwood" },
  { date: "July 23", city: "Madison, WI", venue: "The Annex" },
  { date: "July 24", city: "Westland, MI", venue: "The Token Lounge" },
  { date: "July 25", city: "Rochester, NY", venue: "Montage Music Hall" },
  { date: "July 26", city: "Pittsburgh, PA", venue: "The Crafthouse" },
  { date: "July 28", city: "Clifton, NJ", venue: "Dingbatz" },
  { date: "July 29", city: "Boston, MA", venue: "Brighton Music Hall" },
  { date: "July 30", city: "Reading, PA", venue: "Reverb" },
  { date: "July 31", city: "Cleveland, OH", venue: "Mahalls" },
  { date: "Aug 1", city: "South Bend, IN", venue: "Langlab" },
  { date: "Aug 3", city: "Sauget, IL", venue: "Pop's Nightclub & Concert Venue" },
  { date: "Aug 4", city: "Wichita, KS", venue: "WAVE" },
  { date: "Aug 6", city: "Colorado Springs, CO", venue: "The Black Sheep" },
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
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
