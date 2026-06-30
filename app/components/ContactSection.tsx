"use client";
import { RESUME } from "../data/resume";
import { useReveal } from "./RevealUtils";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: RESUME.email,
    href: `mailto:${RESUME.email}`,
    icon: "@",
  },
  {
    label: "WhatsApp",
    value: RESUME.contact,
    href: `https://wa.me/${RESUME.contact.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Manish, I saw your portfolio and would like to connect.")}`,
    icon: "WA",
  },
  {
    label: "LinkedIn",
    value: "manish-rajak-bb4aaa28b",
    href: RESUME.links.linkedin,
    icon: "in",
  },
  {
    label: "GitHub",
    value: "Manish6232",
    href: RESUME.links.github,
    icon: "GH",
  },
];

export default function ContactSection() {
  const ref = useReveal();

  return (
    <>
      <section
        id="contact"
        ref={ref}
        style={{
          padding: "8rem 3rem 9rem",
          background: "#050505",
          textAlign: "center",
        }}
        className="px-6 md:px-12"
      >
        <style>{`
          .contact-shell {
            max-width: 1280px;
            margin: 0 auto;
          }

          .contact-title {
            font-family: var(--font-display);
            font-size: clamp(4.5rem, 13.6vw, 12rem);
            font-weight: 900;
            line-height: 0.82;
            letter-spacing: 0;
            color: #aeb8c2;
            margin: 0 0 2.7rem;
            text-transform: uppercase;
          }

          .contact-subtitle {
            color: #858b93;
            font-size: clamp(0.82rem, 1.4vw, 1.18rem);
            font-weight: 800;
            letter-spacing: 0.22em;
            margin: 0 0 clamp(4.5rem, 8vw, 7rem);
            text-transform: uppercase;
          }

          .contact-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: clamp(1rem, 2.4vw, 1.8rem);
          }

          .contact-card {
            min-height: clamp(250px, 27vw, 320px);
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: clamp(1.45rem, 3vw, 2.25rem);
            border: 2px solid rgba(174,184,194,0.36);
            border-radius: clamp(1.45rem, 3vw, 2.65rem);
            background: #111116;
            color: #d7dde5;
            text-align: left;
            overflow: hidden;
            transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
          }

          .contact-card:hover {
            transform: translateY(-8px);
            border-color: #d7dde5;
            background: #171820;
          }

          .contact-card::after {
            content: "\\2197";
            position: absolute;
            right: clamp(1.45rem, 3vw, 2.1rem);
            top: clamp(1.35rem, 2.8vw, 2rem);
            color: currentColor;
            font-size: clamp(1.55rem, 2.4vw, 2rem);
            opacity: 0.72;
            transition: transform 0.25s ease, opacity 0.25s ease;
          }

          .contact-card:hover::after {
            transform: translate(4px, -4px);
            opacity: 1;
          }

          .contact-icon {
            width: 64px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid rgba(215,221,229,0.34);
            border-radius: 999px;
            color: #d7dde5;
            font-family: var(--font-display);
            font-size: 1.1rem;
            font-weight: 900;
          }

          .contact-copy {
            display: grid;
            gap: 1.3rem;
          }

          .contact-label {
            color: #858b93;
            font-size: clamp(0.74rem, 1vw, 0.9rem);
            font-weight: 800;
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }

          .contact-value {
            color: #d7dde5;
            font-family: var(--font-display);
            font-size: clamp(1.35rem, 2vw, 2rem);
            font-weight: 900;
            line-height: 1.35;
            overflow-wrap: anywhere;
          }

          @media (max-width: 1050px) {
            .contact-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 620px) {
            .contact-grid {
              grid-template-columns: 1fr;
            }

            .contact-card {
              min-height: 230px;
            }
          }
        `}</style>

        <div className="contact-shell">
          <h2 data-reveal className="contact-title">
            Get In Touch
          </h2>

          <p data-reveal className="contact-subtitle">
            Pick whichever channel suits you
          </p>

          <div data-reveal className="contact-grid">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="contact-card"
                aria-label={`Open ${link.label}`}
              >
                <span className="contact-icon">{link.icon}</span>
                <span className="contact-copy">
                  <span className="contact-label">{link.label}</span>
                  <span className="contact-value">{link.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer
        style={{
          padding: "1.6rem 3rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.77rem",
          color: "var(--muted)",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
        className="px-6 md:px-12"
      >
        <span>© 2025 Manish Rajak</span>
        <span>Built with Next.js · BIT Bengaluru</span>
      </footer>
    </>
  );
}
