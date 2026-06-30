"use client";
import { RESUME } from "../data/resume";
import { useReveal } from "./RevealUtils";

export default function AchievementsSection() {
  const ref = useReveal({ once: false, reverse: true, durationMs: 2000 });

  return (
    <section
      id="achievements"
      ref={ref}
      className="px-6 md:px-12"
      style={{
        padding: "8rem 3rem 9rem",
        background: "#000",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <style>{`
        .milestone-shell {
          max-width: 1180px;
          margin: 0 auto;
        }

        .milestone-kicker {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          margin-bottom: 1.35rem;
        }

        .milestone-kicker::before,
        .milestone-kicker::after {
          content: "";
          width: min(12vw, 96px);
          height: 2px;
          background: #fff;
        }

        .milestone-title {
          font-family: var(--font-display);
          font-size: clamp(4rem, 13vw, 10rem);
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: 0;
          text-align: center;
          margin: 0 auto 4.5rem;
          color: #fff;
        }

        .milestone-title span {
          display: inline-block;
          animation: milestoneFloat 4.2s ease-in-out infinite;
        }

        .milestone-title span:nth-child(2) {
          -webkit-text-stroke: 2px #fff;
          color: transparent;
          animation-delay: 0.22s;
        }

        .milestone-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(1rem, 2vw, 1.35rem);
          align-items: stretch;
        }

        .milestone-card {
          min-height: 270px;
          position: relative;
          padding: 1.45rem;
          border: 2px solid #fff;
          border-radius: 1.35rem;
          background: #000;
          color: #fff;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 2s cubic-bezier(0.16,1,0.3,1), opacity 2s cubic-bezier(0.16,1,0.3,1), background 0.25s ease, color 0.25s ease;
        }

        .milestone-card:hover {
          transform: translateY(-8px);
          background: #fff;
          color: #000;
        }

        .milestone-index {
          position: absolute;
          right: 1.1rem;
          top: 0.85rem;
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          font-weight: 900;
          line-height: 1;
          opacity: 0.14;
        }

        .milestone-icon {
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid currentColor;
          border-radius: 999px;
          font-size: 1.25rem;
          filter: grayscale(1);
          margin-bottom: 2.75rem;
        }

        .milestone-card h3 {
          position: relative;
          z-index: 1;
          font-family: var(--font-display);
          font-size: clamp(1.16rem, 1.8vw, 1.6rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: 0;
          margin-bottom: 0.8rem;
        }

        .milestone-card p {
          position: relative;
          z-index: 1;
          color: currentColor;
          opacity: 0.64;
          font-size: 0.88rem;
          line-height: 1.72;
        }

        .milestone-card::after {
          content: "";
          position: absolute;
          left: 1.45rem;
          right: 1.45rem;
          bottom: 1.2rem;
          height: 2px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }

        .milestone-card:hover::after {
          transform: scaleX(1);
        }

        @keyframes milestoneFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @media (max-width: 900px) {
          .milestone-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 620px) {
          .milestone-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="milestone-shell">
        <p data-reveal className="milestone-kicker">Recognition</p>
        <h2 data-reveal className="milestone-title">
          <span>MILE</span>
          <span>STONES</span>
        </h2>

        <div className="milestone-grid">
          {RESUME.achievements.map((achievement, index) => (
            <article
              key={achievement.title}
              data-reveal
              className="milestone-card"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="milestone-index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="milestone-icon">{achievement.icon}</div>
              <h3>{achievement.title}</h3>
              <p>{achievement.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
