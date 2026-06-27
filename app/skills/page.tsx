'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, Layout, Wrench, Trophy, Terminal, Code2, Cpu } from 'lucide-react'
import { useMode } from '@/context/ModeContext'

// ─── SKILLS DATA ───
const skillCategories = [
  {
    id: 'ml',
    title: 'Data & Machine Learning',
    devTitle: 'sys.modules.data_science_ai',
    icon: Database,
    skills: ['Python', 'Machine Learning', 'LSTM Networks', 'Random Forest', 'Data Analytics', 'OpenCV', 'MediaPipe', 'SQL', 'Pandas', 'NumPy'],
    description: 'Building predictive models, real-time analytics, and computer vision applications.'
  },
  {
    id: 'web',
    title: 'Full Stack Development',
    devTitle: 'sys.modules.full_stack_web',
    icon: Layout,
    skills: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Django', 'REST APIs', 'PostgreSQL', 'HTML5/CSS3'],
    description: 'Crafting responsive, scalable, and modern web architectures from frontend to backend.'
  },
  {
    id: 'tools',
    title: 'Tools & Cloud',
    devTitle: 'sys.modules.dev_ops_tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Google Colab', 'Jupyter', 'Vercel', 'Render', 'VS Code', 'Postman'],
    description: 'Version control, collaborative development, and cloud infrastructure deployment.'
  }
]

