import { motion } from "framer-motion";
import { useState } from "react";
import data from "../data/data.json";

const statusColor = {
  completed: "#16a34a",
  missed: "#e5484d",
  pending: "#fbbf24",
  upcoming: "var(--border)",
};

const statusLabel = {
  completed: "Completed",
  missed: "Missed",
  pending: "In progress",
  upcoming: "Not started yet",
};

export default function StreakHeatmap() {
  const { days } = data;
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      className="heatmap-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="heatmap-header">
        <div>
          <span className="eyebrow">Your Journey</span>
          <h2 className="heatmap-title">60-Day Streak Map</h2>
        </div>
        <div className="heatmap-legend">
          {Object.entries(statusLabel).map(([key, label]) => (
            <div className="legend-item" key={key}>
              <span
                className="legend-dot"
                style={{ background: statusColor[key] }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="heatmap-grid">
        {days.map((day, i) => (
          <motion.div
            key={day.day}
            className="heatmap-cell"
            style={{ background: statusColor[day.status] }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.008, duration: 0.3 }}
            onMouseEnter={() => setHovered(day)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>

      <div className="heatmap-tooltip-bar">
        {hovered ? (
          <p>
            <strong>Day {hovered.day}:</strong> {hovered.title} —{" "}
            <span style={{ color: statusColor[hovered.status] }}>
              {statusLabel[hovered.status]}
            </span>
          </p>
        ) : (
          <p className="heatmap-hint">Hover over a cell to see that day's task</p>
        )}
      </div>
    </motion.div>
  );
}
