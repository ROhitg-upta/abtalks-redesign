import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "I stopped overthinking and just started shipping. Day 40 and my GitHub graph has never looked this alive.",
    name: "Ananya Sharma",
    role: "3rd year, CSE · Web Track",
  },
  {
    quote:
      "Recruiters actually messaged me because of my streak. It became proof I could talk about in interviews.",
    name: "Rohit Verma",
    role: "Final year, IT · DSA Track",
  },
  {
    quote:
      "The daily task format kills procrastination. You either ship or your streak breaks — simple.",
    name: "Priya Nair",
    role: "2nd year, ECE · ML Track",
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

export default function Testimonials() {
  return (
   <section id="community" className="testimonials">
      <motion.div
        className="section-header"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        custom={0}
      >
        <span className="eyebrow">Students who showed up</span>
        <h2 className="section-title">Real streaks. Real results.</h2>
      </motion.div>

      <div className="testimonial-grid">
        {testimonials.map((t, i) => (
          <motion.div
            className="testimonial-card"
            key={t.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            custom={i + 1}
          >
            <p className="testimonial-quote">“{t.quote}”</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="testimonial-name">{t.name}</p>
                <p className="testimonial-role">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
