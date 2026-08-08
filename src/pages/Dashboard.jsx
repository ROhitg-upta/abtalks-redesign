import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import data from "../data/data.json";
import StreakHeatmap from "../components/StreakHeatmap";
import AchievementsSection from "../components/AchievementsSection";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Dashboard() {
  const { student, days } = data;
  const todayTask = days.find((d) => d.status === "pending");
  const isNewStudent = student.currentStreak === 0;

  return (
    <div className="dashboard">
      <header className="dash-navbar">
        <Link to="/" className="dash-logo" style={{ textDecoration: 'none' }}>
          <span style={{
            fontSize: '18px',
            fontWeight: '800',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.06em',
            color: 'var(--primary)',
            textTransform: 'uppercase',
          }}>AB <span style={{ fontWeight: '400', letterSpacing: '0.04em' }}>TALKS</span></span>
        </Link>
        <div className="dash-avatar">{student.avatar}</div>
      </header>

      <main className="dash-main">
        <motion.div
          className="dash-greeting"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <h1>
            Welcome back, <span className="gradient-text">{student.name.split(" ")[0]}</span>
          </h1>
          <p>
            {isNewStudent
              ? "Ready to start your 60-day journey?"
              : `Day ${student.currentDay} of ${student.totalDays} — keep the streak alive.`}
          </p>
        </motion.div>

        

        <div className="dash-top-grid">
          {/* STREAK CARD */}
          <motion.div
            className="stat-card stat-card--streak"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <div className="stat-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2c1 3-2 4.5-2 7.5a3 3 0 0 0 6 0c1.5 1.5 2 3.5 2 5.5a6 6 0 1 1-12 0c0-4 2.5-6 4-8 .5-.7 1.5-2.5 2-5z"
                  stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="stat-card-label">Current Streak</span>
            <div className="stat-number">
              {student.currentStreak}
              <span className="stat-unit">days</span>
            </div>
            {isNewStudent ? (
              <p className="stat-empty-msg">
                No streak yet — submit today's task to begin.
              </p>
            ) : (
              <p className="stat-sub">
                Longest streak: <strong>{student.longestStreak} days</strong>
              </p>
            )}
          </motion.div>

          {/* PROGRESS CARD */}
          <motion.div
            className="stat-card stat-card--progress"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <div className="stat-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 20V10M10 20V4M16 20v-7M22 20V8"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="stat-card-label">Overall Progress</span>
            <div className="stat-number">
              {Math.round((student.completedDays / student.totalDays) * 100)}
              <span className="stat-unit">%</span>
            </div>
            <div className="progress-bar-track">
              <motion.div
                className="progress-bar-fill"
                initial={{ width: 0 }}
                animate={{
                  width: `${(student.completedDays / student.totalDays) * 100}%`,
                }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
            </div>
            <p className="stat-sub">
              {student.completedDays} of {student.totalDays} days completed
            </p>
          </motion.div>

          {/* RANK CARD */}
          <motion.div
            className="stat-card stat-card--rank"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <div className="stat-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
                <path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="stat-card-label">Your Standing</span>
            {student.rank ? (
              <>
                <div className="rank-display">
                  <span className="rank-hash">#</span>
                  <span className="rank-big-number">{student.rank}</span>
                </div>
                <p className="rank-out-of">
                  out of <strong>{student.totalStudents.toLocaleString()}</strong> students
                </p>
                <div className="rank-footer-row">
                  <span className="rank-percentile-badge">
                    Top {Math.max(1, Math.round((student.rank / student.totalStudents) * 100))}%
                  </span>
                  <span className="rank-xp">{student.xp.toLocaleString()} XP</span>
                </div>
              </>
            ) : (
              <p className="stat-empty-msg">
                Complete your first day to enter the leaderboard.
              </p>
            )}
          </motion.div>
        </div>

        <motion.div
          className="today-task-card"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <div className="today-task-header">
            <span className="eyebrow">
              {todayTask ? `Day ${todayTask.day} · Today's Task` : "All caught up"}
            </span>
          </div>

          {todayTask ? (
            <>
              <h2 className="today-task-title">{todayTask.title}</h2>
              <p className="today-task-topic">{todayTask.topic}</p>
              <Link to={`/day/${todayTask.day}`} className="btn btn-primary">
                Start Day {todayTask.day} →
              </Link>
            </>
          ) : (
            <>
              <h2 className="today-task-title">No pending task right now</h2>
              <p className="today-task-topic">
                Check back tomorrow for your next challenge.
              </p>
            </>
          )}
        </motion.div>

        <StreakHeatmap />
        <AchievementsSection />
      </main>
    </div>
  );
}
