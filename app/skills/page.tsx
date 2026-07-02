'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Database, Layout, Wrench, Trophy, Terminal, Cpu } from 'lucide-react'
import { useMode } from '@/context/ModeContext'

// Icons
import { 
  SiPython, SiOpencv, SiPandas, SiNumpy, SiNextdotjs, SiReact, 
  SiTypescript, SiTailwindcss, SiFramer, SiDjango, SiPostgresql, 
  SiHtml5, SiGit, SiGithub, SiGooglecolab, SiJupyter, SiVercel, 
  SiRender, SiVisualstudiocode, SiPostman 
} from "react-icons/si";
import { FaBrain, FaNetworkWired, FaTree, FaChartPie, FaDatabase, FaServer, FaHandSparkles } from "react-icons/fa6";

const skillCategories = [
  {
    id: 'ml',
    title: 'Data & Machine Learning',
    devTitle: 'sys.modules.data_science_ai',
    icon: Database,
    skills: [
      { name: 'Python', icon: SiPython },
      { name: 'Machine Learning', icon: FaBrain },
      { name: 'LSTM', icon: FaNetworkWired },
      { name: 'Random Forest', icon: FaTree },
      { name: 'Data Analytics', icon: FaChartPie },
      { name: 'OpenCV', icon: SiOpencv },
      { name: 'MediaPipe', icon: FaHandSparkles },
      { name: 'SQL', icon: FaDatabase },
      { name: 'Pandas', icon: SiPandas },
      { name: 'NumPy', icon: SiNumpy },
    ],
  },
  {
    id: 'web',
    title: 'Full Stack Development',
    devTitle: 'sys.modules.full_stack_web',
    icon: Layout,
    skills: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React.js', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Framer Motion', icon: SiFramer },
      { name: 'Django', icon: SiDjango },
      { name: 'REST APIs', icon: FaServer },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'HTML5/CSS3', icon: SiHtml5 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Cloud',
    devTitle: 'sys.modules.dev_ops_tools',
    icon: Wrench,
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Google Colab', icon: SiGooglecolab },
      { name: 'Jupyter', icon: SiJupyter },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Render', icon: SiRender },
      { name: 'VS Code', icon: SiVisualstudiocode },
      { name: 'Postman', icon: SiPostman },
    ],
  }
]

const achievements = [
  { name: 'SQL (Basic) Certified', issuer: 'HackerRank' },
  { name: 'Pull Shark Badge', issuer: 'GitHub' },
  { name: 'CodeRush 2.0', issuer: 'Hackathon' }
]

export default function SkillsPage() {
  const { mode } = useMode()
  const isDev = mode === 'developer'
  const maxSkills = Math.max(...skillCategories.map(cat => cat.skills.length))

  return (
    <main className={`min-h-screen relative overflow-hidden pb-24 transition-colors duration-700 ${isDev ? 'bg-zinc-950' : 'bg-black'}`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden transition-all duration-700">
        <AnimatePresence mode="wait">
          {isDev ? (
            <motion.div key="dev-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          ) : (
            <motion.div key="rec-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute right-[-10%] top-[10%] h-[40rem] w-[40rem] rounded-full bg-cyan-600/10 opacity-30 blur-[120px]" />
          )}
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-5xl px-6 sm:px-8 pt-24 z-10 relative flex flex-col gap-12">
        <header>
          <p className={`mb-3 text-xs font-mono uppercase tracking-[0.2em] ${isDev ? 'text-emerald-400' : 'text-cyan-400'}`}>
            {isDev ? "> system.diagnostics.run()" : "Technical Arsenal"}
          </p>
          <h1 className={`text-4xl md:text-5xl font-extrabold ${isDev ? 'font-mono text-zinc-100' : 'text-white'}`}>
            {isDev ? "skills_and_buffs.sys" : "Skills & Achievements"}
          </h1>
        </header>

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 grid gap-6 sm:grid-cols-2">
            {skillCategories.slice(0, 2).map((cat) => (
              <div key={cat.id} className={`rounded-2xl border p-6 ${isDev ? 'border-emerald-500/20 bg-emerald-950/10' : 'border-zinc-800 bg-zinc-900/50'}`}>
                <div className={`mb-4 inline-flex rounded-xl p-3 ${isDev ? 'bg-emerald-500/10 text-emerald-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                  {isDev ? <Terminal size={20} /> : <cat.icon size={20} />}
                </div>
                <h3 className={`font-bold ${isDev ? 'text-emerald-300 font-mono text-sm' : 'text-white text-lg'}`}>{isDev ? cat.devTitle : cat.title}</h3>
              </div>
            ))}
          </div>
          <div className={`flex flex-col rounded-2xl border p-6 ${isDev ? 'border-emerald-500/40 bg-emerald-900/10' : 'border-cyan-500/20 bg-cyan-900/5'}`}>
            <h3 className={`font-bold mb-4 ${isDev ? 'text-emerald-300 font-mono text-sm' : 'text-white text-lg'}`}>Recognitions</h3>
            {achievements.map((a, i) => (
              <div key={i} className={`p-3 mb-2 rounded-xl border ${isDev ? 'border-emerald-500/20 bg-emerald-950/30' : 'border-zinc-800 bg-zinc-900'}`}>
                <p className={`text-sm ${isDev ? 'text-emerald-100 font-mono' : 'text-white'}`}>{a.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-12">
          {skillCategories.map((cat) => (
            <div key={cat.id}>
              <h3 className={`text-xl font-bold mb-8 ${isDev ? 'text-emerald-300 font-mono' : 'text-white'}`}>
                {isDev ? cat.devTitle : cat.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {cat.skills.map((s, i) => (
                  <motion.div 
                    key={s.name}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${isDev ? 'border-emerald-500/30 bg-emerald-950/50 text-emerald-300' : 'border-zinc-800 bg-zinc-900'}`}
                  >
                    <s.icon className={`text-2xl ${isDev ? 'text-emerald-400' : 'text-cyan-400'}`} />
                    <span className="text-[10px] text-center">{isDev ? `[${s.name.toLowerCase()}]` : s.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bars */}
        <div className={`p-8 rounded-3xl border ${isDev ? 'border-emerald-500/20 bg-emerald-950/10' : 'border-zinc-800 bg-zinc-900/30'}`}>
          <h3 className={`mb-8 font-bold ${isDev ? 'text-emerald-500 font-mono' : 'text-white'}`}>Category Breakdown</h3>
          {skillCategories.map((cat) => (
            <div key={cat.id} className="mb-6">
              <div className="flex justify-between mb-2 text-xs">
                <span>{cat.title}</span>
                <span>{cat.skills.length} skills</span>
              </div>
              <div className={`h-2 w-full rounded-full ${isDev ? 'bg-emerald-950' : 'bg-zinc-800'}`}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(cat.skills.length / maxSkills) * 100}%` }} className={`h-full rounded-full ${isDev ? 'bg-emerald-400' : 'bg-cyan-500'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}