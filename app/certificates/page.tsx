"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Award } from "lucide-react";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
};

const certificates: Certificate[] = [
  {
    title: "Full Stack Web Development",
    issuer: "Coursera",
    date: "Jan 2024"
  },
  {
    title: "React & Next.js Masterclass",
    issuer: "Udemy",
    date: "Mar 2024"
  },
  {
    title: "Data Structures & Algorithms",
    issuer: "Google",
    date: "Jun 2024"
  },
  {
    title: "UI/UX Design Fundamentals",
    issuer: "Coursera",
    date: "Sep 2024"
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
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

export default function CertificatesPage() {
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
          variants={containerVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Certificates &amp; Credentials
          </motion.h1>
          <motion.div variants={itemVariants} className="mt-4 flex justify-center">
            <span className="h-1 w-12 rounded-full bg-accent" aria-hidden="true" />
          </motion.div>
        </motion.section>

        <motion.section
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {certificates.map((certificate) => (
            <motion.article
              key={certificate.title}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition duration-300 hover:shadow-rose"
            >
              <div className="mb-5 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-[0_0_20px_rgba(225,29,72,0.22)]">
                {certificate.issuer}
              </div>

              <div className="flex items-start gap-3">
                <Award className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <h2 className="text-xl font-semibold text-white">{certificate.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {certificate.issuer} · {certificate.date}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex-1" />

              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-full border border-accent px-4 py-2 text-sm font-medium text-accent transition duration-300 hover:bg-accent hover:text-white"
              >
                View Certificate
              </Link>
            </motion.article>
          ))}
        </motion.section>
      </div>
    </main>
  );
}