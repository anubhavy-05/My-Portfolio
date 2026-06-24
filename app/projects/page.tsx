'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Code, ExternalLink } from 'lucide-react'
import { clsx } from 'clsx'
import { projects, Project } from '@/data/projects'

const MotionDiv = motion.div

const filters = ['All', 'live', 'wip', 'archived']

const statusConfig = {
  live: { label: 'Live', color: 'bg-emerald-500' },
  wip: { label: 'WIP', color: 'bg-yellow-500' },
  archived: { label: 'Archived', color: 'bg-gray-500' },
}

type ProjectCardProps = {
  project: Project
  index: number
  mobile?: boolean
}

function ProjectCard({ project, index, mobile = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const [flipped, setFlipped] = useState(false)

  const isLarge = project.size === 'large'
  const isWide = project.size === 'wide'
  const isMedium = project.size === 'medium'
  const baseHeight = isLarge ? '380px' : isWide ? '220px' : isMedium ? '220px' : '160px'
  const mobileHeight = isLarge ? '320px' : isWide ? '280px' : isMedium ? '280px' : '240px'

  return (
    <MotionDiv
      layout={!mobile}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setFlipped((value) => !value)}
      className={clsx(
        'group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 cursor-pointer transition-all duration-300',
        hovered && 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
      )}
      style={{
        minHeight: mobile ? mobileHeight : baseHeight,
        gridColumn: !mobile && (isLarge || isWide) ? 'span 2' : 'span 1',
        gridRow: !mobile && isLarge ? 'span 2' : 'span 1',
        perspective: '1200px',
      }}
    >
      <MotionDiv
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: mobile ? mobileHeight : baseHeight }}
      >
        {/* FRONT SIDE */}
        <div style={{ backfaceVisibility: 'hidden' }} className="absolute inset-0">
          <div className="absolute inset-0">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
            ) : (
              <div className="h-full w-full opacity-10 transition-opacity duration-500 bg-gradient-to-br from-cyan-900 to-black" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
          </div>

          <MotionDiv
            animate={{ scaleX: hovered ? 1 : 0 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-0 h-[2px] origin-left bg-cyan-400 shadow-[0_0_10px_#06b6d4]"
          />

          <div className="relative z-10 flex h-full flex-col p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-mono text-cyan-500">{project.year}</span>
              <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full border border-zinc-800">
                <div className={clsx('h-1.5 w-1.5 rounded-full', statusConfig[project.status].color)} />
                <span className="text-[10px] text-zinc-400 font-medium">{statusConfig[project.status].label}</span>
              </div>
            </div>

            {isLarge && (
              <div className="pointer-events-none absolute right-5 top-8 select-none text-[80px] font-bold leading-none text-cyan-500/[0.05]">
                {String(project.id).padStart(2, '0')}
              </div>
            )}

            <div className="mt-auto space-y-4">
              <div className="space-y-2">
                <h3 className={clsx('font-bold text-white leading-tight transition-colors group-hover:text-cyan-300', isLarge ? 'text-2xl' : isMedium ? 'text-lg' : 'text-base')}>
                  {project.title}
                </h3>
                {isLarge && (
                  <p className="text-zinc-400 leading-relaxed text-sm max-w-md">
                    {project.description}
                  </p>
                )}
              </div>

              {isLarge && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 6).map((tag) => (
                    <span key={tag} className="rounded-full border border-cyan-500/20 bg-cyan-950/30 px-2.5 py-1 text-[10px] font-mono text-cyan-400">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="min-h-10">
                <AnimatePresence initial={false} mode="wait">
                  {(hovered || mobile) && (
                    <MotionDiv
                      key="actions"
                      initial={{ opacity: 0, y: mobile ? 0 : 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: mobile ? 0 : 10 }}
                      transition={{ duration: mobile ? 0.12 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-wrap gap-2"
                    >
                      {project.github && (
                        <a
                          href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors duration-200 hover:border-cyan-400 hover:text-cyan-400"
                        >
                          <Code size={12} /> Code
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-400 transition-colors duration-200 hover:bg-cyan-500 hover:text-black"
                        >
                          <ExternalLink size={12} /> Live
                        </a>
                      )}
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </div>

              <div className="absolute bottom-4 right-5 text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-bold group-hover:text-cyan-500/70 transition-colors">
                tap details
              </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-zinc-900 to-black p-6 shadow-[inset_0_0_50px_rgba(6,182,212,0.05)]"
        >
          <div className={clsx('flex h-full flex-col', mobile ? 'gap-3' : 'gap-5')}>
            <div className="flex items-center justify-between gap-3 border-b border-zinc-800 pb-2">
              <span className="text-[10px] font-bold font-mono text-cyan-400 uppercase tracking-widest">Project Details</span>
              <span className="text-[10px] text-zinc-500">Tap to flip back</span>
            </div>

            <div className={mobile ? 'space-y-2' : 'space-y-3'}>
              <h3 className={clsx('font-bold text-white', mobile ? 'text-sm' : 'text-xl')}>
                {project.title}
              </h3>
              <p className={clsx('leading-relaxed text-zinc-400', mobile ? 'text-xs line-clamp-5' : 'text-sm')}>
                {project.longDescription || project.description}
              </p>
            </div>

            {!isLarge && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-cyan-500/20 bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-cyan-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </MotionDiv>
    </MotionDiv>
  )
}

function MobileSnakeRoadmap({ filtered }: { filtered: Project[] }) {
  return (
    <div className="md:hidden relative pt-6 pb-12">
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-cyan-500/20 to-transparent" />

      <div className="flex flex-col gap-10">
        {filtered.map((project, index) => {
          const isLeft = index % 2 === 0
          return (
            <div key={project.id} className="grid grid-cols-[1fr_2rem_1fr] items-start gap-0">
              {isLeft ? (
                <>
                  <div className="relative pr-3"><ProjectCard project={project} index={index} mobile /></div>
                  <div className="relative flex justify-center pt-8">
                    <div className="h-4 w-4 rounded-full border-2 border-cyan-400 bg-black shadow-[0_0_10px_rgba(6,182,212,0.5)] z-10" />
                    <div className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-cyan-500/40" />
                  </div>
                  <div />
                </>
              ) : (
                <>
                  <div />
                  <div className="relative flex justify-center pt-8">
                    <div className="h-4 w-4 rounded-full border-2 border-cyan-400 bg-black shadow-[0_0_10px_rgba(6,182,212,0.5)] z-10" />
                    <div className="absolute right-1/2 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-cyan-500/40" />
                  </div>
                  <div className="relative pl-3"><ProjectCard project={project} index={index} mobile /></div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.status === activeFilter)

  return (
    <main className="min-h-screen bg-black overflow-hidden relative pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[30rem] w-[30rem] rounded-full bg-cyan-600/10 opacity-40 blur-[120px]" />
      </div>

      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto flex max-w-5xl flex-col gap-10 pt-24 px-6 sm:px-8 z-10 relative">
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-cyan-400">Portfolio</p>
          <h1 className="pb-2 text-4xl md:text-5xl font-extrabold text-white">Selected Works</h1>
          <p className="mt-4 text-sm text-zinc-400">{projects.length} projects · tap to explore</p>
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={clsx(
                'rounded-xl border px-5 py-2 text-xs font-bold capitalize transition-all duration-300',
                activeFilter === filter
                  ? 'border-cyan-500 bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-cyan-500/50 hover:text-white'
              )}
            >
              {filter === 'All' ? `All (${projects.length})` : (
                <span className="flex items-center gap-2">
                  <span className={clsx('h-2 w-2 rounded-full', statusConfig[filter as keyof typeof statusConfig]?.color)} />
                  {statusConfig[filter as keyof typeof statusConfig]?.label}
                </span>
              )}
            </button>
          ))}
        </MotionDiv>

        <div className="hidden md:block mt-4">
          <MotionDiv layout style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </MotionDiv>
        </div>

        <MobileSnakeRoadmap filtered={filtered} />
      </MotionDiv>
    </main>
  )
}