"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  t: number;
  warm: boolean;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let animId: number;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    const makeParticle = (init: boolean): Particle => ({
      x: Math.random() * W,
      y: init ? Math.random() * H : H + 12,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -(Math.random() * 0.4 + 0.12),
      r: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.08,
      t: Math.random() * Math.PI * 2,
      warm: Math.random() > 0.38,
    });

    const COUNT = 90;
    const particles: Particle[] = Array.from({ length: COUNT }, () => makeParticle(true));

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.t += 0.008;
        p.x += p.vx + Math.sin(p.t) * 0.3;
        p.y += p.vy;
        // Soft mouse attraction
        const dx = (mouse.x - p.x) / W;
        const dy = (mouse.y - p.y) / H;
        p.x += dx * 0.6;
        p.y += dy * 0.3;
        if (p.y < -12) {
          const np = makeParticle(false);
          particles[i] = np;
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.warm
          ? `rgba(255,255,255,${p.alpha})`
          : `rgba(180,180,180,${p.alpha * 0.55})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none",
      }}
    />
  );
}
