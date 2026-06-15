"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import StatsCounter from "@/components/StatsCounter";

const heroWords = ["Full Stack Developer", "System Designer", "Problem Solver"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
} as const;

function useCyclingTypewriter(lines: string[]) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex];
    const timer = window.setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setCharIndex((value) => value + 1);
        return;
      }

      if (!deleting && charIndex === current.length) {
        setDeleting(true);
        return;
      }

      if (deleting && charIndex > 0) {
        setCharIndex((value) => value - 1);
        return;
      }

      setDeleting(false);
      setLineIndex((value) => (value + 1) % lines.length);
    }, deleting ? 42 : 64);

    return () => window.clearTimeout(timer);
  }, [charIndex, deleting, lineIndex, lines]);

  return `${lines[lineIndex].slice(0, charIndex)}${charIndex === lines[lineIndex].length ? "" : "|"}`;
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const typewriterText = useCyclingTypewriter(heroWords);

  const containerVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.12,
          delayChildren: prefersReducedMotion ? 0 : 0.08
        }
      }
    }),
    [prefersReducedMotion]
  );

  const transition = useMemo(
    () => ({ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] as const }),
    [prefersReducedMotion]
  );

  return (
    <main id="home" className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-rose-glow absolute right-[-12%] top-[-10%] h-[28rem] w-[28rem] rounded-full opacity-50 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
        >
          <div className="max-w-3xl">
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="mb-5 font-mono text-sm uppercase tracking-[0.35em] text-accent"
            >
              &lt; Hello World /&gt;
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={transition}
              className="text-5xl font-bold tracking-tight text-white md:text-7xl"
            >
              Anubhav Yadav
            </motion.h1>

            <motion.div
              variants={fadeUp}
              transition={transition}
              className="mt-6 text-2xl font-medium text-accent-soft md:text-3xl"
            >
              {typewriterText}
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={transition}
              className="mt-5 max-w-xl text-base leading-7 text-muted md:text-lg"
            >
              Building modern web experiences, one component at a time.
            </motion.p>

            <motion.div variants={fadeUp} transition={transition} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(225,29,72,0.35)]"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-accent px-6 py-3 text-sm font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white hover:shadow-[0_0_28px_rgba(225,29,72,0.18)]"
              >
                Contact Me
              </a>
            </motion.div>

            <motion.div variants={fadeUp} transition={transition} className="mt-8 flex items-center gap-5">
              {[
                { href: "#", label: "GitHub", Icon: FaGithub },
                { href: "#", label: "LinkedIn", Icon: FaLinkedinIn },
                { href: "#", label: "Twitter", Icon: FaTwitter }
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-muted transition duration-300 hover:text-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} transition={transition} className="flex justify-center lg:justify-end">
            <div className="rose-avatar-glow relative flex h-72 w-72 items-center justify-center rounded-full border border-accent/40 bg-surface/70 p-4 sm:h-80 sm:w-80 lg:h-[24rem] lg:w-[24rem]">
              <div className="rose-ring absolute inset-0 rounded-full border border-accent/50" />
              <div className="absolute inset-3 rounded-full border border-border" />
              <div className="relative h-[92%] w-[92%] overflow-hidden rounded-full border border-border bg-background">
                <Image
                  src="/avatar.jpg"
                  alt="Anubhav Yadav avatar"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <StatsCounter />
    </main>
  );
}