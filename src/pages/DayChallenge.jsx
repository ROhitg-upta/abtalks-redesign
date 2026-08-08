import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import data from "../data/data.json";

export default function DayChallenge() {
  const { dayNum } = useParams();
  const dayData = data.days.find((d) => d.day === Number(dayNum)) || data.days[0];

  const [githubUrl, setGithubUrl] = useState(dayData.githubUrl || "");
  const [linkedInUrl, setLinkedInUrl] = useState(dayData.linkedInUrl || "");
  const [submitted, setSubmitted] = useState(dayData.status === "completed");

  const isLocked = dayData.status === "upcoming";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (githubUrl.trim() && linkedInUrl.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="day-page">
      {/* NAVBAR */}
      <header className="dash-navbar">
        <Link to="/dashboard" className="dash-logo">
          <div className="dash-logo-mark">A</div>
          <span>ABTalks</span>
        </Link>
        <Link to="/dashboard" className="day-back-link">
          ← Dashboard
        </Link>
      </header>

      <main className="day-main">
        {/* TASK HEADER */}
        <motion.div
          className="day-header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Day {dayData.day} of 60</span>
          <h1 className="day-title">{dayData.title}</h1>
          <p className="day-topic">{dayData.topic}</p>

          <div className="day-meta-row">
            <span className={`status-chip status-${dayData.status}`}>
              {dayData.status === "completed" && "✓ Completed"}
              {dayData.status === "pending" && "⏳ In Progress"}
              {dayData.status === "upcoming" && "🔒 Locked"}
            </span>
          </div>
        </motion.div>

        {isLocked ? (
          <motion.div
            className="day-locked-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="lock-icon">🔒</span>
            <h3>This day hasn't unlocked yet</h3>
            <p>Complete your current day first to unlock Day {dayData.day}.</p>
            <Link to="/dashboard" className="btn btn-primary">
              Back to Dashboard
            </Link>
          </motion.div>
        ) : (
          <>
            {/* TASK DESCRIPTION */}
            <motion.div
              className="day-section-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="day-section-title">What you'll build</h2>
              <p className="day-desc-text">
                Build a fully functional implementation covering{" "}
                <strong>{dayData.topic}</strong>. Focus on clean code, proper
                structure, and handling edge cases — this is what separates a
                working solution from a portfolio-worthy one.
              </p>

              <div className="day-requirements">
                <h3>Requirements</h3>
                <ul>
                  <li>Code should be pushed to a public GitHub repository</li>
                  <li>Include a README explaining your approach</li>
                  <li>Post about what you built on LinkedIn</li>
                  <li>Tag #ABTalks in your post for visibility</li>
                </ul>
              </div>
            </motion.div>

            {/* SUBMISSION FORM */}
            <motion.div
              className="day-section-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="day-section-title">
                {submitted ? "Your Submission" : "Submit your proof of work"}
              </h2>

              {submitted ? (
                <div className="submission-success">
                  <div className="success-icon">✓</div>
                  <p className="success-text">
                    Nice work! Your Day {dayData.day} submission is locked in.
                  </p>
                  <div className="submission-links">
                    <a href={githubUrl} target="_blank" rel="noreferrer" className="submission-link">
                      🔗 View GitHub Commit
                    </a>
                    <a href={linkedInUrl} target="_blank" rel="noreferrer" className="submission-link">
                      🔗 View LinkedIn Post
                    </a>
                  </div>
                  <button className="btn-text-edit" onClick={() => setSubmitted(false)}>
                    Edit submission
                  </button>
                </div>
              ) : (
                <form className="submission-form" onSubmit={handleSubmit}>
                  <label className="form-label">
                    GitHub Repository / Commit URL
                    <input
                      type="url"
                      placeholder="https://github.com/username/repo"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      required
                      className="form-input"
                    />
                  </label>

                  <label className="form-label">
                    LinkedIn Post URL
                    <input
                      type="url"
                      placeholder="https://linkedin.com/posts/..."
                      value={linkedInUrl}
                      onChange={(e) => setLinkedInUrl(e.target.value)}
                      required
                      className="form-input"
                    />
                  </label>

                  <button type="submit" className="btn btn-primary btn-full">
                    Submit Day {dayData.day}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}
