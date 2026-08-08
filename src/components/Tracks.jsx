import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import data from "../data/data.json";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Icons = {
  webdev: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="4" width="24" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <path d="M9 20v4M19 20v4M6 24h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M8 12l3 3-3 3M13 15h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  dsa: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="6" r="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <circle cx="6" cy="20" r="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <circle cx="22" cy="20" r="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <path d="M14 9v5M14 14l-5 4M14 14l5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  aiml: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <circle cx="4" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <circle cx="24" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <circle cx="4" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <circle cx="24" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <path d="M6.5 9.5L11 12M17 12l4.5-3.5M6.5 18.5L11 16M17 16l4.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

/* Alpha-based theme colors — these blend correctly on BOTH light and dark
   surfaces because they're translucent overlays, not solid hex fills. */
const TRACK_THEMES = {
  webdev: {
    color: "#818CF8",
    bgSoft: "rgba(99, 102, 241, 0.14)",
    borderSoft: "rgba(99, 102, 241, 0.35)",
    gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    label: "Most Popular",
  },
  dsa: {
    color: "#34D399",
    bgSoft: "rgba(16, 185, 129, 0.14)",
    borderSoft: "rgba(16, 185, 129, 0.35)",
    gradient: "linear-gradient(135deg, #10B981, #059669)",
    label: "Interview Focused",
  },
  aiml: {
    color: "#FBBF24",
    bgSoft: "rgba(245, 158, 11, 0.14)",
    borderSoft: "rgba(245, 158, 11, 0.35)",
    gradient: "linear-gradient(135deg, #F59E0B, #EF4444)",
    label: "Trending 🔥",
  },
};

export default function Tracks() {
  const { tracks } = data;
  const navigate = useNavigate();

  return (
    <section id="tracks" style={{ padding: "80px 20px", maxWidth: "1100px", margin: "0 auto" }}>
      <motion.div
        style={{ textAlign: "center", marginBottom: "48px" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        custom={0}
      >
        <span className="eyebrow">Choose your path</span>
        <h2 className="section-title" style={{ marginTop: "8px" }}>Pick a track. Commit to it.</h2>
        <p style={{ color: "var(--muted)", marginTop: "12px", fontSize: "1rem", maxWidth: "480px", margin: "12px auto 0" }}>
          60 days, one track, one career-changing habit. Each path is designed by industry experts.
        </p>
      </motion.div>

      <div className="tracks-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {tracks.map((track, i) => {
          const theme = TRACK_THEMES[track.id];
          return (
            <motion.div
              key={track.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i + 1}
              onClick={() => navigate("/dashboard")}
              style={{
                background: "var(--surface)",
                border: `1px solid ${theme.borderSoft}`,
                borderRadius: "20px",
                padding: "28px 24px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              }}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 40px ${theme.color}33`,
              }}
            >
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "3px",
                background: theme.gradient,
              }} />

              <div style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                fontSize: "0.65rem",
                fontWeight: 700,
                color: theme.color,
                background: theme.bgSoft,
                padding: "3px 8px",
                borderRadius: "999px",
                border: `1px solid ${theme.borderSoft}`,
              }}>
                {theme.label}
              </div>

              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: theme.bgSoft,
                border: `1.5px solid ${theme.borderSoft}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.color,
                marginBottom: "18px",
                marginTop: "8px",
              }}>
                {Icons[track.icon] || Icons.webdev}
              </div>

              <h3 style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--primary)",
                marginBottom: "8px",
                fontFamily: "Bricolage Grotesque, sans-serif",
                letterSpacing: "-0.02em",
              }}>
                {track.title}
              </h3>
              <p style={{
                fontSize: "0.85rem",
                lineHeight: "1.6",
                color: "var(--muted)",
                marginBottom: "20px",
                flex: 1,
              }}>
                {track.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                {track.topics.slice(0, 4).map((topic) => (
                  <span key={topic} style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: theme.color,
                    background: theme.bgSoft,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    border: `1px solid ${theme.borderSoft}`,
                  }}>
                    {topic}
                  </span>
                ))}
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "16px",
                borderTop: "1px solid var(--border)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{
                    width: "6px", height: "6px",
                    borderRadius: "50%",
                    background: theme.color,
                    boxShadow: `0 0 0 3px ${theme.bgSoft}`,
                  }} />
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--muted)" }}>
                    {track.students.toLocaleString()} enrolled
                  </span>
                </div>
                <span style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: theme.color,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}>
                  Join track →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .tracks-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
