'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Code2, Briefcase, Send, Mail, ArrowRight, Lightbulb, Clipboard, Cpu, Eye, Beaker, BookOpen, Bot, Sparkles, ShieldCheck, MapPin } from 'lucide-react'
import { clsx } from 'clsx'
import ResumeSection from "@/components/ResumeSection" // Aapka Resume Section import

const workflowSteps = [
  { Icon: Lightbulb, label: 'Idea' },
  { Icon: Clipboard, label: 'Plan' },
  { Icon: Cpu, label: 'AI Help' },
  { Icon: Code2, label: 'Code' },
  { Icon: Eye, label: 'Review' },
  { Icon: Beaker, label: 'Test' },
  { Icon: BookOpen, label: 'Learn' },
]

const socials = [
  { icon: Mail, label: 'Mail', href: `mailto:your.email@gmail.com`, color: 'hover:border-red-500/50 hover:text-red-400' },
  { icon: Code2, label: 'GitHub', href: `https://github.com/anubhavy-05`, color: 'hover:border-white/30 hover:text-white' },
  { icon: Briefcase, label: 'LinkedIn', href: `https://linkedin.com/in/yourhandle`, color: 'hover:border-blue-500/50 hover:text-blue-400' },
  { icon: Send, label: 'Telegram', href: `https://t.me/yourtelegram`, color: 'hover:border-cyan-500/50 hover:text-cyan-400' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

type ContactForm = {
  name: string
  email: string
  message: string
  website: string
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
    website: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setSubmitError('Please fill out name, email, and message.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Unable to send message right now.')
      }

      setSubmitSuccess('Message sent successfully. I will get back to you soon.')
      setForm({ name: '', email: '', message: '', website: '' })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to send message right now.'
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative overflow-hidden bg-black px-6 py-20 sm:px-8 lg:px-12 font-sans min-h-screen">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[-12%] h-[22rem] w-[22rem] rounded-full bg-cyan-500/20 opacity-40 blur-[100px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto flex flex-col gap-10 pt-4 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <p className="text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase mb-2">
            Contact · Workflow · Identity
          </p>
          <h1 className="text-4xl font-bold text-white pb-2 md:text-5xl">Reach Out</h1>
        </motion.div>

        {/* Intro */}
        <motion.div variants={itemVariants} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            I&apos;m always open to interesting projects, collaborations, or just a good conversation about tech.
            Whether you have a project in mind or just want to connect — hit me up.
          </p>
        </motion.div>

        <motion.section
          variants={itemVariants}
          className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-black to-zinc-900/90 p-4 sm:p-6 shadow-2xl"
        >
          <div className="pointer-events-none absolute -top-10 -left-8 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-10 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative grid gap-5 lg:grid-cols-2">
            {/* Left: Info + Service Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <div>
                <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400">Ping · Build · Ship</p>
                <h2 className="text-2xl font-bold leading-tight text-white">
                  Tell me what you want to build.
                </h2>
                <p className="mt-3 max-w-xl text-xs leading-relaxed text-gray-400">
                  If you need a reliable backend, an AI-assisted tool, or a full-stack web app, send the brief here. I keep the conversation direct, technical, and focused on shipping something useful.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3 transition-colors hover:border-cyan-500/30">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-zinc-800 text-cyan-400">
                    <Code2 size={14} />
                  </div>
                  <p className="text-base font-semibold text-gray-100">Full Stack</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-500">End-to-end modern web applications.</p>
                </motion.div>

                <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3 transition-colors hover:border-cyan-500/30">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-zinc-800 text-cyan-400">
                    <Bot size={14} />
                  </div>
                  <p className="text-base font-semibold text-gray-100">Backend</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-500">APIs, databases, auth, and logic.</p>
                </motion.div>

                <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3 transition-colors hover:border-cyan-500/30">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-zinc-800 text-cyan-400">
                    <Sparkles size={14} />
                  </div>
                  <p className="text-base font-semibold text-gray-100">AI & Data</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-500">Practical ML models and analytics.</p>
                </motion.div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500">Response</p>
                  <p className="mt-1.5 text-sm font-semibold text-cyan-400">Usually within 24-48 hours</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500">Best fit</p>
                  <p className="mt-1.5 text-sm font-semibold text-cyan-400">Full-stack & ML systems</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500">Location</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-cyan-400">
                    <MapPin size={14} />
                    Lucknow
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-2xl border border-zinc-700/80 bg-zinc-900/80 p-6 backdrop-blur"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">Send a message</p>
                  <h3 className="mt-1 text-3xl font-semibold text-white">Contact form</h3>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-zinc-800 text-cyan-400">
                  <ShieldCheck size={16} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Your Name</span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      maxLength={80}
                      required
                      className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-2.5 text-sm text-gray-200 outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-500/70 focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="Full name"
                    />
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Email Address</span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      maxLength={120}
                      required
                      className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-2.5 text-sm text-gray-200 outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-500/70 focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="block space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Your Message</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={2500}
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-sm text-gray-200 outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-500/70 focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Describe the project, timeline, and what outcome you want."
                  />
                </label>

                <input name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-bold text-black transition-all hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send message'}
                  <ArrowRight size={16} />
                </motion.button>
                <div className="min-h-4 text-xs text-center">
                  {submitError ? <p className="text-red-400">{submitError}</p> : null}
                  {submitSuccess ? <p className="text-green-400">{submitSuccess}</p> : null}
                </div>
              </form>
            </motion.div>
          </div>
        </motion.section>

        {/* Workflow pipeline */}
        <motion.div variants={itemVariants} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 overflow-visible">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-5">My Workflow</p>
          <div className="md:hidden px-1 pb-2">
            {/* Mobile layout remains same, just color updated */}
            <div className="grid grid-cols-3 gap-y-8">
              {workflowSteps.map((step, i) => {
                const { Icon, label } = step
                const row = Math.floor(i / 3)
                const pos = i % 3
                const col = row % 2 === 0 ? pos + 1 : 3 - pos
                const hasNext = i < workflowSteps.length - 1
                const nextRow = hasNext ? Math.floor((i + 1) / 3) : row
                const nextPos = hasNext ? (i + 1) % 3 : pos
                const nextCol = hasNext ? (nextRow % 2 === 0 ? nextPos + 1 : 3 - nextPos) : col
                const sameRowConnection = hasNext && nextRow === row
                const downConnection = hasNext && nextRow > row

                return (
                  <div key={label} className="relative flex justify-center" style={{ gridColumnStart: col, gridRowStart: row + 1 }}>
                    <motion.div whileHover={{ scale: 1.08, y: -4 }} className="flex flex-col items-center gap-2 group">
                      <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:bg-zinc-700 transition-all">
                        <Icon size={17} />
                      </div>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                        {label}
                      </span>
                    </motion.div>
                    {sameRowConnection && <div className="absolute top-[6px] h-px bg-zinc-700" style={{ left: nextCol > col ? '50%' : 'auto', right: nextCol > col ? 'auto' : '50%', width: '150%' }} />}
                    {downConnection && <div className="absolute left-1/2 w-px -translate-x-1/2 bg-zinc-700" style={{ top: '62px', height: '28px' }} />}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desktop/Tablet horizontal pipeline */}
          <div className="hidden md:flex items-center gap-0 overflow-x-auto overflow-y-visible pb-4 pt-6 px-2 -mx-2" style={{ scrollbarWidth: 'thin' }}>
            {workflowSteps.map((step, i) => {
              const { Icon, label } = step
              return (
                <div key={label} className="flex items-center shrink-0">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, duration: 0.4 }} whileHover={{ scale: 1.1, y: -6 }} className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:bg-zinc-700 transition-all">
                      <Icon size={18} />
                    </div>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                      {label}
                    </span>
                  </motion.div>
                  {i < workflowSteps.length - 1 && <div className="w-6 h-px bg-zinc-700 mx-1 shrink-0" />}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Hit me up */}
        <motion.div variants={itemVariants} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-5">Hit Me Up</p>
          <div className="flex flex-wrap gap-3">
            {socials.map(({ icon: Icon, label, href, color }) => (
              <a key={label} href={href || '#'} target="_blank" rel="noopener noreferrer" className={clsx('flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-gray-300 text-sm font-medium transition-all duration-200', color)}>
                <Icon size={15} />
                {label}
                <ArrowRight size={12} className="opacity-50" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Aapka Resume Section */}
        <ResumeSection />

        {/* Footer */}
        <motion.footer variants={itemVariants} className="text-center py-6 mt-4">
          <p className="text-cyan-500/80 text-xs font-mono tracking-widest">
            © 2026 Anubhav Yadav
          </p>
        </motion.footer>
      </motion.div>
    </main>
  )
}