'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Code2, Briefcase, Send, Mail, ArrowRight, Lightbulb, Clipboard, Cpu, Eye, Beaker, BookOpen, Bot, Sparkles, ShieldCheck, MapPin, Clock } from 'lucide-react'
import { clsx } from 'clsx'
import ResumeSection from "@/components/ResumeSection" 

const workflowSteps = [
  { Icon: Lightbulb, label: 'Ideate' },
  { Icon: Clipboard, label: 'Architect' },
  { Icon: Cpu, label: 'AI Integrate' },
  { Icon: Code2, label: 'Develop' },
  { Icon: Eye, label: 'Review' },
  { Icon: Beaker, label: 'Test' },
  { Icon: BookOpen, label: 'Deploy' },
]

const socials = [
  { icon: Mail, label: 'Email', href: `mailto:abhi8400673@gmail.com`, color: 'hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400' },
  { icon: Code2, label: 'GitHub', href: `https://github.com/anubhavy-05`, color: 'hover:border-white/30 hover:bg-white/10 hover:text-white' },
  { icon: Briefcase, label: 'LinkedIn', href: `https://www.linkedin.com/in/anubhav-yadav-93bb83268`, color: 'hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400' },
  { icon: Send, label: 'Telegram', href: `https://t.me/yourtelegram`, color: 'hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400' },
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
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '', website: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [currentTime, setCurrentTime] = useState<string>('')

  // Live Clock Widget Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute:'2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <main className="relative min-h-screen bg-black px-6 py-24 sm:px-8 lg:px-12 font-sans overflow-hidden">
      {/* Deep Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto flex flex-col gap-12 relative z-10"
      >
        {/* --- Top Header Section with Live Status --- */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">Let's Connect.</h1>
            <p className="text-zinc-400 max-w-lg text-sm leading-relaxed">
              Have a project idea, need a scalable backend, or want to integrate AI? Drop a message. I focus on writing clean code and building efficient systems.
            </p>
          </div>
          
          {/* New Feature: Live Status Badges */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-full w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-zinc-300">Available for Opportunities</span>
            </div>
            <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-full w-fit">
              <Clock size={14} className="text-cyan-400" />
              <span className="text-xs font-mono text-zinc-300">{currentTime || 'Loading...'} (IST)</span>
            </div>
          </div>
        </motion.div>

        {/* --- Middle Section: Form (Left) & Bento Grid (Right) --- */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
          
          {/* Left: Contact Form (Redesigned Glassmorphism) */}
          <motion.div variants={itemVariants} className="relative p-1 rounded-3xl bg-gradient-to-b from-zinc-800 to-transparent">
            <div className="bg-black/80 backdrop-blur-xl h-full rounded-[23px] p-6 sm:p-8 border border-zinc-800/50">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="text-cyan-400 h-6 w-6" />
                <h3 className="text-xl font-semibold text-white">Direct Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Name</label>
                    <input
                      name="name" value={form.name} onChange={handleChange} required
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white transition-all focus:border-cyan-500 focus:bg-zinc-900 focus:ring-1 focus:ring-cyan-500 outline-none"
                      placeholder="Anubhav Yadav"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Email</label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange} required
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white transition-all focus:border-cyan-500 focus:bg-zinc-900 focus:ring-1 focus:ring-cyan-500 outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Project Details</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={5}
                    className="w-full resize-none bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white transition-all focus:border-cyan-500 focus:bg-zinc-900 focus:ring-1 focus:ring-cyan-500 outline-none"
                    placeholder="Tell me about your tech stack, timeline, or idea..."
                  />
                </div>

                <input name="website" value={form.website} onChange={handleChange} className="hidden" aria-hidden="true" />

                <button
                  type="submit" disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-3 bg-cyan-500 text-black font-bold text-sm px-6 py-4 rounded-xl transition-all hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Transmitting...' : 'Send Message'}
                  <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>

                <div className="text-center h-4 text-xs font-medium">
                  {submitError && <span className="text-red-400">{submitError}</span>}
                  {submitSuccess && <span className="text-green-400">{submitSuccess}</span>}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Right: Modern Bento Grid */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 hover:border-cyan-500/30 transition-colors">
              <div className="h-10 w-10 bg-cyan-500/10 text-cyan-400 flex items-center justify-center rounded-xl mb-4">
                <Code2 size={20} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Full Stack Engineering</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">Building scalable web apps from robust backend architectures to seamless frontend experiences using modern frameworks.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 hover:border-cyan-500/30 transition-colors">
                <Bot className="text-cyan-400 mb-3" size={24} />
                <h4 className="font-semibold text-white text-sm mb-1">Backend & APIs</h4>
                <p className="text-xs text-zinc-500">Database & Logic</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 hover:border-cyan-500/30 transition-colors">
                <Sparkles className="text-cyan-400 mb-3" size={24} />
                <h4 className="font-semibold text-white text-sm mb-1">Data & AI</h4>
                <p className="text-xs text-zinc-500">ML Integrations</p>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center text-cyan-400 border border-zinc-700">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">Base Location</p>
                <p className="text-white font-medium">Azamgarh / Lucknow, India</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- New Linear Workflow Pipeline --- */}
        <motion.div variants={itemVariants} className="mt-8">
          <p className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-6 text-center">Development Process</p>
          <div className="relative border border-zinc-800 bg-zinc-900/30 rounded-3xl p-8 overflow-hidden">
            {/* Background Line */}
            <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-zinc-800 -translate-y-1/2 hidden md:block" />
            
            <div className="relative z-10 flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-6">
              {workflowSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 group">
                  <div className="h-12 w-12 rounded-2xl bg-black border border-zinc-700 flex items-center justify-center text-zinc-400 transition-all duration-300 group-hover:bg-cyan-500/10 group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                    <step.Icon size={18} />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 group-hover:text-cyan-400 transition-colors">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* --- Floating Social Pills --- */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 py-8">
          {socials.map((social) => (
            <a 
              key={social.label} 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className={clsx(
                "flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-800 bg-zinc-900/50 text-sm font-medium text-zinc-300 transition-all duration-300",
                social.color
              )}
            >
              <social.icon size={16} />
              {social.label}
            </a>
          ))}
        </motion.div>

        {/* Resume Section Integration */}
        <div className="mt-8">
          <ResumeSection />
        </div>

        {/* Footer */}
        <motion.footer variants={itemVariants} className="text-center pt-8 pb-4 border-t border-zinc-800/50">
          <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} Anubhav Yadav 
          </p>
        </motion.footer>

      </motion.div>
    </main>
  )
}