"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  GraduationCap,
  Laptop,
  MapPin,
  Paintbrush2,
  ServerCog,
  Sparkles,
  Zap
} from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
} as const;

const quickFacts = [
  {
    title: "B.Tech CSE Student",
    Icon: GraduationCap,
    copy: "Focused on computer science fundamentals and modern product engineering."
  },
  {
    title: "Based in India",
    Icon: MapPin,
    copy: "Building for teams and clients who value polished execution and clear communication."
  },
  {
    title: "Open to Internships",
    Icon: BriefcaseBusiness,
    copy: "Looking for opportunities to contribute, learn fast, and ship production-ready work."
  },
  {
    title: "Love for Clean Code",
    Icon: Sparkles,
    copy: "Careful about structure, readability, and maintainable systems that scale well."
  }
];

const specialties = [
  {
    title: "Frontend Development",
    Icon: Laptop,
    copy: "Crafting responsive interfaces with strong hierarchy, smooth motion, and careful attention to detail."
  },
  {
    title: "Backend Development",
    Icon: ServerCog,
    copy: "Designing dependable server logic, data flows, and APIs that can grow with the product."
  },
  {
    title: "UI/UX Design",
    Icon: Paintbrush2,
    copy: "Shaping clear visual systems and user flows that feel premium, simple, and intuitive."
  }
];

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="relative overflow-hidden bg-background px-6 py-20 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-rose-glow absolute right-[-10%] top-[-12%] h-[22rem] w-[22rem] rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.section
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={sectionVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            About Me
          </motion.h1>
          <motion.div variants={itemVariants} className="mt-4 flex justify-center">
            <span className="h-1 w-12 rounded-full bg-accent" aria-hidden="true" />
          </motion.div>
        </motion.section>

        <motion.section
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
          className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
        >
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <div className="rose-avatar-glow w-full max-w-sm rounded-[2rem] border border-accent/40 bg-surface p-4 shadow-rose -rotate-2 transition duration-300 hover:rotate-0">
              <div className="overflow-hidden rounded-[1.5rem] border border-border bg-background">
                <Image
                  src="/avatar.jpg"
                  alt="Anubhav Yadav portrait"
                  width={720}
                  height={900}
                  className="h-full w-full object-cover"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-semibold text-white md:text-4xl">Full Stack Developer building calm, scalable products.</h2>
            <div className="space-y-4 text-base leading-8 text-muted md:text-lg">
              <p>
                I am a Full Stack Developer who enjoys turning ideas into clean, practical web experiences. I like working across the stack so I can shape both the interface and the systems behind it.
              </p>
              <p>
                My focus is on building interfaces that feel polished, fast, and easy to use while keeping the codebase organized and maintainable. I care about small details that make a product feel intentional.
              </p>
              <p>
                On the backend, I enjoy designing scalable APIs, reliable data flows, and solutions that support growth without adding unnecessary complexity.
              </p>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
          className="mt-20"
        >
          <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-white md:text-3xl">
            Quick Facts
          </motion.h2>

          <motion.div variants={itemVariants} className="mt-8 grid gap-4 sm:grid-cols-2">
            {quickFacts.map((fact) => (
              <div
                key={fact.title}
                className="group rounded-3xl border border-border bg-surface p-5 transition duration-300 hover:shadow-rose"
              >
                <fact.Icon className="h-6 w-6 text-accent transition duration-300 group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-semibold text-white">{fact.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{fact.copy}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
          className="mt-20"
        >
          <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-white md:text-3xl">
            What I Do
          </motion.h2>

          <motion.div variants={itemVariants} className="mt-8 grid gap-4 lg:grid-cols-3">
            {specialties.map((specialty) => (
              <div
                key={specialty.title}
                className="rounded-3xl border border-border border-l-2 border-l-accent bg-surface p-6 transition duration-300 hover:shadow-rose"
              >
                <specialty.Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-xl font-semibold text-white">{specialty.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-muted">{specialty.copy}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}