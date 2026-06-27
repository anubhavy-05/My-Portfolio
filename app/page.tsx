"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaTerminal } from "react-icons/fa6"; // Naye icons
import StatsCounter from "@/components/StatsCounter";
import { useMode } from "@/context/ModeContext"; // Vibe Switcher ka brain import kiya

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

  // Normal text return karte hain (cursor hum UI mein handle karenge)
  return lines[lineIndex].slice(0, charIndex); 
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const rawTypewriterText = useCyclingTypewriter(heroWords);
  
  // Naya State: Mode Check
  const { mode } = useMode();
  const isDev = mode === "developer";

  const containerVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12, delayChildren: prefersReducedMotion ? 0 : 0.08 }
      }
    }),
    [prefersReducedMotion]
  );

  const transition = useMemo(
    () => ({ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] as const }),
    [prefersReducedMotion]
  );

  return (
    <main id="home" className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${isDev ? 'bg-zinc-950' : 'bg-black'}`}>
      
      {/* ─── DYNAMIC BACKGROUND ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden transition-all duration-700">
        <AnimatePresence mode="wait">
          {isDev ? (
            <motion.div 
              key="dev-bg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
              // Developer Mode: Tech Blueprint Grid
              className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d41a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d41a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
            />
          ) : (
            <motion.div 
              key="recruiter-bg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
              // Recruiter Mode: Premium Cyan Glow
              className="absolute right-[-12%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 opacity-50 blur-[100px]" 
            />
          )}
        </AnimatePresence>
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 sm:px-8 lg:px-12 z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          
          {/* ─── DYNAMIC TEXT CONTENT ─── */}
          <div className="max-w-3xl min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isDev ? (
                // 🔥 DEVELOPER MODE HERO 🔥
                <motion.div key="dev-hero" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={transition} className="font-mono">
                  {/* Fake Terminal Header */}
                  <div className="flex items-center gap-2 mb-6 text-[10px] sm:text-xs text-zinc-500 bg-zinc-900 w-fit px-3 py-1.5 rounded-lg border border-zinc-800 shadow-xl">
                    <FaTerminal className="text-cyan-500" /> <span className="uppercase tracking-widest">anubhav@local-machine</span>
                  </div>
                  
                  {/* Terminal Command */}
                  <div className="text-zinc-400 text-xs sm:text-sm mb-4">
                    <span className="text-emerald-400">user</span>:<span className="text-blue-400">~/portfolio</span>$ <span className="text-cyan-300">cat</span> profile.js
                  </div>
                  
                  {/* JS Object Animation */}
                  <div className="text-zinc-300 text-2xl sm:text-4xl md:text-5xl font-bold leading-snug tracking-tight">
                    <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> <span className="text-cyan-400">=</span> {"{"} <br/>
                    <span className="pl-6 md:pl-10 text-xl sm:text-3xl md:text-4xl">name: <span className="text-emerald-400">"Anubhav Yadav"</span>,</span> <br/>
                    <span className="pl-6 md:pl-10 text-xl sm:text-3xl md:text-4xl">role: <span className="text-amber-400">"{rawTypewriterText}"</span><span className="animate-pulse text-cyan-400">|</span></span> <br/>
                    {"}"};
                  </div>
                </motion.div>
              ) : (
                // 👔 RECRUITER MODE HERO (Original) 👔
                <motion.div key="rec-hero" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={transition}>
                  <p className="mb-5 font-mono text-sm uppercase tracking-[0.35em] text-cyan-400">
                    &lt; Hello World /&gt;
                  </p>
                  <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl">
                    Anubhav Yadav
                  </h1>
                  <div className="mt-6 text-2xl font-medium text-cyan-300 md:text-3xl">
                    {rawTypewriterText}<span className="animate-pulse">|</span>
                  </div>
                  <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400 md:text-lg">
                    Building modern web experiences, one component at a time.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons (Same for both modes) */}
            <motion.div variants={fadeUp} transition={transition} className="mt-10 flex flex-wrap gap-4">
              <a href="#work" className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-black transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                View My Work
              </a>
              <a href="mailto:abhi8400673@gmail.com" className="inline-flex items-center justify-center rounded-xl border border-cyan-500/50 px-6 py-3 text-sm font-bold text-cyan-400 transition duration-300 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                Contact Me
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={fadeUp} transition={transition} className="mt-8 flex items-center gap-5">
              {[
                { href: "https://github.com/anubhavy-05", label: "GitHub", Icon: FaGithub },
                { href: "https://www.linkedin.com/in/anubhav-yadav-93bb83268", label: "LinkedIn", Icon: FaLinkedinIn },
                { href: "mailto:abhi8400673@gmail.com", label: "Email", Icon: FaEnvelope }
              ].map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-zinc-500 transition duration-300 hover:text-cyan-400 hover:scale-110">
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ─── DYNAMIC AVATAR ─── */}
          <motion.div variants={fadeUp} transition={transition} className="flex justify-center lg:justify-end">
            <div className={`relative flex h-72 w-72 items-center justify-center rounded-full border transition-all duration-700 p-4 sm:h-80 sm:w-80 lg:h-[24rem] lg:w-[24rem] ${isDev ? 'border-emerald-500/40 bg-emerald-900/10 shadow-[0_0_40px_rgba(16,185,129,0.15)]' : 'border-cyan-500/40 bg-cyan-900/10 shadow-[0_0_40px_rgba(6,182,212,0.15)]'}`}>
              <div className={`absolute inset-0 rounded-full border transition-all duration-700 ${isDev ? 'border-emerald-500/50 border-dashed animate-[spin_15s_linear_infinite]' : 'border-cyan-500/50'}`} />
              <div className="absolute inset-3 rounded-full border border-zinc-800" />
              <div className="relative h-[92%] w-[92%] overflow-hidden rounded-full border border-zinc-800 bg-black">
                <Image src="/avatar.jpg" alt="Anubhav Yadav avatar" fill priority className={`object-cover object-center transition-all duration-700 ${isDev ? 'grayscale contrast-125 opacity-80 mix-blend-luminosity' : 'grayscale-0 opacity-100'}`} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <StatsCounter />
    </main>
  );
}