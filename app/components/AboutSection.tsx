"use client";
import { useEffect } from "react";
import { RESUME } from "../data/resume";
import { useReveal } from "./RevealUtils";

export default function AboutSection() {
  const ref = useReveal();

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const lines = section.querySelectorAll<HTMLElement>("[data-about-line]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-highlighted", entry.isIntersecting);
        });
      },
      {
        threshold: 0.65,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    lines.forEach((line) => observer.observe(line));
    return () => observer.disconnect();
  }, [ref]);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        position: "relative",
        padding: "8rem 3rem 9rem",
        background: "var(--dark2)",
        overflow: "hidden",
      }}
      className="px-6 md:px-12"
    >
      <style>{`
        .about-display-title {
          font-family: var(--font-display);
          font-size: clamp(4rem, 14vw, 10rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: 0;
          text-align: center;
          color: rgba(224, 232, 240, 0.68);
          margin: 0 0 clamp(4rem, 8vw, 7rem);
          text-transform: uppercase;
        }

        .about-title-highlight {
          display: inline-block;
          color: #fff;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.9);
          text-shadow: 0 0 34px rgba(255, 255, 255, 0.24);
          transform: translateY(-0.03em);
        }

        .about-copy {
          max-width: 760px;
          margin: 0 auto clamp(4rem, 7vw, 6.5rem);
          text-align: center;
        }

        .about-copy-line {
          display: block;
          color: rgba(226, 232, 240, 0.28);
          font-size: clamp(1.25rem, 2.15vw, 2rem);
          font-weight: 600;
          line-height: 1.78;
          transition: color 0.45s ease, font-weight 0.45s ease, text-shadow 0.45s ease;
        }

        .about-copy-line.is-highlighted {
          color: rgba(255, 255, 255, 0.96);
          font-weight: 800;
          text-shadow: 0 0 28px rgba(255, 255, 255, 0.12);
        }

        .about-skills {
          max-width: 920px;
          margin: 0 auto;
          display: grid;
          gap: 1.6rem;
        }

        .about-skill-row {
          display: grid;
          grid-template-columns: minmax(180px, 220px) 1fr;
          align-items: center;
          gap: 2rem;
        }

        .about-skill-label {
          color: rgba(226, 232, 240, 0.36);
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-align: right;
        }

        .about-chip-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .about-skill-chip {
          padding: 0.5rem 0.95rem;
          border: 1px solid rgba(226, 232, 240, 0.18);
          border-radius: 999px;
          color: rgba(226, 232, 240, 0.68);
          background: rgba(255, 255, 255, 0.018);
          font-size: 0.88rem;
          font-weight: 650;
          line-height: 1;
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease, background 0.2s ease;
        }

        .about-skill-chip:hover {
          border-color: rgba(255, 255, 255, 0.42);
          color: #fff;
          background: rgba(255, 255, 255, 0.055);
          transform: translateY(-2px);
        }

        @media (max-width: 760px) {
          .about-display-title {
            margin-bottom: 3.5rem;
          }

          .about-copy {
            text-align: left;
          }

          .about-copy-line {
            font-size: 1.15rem;
            line-height: 1.75;
          }

          .about-skill-row {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }

          .about-skill-label {
            text-align: left;
          }
        }
      `}</style>

      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <h2 data-reveal className="about-display-title">
          ABOUT <span className="about-title-highlight">ME</span>
        </h2>

        <div
          data-reveal
          className="about-copy"
        >
          {RESUME.bio.map((para) => (
            <span key={para} data-about-line className="about-copy-line">
              {para}
            </span>
          ))}
        </div>

        <div data-reveal className="about-skills">
          {RESUME.skillGroups.map((group) => (
            <div key={group.label} className="about-skill-row">
              <div className="about-skill-label">{group.label}</div>
              <div className="about-chip-list">
                {group.skills.map((skill) => (
                  <span key={skill} className="about-skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
