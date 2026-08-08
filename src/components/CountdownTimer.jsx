import { useEffect, useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hackathon deadline — 9 Aug 2026, 8:00 PM IST (fixed offset, timezone-safe)
const DEADLINE = new Date("2026-08-09T20:00:00+05:30").getTime();

function getTimeLeft() {
  const diff = DEADLINE - Date.now();
  if (diff <= 0) return null;
  return {
    diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) {
    return (
      <div className="countdown-card countdown-expired">
        <span className="countdown-expired-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
        </span>
        <div>
          <p className="countdown-expired-title">Challenge window closed</p>
          <p className="countdown-expired-sub">Submissions are no longer being accepted for this round.</p>
        </div>
      </div>
    );
  }

  const { diff, days, hours, minutes, seconds } = timeLeft;
  const hoursLeft = diff / (1000 * 60 * 60);
  const urgency = hoursLeft <= 0.25 ? "critical" : hoursLeft <= 1 ? "warning" : "normal";

  const statusText =
    urgency === "critical"
      ? "Final minutes — submit now"
      : urgency === "warning"
      ? "Less than an hour left"
      : "Time left to submit today";

  const units = [
    { label: "Days", value: days },
    { label: "Hrs", value: hours },
    { label: "Min", value: minutes },
    { label: "Sec", value: seconds },
  ].filter((u) => u.label !== "Days" || days > 0);

  return (
    <div className={`countdown-card countdown-${urgency}`}>
      <div className="countdown-header">
        <span className="countdown-dot" />
        <span className="countdown-label">{statusText}</span>
      </div>

      <div className="countdown-units">
        {units.map((u, i) => (
          <Fragment key={u.label}>
            <div className="countdown-unit">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={u.value}
                  className="countdown-value"
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {String(u.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="countdown-unit-label">{u.label}</span>
            </div>
            {i < units.length - 1 && <span className="countdown-colon">:</span>}
          </Fragment>
        ))}
      </div>

      <p className="countdown-deadline-text">
        Deadline: <strong>Aug 9, 8:00 PM IST</strong>
      </p>
    </div>
  );
}
