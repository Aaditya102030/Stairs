"use client";

import { useEffect, useRef } from "react";

/* Horizontal row that auto-advances one card at a time on phones (<= 768px).
   Pauses while the visitor is touching/swiping, then resumes. Does nothing on desktop. */
export default function AutoScrollRow({
  className,
  children,
  interval = 3000,
}: {
  className?: string;
  children: React.ReactNode;
  interval?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mobile = window.matchMedia("(max-width: 768px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    const step = () => {
      if (paused || !mobile.matches || reduceMotion.matches) return;
      const cards = Array.from(el.children) as HTMLElement[];
      if (cards.length < 2) return;
      const rowLeft = el.getBoundingClientRect().left;
      const offset = (c: HTMLElement) => c.getBoundingClientRect().left - rowLeft;
      let current = 0;
      let best = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(offset(c) - 18);
        if (d < best) { best = d; current = i; }
      });
      const next = (current + 1) % cards.length;
      el.scrollTo({ left: Math.max(0, el.scrollLeft + offset(cards[next]) - 18), behavior: "smooth" });
    };

    const timer = setInterval(step, interval);
    const pause = () => {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };
    const resume = () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, 3500);
    };

    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("touchcancel", resume, { passive: true });

    return () => {
      clearInterval(timer);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("touchcancel", resume);
    };
  }, [interval]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
