import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Pick your track",
    desc: "Web dev, DSA, ML, or design — choose the track that matches where you want to be in 60 days.",
  },
  {
    number: "02",
    title: "Ship something daily",
    desc: "Every day unlocks a new task. Build it, break it, fix it — small, real progress compounds fast.",
  },
  {
    number: "03",
    title: "Prove it publicly",
    desc: "Submit your GitHub commit and LinkedIn post. Your streak becomes a portfolio recruiters can verify.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <motion.div
        className="section-header"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        custom={0}
      >
        <span className="eyebrow">How it works</span>
        <h2 className="section-title">
          Three steps. Sixty days. <br className="hide-mobile" />
          Zero excuses.
        </h2>
      </motion.div>

      <div className="steps-grid">
        {steps.map((step, i) => (
          <motion.div
            className="step-card"
            key={step.number}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            custom={i + 1}
          >
            <span className="step-number">{step.number}</span>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
