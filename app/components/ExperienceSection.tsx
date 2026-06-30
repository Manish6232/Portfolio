"use client";
import { useEffect, useRef } from "react";
import { RESUME } from "../data/resume";

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    let lastY = window.scrollY;
    let direction: "down" | "up" = "down";
    const items = section.querySelectorAll<HTMLElement>("[data-exp-item]");

    const onScroll = () => {
      const nextY = window.scrollY;
      direction = nextY >= lastY ? "down" : "up";
      section.dataset.scrollDirection = direction;
      lastY = nextY;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target as HTMLElement;
          item.classList.toggle("is-visible", entry.isIntersecting);
          item.classList.toggle("from-left", direction === "down");
          item.classList.toggle("from-right", direction === "up");
        });
      },
      { threshold: 0.28, rootMargin: "-12% 0px -12% 0px" }
    );

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    items.forEach((item) => observer.observe(item));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="px-6 md:px-12"
      style={{ padding: "8rem 3rem", background: "#fff", color: "#000" }}
    >
      <style>{`
        .experience-shell {
          max-width: 980px;
          margin: 0 auto;
        }

        .experience-label {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: #000;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 1.4rem;
        }

        .experience-label::before {
          content: "";
          width: 42px;
          height: 2px;
          background: #000;
        }

        .experience-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: 0;
          margin-bottom: 4rem;
        }

        .experience-list {
          display: grid;
          gap: 2rem;
        }

        .experience-item {
          display: grid;
          grid-template-columns: 190px 1fr;
          gap: 2.5rem;
          padding: clamp(1.5rem, 3vw, 2.25rem);
          border: 2px solid #000;
          border-radius: 1.5rem;
          background: #fff;
          color: #000;
          opacity: 0;
          transform: translateX(-84px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
          will-change: transform, opacity;
        }

        .experience-item.from-right {
          transform: translateX(84px);
        }

        .experience-item.is-visible {
          opacity: 1;
          transform: translateX(0);
        }

        .experience-time {
          font-size: 0.74rem;
          font-weight: 850;
          letter-spacing: 0.12em;
          line-height: 1.7;
          text-transform: uppercase;
          opacity: 0.62;
        }

        .experience-type {
          display: inline-flex;
          margin-top: 0.7rem;
          padding: 0.32rem 0.65rem;
          border: 1px solid #000;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .experience-role {
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 2.5vw, 2rem);
          font-weight: 900;
          letter-spacing: 0;
          margin-bottom: 0.35rem;
        }

        .experience-company {
          font-size: 0.92rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.1rem;
        }

        .experience-bullets {
          padding-left: 1.1rem;
        }

        .experience-bullets li {
          color: #333;
          font-size: 0.9rem;
          line-height: 1.78;
          margin-bottom: 0.55rem;
        }

        @media (max-width: 760px) {
          .experience-item {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }
      `}</style>

      <div className="experience-shell">
        <p className="experience-label">Experience</p>
        <h2 className="experience-title">Where I&apos;ve Worked</h2>

        <div className="experience-list">
          {RESUME.experience.map((exp, i) => (
            <article
              key={`${exp.company}-${exp.role}`}
              data-exp-item
              className="experience-item from-left"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div>
                <p className="experience-time">{exp.period}</p>
                <p className="experience-type">{exp.type}</p>
              </div>

              <div>
                <h3 className="experience-role">{exp.role}</h3>
                <p className="experience-company">{exp.company}</p>
                <ul className="experience-bullets">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
