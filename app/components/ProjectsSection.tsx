"use client";
import Image from "next/image";
import { RESUME } from "../data/resume";
import { useReveal } from "./RevealUtils";

const PROJECT_IMAGES = [
  "/Clean%20City.png",
  "/queue.png",
  "/heartpre.png",
  "/SmartAttend.png",
];

function ProjectVisual({ index, name }: { index: number; name: string }) {
  const imageSrc = PROJECT_IMAGES[index];

  if (imageSrc) {
    return (
      <div className="project-visual project-image-visual" aria-label={`${name} preview`}>
        <span className="project-image-frame">
          <Image
            src={imageSrc}
            alt={`${name} dashboard screenshot`}
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
            className="project-screenshot"
            priority={index === 0}
          />
        </span>
      </div>
    );
  }

  return (
    <div className="project-visual auchain-visual" aria-label={`${name} preview`}>
      <div className="chain-card">
        <span>SGB Token</span>
        <strong>₹10</strong>
        <p>Fractional gold bond investment</p>
      </div>
      <div className="chain-lines">
        <span />
        <span />
        <span />
      </div>
      <div className="oracle-card">
        <span>Oracle</span>
        <strong>XAU/USD</strong>
        <p>Chainlink pricing feed</p>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const ref = useReveal();

  return (
    <section
      id="projects"
      ref={ref}
      className="px-6 md:px-12"
      style={{
        padding: "8rem 3rem 22vh",
        background: "#000",
        overflow: "visible",
      }}
    >
      <style>{`
        .projects-shell {
          max-width: 1180px;
          margin: 0 auto;
        }

        .projects-title {
          position: sticky;
          top: 1.25rem;
          z-index: 1;
          font-family: var(--font-display);
          font-size: clamp(3.8rem, 13vw, 9rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: 0;
          text-align: center;
          color: #fff;
          mix-blend-mode: difference;
          margin: 0 0 5rem;
          pointer-events: none;
        }

        .project-layer-stack {
          display: grid;
          gap: 12vh;
        }

        .project-layer {
          position: sticky;
          top: clamp(5.5rem, 10vh, 7.5rem);
          min-height: min(720px, calc(100vh - 7.5rem));
          padding: clamp(1.5rem, 4.5vw, 4rem);
          border: 2px solid currentColor;
          border-radius: clamp(1.8rem, 4vw, 3.7rem);
          overflow: hidden;
          box-shadow: 0 -18px 0 rgba(0, 0, 0, 1), 0 -20px 0 currentColor;
        }

        .project-layer.theme-dark {
          background: #000;
          color: #fff;
        }

        .project-layer.theme-light {
          background: #fff;
          color: #000;
        }

        .project-layer::before,
        .project-layer::after {
          content: "";
          position: absolute;
          left: clamp(1.5rem, 4vw, 3.5rem);
          right: clamp(1.5rem, 4vw, 3.5rem);
          height: 72px;
          border: 2px solid currentColor;
          border-bottom: 0;
          border-radius: 999px 999px 0 0;
          opacity: 0.7;
          pointer-events: none;
        }

        .project-layer::before {
          top: -42px;
        }

        .project-layer::after {
          top: -78px;
          opacity: 0.45;
        }

        .project-header {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: clamp(1.25rem, 4vw, 3rem);
          margin-bottom: clamp(2rem, 5vw, 4rem);
        }

        .project-number {
          font-family: var(--font-display);
          font-size: clamp(4.8rem, 12vw, 8.5rem);
          font-weight: 900;
          line-height: 0.78;
          letter-spacing: 0;
        }

        .project-tag {
          font-size: 0.78rem;
          font-weight: 850;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.58;
          margin-bottom: 0.9rem;
        }

        .project-name {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4.6vw, 3.6rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: 0;
          margin: 0;
        }

        .project-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 1.45rem;
          border: 2px solid currentColor;
          border-radius: 999px;
          color: inherit;
          background: transparent;
          font-size: 0.78rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .theme-dark .project-button:hover {
          background: #fff;
          color: #000;
          transform: translateY(-2px);
        }

        .theme-light .project-button:hover {
          background: #000;
          color: #fff;
          transform: translateY(-2px);
        }

        .project-body {
          display: grid;
          grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
          gap: clamp(2rem, 5vw, 4rem);
          align-items: stretch;
        }

        .project-desc {
          color: inherit;
          opacity: 0.68;
          font-size: 0.96rem;
          line-height: 1.85;
          margin: 0 0 1.65rem;
        }

        .project-stack-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .project-chip {
          padding: 0.38rem 0.74rem;
          border: 1px solid currentColor;
          border-radius: 999px;
          color: inherit;
          opacity: 0.66;
          font-size: 0.7rem;
          font-weight: 750;
        }

        .project-visual {
          min-height: clamp(300px, 34vw, 410px);
          border: 0.5px solid rgba(255, 255, 255, 0.72);
          border-radius: clamp(1.4rem, 3vw, 2.6rem);
          background: currentColor;
          color: inherit;
          overflow: hidden;
          position: relative;
        }

        .project-image-visual {
          background: #050505;
          padding: clamp(0.16rem, 0.45vw, 0.32rem);
        }

        .project-image-frame {
          position: relative;
          display: block;
          width: 100%;
          min-height: inherit;
        }

        .project-screenshot {
          object-fit: cover;
          object-position: top center;
          border-radius: clamp(0.9rem, 2vw, 1.8rem);
          filter: saturate(0.96) contrast(1.04);
        }

        .theme-dark .project-visual {
          background: #fff;
          color: #000;
          border-color: rgba(255, 255, 255, 0.64);
        }

        .theme-dark .project-image-visual {
          background: #fff;
        }

        .theme-light .project-visual {
          background: #000;
          color: #fff;
          border-color: rgba(0, 0, 0, 0.46);
        }

        .mock-browser,
        .queue-hero {
          position: absolute;
          inset: 1.25rem;
          border: 2px solid currentColor;
          border-radius: 1.5rem;
          padding: 1.25rem;
        }

        .mock-nav,
        .queue-nav {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid currentColor;
          font-size: 0.72rem;
          font-weight: 850;
          text-transform: uppercase;
          opacity: 0.7;
        }

        .mock-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 900;
          margin: 1.25rem 0 0.8rem;
        }

        .mock-search {
          height: 42px;
          border: 1px solid currentColor;
          border-radius: 999px;
          opacity: 0.55;
          margin-bottom: 1rem;
        }

        .mock-report-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr 1fr;
          gap: 0.85rem;
        }

        .mock-report-card,
        .mock-photo-card,
        .metric-card,
        .mock-chart,
        .queue-status,
        .queue-feature-grid div,
        .chain-card,
        .oracle-card {
          border: 1px solid currentColor;
          border-radius: 1rem;
          background: transparent;
        }

        .mock-report-card {
          min-height: 130px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 0.45rem;
        }

        .mock-report-card span {
          font-size: 0.62rem;
          font-weight: 900;
          text-transform: uppercase;
          opacity: 0.55;
        }

        .mock-photo-card {
          min-height: 130px;
          background:
            linear-gradient(135deg, transparent 0 20%, currentColor 20% 22%, transparent 22% 42%, currentColor 42% 44%, transparent 44%),
            repeating-linear-gradient(90deg, transparent 0 14px, currentColor 14px 16px);
          opacity: 0.5;
        }

        .mock-dashboard {
          position: absolute;
          left: 9%;
          right: 9%;
          bottom: 1.25rem;
          display: grid;
          grid-template-columns: 0.65fr 0.65fr 1fr;
          gap: 0.8rem;
        }

        .metric-card {
          min-height: 74px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 900;
        }

        .mock-chart {
          min-height: 74px;
          background: linear-gradient(to top, currentColor 0 54%, transparent 54%);
          opacity: 0.62;
        }

        .queue-copy {
          max-width: 58%;
          padding-top: clamp(2rem, 5vw, 4rem);
        }

        .queue-copy span {
          display: inline-flex;
          border: 1px solid currentColor;
          border-radius: 999px;
          padding: 0.35rem 0.75rem;
          font-size: 0.7rem;
          font-weight: 850;
          margin-bottom: 1rem;
        }

        .queue-copy strong {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 4.2rem);
          font-weight: 900;
          line-height: 0.95;
        }

        .queue-copy p {
          max-width: 360px;
          opacity: 0.62;
          line-height: 1.65;
        }

        .queue-status {
          position: absolute;
          right: 1.25rem;
          bottom: 1.25rem;
          width: min(300px, 42%);
          padding: 1rem;
        }

        .queue-status span {
          display: block;
          font-weight: 900;
          margin-bottom: 0.8rem;
        }

        .queue-status div {
          border-top: 1px solid currentColor;
          padding: 0.7rem 0;
          opacity: 0.72;
        }

        .queue-feature-grid {
          position: absolute;
          left: 1.25rem;
          right: 1.25rem;
          bottom: 1.25rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.8rem;
        }

        .queue-feature-grid div {
          min-height: 74px;
          display: flex;
          align-items: center;
          padding: 0 1rem;
          font-weight: 900;
        }

        .chain-card,
        .oracle-card {
          position: absolute;
          width: min(300px, 42%);
          padding: 1.4rem;
        }

        .chain-card {
          left: 1.5rem;
          top: 1.5rem;
        }

        .oracle-card {
          right: 1.5rem;
          bottom: 1.5rem;
        }

        .chain-card span,
        .oracle-card span {
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          opacity: 0.6;
        }

        .chain-card strong,
        .oracle-card strong {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 4.5rem);
          font-weight: 900;
          margin: 0.65rem 0;
        }

        .chain-card p,
        .oracle-card p {
          margin: 0;
          opacity: 0.64;
        }

        .chain-lines {
          position: absolute;
          inset: 0;
        }

        .chain-lines span {
          position: absolute;
          left: 20%;
          right: 20%;
          top: 50%;
          height: 2px;
          background: currentColor;
          transform-origin: center;
        }

        .chain-lines span:nth-child(1) {
          transform: rotate(18deg);
        }

        .chain-lines span:nth-child(2) {
          transform: rotate(-18deg);
        }

        .chain-lines span:nth-child(3) {
          transform: rotate(0deg);
          opacity: 0.35;
        }

        @media (max-width: 900px) {
          .projects-title {
            position: relative;
            top: auto;
          }

          .project-layer {
            position: relative;
            top: auto;
            min-height: auto;
            padding: clamp(1.35rem, 5vw, 2.4rem);
          }

          .project-header,
          .project-body {
            grid-template-columns: 1fr;
          }

          .project-header {
            align-items: start;
          }

          .project-button {
            justify-self: start;
          }

          .project-visual {
            min-height: clamp(280px, 56vw, 440px);
          }

          .queue-copy {
            max-width: 100%;
          }
        }

        @media (max-width: 620px) {
          #projects {
            padding: 6rem 1.1rem 7rem !important;
          }

          .projects-title {
            font-size: clamp(3.4rem, 18vw, 5.6rem);
            margin-bottom: 3.2rem;
          }

          .project-layer {
            border-radius: 1.45rem;
            box-shadow: 0 -10px 0 rgba(0, 0, 0, 1), 0 -11px 0 currentColor;
          }

          .project-layer::before,
          .project-layer::after {
            display: none;
          }

          .project-header {
            gap: 1.05rem;
            margin-bottom: 1.7rem;
          }

          .project-number {
            font-size: clamp(3.8rem, 24vw, 5.4rem);
          }

          .project-tag {
            font-size: 0.64rem;
            line-height: 1.5;
            letter-spacing: 0.16em;
          }

          .project-name {
            font-size: clamp(1.9rem, 12vw, 2.8rem);
          }

          .project-button {
            width: 100%;
            min-height: 48px;
          }

          .project-body {
            gap: 1.45rem;
          }

          .project-desc {
            font-size: 0.9rem;
            line-height: 1.72;
          }

          .project-visual {
            min-height: clamp(220px, 62vw, 340px);
            border-radius: 1.1rem;
          }

          .project-screenshot {
            border-radius: 0.9rem;
          }

          .project-chip {
            font-size: 0.66rem;
            padding: 0.34rem 0.62rem;
          }
        }
      `}</style>

      <div className="projects-shell">
        <h2 data-reveal className="projects-title">
          PROJECTS
        </h2>

        <div className="project-layer-stack">
          {RESUME.projects.map((project, index) => {
            const isLight = index % 2 === 1;

            return (
              <article
                key={project.name}
                data-reveal
                className={`project-layer ${isLight ? "theme-light" : "theme-dark"}`}
                style={{
                  zIndex: index + 2,
                  marginBottom: index === RESUME.projects.length - 1 ? 0 : "18vh",
                  transitionDelay: `${index * 120}ms`,
                }}
              >
                <div className="project-header">
                  <div className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <div className="project-tag">
                      {project.tag} · {project.period}
                    </div>
                    <h3 className="project-name">{project.name}</h3>
                  </div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-button"
                  >
                    View on GitHub
                  </a>
                </div>

                <div className="project-body">
                  <div>
                    <p className="project-desc">{project.desc}</p>
                    <div className="project-stack-list">
                      {project.stack.map((item) => (
                        <span key={item} className="project-chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ProjectVisual index={index} name={project.name} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
