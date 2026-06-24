"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import StatsCounter from "@/components/StatsCounter"; // Make sure this path is correct

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
      {/* Background Glow Updated to Cyan/Sky Blue */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-12%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 opacity-50 blur-[100px]" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
        >
          <div className="max-w-3xl">
            {/* Tagline Color Updated */}
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="mb-5 font-mono text-sm uppercase tracking-[0.35em] text-cyan-400"
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

            {/* Typewriter Text Color Updated */}
            <motion.div
              variants={fadeUp}
              transition={transition}
              className="mt-6 text-2xl font-medium text-cyan-300 md:text-3xl"
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
              {/* Primary Button Updated */}
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(6,182,212,0.4)]"
              >
                View My Work
              </a>
              {/* Secondary Button Updated */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-cyan-500 px-6 py-3 text-sm font-semibold text-cyan-500 transition duration-300 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_28px_rgba(6,182,212,0.25)]"
              >
                Contact Me
              </a>
            </motion.div>

            <motion.div variants={fadeUp} transition={transition} className="mt-8 flex items-center gap-5">
              {[
                { href: "https://github.com/anubhavy-05", label: "GitHub", Icon: FaGithub },
                { href: "https://www.linkedin.com/in/anubhav-yadav-93bb83268", label: "LinkedIn", Icon: FaLinkedinIn },
                { href: "#", label: "Twitter", Icon: FaTwitter }
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-muted transition duration-300 hover:text-cyan-400"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} transition={transition} className="flex justify-center lg:justify-end">
            {/* Avatar Glow and Rings Updated to Cyan */}
            <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-cyan-500/40 bg-surface/70 p-4 shadow-[0_0_40px_rgba(6,182,212,0.15)] sm:h-80 sm:w-80 lg:h-[24rem] lg:w-[24rem]">
              <div className="absolute inset-0 rounded-full border border-cyan-500/50" />
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