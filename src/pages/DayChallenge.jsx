import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import data from "../data/data.json";

const CheckIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClockIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M7.5 10V7a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const GitHubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.7.5.9 5.3.9 11.6c0 5 3.2 9.2 7.7 10.7.6.1.8-.2.8-.6v-2.2c-3.1.7-3.8-1.5-3.8-1.5-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 1.1a10.3 10.3 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3 0 4.2-2.6 5.2-5.1 5.5.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.5-1.5 7.7-5.7 7.7-10.7C23.1 5.3 18.3.5 12 .5z" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM7 20.4H3.6V9H7v11.4z" />
  </svg>
);

const statusConfig = {
  completed: { label: "Completed", icon: CheckIcon, tone: "emerald" },
  pending: { label: "In Progress", icon: ClockIcon, tone: "amber" },
  upcoming: { label: "Locked", icon: LockIcon, tone: "muted" },
};

export default function DayChallenge() {
  const { dayNum } = useParams();
  const dayData = data.days.find((d) => d.day === Number(dayNum)) || data.days[0];

  const [githubUrl, setGithubUrl] = useState(dayData.githubUrl || "");
  const [linkedInUrl, setLinkedInUrl] = useState(dayData.linkedInUrl || "");
  const [submitted, setSubmitted] = useState(dayData.status === "completed");

  const isLocked = dayData.status === "upcoming";
  const status = statusConfig[dayData.status];
  const StatusIcon = status.icon;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (githubUrl.trim() && linkedInUrl.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="day-page">
      <header className="dash-navbar">
        <Link to="/dashboard" className="dash-logo" style={{ textDecoration: "none" }}>
          <span style={{
            fontSize: "18px",
            fontWeight: "800",
            fontFamily: "var(--font-display)",
            letterSpacing: "0.06em",
            color: "var(--primary)",
            textTransform: "uppercase",
          }}>AB <span style={{ fontWeight: "400", letterSpacing: "0.04em" }}>TALKS</span></span>
        </Link>
        <Link to="/dashboard" className="day-back-link">
          ← Dashboard
        </Link>
      </header>

      <main className="day-main">
        <motion.div
          className="day-header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="day-progress-track">
            <div
              className="day-progress-fill"
              style={{ width: `${(dayData.day / 60) * 100}%` }}
            />
          </div>
          <span className="eyebrow">Day {dayData.day} of 60</span>
          <h1 className="day-title">{dayData.title}</h1>
          <p className="day-topic">{dayData.topic}</p>

          <div className={`status-chip status-${status.tone}`}>
            <StatusIcon size={14} />
            {status.label}
          </div>
        </motion.div>

        {isLocked ? (
          <motion.div
            className="day-locked-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="lock-icon-wrap">
              <LockIcon size={26} />
            </div>
            <h3>This day hasn't unlocked yet</h3>
            <p>Complete your current day first to unlock Day {dayData.day}.</p>
            <Link to="/dashboard" className="btn btn-primary">
              Back to Dashboard
            </Link>
          </motion.div>
        ) : (
          <>
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
                  {[
                    "Code should be pushed to a public GitHub repository",
                    "Include a README explaining your approach",
                    "Post about what you built on LinkedIn",
                    "Tag #ABTalks in your post for visibility",
                  ].map((req) => (
                    <li key={req}>
                      <span className="req-check"><CheckIcon size={12} /></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

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
                  <div className="success-icon">
                    <CheckIcon size={22} />
                  </div>
                  <p className="success-text">
                    Nice work! Your Day {dayData.day} submission is locked in.
                  </p>
                  <div className="submission-links">
                    <a href={githubUrl} target="_blank" rel="noreferrer" className="submission-link">
                      <GitHubIcon /> View GitHub Commit
                    </a>
                    <a href={linkedInUrl} target="_blank" rel="noreferrer" className="submission-link">
                      <LinkedInIcon /> View LinkedIn Post
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
                    <div className="form-input-wrap">
                      <span className="form-input-icon"><GitHubIcon /></span>
                      <input
                        type="url"
                        placeholder="https://github.com/username/repo"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>
                  </label>

                  <label className="form-label">
                    LinkedIn Post URL
                    <div className="form-input-wrap">
                      <span className="form-input-icon"><LinkedInIcon /></span>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/posts/..."
                        value={linkedInUrl}
                        onChange={(e) => setLinkedInUrl(e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>
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
