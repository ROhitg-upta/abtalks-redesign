import { motion } from "framer-motion";
import data from "../data/data.json";

export default function AchievementsSection() {
  const { student, leaderboard } = data;

  return (
    <motion.div
      className="achievements-grid"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* BADGES */}
      <div className="badges-card">
        <span className="eyebrow">Achievements</span>
        <h2 className="section-card-title">Your Badges</h2>

        {student.badges.length === 0 ? (
          <p className="empty-msg">
            No badges yet — complete Day 1 to earn your first badge.
          </p>
        ) : (
          <div className="badges-list">
            {student.badges.map((badge) => (
              <div
                key={badge.id}
                className={`badge-pill ${badge.earned ? "earned" : "locked"}`}
              >
                <span className="badge-icon">{badge.icon}</span>
                <div>
                  <p className="badge-title">{badge.title}</p>
                  <p className="badge-status">
                    {badge.earned ? `Earned on Day ${badge.day}` : `Unlocks Day ${badge.day}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LEADERBOARD */}
      <div className="leaderboard-card">
        <span className="eyebrow">Standing</span>
        <h2 className="section-card-title">Leaderboard</h2>

        <div className="leaderboard-list">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`leaderboard-row ${entry.isCurrentUser ? "is-you" : ""}`}
            >
              <span className="lb-rank">
                {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : `#${entry.rank}`}
              </span>
              <div className="lb-avatar">{entry.avatar}</div>
              <div className="lb-info">
                <p className="lb-name">
                  {entry.name} {entry.isCurrentUser && <span className="lb-you-tag">You</span>}
                </p>
                <p className="lb-track">{entry.track}</p>
              </div>
              <div className="lb-streak">
                <span>🔥 {entry.streak}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
