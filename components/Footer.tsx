"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";

const navItems: Array<{ label: string; href: Route }> = [
  { label: "Home", href: "/#home" as Route },
  { label: "About", href: "/about" as Route },
  { label: "Skills", href: "/skills" as Route },
  { label: "Certificates", href: "/certificates" as Route },
  { label: "Projects", href: "/projects" as Route }
];

const socialItems = [
  { label: "GitHub", href: "https://github.com/anubhavy-05", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anubhav-yadav-93bb83268", Icon: FaLinkedinIn },
  { label: "Gmail", href: "mailto:abhi8400673@gmail.com", Icon: FaEnvelope }
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
} as const;

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="w-full border-t border-zinc-800 bg-black"
    >
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          
          <motion.div variants={itemVariants} className="space-y-4">
            <div>
              <div className="font-mono text-3xl font-bold tracking-tight text-cyan-400">
                AY
              </div>
              <p className="text-sm text-zinc-400 mt-1">Full Stack Developer</p>
            </div>
            
            {/* Yahan update kiya hai: download hataya, target blank lagaya */}
            <a
              href="/Anubhav_Yadav_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-cyan-400 transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              View Resume
            </a>
          </motion.div>

          <motion.nav variants={itemVariants} aria-label="Footer navigation" className="flex flex-col gap-3 md:items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-zinc-400 transition duration-300 hover:text-cyan-400"
              >
                {item.label}
              </Link>
            ))}
          </motion.nav>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 md:justify-end">
            {socialItems.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full bg-zinc-900 border border-zinc-800 p-2.5 text-zinc-400 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </div>

        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-500 font-mono">
          © {new Date().getFullYear()} Anubhav Yadav — Built with Next.js
        </div>
      </div>
    </motion.footer>
  );
}