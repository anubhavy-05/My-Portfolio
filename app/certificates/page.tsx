'use client'

import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { ExternalLink, Award, X, Trophy, Calendar, Sparkles } from 'lucide-react'
import { clsx } from 'clsx'

// Aapke certificates ka data
const credentials = [
  {
    id: '1',
    title: 'CodeRush 2.0 Hackathon',
    issuer: 'BBDNIIT',
    date: 'April 2026',
    image: '/certificate-1.jpg',
    tags: ['Hackathon', 'Participation'],
    link: '#'
  },
  {
    id: '2',
    title: 'SQL (Basic)',
    issuer: 'HackerRank',
    date: 'April 2026',
    image: '/certificate-2.jpg',
    tags: ['Database', 'SQL'],
    link: '#'
  },
  {
    id: '3',
    title: "Tech Expo'26",
    issuer: 'BBD University',
    date: 'February 2026',
    image: '/certificate-3.jpg',
    tags: ['Exhibition', 'Project'],
    link: '#'
  },
  {
    id: '4',
    title: 'Python (Basic)',
    issuer: 'HackerRank',
    date: 'March 2026',
    image: '/certificate-4.jpg',
    tags: ['Python', 'Programming'],
    link: '#'
  },
  {
    id: '5',
    title: 'Python Assessment',
    issuer: 'LearnTube.ai',
    date: 'January 2026',
    image: '/certificate-5.jpg',
    tags: ['Python', 'Assessment'],
    link: '#'
  }
];

const allIssuers = ['All', ...Array.from(new Set(credentials.map((c) => c.issuer)))]

