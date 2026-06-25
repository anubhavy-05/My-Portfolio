"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

export const NAVBAR_HEIGHT = 64;

type NavItem = {
  label: string;
  href: Route;
};

// Yahan maine 'Contact' ko wapas add kar diya hai!
const navItems: NavItem[] = [
  { label: "Home", href: "/" as Route },
  { label: "About", href: "/about" as Route },
  { label: "Skills", href: "/skills" as Route },
  { label: "Certificates", href: "/certificates" as Route },
  { label: "Projects", href: "/projects" as Route },
  { label: "Blog", href: "/blog" as Route },
  { label: "Contact", href: "/contact" as Route }
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -12, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -8,
    height: 0,
    transition: { duration: 0.16, ease: [0.4, 0, 1, 1] }
  }
} as const;

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (href: Route) => pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-xl font-bold tracking-tight text-cyan-400 transition duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        >
          AY
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "relative text-sm font-medium transition duration-300",
                  active ? "text-cyan-400 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-cyan-400 shadow-[0_4px_10px_rgba(6,182,212,0.1)]" : "text-zinc-400 hover:text-cyan-300"
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Resume Button */}
        <div className="hidden md:flex items-center">
          <a
            href="/Anubhav_Yadav_Resume.pdf"
            download="Anubhav_Yadav_Resume.pdf"
            className="flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            <Download size={14} /> Resume
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 p-2 text-white transition duration-300 hover:border-cyan-400/50 hover:text-cyan-400 md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-zinc-800 bg-black/95 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={[
                      "rounded-2xl px-4 py-3 text-sm font-medium transition duration-300",
                      active ? "bg-cyan-900/30 text-cyan-400" : "text-zinc-400 hover:bg-zinc-900 hover:text-cyan-300"
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              {/* Mobile Resume Button */}
              <a
                href="/Anubhav_Yadav_Resume.pdf"
                download="Anubhav_Yadav_Resume.pdf"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-bold text-black transition-all hover:bg-cyan-400"
              >
                <Download size={16} /> Download Resume
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}