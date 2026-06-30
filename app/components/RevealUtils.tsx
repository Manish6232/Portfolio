"use client";
import { useEffect, useRef, ReactNode } from "react";

type RevealOptions = {
  once?: boolean;
  reverse?: boolean;
  durationMs?: number;
};

export function useReveal(options: RevealOptions = {}) {
  const { once = true, reverse = false, durationMs = 750 } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    let lastScrollY = window.scrollY;

    targets.forEach((t) => {
      t.style.opacity = "0";
      t.style.transform = "translateY(28px)";
      t.style.transition = `opacity ${durationMs}ms cubic-bezier(0.16,1,0.3,1), transform ${durationMs}ms cubic-bezier(0.16,1,0.3,1)`;
    });

    const obs = new IntersectionObserver(
      (entries) => {
        const scrollingDown = window.scrollY >= lastScrollY;
        lastScrollY = window.scrollY;

        entries.forEach((e) => {
          const target = e.target as HTMLElement;

          if (e.isIntersecting) {
            target.style.opacity = "1";
            target.style.transform = "none";
            if (once) obs.unobserve(e.target);
          } else if (reverse) {
            target.style.opacity = "0";
            target.style.transform = scrollingDown ? "translateY(-34px)" : "translateY(34px)";
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [durationMs, once, reverse]);

  return ref;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      data-reveal
      style={{
        fontSize: "0.68rem", letterSpacing: "0.22em",
        textTransform: "uppercase", color: "var(--orange)",
        marginBottom: "1.5rem",
        display: "flex", alignItems: "center", gap: "0.8rem",
      }}
    >
      <span
        style={{
          display: "inline-block", width: "36px", height: "1px",
          background: "var(--orange)", flexShrink: 0,
        }}
      />
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      data-reveal
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
        fontWeight: 700, letterSpacing: "-0.035em",
        lineHeight: 1.05, marginBottom: "3.5rem",
      }}
    >
      {children}
    </h2>
  );
}
