import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DEADLINE = new Date("2026-08-09T20:00:00+05:30");

function pad(n) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const now = new Date();
  const diff = DEADLINE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

function TimeBlock({ value, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
      <motion.div
        key={value}
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          width: "64px",
          height: "68px",
          borderRadius: "14px",
          background: "linear-gradient(160deg, #0D1F0D 0%, #081408 100%)",
          border: "1px solid rgba(22,199,132,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: 800,
          color: "#16C784",
          fontFamily: "Bricolage Grotesque, monospace, sans-serif",
          letterSpacing: "0.02em",
          boxShadow: "0 0 20px rgba(22,199,132,0.15), inset 0 1px 0 rgba(22,199,132,0.1)",
          position: "relative",
          overflow: "hidden",
          textShadow: "0 0 20px rgba(22,199,132,0.8)",
        }}
      >
        {/* Top shine */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "50%",
          background: "rgba(22,199,132,0.04)",
          borderRadius: "14px 14px 0 0",
        }} />
        {/* Middle divider */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "10px", right: "10px",
          height: "1px",
          background: "rgba(22,199,132,0.15)",
        }} />
        {pad(value)}
      </motion.div>
      <span style={{
        fontSize: "0.6rem",
        fontWeight: 700,
        color: "rgba(22,199,132,0.6)",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
      }}>{label}</span>
    </div>
  );
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "linear-gradient(135deg, #0A0F0A 0%, #0D140D 100%)",
        border: "1px solid rgba(22,199,132,0.2)",
        borderRadius: "20px",
        padding: "24px 20px",
        marginBottom: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow orb */}
      <div style={{
        position: "absolute",
        top: "-30px", left: "50%",
        transform: "translateX(-50%)",
        width: "200px", height: "100px",
        background: "radial-gradient(ellipse, rgba(22,199,132,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(22,199,132,0.08) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "20px",
        }}>
          <p style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "rgba(22,199,132,0.7)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: "5px", height: "5px",
                borderRadius: "50%",
                background: "#16C784",
                display: "inline-block",
                boxShadow: "0 0 6px #16C784",
              }}
            />
            Time Left to Submit
          </p>
        </div>

        {/* Timer */}
        {time.expired ? (
          <div style={{ textAlign: "center", padding: "20px", fontSize: "1rem", fontWeight: 700, color: "#EF4444" }}>
            ⏰ Submission deadline has passed
          </div>
        ) : (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}>
            <TimeBlock value={time.days} label="Days" />
            <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "rgba(22,199,132,0.5)", marginBottom: "22px", lineHeight: 1 }}>:</span>
            <TimeBlock value={time.hours} label="Hrs" />
            <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "rgba(22,199,132,0.5)", marginBottom: "22px", lineHeight: 1 }}>:</span>
            <TimeBlock value={time.minutes} label="Min" />
            <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "rgba(22,199,132,0.5)", marginBottom: "22px", lineHeight: 1 }}>:</span>
            <TimeBlock value={time.seconds} label="Sec" />
          </div>
        )}

        {/* Bottom date */}
        <p style={{
          textAlign: "center",
          fontSize: "0.72rem",
          color: "rgba(22,199,132,0.4)",
          marginTop: "16px",
          fontWeight: 500,
        }}>
          Sunday, 9 Aug · 8:00 PM IST
        </p>
      </div>
    </motion.div>
  );
}
