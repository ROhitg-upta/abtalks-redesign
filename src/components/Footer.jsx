import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  return (
    <>
      {/* FINAL CTA */}
      <section className="final-cta">
        <motion.div
          className="final-cta-inner"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="final-cta-title">
            Your streak starts <span className="gradient-text">today.</span>
          </h2>
          <p className="final-cta-subtitle">
            No fees. No applications. Just 60 days of showing up.
          </p>
          <Link to="/dashboard" className="btn btn-primary btn-lg">
            Start your streak
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">A</div>
            <span className="footer-logo-text">ABTalks</span>
          </div>

          <div className="footer-links">
            <a href="#how-it-works">How it works</a>
            <Link to="/dashboard">Dashboard</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>

          <p className="footer-copy">
            © 2025 ABTalks. Built for students who ship.
          </p>
        </div>
      </footer>
    </>
  );
}
