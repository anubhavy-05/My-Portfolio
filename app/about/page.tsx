"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

import { 
  FaRobot, 
  FaBrain, 
  FaServer, 
  FaDatabase, 
  FaGraduationCap, 
  FaGithub,
  FaLaptopCode,    // <-- Full Stack ke liye naya icon
  FaNetworkWired   // <-- System Design ke liye naya icon
} from "react-icons/fa";

// --- Stat Counter Component ---
function StatCounter({ value, label, prefix = "", suffix = "" }: { value: number; label: string, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (value === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1500;
          const step = Math.max(1, Math.ceil(value / (duration / 16)));
          
          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:border-yellow-500/30">
      <span className="text-3xl font-bold text-yellow-500">
        {prefix}{count}{suffix}
      </span>
      <span className="text-xs text-gray-500 text-center uppercase tracking-wider">{label}</span>
    </div>
  );
}

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Updated Services Data ---
const services = [
  {
    title: "Full Stack Development",
    description: "Building end-to-end web applications with seamless user interfaces, robust backend logic, and smooth API integrations.",
    Icon: FaLaptopCode
  },
  {
    title: "System Designing",
    description: "Architecting scalable, highly available, and distributed systems tailored for high performance and future growth.",
    Icon: FaNetworkWired
  },
  {
    title: "Machine Learning & AI",
    description: "Building predictive models, analyzing data trends, and integrating intelligent AI workflows into practical applications.",
    Icon: FaBrain
  },
  {
    title: "Backend Engineering",
    description: "Designing robust APIs, managing databases, and orchestrating scalable server-side architecture.",
    Icon: FaServer
  },
  {
    title: "Data Analytics",
    description: "Transforming raw data into actionable insights through structured pipelines, cleaning, and visualization.",
    Icon: FaDatabase
  },
  {
    title: "Process Automation",
    description: "Developing bots and scripts to streamline repetitive tasks and optimize operational efficiency.",
    Icon: FaRobot
  }
];

const educationData = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    school: "Babu Banarasi Das University (BBDU), Lucknow",
    year: "Present",
    highlight: true
  },
  {
    degree: "12th Grade (Senior Secondary)",
    school: "Children Senior Secondary School, Azamgarh",
    year: "2022",
    highlight: false
  },
  {
    degree: "10th Grade (High School)",
    school: "Children Senior Secondary School, Azamgarh",
    year: "2020",
    highlight: false
  }
];

export default function AboutPage() {
  const [githubRepos, setGithubRepos] = useState(0);

  // GitHub Repos Fetcher
  useEffect(() => {
    fetch("https://api.github.com/users/anubhavy-05")
      .then((res) => res.json())
      .then((data) => {
        if (data.public_repos) {
          setGithubRepos(data.public_repos);
        }
      })
      .catch((err) => console.error("Error fetching GitHub data:", err));
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-20 sm:px-8 lg:px-12 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto flex flex-col gap-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center sm:text-left">
          <p className="text-yellow-500 font-mono text-xs tracking-[0.2em] uppercase mb-2">Who I Am</p>
          <h1 className="text-4xl font-bold text-white pb-2 md:text-5xl">About Me</h1>
          <div className="mt-4 sm:hidden flex justify-center">
            <span className="h-1 w-12 rounded-full bg-yellow-500" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div variants={itemVariants} className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col gap-4 shadow-xl">
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            I build systems that work — fast, reliable, and data-driven. Currently pursuing my B.Tech in Computer Science,i currently learning and exploring new technologies like system design and Full-Stack Development which i find fascinating and useful for my career. I specialize in Machine Learning, Data Analytics, and backend engineering. I focus on solving real-world problems through clean code rather than just decorating them.
          </p>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            I'm obsessed with efficiency , building logics and data. Whether it's training predictive models for agricultural data, engineering scalable backend architecture, or integrating smart AI workflows, I care about performance, logic, and long-term maintainability. If something can be optimized or rebuilt smarter, I'll do it.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <motion.div variants={itemVariants}>
          <p className="text-yellow-500 font-mono text-xs tracking-[0.2em] uppercase mb-6">Education Journey</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {educationData.map((edu, idx) => (
              <div 
                key={idx} 
                className={clsx(
                  "relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-4",
                  edu.highlight 
                    ? "bg-zinc-900 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]" 
                    : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-600"
                )}
              >
                <div>
                  <FaGraduationCap className={clsx("w-6 h-6 mb-3", edu.highlight ? "text-yellow-500" : "text-gray-500")} />
                  <h3 className="text-white font-semibold text-sm mb-1">{edu.degree}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{edu.school}</p>
                </div>
                <div className="text-yellow-500/80 font-mono text-[10px] uppercase tracking-wider bg-yellow-500/10 self-start px-2 py-1 rounded-md">
                  {edu.year}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What I'm Doing */}
        <motion.div variants={itemVariants}>
          <p className="text-yellow-500 font-mono text-xs tracking-[0.2em] uppercase mb-6">What I Focus On</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex gap-4 hover:border-yellow-500/40 transition-colors group">
                <div className="text-yellow-500 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <service.Icon size={24} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1.5">{service.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stat Counters */}
        <motion.div variants={itemVariants}>
          <p className="text-yellow-500 font-mono text-xs tracking-[0.2em] uppercase mb-6">By The Numbers</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCounter value={10} label="Projects Built" suffix="+" />
            <StatCounter value={githubRepos} label="GitHub Repos" />
            <StatCounter value={15} label="Technologies" suffix="+" />
            <StatCounter value={100} label="Commits/Month" suffix="+" />
          </div>
        </motion.div>

        {/* GitHub Contributions Graph */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-6">
            <FaGithub className="w-4 h-4 text-yellow-500" />
            <p className="text-yellow-500 font-mono text-xs tracking-[0.2em] uppercase">Contributions</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 overflow-x-auto shadow-lg hover:border-yellow-500/30 transition-colors duration-300">
            <div className="min-w-[700px]">
              <img
                src={`https://ghchart.rshah.org/eab308/anubhavy-05`}
                alt="anubhavy-05 GitHub contributions"
                className="w-full h-auto"
                style={{ filter: 'brightness(1.1) contrast(1.1)' }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}