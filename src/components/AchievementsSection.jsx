import { motion } from "framer-motion";
import data from "../data/data.json";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

const STAR_COLORS = {
  "1★": { stars: 1, color: "#71717A", bg: "var(--bg-secondary)",    glow: "rgba(113,113,122,0.2)" },
  "2★": { stars: 2, color: "#16a3a3", bg: "var(--green-light)",     glow: "rgba(22,163,74,0.2)"   },
  "3★": { stars: 3, color: "#08296f", bg: "#DBEAFE",                glow: "rgba(37,99,235,0.2)"   },
  "4★": { stars: 4, color: "#7C3AED", bg: "#EDE9FE",                glow: "rgba(124,58,237,0.2)"  },
  "5★": { stars: 5, color: "#EA580C", bg: "var(--orange-light)",    glow: "rgba(234,88,12,0.2)"   },
  "6★": { stars: 6, color: "#CA8A04", bg: "#FEF9C3",                glow: "rgba(202,138,4,0.25)"  },
};

const RANK_COLORS = [
  "linear-gradient(135deg, #FFD700, #FFA500)",
  "linear-gradient(135deg, #C0C0C0, #A0A0A0)",
  "linear-gradient(135deg, #CD7F32, #A0522D)",
];

function StarRow({ count, color, size = 10 }) {
  return (
    <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12">
          <polygon
            points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.5 2.7,10.5 3.5,7 1,4.8 4.5,4.5"
            fill={i < count ? color : "var(--border-strong)"}
          />
        </svg>
      ))}
    </div>
  );
}

