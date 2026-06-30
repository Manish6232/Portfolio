"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { RESUME } from "../data/resume";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

export default function HeroSection() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const firstRef = useRef<HTMLSpanElement>(null);
  const lastRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLButtonElement>(null);
  const fgRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [soundHint, setSoundHint] = useState(true);

  useEffect(() => {
    // Staggered top-to-bottom landing animation without GSAP (avoids SSR issues)
    const queue: [React.RefObject<HTMLElement | null>, number][] = [
      [eyebrowRef, 200],
      [firstRef, 480],
      [lastRef, 620],
      [subRef, 820],
      [actionsRef, 1020],
      [scrollHintRef, 1400],
    ];
    queue.forEach(([ref, delay]) => {
      const el = ref.current;
      if (!el) return;
      el.style.opacity = "0";
      el.style.filter = "blur(8px)";
      el.style.transform = "translateY(-72px) scale(0.98)";
      el.style.transition =
        "opacity 0.95s cubic-bezier(0.16,1,0.3,1), filter 0.95s cubic-bezier(0.16,1,0.3,1), transform 0.95s cubic-bezier(0.17,0.84,0.24,1.18)";
      setTimeout(() => {
        if (!el) return;
        el.style.opacity = "1";
        el.style.filter = "blur(0)";
        el.style.transform = "translateY(0) scale(1)";
      }, delay);
    });

    const t = setTimeout(() => setSoundHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const toggleMute = () => {
    const v = fgRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "640px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--dark)",
      }}
    >
      {/* ── Blurred ambient background video ── */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 0, overflow: "hidden",
        }}
      >
        <video
          autoPlay muted loop playsInline
          src="/hero.mp4"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            filter: "grayscale(1) blur(32px) brightness(0.15) contrast(1.2)",
            transform: "scale(1.15)",
          }}
        />
      </div>

      {/* ── Foreground talking-head video (right half) ── */}
      <div
        style={{
          position: "absolute",
          right: 0, top: 0, bottom: 0,
          width: "55%",
          zIndex: 1,
          overflow: "hidden",
        }}
        className="hidden md:block"
      >
        <video
          ref={fgRef}
          autoPlay muted loop playsInline
          src="/hero.mp4"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            filter: "grayscale(1) contrast(1.08)",
          }}
        />
        {/* Left fade into content */}
        <div
          style={{
            position: "absolute", inset: 0,
            background:
              "linear-gradient(to right, var(--dark) 0%, rgba(8,8,8,0.75) 30%, rgba(8,8,8,0.1) 70%, rgba(8,8,8,0) 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
            background: "linear-gradient(to top, var(--dark) 0%, transparent 100%)",
          }}
        />
        {/* Top fade */}
        <div
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "18%",
            background: "linear-gradient(to bottom, var(--dark) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Cinematic diagonal overlay ── */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 2,
          background:
            "linear-gradient(115deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.7) 45%, rgba(8,8,8,0.05) 100%)",
        }}
      />

      {/* ── Particles ── */}
      <ParticleCanvas />

      {/* ── White accent glow top-left ── */}
      <div
        style={{
          position: "absolute", top: "-20%", left: "-10%",
          width: "50vw", height: "60vh",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)",
          zIndex: 2, pointerEvents: "none",
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative", zIndex: 4,
          padding: "0 3rem", maxWidth: "720px",
          marginTop: "4rem",
        }}
        className="px-6 md:px-12"
      >
        {/* Eyebrow */}
        <p
          ref={eyebrowRef as React.RefObject<HTMLParagraphElement>}
          style={{
            fontSize: "0.68rem", letterSpacing: "0.22em",
            textTransform: "uppercase", color: "var(--orange)",
            marginBottom: "1.75rem",
            display: "flex", alignItems: "center", gap: "0.8rem",
          }}
        >
          <span
            style={{
              display: "inline-block", width: "36px", height: "1px",
              background: "var(--orange)",
            }}
          />
          {RESUME.tagline}
        </p>

        {/* Name */}
        <h1
          className="hero-title-buffer"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 10vw, 9rem)",
            fontWeight: 700,
            lineHeight: 0.88,
            letterSpacing: "-0.05em",
          }}
        >
          <span
            ref={firstRef as React.RefObject<HTMLSpanElement>}
            className="hero-buffer-line"
            style={{ display: "block", color: "var(--text)" }}
          >
            {RESUME.name.first}
          </span>
          <span
            ref={lastRef as React.RefObject<HTMLSpanElement>}
            className="hero-buffer-line hero-buffer-line-accent"
            style={{ display: "block", color: "var(--orange)" }}
          >
            {RESUME.name.last}
          </span>
        </h1>

        {/* Sub */}
        <p
          ref={subRef as React.RefObject<HTMLParagraphElement>}
          style={{
            marginTop: "2rem", fontSize: "1rem",
            color: "var(--muted)", lineHeight: 1.8,
            maxWidth: "420px",
          }}
        >
          Building production-grade systems — real-time queues, AI-powered civic tools, and blockchain platforms. B.Tech @ BIT Bengaluru.
        </p>

        {/* CTAs */}
        <div
          ref={actionsRef as React.RefObject<HTMLDivElement>}
          style={{
            marginTop: "2.75rem",
            display: "flex", gap: "1rem", flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "0.85rem 2.25rem",
              background: "var(--orange)", color: "#000",
              border: "none", borderRadius: "4px",
              fontWeight: 700, fontSize: "0.85rem",
              letterSpacing: "0.04em", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--orange-light)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--orange)";
              e.currentTarget.style.transform = "none";
            }}
          >
            View My Work
          </button>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "0.85rem 2.25rem",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "var(--text)",
              borderRadius: "4px",
              fontSize: "0.85rem",
              letterSpacing: "0.04em",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "none";
            }}
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* ── Sound button ── */}
      <div
        style={{
          position: "absolute", bottom: "2.5rem", right: "2.5rem",
          zIndex: 5, display: "flex", alignItems: "center", gap: "0.75rem",
        }}
        className="hidden md:flex"
      >
        {soundHint && (
          <span
            style={{
              fontSize: "0.62rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
              animation: "fadeBlink 2s ease-in-out infinite",
            }}
          >
            Tap for sound
          </span>
        )}
        <button
          onClick={toggleMute}
          title={muted ? "Unmute" : "Mute"}
          style={{
            width: "44px", height: "44px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            color: "var(--text)",
            fontSize: "1rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        ref={scrollHintRef as React.RefObject<HTMLButtonElement>}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          position: "absolute", bottom: "2.5rem", left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5, background: "none", border: "none",
          cursor: "pointer", color: "var(--muted)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "0.5rem",
          fontSize: "0.62rem", letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        <style>{`
          @keyframes scrollPulse {
            0%,100%{opacity:0.2;transform:scaleY(0.45)}
            50%{opacity:1;transform:scaleY(1)}
          }
          @keyframes fadeBlink {
            0%,100%{opacity:0.2}50%{opacity:0.8}
          }
          @keyframes textBuffer {
            0%{transform:translateY(0) skewX(0deg);filter:blur(0);text-shadow:none}
            16%{transform:translateY(-4px) skewX(-2deg);filter:blur(1px);text-shadow:2px 0 rgba(255,255,255,0.65),-2px 0 rgba(150,150,150,0.45)}
            32%{transform:translateY(3px) skewX(2deg);filter:blur(0);text-shadow:-3px 0 rgba(255,255,255,0.5),2px 0 rgba(150,150,150,0.35)}
            48%{transform:translateY(-2px) skewX(-1deg);filter:blur(1px);text-shadow:3px 0 rgba(255,255,255,0.42),-1px 0 rgba(150,150,150,0.3)}
            64%{transform:translateY(2px) skewX(1deg);filter:blur(0);text-shadow:-2px 0 rgba(255,255,255,0.36),2px 0 rgba(150,150,150,0.26)}
            100%{transform:translateY(0) skewX(0deg);filter:blur(0);text-shadow:none}
          }
          .hero-title-buffer:hover .hero-buffer-line {
            animation: textBuffer 0.78s steps(2, end);
          }
          .hero-title-buffer:hover .hero-buffer-line-accent {
            animation-delay: 0.26s;
          }
          @media (prefers-reduced-motion: reduce) {
            .hero-title-buffer:hover .hero-buffer-line {
              animation: none;
            }
          }
        `}</style>
        <span
          style={{
            display: "block", width: "1px", height: "54px",
            background: "linear-gradient(to bottom, var(--orange), transparent)",
            animation: "scrollPulse 2.2s ease-in-out infinite",
            transformOrigin: "top",
          }}
        />
        <span>Scroll</span>
      </button>
    </section>
  );
}
