import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Landing() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg-grid" />

        <div className="hero-content">
          <motion.div
            className="hero-badge"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className="dot-pulse" />
            60-Day Coding Challenge · Live Now
          </motion.div>

          <motion.h1
            className="hero-title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Build in public.
            <br />
            <span className="gradient-text">Get noticed.</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Ship one project every day for 60 days. Prove your consistency
            with a public GitHub streak and LinkedIn trail recruiters can
            actually see.
          </motion.p>

          <motion.div
            className="hero-cta-group"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Start your streak
            </Link>
            <a href="#how-it-works" className="btn btn-ghost btn-lg">
              See how it works
            </a>
          </motion.div>

          <motion.div
            className="hero-stats"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <div className="hero-stat">
              <span className="hero-stat-number">2,400+</span>
              <span className="hero-stat-label">Students building</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">38,000+</span>
              <span className="hero-stat-label">Days completed</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">60</span>
              <span className="hero-stat-label">Days to transform</span>
            </div>
          </motion.div>
        </div>
      </section>
      <HowItWorks />
      <Testimonials />
      <Footer />
    </>
  );
}