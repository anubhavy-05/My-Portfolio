"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

const stats: Stat[] = [
  { label: "Projects Built", value: 10, suffix: "+" },
  { label: "GitHub Repos", value: 20, suffix: "+" },
  { label: "Certifications", value: 8, suffix: "+" },
  { label: "Technologies", value: 15, suffix: "+" }
];

function useCountUp(end: number, duration: number, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    let animationFrame = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextCount = Math.round(eased * end);

      setCount(nextCount);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [duration, end, inView]);

  return count;
}

function StatItem({ label, value, suffix, inView }: Stat & { inView: boolean }) {
  const count = useCountUp(value, 2000, inView);

  return (
    <article className="flex flex-col items-center justify-center px-6 py-8 text-center md:px-8 lg:px-10">
      <div className="font-mono text-5xl font-bold leading-none tracking-tight text-accent">
        {count}
        {suffix ?? ""}
      </div>
      <p className="mt-3 font-mono text-sm uppercase tracking-wider text-muted">{label}</p>
    </article>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full border-y border-border bg-surface py-12"
      aria-label="Portfolio statistics"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={[
              "relative",
              index < stats.length - 1 ? "md:after:absolute md:after:inset-y-6 md:after:right-0 md:after:w-px md:after:bg-border" : ""
            ].join(" ")}
          >
            <StatItem {...stat} inView={isInView} />
          </div>
        ))}
      </div>
    </motion.section>
  );
}