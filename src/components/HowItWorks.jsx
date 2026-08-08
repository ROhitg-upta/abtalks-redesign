import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Pick your track",
    desc: "Web dev, DSA, ML, or design — choose the track that matches where you want to be in 60 days.",
    color: "#A5B4FC",
    glow: "rgba(165, 180, 252, 0.18)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Ship something daily",
    desc: "Every day unlocks a new task. Build it, break it, fix it — small, real progress compounds fast.",
    color: "#818CF8",
    glow: "rgba(129, 140, 248, 0.18)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L4.5 12.5H11L10 22L19.5 10.5H13L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Prove it publicly",
    desc: "Submit your GitHub commit and LinkedIn post. Your streak becomes a portfolio recruiters can verify.",
    color: "#6366F1",
    glow: "rgba(99, 102, 241, 0.2)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4M12 3l8 4v5c0 4.5-3.2 8.4-8 9.5C7.2 20.4 4 16.5 4 12V7l8-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const fadeIn = {
  hidden: { opacity: 0, x: -16 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        <span className="eyebrow">How it works</span>
        <h2 className="section-title">
          Three steps. Sixty days. <br className="hide-mobile" />
          Zero excuses.
        </h2>
      </motion.div>

      <div className="timeline">
        {steps.map((step, i) => (
          <motion.div
            className="timeline-item"
            key={step.number}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={i}
          >
            <div className="timeline-marker-col">
              <div
                className="timeline-dot"
                style={{
                  color: step.color,
                  background: step.glow,
                  boxShadow: `0 0 0 4px ${step.glow}`,
                }}
              >
                {step.icon}
              </div>
              {i < steps.length - 1 && <div className="timeline-line" />}
            </div>

            <div className="timeline-content">
              <span className="timeline-step-label" style={{ color: step.color }}>
                STEP {step.number}
              </span>
              <h3 className="timeline-title">{step.title}</h3>
              <p className="timeline-desc">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
