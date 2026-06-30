"use client";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = ["About", "Experience", "Projects", "Achievements", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
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
          padding: scrolled ? "0.9rem 2.5rem" : "1.3rem 2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(8,8,8,0.9)" : "rgba(8,8,8,0.2)",
          backdropFilter: "blur(24px)",
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.06)" : "transparent"}`,
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
                    color: isActive ? "var(--orange)" : "var(--muted)",
                    background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--muted)";
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
          href="mailto:Manishsingh626332@gmail.com"
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
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--orange)";
          }}
          className="hidden md:inline-flex"
        >
          EMAIL ME
        </a>

        {/* Hamburger */}
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
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 190,
            background: "rgba(8,8,8,0.98)",
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
            href="mailto:Manishsingh626332@gmail.com"
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
