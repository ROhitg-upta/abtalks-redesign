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
        <Link to="/" className="dash-logo">
          <div className="dash-logo-mark">A</div>
          <span>ABTalks</span>
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
          <motion.div
            className="streak-card"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <div className="streak-card-header">
              <span className="streak-label">Current Streak</span>
              <span className="streak-fire">🔥</span>
            </div>
            <div className="streak-number">
              {student.currentStreak}
              <span className="streak-unit">days</span>
            </div>
            {isNewStudent ? (
              <p className="streak-empty-msg">
                No streak yet — submit today's task to light the fire.
              </p>
            ) : (
              <p className="streak-sub">
                Longest streak: <strong>{student.longestStreak} days</strong>
              </p>
            )}
          </motion.div>

          <motion.div
            className="progress-card"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <div className="streak-card-header">
              <span className="streak-label">Overall Progress</span>
              <span className="progress-percent">
                {Math.round((student.completedDays / student.totalDays) * 100)}%
              </span>
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
            <p className="streak-sub">
              {student.completedDays} of {student.totalDays} days completed
            </p>
          </motion.div>

          <motion.div
            className="rank-card"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <div className="streak-card-header">
              <span className="streak-label">Your Standing</span>
              <span className="streak-fire">🏆</span>
            </div>
            {student.rank ? (
  <>
    <div className="rank-number-display">
      <span className="rank-hash">#</span>
      {student.rank}
      <span className="rank-of">of {student.totalStudents.toLocaleString()}</span>
    </div>
    <div className="xp-pill">⚡ {student.xp.toLocaleString()} XP</div>
  </>
            ) : (
              <p className="streak-empty-msg">
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