import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import data from "../data/data.json";

const STATUS = {
  completed: {
    color: "#16C784",
    bg: "linear-gradient(135deg, #16C784, #059669)",
    glow: "0 0 8px rgba(22,199,132,0.6)",
    label: "Completed",
    emoji: "✅",
  },
  missed: {
    color: "#EF4444",
    bg: "linear-gradient(135deg, #EF4444, #DC2626)",
    glow: "0 0 8px rgba(239,68,68,0.5)",
    label: "Missed",
    emoji: "❌",
  },
  pending: {
    color: "#F59E0B",
    bg: "linear-gradient(135deg, #F59E0B, #D97706)",
    glow: "0 0 10px rgba(245,158,11,0.7)",
    label: "Today",
    emoji: "⚡",
  },
  upcoming: {
    color: "#3F3F46",
    bg: "var(--bg-secondary)",
    glow: "none",
    label: "Upcoming",
    emoji: "🔒",
  },
};

function FlameIcon({ size = 20, color = "#F97316" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 8 7 8 11C8 13.2 9.8 15 12 15C14.2 15 16 13.2 16 11C16 9 14 6 14 6C14 6 15 9 13 10C13 8 12 2 12 2Z" fill={color}/>
      <path d="M12 15C9.8 15 8 16.8 8 19C8 21.2 9.8 23 12 23C14.2 23 16 21.2 16 19C16 17.5 15 16.2 13.5 15.5C13.8 16.5 13.5 17.5 12.5 18C12.8 17 12.5 15.8 12 15Z" fill={color} opacity="0.8"/>
    </svg>
  );
}

export default function StreakHeatmap({ daysOverride, studentOverride }) {
  const days = daysOverride || data.days;
  const student = studentOverride || data.student;
  const [hovered, setHovered] = useState(null);

  const completed = days.filter(d => d.status === "completed").length;
  const completionRate = Math.round((completed / student.totalDays) * 100);

  const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "24px",
        padding: "28px 24px",
        marginTop: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        top: "-40px", right: "-40px",
        width: "200px", height: "200px",
        background: "radial-gradient(circle, rgba(22,199,132,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: "24px",
        gap: "12px",
        flexWrap: "wrap",
      }}>
        <div>
          <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
            Your Journey
          </p>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--primary)", fontFamily: "Bricolage Grotesque, sans-serif", letterSpacing: "-0.02em" }}>
            60-Day Streak Map
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "linear-gradient(135deg, #FFF7ED, #FFEDD5)",
            border: "1.5px solid #FED7AA",
            borderRadius: "12px",
            padding: "8px 12px",
          }}>
            <FlameIcon size={18} color="#F97316" />
            <div>
              <p style={{ fontSize: "1rem", fontWeight: 800, color: "#EA580C", lineHeight: 1, fontFamily: "Bricolage Grotesque, sans-serif" }}>
                {student.currentStreak}
              </p>
              <p style={{ fontSize: "0.6rem", fontWeight: 600, color: "#F97316", letterSpacing: "0.04em" }}>STREAK</p>
            </div>
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
            border: "1.5px solid #6EE7B7",
            borderRadius: "12px",
            padding: "8px 12px",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#10B981" strokeWidth="2"/>
              <path d="M8 12l3 3 5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <p style={{ fontSize: "1rem", fontWeight: 800, color: "#059669", lineHeight: 1, fontFamily: "Bricolage Grotesque, sans-serif" }}>
                {completionRate}%
              </p>
              <p style={{ fontSize: "0.6rem", fontWeight: 600, color: "#10B981", letterSpacing: "0.04em" }}>DONE</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "4px",
        marginBottom: "6px",
      }}>
        {weeks.slice(0, 7).map(w => (
          <div key={w} style={{
            fontSize: "0.6rem", fontWeight: 600,
            color: "var(--muted)", textAlign: "center",
            letterSpacing: "0.04em",
          }}>{w}</div>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "5px",
        marginBottom: "16px",
      }}>
        {days.map((day, i) => {
          const s = STATUS[day.status];
          const isHovered = hovered?.day === day.day;
          const isPending = day.status === "pending";

          return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.006, duration: 0.25, ease: "easeOut" }}
              onMouseEnter={() => setHovered(day)}
              onMouseLeave={() => setHovered(null)}
              style={{
                aspectRatio: "1",
                borderRadius: "6px",
                background: s.bg,
                boxShadow: isHovered ? s.glow : (isPending ? s.glow : "none"),
                cursor: "pointer",
                position: "relative",
                transform: isHovered ? "scale(1.3)" : isPending ? "scale(1.1)" : "scale(1)",
                transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                zIndex: isHovered ? 10 : 1,
                border: isPending ? `1.5px solid ${s.color}` : "1.5px solid transparent",
              }}
            >
              {isPending && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: "absolute",
                    inset: "-3px",
                    borderRadius: "8px",
                    border: `2px solid ${s.color}`,
                    pointerEvents: "none",
                  }}
                />
              )}
              {isHovered && (
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.5rem", fontWeight: 800,
                  color: day.status === "upcoming" ? "var(--muted)" : "white",
                  borderRadius: "6px",
                }}>
                  {day.day}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "14px",
        minHeight: "48px",
        display: "flex",
        alignItems: "center",
      }}>
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.div
              key={hovered.day}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}
            >
              <div style={{
                width: "36px", height: "36px",
                borderRadius: "10px",
                background: STATUS[hovered.status].bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem", flexShrink: 0,
                boxShadow: STATUS[hovered.status].glow,
              }}>
                {STATUS[hovered.status].emoji}
              </div>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)", marginBottom: "2px" }}>
                  Day {hovered.day} — {hovered.title}
                </p>
                <p style={{ fontSize: "0.72rem", color: STATUS[hovered.status].color, fontWeight: 600 }}>
                  {hovered.topic} · {STATUS[hovered.status].label}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
            >
              {Object.entries(STATUS).map(([key, val]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: val.bg }} />
                  <span style={{ fontSize: "0.65rem", color: "var(--muted)", fontWeight: 500 }}>{val.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{
        marginTop: "16px",
        padding: "12px 16px",
        background: student.currentStreak >= 7 ? "linear-gradient(135deg, #FFF7ED, #FFEDD5)" : "var(--bg-secondary)",
        borderRadius: "12px",
        border: student.currentStreak >= 7 ? "1px solid #FED7AA" : "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FlameIcon size={16} color={student.currentStreak >= 7 ? "#F97316" : "#A1A1AA"} />
          <p style={{ fontSize: "0.78rem", fontWeight: 600, color: student.currentStreak >= 7 ? "#EA580C" : "var(--muted)" }}>
            {student.currentStreak >= 30
              ? "Legendary! 30+ day streak"
              : student.currentStreak >= 7
              ? `${student.currentStreak} days strong — don't break it now!`
              : student.currentStreak === 0
              ? "Start today to begin your streak"
              : `${Math.max(student.longestStreak - student.currentStreak, 0)} more days to beat your record`}
          </p>
        </div>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--muted)", flexShrink: 0 }}>
          {completed}/{student.totalDays} days
        </div>
      </div>
    </motion.div>
  );
}
