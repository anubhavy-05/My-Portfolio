"use client";

import { motion } from "framer-motion";

const stats = [
  { id: 1, value: "10+", label: "PROJECTS BUILT" },
  { id: 2, value: "20+", label: "GITHUB REPOS" },
  { id: 3, value: "8+", label: "CERTIFICATIONS" },
  { id: 4, value: "15+", label: "TECHNOLOGIES" },
];

export default function StatsCounter() {
  return (
    <section className="border-t border-zinc-800/50 bg-black py-16 relative overflow-hidden">
      {/* Subtle Cyan background glow for the stats section */}
      <div className="absolute inset-0 bg-cyan-900/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:divide-x md:divide-zinc-800/60">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center group"
            >
              {/* Cyan Text with glowing drop-shadow on hover */}
              <span className="text-5xl font-extrabold text-cyan-500 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                {stat.value}
              </span>
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-500 group-hover:text-cyan-400 transition-colors duration-300">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}