export default function AchievementsSection() {
  const { student, leaderboard } = data;
  const earned = student.badges.filter(b => b.earned);
  const locked = student.badges.filter(b => !b.earned);
  const currentRank = earned[earned.length - 1];
  const currentStyle = currentRank ? STAR_COLORS[currentRank.icon] : STAR_COLORS["1★"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>

      {/* ── BADGES — CodeChef Star Style ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "22px 20px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--subtle)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "3px" }}>
              Achievements
            </p>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--primary)", fontFamily: "Bricolage Grotesque, sans-serif", letterSpacing: "-0.02em" }}>
              Coder Rating
            </h2>
          </div>
          {/* Current rank badge */}
          {currentRank && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: currentStyle.bg,
              border: `1.5px solid ${currentStyle.color}33`,
              borderRadius: "999px",
              padding: "5px 12px",
              boxShadow: `0 0 12px ${currentStyle.glow}`,
            }}>
              <StarRow count={currentStyle.stars} color={currentStyle.color} size={9} />
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: currentStyle.color }}>
                {currentRank.title}
              </span>
            </div>
          )}
        </div>

        {/* All 6 stars — vertical list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {student.badges.map((badge, i) => {
            const style = STAR_COLORS[badge.icon] || STAR_COLORS["1★"];
            return (
              <motion.div
                key={badge.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 14px",
                  borderRadius: "14px",
                  background: badge.earned ? style.bg : "var(--bg-secondary)",
                  border: badge.earned
                    ? `1.5px solid ${style.color}22`
                    : "1px solid var(--bg-tertiary)",
                  opacity: badge.earned ? 1 : 0.5,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Glow effect for earned */}
                {badge.earned && (
                  <div style={{
                    position: "absolute",
                    top: 0, right: 0,
                    width: "80px", height: "80px",
                    background: `radial-gradient(circle, ${style.glow} 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }} />
                )}

                {/* Star count display */}
                <div style={{
                  width: "44px", height: "44px",
                  borderRadius: "12px",
                  background: badge.earned ? "var(--surface)" : "var(--bg-tertiary)",
                  border: badge.earned ? `1.5px solid ${style.color}33` : "1.5px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                  flexShrink: 0,
                  boxShadow: badge.earned ? `0 2px 8px ${style.glow}` : "none",
                }}>
                  <span style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: badge.earned ? style.color : "var(--subtle)",
                    fontFamily: "Bricolage Grotesque, sans-serif",
                    lineHeight: 1,
                  }}>
                    {badge.icon.replace("★", "")}
                  </span>
                  <svg width="20" height="8" viewBox="0 0 60 12">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <polygon
                        key={idx}
                        points={`${idx * 10 + 5},1 ${idx * 10 + 6.5},4 ${idx * 10 + 9},4.2 ${idx * 10 + 7},6 ${idx * 10 + 7.8},9 ${idx * 10 + 5},7.5 ${idx * 10 + 2.2},9 ${idx * 10 + 3},6 ${idx * 10 + 1},4.2 ${idx * 10 + 3.5},4`}
                        fill={idx < style.stars ? (badge.earned ? style.color : "var(--subtle)") : "var(--border-strong)"}
                      />
                    ))}
                  </svg>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: badge.earned ? "var(--primary)" : "var(--muted)",
                    marginBottom: "2px",
                  }}>
                    {badge.title}
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "var(--subtle)" }}>
                    {badge.desc}
                  </p>
                </div>

                {/* Status */}
                {badge.earned ? (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "var(--green-light)",
                    border: "1px solid var(--green-dark)",
                    borderRadius: "999px",
                    padding: "3px 8px",
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: "8px", color: "var(--green)" }}>✓</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--green)" }}>Earned</span>
                  </div>
                ) : (
                  <div style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: "var(--subtle)",
                    background: "var(--bg-tertiary)",
                    padding: "3px 8px",
                    borderRadius: "999px",
                    flexShrink: 0,
                  }}>
                    Day {badge.day}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress to next */}
        {locked.length > 0 && (
          <div style={{
            marginTop: "16px",
            padding: "12px 14px",
            background: "var(--bg-secondary)",
            borderRadius: "12px",
            border: "1px solid var(--bg-tertiary)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--muted)" }}>
                Next: {locked[0].title}
              </span>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)" }}>
                Day {student.currentDay}/{locked[0].day}
              </span>
            </div>
            <div style={{ height: "5px", background: "var(--border)", borderRadius: "999px", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min((student.currentDay / locked[0].day) * 100, 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${STAR_COLORS[locked[0].icon]?.color || "var(--accent)"}, var(--accent))`,
                  borderRadius: "999px",
                }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* ── LEADERBOARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "22px 20px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--subtle)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "3px" }}>
              Standing
            </p>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--primary)", fontFamily: "Bricolage Grotesque, sans-serif", letterSpacing: "-0.02em" }}>
              Leaderboard
            </h2>
          </div>
          <div style={{
            background: "var(--accent-light)",
            borderRadius: "999px",
            padding: "4px 12px",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "var(--accent-dark)",
          }}>
            #{student.rank} of {student.totalStudents.toLocaleString()}
          </div>
        </div>

        {/* Top 3 podium */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "16px" }}>
          {leaderboard.slice(0, 3).map((entry, i) => (
            <motion.div
              key={entry.rank}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "14px 8px 12px",
                borderRadius: "14px",
                background: entry.isCurrentUser ? "var(--accent-light)" : "var(--bg-secondary)",
                border: entry.isCurrentUser ? "1.5px solid var(--accent-muted)" : "1px solid var(--bg-tertiary)",
                gap: "6px",
                position: "relative",
              }}
            >
              <div style={{
                width: "22px", height: "22px",
                borderRadius: "50%",
                background: RANK_COLORS[i],
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "10px", fontWeight: 800, color: "white",
                position: "absolute", top: "-8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}>{i + 1}</div>

              <div style={{
                width: "36px", height: "36px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${["#6366F1","#10B981","#F59E0B"][i]}, ${["#8B5CF6","#059669","#EA580C"][i]})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", fontWeight: 700, color: "white",
                marginTop: "6px",
              }}>{entry.avatar}</div>

              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--primary)", textAlign: "center", lineHeight: 1.2 }}>
                {entry.name.split(" ")[0]}
              </p>
              <div style={{
                display: "flex", alignItems: "center", gap: "3px",
                background: "var(--orange-light)", padding: "2px 7px", borderRadius: "999px",
              }}>
                <span style={{ fontSize: "10px" }}>🔥</span>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--orange)" }}>{entry.streak}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--border)", marginBottom: "12px" }} />

        {/* Rest */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {leaderboard.slice(3).map((entry, i) => (
            <motion.div
              key={entry.rank}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 10px", borderRadius: "12px",
                background: entry.isCurrentUser ? "var(--accent-light)" : "transparent",
                border: entry.isCurrentUser ? "1px solid var(--accent-muted)" : "1px solid transparent",
              }}
            >
              <span style={{ width: "22px", fontSize: "0.78rem", fontWeight: 700, color: "var(--subtle)", textAlign: "center", flexShrink: 0 }}>
                #{entry.rank}
              </span>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: entry.isCurrentUser
                  ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
                  : "var(--bg-tertiary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.65rem", fontWeight: 700,
                color: entry.isCurrentUser ? "white" : "var(--muted)",
                flexShrink: 0,
              }}>{entry.avatar}</div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: "0.8rem", fontWeight: 600,
                  color: entry.isCurrentUser ? "var(--accent-dark)" : "var(--primary)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {entry.name}
                  {entry.isCurrentUser && (
                    <span style={{
                      fontSize: "0.6rem", fontWeight: 700, color: "var(--accent-dark)",
                      background: "var(--accent-light)", padding: "1px 5px",
                      borderRadius: "999px", marginLeft: "5px",
                    }}>You</span>
                  )}
                </p>
                <p style={{ fontSize: "0.68rem", color: "var(--subtle)" }}>{entry.track}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "3px", flexShrink: 0 }}>
                <span style={{ fontSize: "11px" }}>🔥</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)" }}>{entry.streak}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
