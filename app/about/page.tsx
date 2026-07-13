"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { useMode } from '@/context/ModeContext'; // <-- Naya import

import { 
  FaRobot, 
  FaBrain, 
  FaServer, 
  FaDatabase, 
  FaGraduationCap, 
  FaGithub,
  FaLaptopCode, 
  FaNetworkWired 
} from "react-icons/fa";

import { Award, Briefcase, Terminal, Code } from 'lucide-react'; // <-- Timeline icons

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

// --- Timeline Data ---
const journeyData = [
  {
    id: 1,
    date: 'April 2026',
    title: 'HackerRank SQL & OpportuAI',
    description: 'Earned the SQL (Basic) certification from HackerRank. Actively collaborating on the career-focused AI copilot, OpportuAI, for hackathons.',
    icon: Award,
    hash: 'c4f9a12',
    tag: 'feat',
  },
  {
    id: 2,
    date: 'February 2026',
    title: 'TechExpo & Seminar Presentation',
    description: 'Represented the Agricultural Commodity Price Prediction project at TechExpo. Delivered a technical seminar on Real-Time Data Streaming & Analytics.',
    icon: Briefcase,
    hash: '8b2d4f1',
    tag: 'deploy',
  },
  {
    id: 3,
    date: 'Early 2026',
    title: 'Computer Vision: Virtual Mouse',
    description: 'Developed and documented a gesture-controlled Virtual Mouse project using computer vision and OpenCV.',
    icon: Code,
    hash: '3a9c7e4',
    tag: 'feat',
  },
  {
    id: 4,
    date: 'August 2025',
    title: 'Initiated Agri-Commodity Predictor',
    description: 'Started development on the core machine learning project for agricultural commodity price prediction using Random Forest and LSTM models.',
    icon: Terminal,
    hash: 'f1e5d8b',
    tag: 'init',
  }
];

export default function AboutPage() {
  const [githubRepos, setGithubRepos] = useState(0);
  
  // Naya State (Vibe Switcher)
  const { mode } = useMode();
  const isDev = mode === 'developer';

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
    <main className="min-h-screen bg-black px-6 py-20 sm:px-8 lg:px-12 font-sans relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto flex flex-col gap-12 relative z-10"
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
            I build systems that work — fast, reliable, and data-driven. Currently pursuing my B.Tech in Computer Science, i currently learning and exploring new technologies like system design and Full-Stack Development which i find fascinating and useful for my career. I specialize in Machine Learning, Data Analytics, and backend engineering. I focus on solving real-world problems through clean code rather than just decorating them.
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

        {/* 🚀 NAYA FEATURE YAHAN ADD HUA HAI 🚀 */}
        <motion.div variants={itemVariants} className="mt-10">
          <div className="flex items-center gap-2 mb-8">
            <p className="text-yellow-500 font-mono text-xs tracking-[0.2em] uppercase">
              {isDev ? "> git log --oneline" : "Timeline & Milestones"}
            </p>
          </div>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 transition-colors duration-500 ${isDev ? 'bg-yellow-900/50' : 'bg-zinc-800'}`} />

            <div className="flex flex-col gap-12">
              {journeyData.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div 
                    key={item.id}
                    className={`relative flex items-start md:items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col gap-6 md:gap-12`}
                  >
                    {/* Timeline Dot (Center) */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-black bg-zinc-900 z-10 shadow-xl">
                      <div className={`h-2 w-2 rounded-full ${isDev ? 'bg-yellow-400 shadow-[0_0_10px_#facc15]' : 'bg-zinc-400'}`} />
                    </div>

                    {/* Content Box */}
                    <div className={`ml-12 md:ml-0 w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                      <div className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
                        isDev 
                          ? 'border-yellow-500/30 bg-zinc-950/80 hover:border-yellow-400 font-mono' 
                          : 'border-zinc-800 bg-zinc-900/50 hover:border-yellow-500/50'
                      }`}>
                        
                        {isDev ? (
                          /* 🔥 DEVELOPER MODE: GIT COMMIT STYLE 🔥 */
                          <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-zinc-500">commit</span>
                              <span className="text-yellow-500 font-bold">{item.hash}</span>
                              {index === 0 && <span className="text-zinc-400 text-xs px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-800">(HEAD -{'>'} main)</span>}
                            </div>
                            <div className="text-zinc-400 flex items-center gap-2">
                              <span className="text-zinc-500">Author:</span> Anubhav Yadav
                            </div>
                            <div className="text-zinc-400 flex items-center gap-2 mb-2">
                              <span className="text-zinc-500">Date:</span> {item.date}
                            </div>
                            <div className="pl-4 border-l-2 border-yellow-500/30 text-zinc-300 mt-2">
                              <span className="text-yellow-400 font-bold">{item.tag}:</span> {item.description}
                            </div>
                          </div>
                        ) : (
                          /* 👔 RECRUITER MODE: CLEAN TIMELINE 👔 */
                          <>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 rounded-lg bg-zinc-800 text-yellow-500">
                                <item.icon size={18} />
                              </div>
                              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                                {item.date}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                              {item.description}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
        
      </motion.div>
    </main>
  );
}