const achievements = [
  { name: 'SQL (Basic) Certified', issuer: 'HackerRank', type: 'cert' },
  { name: 'Pull Shark Badge', issuer: 'GitHub', type: 'badge' },
  { name: 'CodeRush 2.0', issuer: 'Hackathon', type: 'event' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export default function SkillsPage() {
  const { mode } = useMode()
  const isDev = mode === 'developer'

  return (
    <main className={`min-h-screen relative overflow-hidden pb-24 transition-colors duration-700 ${isDev ? 'bg-zinc-950' : 'bg-black'}`}>
      
      {/* ─── DYNAMIC BACKGROUND ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden transition-all duration-700">
        <AnimatePresence mode="wait">
          {isDev ? (
            <motion.div 
              key="dev-bg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
              className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)]" 
            />
          ) : (
            <motion.div 
              key="rec-bg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
              className="absolute right-[-10%] top-[10%] h-[40rem] w-[40rem] rounded-full bg-cyan-600/10 opacity-30 blur-[120px]" 
            />
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        initial="hidden" animate="visible" variants={containerVariants} 
        className="mx-auto max-w-5xl px-6 sm:px-8 pt-24 z-10 relative flex flex-col gap-12"
      >
        
        {/* ─── HEADER ─── */}
        <motion.div variants={itemVariants} className="max-w-2xl">
          <p className={`mb-3 text-xs font-mono uppercase tracking-[0.2em] transition-colors ${isDev ? 'text-emerald-400' : 'text-cyan-400'}`}>
            {isDev ? "> system.diagnostics.run()" : "Technical Arsenal"}
          </p>
          <h1 className={`pb-4 font-extrabold transition-colors ${isDev ? 'text-4xl md:text-5xl font-mono text-zinc-100' : 'text-4xl md:text-5xl text-white'}`}>
            {isDev ? "skills_and_buffs.sys" : "Skills & Achievements"}
          </h1>
          <p className={`text-base leading-relaxed transition-colors ${isDev ? 'text-emerald-500/80 font-mono text-sm' : 'text-zinc-400'}`}>
            {isDev 
              ? "[LOADING MODULES] Injecting dependencies for Data Analytics, Machine Learning, and Full Stack Architecture..." 
              : "A comprehensive overview of my technical proficiencies, specialized in data analytics and full-stack engineering."}
          </p>
        </motion.div>

        {/* ─── TOP SECTION: BENTO GRID & ACHIEVEMENTS ─── */}
        <div className="grid gap-6 md:grid-cols-3">
          
          <div className="md:col-span-2 grid gap-6 sm:grid-cols-2">
            {skillCategories.slice(0, 2).map((category) => (
              <motion.div 
                key={category.id} variants={itemVariants}
                className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
                  isDev 
                    ? 'border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                }`}
              >
                <div className={`mb-4 inline-flex rounded-xl p-3 ${isDev ? 'bg-emerald-500/10 text-emerald-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                  {isDev ? <Terminal size={20} /> : <category.icon size={20} />}
                </div>
                
                <h3 className={`mb-2 font-bold ${isDev ? 'text-emerald-300 font-mono text-sm' : 'text-white text-lg'}`}>
                  {isDev ? category.devTitle : category.title}
                </h3>
                
                {!isDev && (
                  <p className="text-sm text-zinc-400">{category.description}</p>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants}
            className={`flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
              isDev 
                ? 'border-emerald-500/40 bg-emerald-900/10 shadow-[inset_0_0_30px_rgba(16,185,129,0.05)]' 
                : 'border-cyan-500/20 bg-cyan-900/5'
            }`}
          >
            <div className="mb-6 flex items-center gap-3">
              <Trophy className={isDev ? 'text-emerald-400' : 'text-cyan-400'} size={24} />
              <h3 className={`font-bold ${isDev ? 'text-emerald-300 font-mono uppercase tracking-widest text-sm' : 'text-white text-xl'}`}>
                {isDev ? "Active Buffs" : "Recognitions"}
              </h3>
            </div>

            <div className="flex flex-col gap-4 flex-grow">
              {achievements.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`group relative flex items-center justify-between rounded-xl border p-4 transition-all ${
                    isDev 
                      ? 'border-emerald-500/20 bg-emerald-950/30 hover:border-emerald-400' 
                      : 'border-zinc-800 bg-zinc-900 hover:border-cyan-500/40'
                  }`}
                >
                  <div>
                    <h4 className={`text-sm font-bold ${isDev ? 'text-emerald-100 font-mono' : 'text-white'}`}>
                      {item.name}
                    </h4>
                    <p className={`text-xs mt-1 ${isDev ? 'text-emerald-500/70 font-mono' : 'text-zinc-500'}`}>
                      {isDev ? `issuer_node: ${item.issuer}` : item.issuer}
                    </p>
                  </div>
                  {isDev && (
                    <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── SEPARATOR ─── */}
        <motion.div variants={itemVariants} className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-4" />

        {/* ─── BOTTOM SECTION: DETAILED CATEGORY BREAKDOWN (ANIMATED) ─── */}
        <motion.div variants={itemVariants} className="space-y-12">
          
          <div className="text-center mb-10">
            <h2 className={`text-2xl font-bold ${isDev ? 'text-emerald-400 font-mono' : 'text-white'}`}>
              {isDev ? "--- Execution Log: Detailed Breakdown ---" : "Detailed Skill Matrix"}
            </h2>
          </div>

          {skillCategories.map((category, catIndex) => (
            <div key={category.id} className="relative">
              
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${isDev ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-900 text-cyan-400 border border-zinc-800'}`}>
                  {isDev ? <Cpu size={18} /> : <category.icon size={18} />}
                </div>
                <h3 className={`text-xl font-bold ${isDev ? 'text-emerald-300 font-mono' : 'text-white'}`}>
                  {isDev ? category.devTitle : category.title}
                </h3>
              </div>

              {/* Floating Motion Skills Container */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pl-2 sm:pl-12">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.05, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    // Yahan se continuous floating (motion) effect aata hai
                    animate={{ y: [0, -4, 0] }}
                    // @ts-ignore (Framer motion type quirk for infinite repeat)
                    transition={{
                      y: { repeat: Infinity, duration: 2.5 + (index % 3), ease: "easeInOut" }
                    }}
                    className={`px-4 py-2.5 rounded-xl border flex items-center justify-center transition-colors cursor-default ${
                      isDev 
                        ? 'border-emerald-500/30 bg-emerald-950/50 text-emerald-300 font-mono hover:bg-emerald-500 hover:text-black hover:border-emerald-400' 
                        : 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-400'
                    }`}
                  >
                    {isDev ? `[${skill}]` : skill}
                  </motion.div>
                ))}
              </div>

            </div>
          ))}
        </motion.div>

      </motion.div>
    </main>
  )
}