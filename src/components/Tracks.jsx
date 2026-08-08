import { motion } from "framer-motion";
import data from "../data/data.json";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Tracks() {
  const { tracks } = data;

  return (
    <section id="tracks" className="tracks-section">
      <motion.div
        className="section-header"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        custom={0}
      >
        <span className="eyebrow">Choose your path</span>
        <h2 className="section-title">Pick a track. Commit to it.</h2>
      </motion.div>

      <div className="tracks-grid">
        {tracks.map((track, i) => (
          <motion.div
            className="track-card"
            key={track.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            custom={i + 1}
          >
            <span className="track-icon">{track.icon}</span>
            <h3 className="track-title">{track.title}</h3>
            <p className="track-desc">{track.description}</p>

            <div className="track-topics">
              {track.topics.slice(0, 4).map((topic) => (
                <span key={topic} className="track-topic-chip">
                  {topic}
                </span>
              ))}
            </div>

            <div className="track-footer">
              <span className="track-level">{track.level}</span>
              <span className="track-students">
                {track.students.toLocaleString()} students
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