/* ─── Flip Card (Desktop) ─────────────────────────────────────── */
function FlipCard({ cred, index }: { cred: (typeof credentials)[0]; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const isLeft = index % 2 === 0
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80)
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={ref} className={clsx('flex items-center w-full gap-0 group', isLeft ? 'flex-row' : 'flex-row-reverse')}>
      <div className="w-[calc(50%-28px)] flex justify-end relative">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -60 : 60 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-[280px]"
          style={{ perspective: '1000px' }}
          onMouseEnter={() => setFlipped(true)}
          onMouseLeave={() => setFlipped(false)}
        >
          {/* Subtle connecting line glow on hover */}
          <div className={clsx("absolute top-1/2 -translate-y-1/2 h-[2px] w-12 bg-cyan-500/0 group-hover:bg-cyan-500/50 transition-all duration-500 z-0", isLeft ? "-right-12" : "-left-12")} />

          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: '190px' }}
            className="z-10 relative"
          >
            {/* FRONT */}
            <div
              style={{ backfaceVisibility: 'hidden' }}
              className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:border-cyan-500/50 transition-all duration-300"
            >
              {cred.image ? (
                <img src={cred.image} alt={cred.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-800/50">
                  <Award size={40} className="text-cyan-500/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent h-2/3" />
              <div className="absolute top-4 right-4 text-cyan-400 font-mono text-[10px] font-bold tracking-[0.2em] uppercase max-w-[80%] text-right drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {cred.title}
              </div>
            </div>

            {/* BACK */}
            <div
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black border border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between gap-2.5 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
            >
              <div>
                <p className="text-cyan-400/80 text-[10px] font-mono uppercase tracking-widest mb-2">{cred.issuer}</p>
                <p className="text-white text-sm font-bold leading-relaxed">{cred.title}</p>
                <p className="text-zinc-500 text-[10px] font-mono mt-1">{cred.date}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cred.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-[9px] font-mono bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 rounded-full uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              {cred.link ? (
                <a href={cred.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] text-black bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-lg transition-colors w-fit font-bold uppercase tracking-wider">
                  <ExternalLink size={12} /> View Doc
                </a>
              ) : (
                <p className="text-[10px] text-zinc-600 font-mono">Link Restricted</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Center node */}
      <div className="w-14 flex flex-col items-center shrink-0 relative z-20">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={clsx(
            'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500',
            flipped ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'bg-black border-zinc-700 group-hover:border-cyan-500/50'
          )}
        >
          <div className={clsx('w-2.5 h-2.5 rounded-full transition-colors duration-500', flipped ? 'bg-black' : 'bg-zinc-600 group-hover:bg-cyan-500/60')} />
        </motion.div>
        {flipped && (
          <motion.div
            animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-0 w-8 h-8 rounded-full border-2 border-cyan-400/50 pointer-events-none"
          />
        )}
      </div>

      <div className="w-[calc(50%-28px)]" />
    </div>
  )
}

/* ─── Mobile Card ───────────────────────────────────── */
function MobileCard({ cred, index }: { cred: (typeof credentials)[0]; index: number }) {
  // Mobile card logic remains the same as before, bas UI thoda polish kiya hai.
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setTimeout(() => setVisible(true), index * 80) }, { threshold: 0.25 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <>
      <div ref={ref} className="flex items-start gap-4">
        <div className="flex flex-col items-center pt-2 shrink-0 z-10 relative">
          <motion.div
            initial={{ scale: 0 }} animate={visible ? { scale: 1 } : { scale: 0 }} transition={{ duration: 0.3 }}
            className="w-5 h-5 rounded-full border-2 border-zinc-700 bg-black flex items-center justify-center p-1 relative z-10"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
          onClick={() => setOpen(true)}
          className="relative flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-cyan-500/40 transition-colors aspect-[7/4] shadow-md"
        >
          {cred.image ? (
             <img src={cred.image} alt={cred.title} className="w-full h-full object-cover opacity-90" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800"><Award size={24} className="text-cyan-500" /></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent h-1/2" />
          <div className="absolute top-3 right-3 text-cyan-400 font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-right max-w-[80%] leading-tight">
            {cred.title}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-40" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 p-4 flex items-center justify-center" onClick={() => setOpen(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 14 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }} onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm max-h-[88vh] overflow-auto bg-zinc-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10"
              >
                <div className="h-1 bg-gradient-to-r from-cyan-500/50 via-cyan-400 to-cyan-500/50" />
                <button onClick={() => setOpen(false)} className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white z-10"><X size={14} /></button>
                {cred.image && <div className="h-44 bg-zinc-800 overflow-hidden"><img src={cred.image} alt={cred.title} className="w-full h-full object-cover" /></div>}
                <div className="p-6 flex flex-col gap-4">
                  <div>
                    <p className="text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-1">{cred.issuer}</p>
                    <h3 className="text-white font-bold text-lg leading-tight">{cred.title}</h3>
                    <p className="text-zinc-500 text-xs mt-1 font-mono">{cred.date}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cred.tags.map((tag) => <span key={tag} className="px-2 py-1 text-[9px] font-mono bg-cyan-950/30 border border-zinc-700 text-cyan-400 rounded-full uppercase">{tag}</span>)}
                  </div>
                  {cred.link && (
                    <a href={cred.link} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl text-xs font-bold transition-colors w-full uppercase tracking-wider mt-2">
                      <ExternalLink size={14} /> View Certificate
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Page ──────────────────────────────────────────── */
export default function CredentialsPage() {
  const [activeIssuer, setActiveIssuer] = useState('All')
  
  // NEW: Scroll Animation ref
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })
  
  // Spring physics for smooth glowing scroll line
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const filtered = activeIssuer === 'All'
    ? credentials
    : credentials.filter((c) => c.issuer === activeIssuer)

  // Insights Data Calculation
  const totalCerts = credentials.length;
  const latestDate = credentials[0].date; // Assuming first is latest
  const techStackFocus = "Python & SQL"; // Derived from your data

  return (
    <main className="relative min-h-screen bg-black overflow-hidden font-sans pb-24">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[0%] top-[-10%] h-[40rem] w-[40rem] rounded-full bg-cyan-600/10 opacity-30 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-[20%] h-[30rem] w-[30rem] rounded-full bg-blue-600/10 opacity-20 blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto flex flex-col gap-10 pt-24 px-6 sm:px-8 relative z-10">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] text-zinc-300 font-mono uppercase tracking-widest">Verified Credentials</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight pb-4">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Achievements</span></h1>
        </motion.div>

        {/* NEW: Quick Insights Widget */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400"><Trophy size={18} /></div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Total Earned</p>
              <p className="text-xl font-bold text-white">{totalCerts} Certifications</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400"><Sparkles size={18} /></div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Core Focus</p>
              <p className="text-xl font-bold text-white">{techStackFocus}</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400"><Calendar size={18} /></div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Latest Award</p>
              <p className="text-xl font-bold text-white">{latestDate}</p>
            </div>
          </div>
        </motion.div>

        {/* Issuer filter */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="flex flex-wrap justify-center gap-2">
          {allIssuers.map((issuer) => (
            <button
              key={issuer}
              onClick={() => setActiveIssuer(issuer)}
              className={clsx(
                'px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300',
                activeIssuer === issuer
                  ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-400'
              )}
            >
              {issuer} {issuer !== 'All' && <span className="opacity-60 ml-1">({credentials.filter(c => c.issuer === issuer).length})</span>}
            </button>
          ))}
        </motion.div>

        {/* ── DESKTOP snake roadmap with NEW Glowing Scroll Spine ── */}
        <div className="hidden md:block relative mt-12" ref={timelineRef}>
          {/* Base Dotted Spine */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px]"
            style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #27272a 0px, #27272a 8px, transparent 8px, transparent 16px)' }}
          />
          
          {/* NEW: Animated Glowing Scroll Spine */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-cyan-500 origin-top shadow-[0_0_15px_#06b6d4]"
            style={{ scaleY }}
          />

          {/* Snake nodes */}
          <div className="flex flex-col gap-16 relative z-10">
            {filtered.map((cred, index) => (
              <FlipCard key={cred.id} cred={cred} index={index} />
            ))}
          </div>

          {/* End cap */}
          <div className="flex justify-center mt-12 relative z-10">
            <div className="w-6 h-6 rounded-full bg-black border-2 border-zinc-800 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
            </div>
          </div>
        </div>

        {/* ── MOBILE timeline ── */}
        <div className="md:hidden relative pl-2 mt-8 pb-12" ref={timelineRef}>
          {/* Base Dotted Spine */}
          <div
            className="absolute left-[22px] top-4 bottom-0 w-[2px]"
            style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #27272a 0px, #27272a 6px, transparent 6px, transparent 12px)' }}
          />
          
          {/* Animated Glowing Scroll Spine (Mobile) */}
          <motion.div
            className="absolute left-[22px] top-4 bottom-0 w-[2px] bg-cyan-500 origin-top shadow-[0_0_10px_#06b6d4]"
            style={{ scaleY }}
          />

          <div className="flex flex-col gap-8 pl-4 relative z-10">
            {filtered.map((cred, index) => (
              <MobileCard key={cred.id} cred={cred} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  )
}