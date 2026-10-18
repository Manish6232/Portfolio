"use client";
import { useEffect, useRef, useState } from "react";
import { RESUME } from "../data/resume";

const NAV_ITEMS = ["About", "Experience", "Projects", "Achievements", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  // Keep the server and first browser render identical; restore a saved choice after hydration.
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Highlight active section
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.toLowerCase())).filter(Boolean);
      let current = "";
      sections.forEach((s) => {
        if (s && window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (window.localStorage.getItem("portfolio-theme") === "light") {
        setTheme("light");
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 200,
          height: "var(--nav-height)",
          padding: "0 2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--nav-surface)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(18px)",
          borderBottom: "1px solid var(--border)",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "var(--font-display)",
            fontWeight: 700, fontSize: "1.05rem",
            letterSpacing: "-0.04em", color: "var(--text)",
          }}
        >
          M<span style={{ color: "var(--orange)" }}>.</span>Rajak
        </button>

        {/* Desktop nav */}
        <ul
          style={{
            display: "flex", gap: "0.25rem", listStyle: "none",
          }}
          className="hidden md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.toLowerCase();
            return (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item)}
                  style={{
                    border: "none",
                    cursor: "pointer", padding: "0.45rem 0.85rem",
                    borderRadius: "6px",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--orange)" : "var(--nav-link)",
                    background: isActive ? "var(--nav-active)" : "transparent",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--orange)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--nav-link)";
                  }}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <a
          href={`mailto:${RESUME.email}`}
          style={{
            fontSize: "0.72rem", fontWeight: 600,
            padding: "0.5rem 1.3rem",
            border: "1px solid var(--orange)",
            borderRadius: "4px",
            color: "var(--orange)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--orange)";
            e.currentTarget.style.color = "var(--ink)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--orange)";
          }}
          className="hidden md:inline-flex"
        >
          EMAIL ME
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className="theme-icon">🌙</span>
            <span className="theme-icon theme-sun">☀️</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: "1px solid var(--border)",
              borderRadius: "6px", padding: "0.4rem 0.6rem",
              cursor: "pointer", color: "var(--text)", fontSize: "1.1rem",
            }}
            className="flex md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 190,
            background: "var(--dark)",
            backdropFilter: "blur(20px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "2rem",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontSize: "2rem", fontWeight: 700,
                color: "var(--text)", letterSpacing: "-0.03em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
            >
              {item}
            </button>
          ))}
          <a
            href={`mailto:${RESUME.email}`}
            style={{
              marginTop: "1rem", padding: "0.75rem 2.5rem",
              border: "1px solid var(--orange)", borderRadius: "4px",
              color: "var(--orange)", fontSize: "0.85rem",
              fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
            }}
          >
            Hire Me
          </a>
        </div>
      )}
      <span ref={indicatorRef} />
    </>
  );
}
