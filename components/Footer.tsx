"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

const navItems: Array<{ label: string; href: Route }> = [
  { label: "Home", href: "/#home" as Route },
  { label: "About", href: "/about" as Route },
  { label: "Skills", href: "/skills" as Route },
  { label: "Certificates", href: "/certificates" as Route },
  { label: "Contact", href: "/contact" as Route }
];

const socialItems = [
  { label: "GitHub", href: "#", Icon: FaGithub },
  { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
  { label: "Twitter", href: "#", Icon: FaTwitter }
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
      className="w-full border-t border-border bg-surface"
    >
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="font-mono text-3xl font-semibold tracking-tight text-accent">
              AY
            </div>
            <p className="text-sm text-muted">Full Stack Developer</p>
          </motion.div>

          <motion.nav variants={itemVariants} aria-label="Footer navigation" className="flex flex-col gap-3 md:items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-muted transition duration-300 hover:text-accent"
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
                aria-label={label}
                className="text-muted transition duration-300 hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted">
          © 2025 Anubhav Yadav — Built with Next.js
        </div>
      </div>
    </motion.footer>
  );
}