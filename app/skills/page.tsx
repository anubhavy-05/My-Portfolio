'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import type { IconType } from 'react-icons';

// --- Icons Import ---
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiHtml5, SiCss, 
  SiJavascript, SiBootstrap, // <-- Naye Frontend Icons
  SiNodedotjs, SiExpress, SiPython, SiC, SiFastapi, SiDjango, // <-- Django Add kiya
  SiMongodb, SiPostgresql, SiFirebase, SiMysql, SiSqlite,
  SiDocker, SiAmazonaws, SiGithub, SiGooglecloud, SiKubernetes, SiVercel, SiRender,
  SiRedux, SiFramer, SiPandas, SiNumpy, SiChartdotjs, SiPydantic, // <-- Chart.js & Pydantic
  SiTensorflow, SiPytorch, SiOpenai, SiScikitlearn,
  SiGit, SiGoogledrive, SiTelegram, SiJsonwebtokens, SiGoogle // <-- JWT & Google Auth Add kiye
} from 'react-icons/si';

import { FaJava, FaDatabase, FaSpaceShuttle } from 'react-icons/fa';

// --- Types & Data ---
type Skill = {
  name: string;
  Icon: IconType | undefined;
  category: string;
};

// --- Updated Skills Array ---
const skillsData: Skill[] = [
  // Frontend
  { name: 'JavaScript', Icon: SiJavascript, category: 'Frontend' },
  { name: 'Next.js', Icon: SiNextdotjs, category: 'Frontend' },
  { name: 'TypeScript', Icon: SiTypescript, category: 'Frontend' },
  { name: 'React', Icon: SiReact, category: 'Frontend' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, category: 'Frontend' },
  { name: 'Bootstrap 5', Icon: SiBootstrap, category: 'Frontend' },
  { name: 'HTML5', Icon: SiHtml5, category: 'Frontend' },
  { name: 'CSS3', Icon: SiCss, category: 'Frontend' },
  
  // Backend
  { name: 'Python', Icon: SiPython, category: 'Backend' },
  { name: 'Django', Icon: SiDjango, category: 'Backend' },
  { name: 'Node.js', Icon: SiNodedotjs, category: 'Backend' },
  { name: 'Express.js', Icon: SiExpress, category: 'Backend' },
  { name: 'FastAPI', Icon: SiFastapi, category: 'Backend' },
  { name: 'C', Icon: SiC, category: 'Backend' },
  { name: 'Java', Icon: FaJava, category: 'Backend' },
  
  // Database
  { name: 'MySQL', Icon: SiMysql, category: 'Database' },
  { name: 'PostgreSQL', Icon: SiPostgresql, category: 'Database' },
  { name: 'MongoDB', Icon: SiMongodb, category: 'Database' },
  { name: 'Local DB', Icon: SiSqlite, category: 'Database' },
  { name: 'SQL', Icon: FaDatabase, category: 'Database' },
  { name: 'SQLAlchemy', Icon: FaDatabase, category: 'Database' },
  
  // Cloud & Deployment
  { name: 'Google Cloud', Icon: SiGooglecloud, category: 'Cloud' },
  { name: 'AWS', Icon: SiAmazonaws, category: 'Cloud' },
  { name: 'Kubernetes', Icon: SiKubernetes, category: 'Cloud' },
  { name: 'Docker', Icon: SiDocker, category: 'Cloud' },
  { name: 'Vercel', Icon: SiVercel, category: 'Cloud' },
  { name: 'Render', Icon: SiRender, category: 'Cloud' },
  
  // Libraries & Frameworks
  { name: 'Pandas', Icon: SiPandas, category: 'Libraries & Frameworks' },
  { name: 'Numpy', Icon: SiNumpy, category: 'Libraries & Frameworks' },
  { name: 'Chart.js', Icon: SiChartdotjs, category: 'Libraries & Frameworks' },
  { name: 'Pydantic', Icon: SiPydantic, category: 'Libraries & Frameworks' },
  { name: 'Pyrogram', Icon: SiTelegram, category: 'Libraries & Frameworks' },
  { name: 'Requests', Icon: SiPython, category: 'Libraries & Frameworks' },
  { name: 'Redux', Icon: SiRedux, category: 'Libraries & Frameworks' },
  { name: 'Framer', Icon: SiFramer, category: 'Libraries & Frameworks' },
  
  // AI / ML
  { name: 'Scikit-Learn', Icon: SiScikitlearn, category: 'AI/ML' },
  { name: 'TensorFlow', Icon: SiTensorflow, category: 'AI/ML' },
  { name: 'PyTorch', Icon: SiPytorch, category: 'AI/ML' },
  { name: 'OpenAI', Icon: SiOpenai, category: 'AI/ML' },

  // Tools & Others
  { name: 'Git', Icon: SiGit, category: 'Tools & Others' },
  { name: 'GitHub', Icon: SiGithub, category: 'Tools & Others' },
  { name: 'OAuth 2.0', Icon: SiGoogle, category: 'Tools & Others' }, // Google Auth ke liye Google icon
  { name: 'JWT', Icon: SiJsonwebtokens, category: 'Tools & Others' },
  { name: 'Google Drive', Icon: SiGoogledrive, category: 'Tools & Others' },
  { name: 'Telegram', Icon: SiTelegram, category: 'Tools & Others' },
  { name: 'Antigravity', Icon: FaSpaceShuttle, category: 'Tools & Others' },
];

const categories = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'Cloud',
  'Libraries & Frameworks',
  'AI/ML',
  'Tools & Others'
];

// Alphabetical sort (A-Z)
const sortedSkills = [...skillsData].sort((a, b) => a.name.localeCompare(b.name));

// Random floating position generator
function generatePositions(list: Skill[]) {
  return list.map(() => ({
    floatY: 4 + Math.random() * 6,                  
    floatDuration: 3.5 + Math.random() * 2.5,       
    floatDelay: Math.random() * 2,                  
    rotation: Math.random() * 6 - 3,                
  }));
}

// --- Component: IconTile ---
function IconTile({
  skill,
  floatY,
  floatDuration,
  floatDelay,
  rotation,
  index,
}: {
  skill: Skill;
  floatY: number;
  floatDuration: number;
  floatDelay: number;
  rotation: number;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = skill.Icon;

  return (
    <motion.div
      layout 
      initial={{ opacity: 0, scale: 0.7, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ scale: 1.12, rotate: 0, zIndex: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center gap-2 cursor-default"
      style={{ zIndex: hovered ? 10 : 1 }}
    >
      <motion.div
        animate={{ y: [0, -floatY, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay,
        }}
        className="flex flex-col items-center gap-2"
      >
        <div
          className={clsx(
            'w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border relative overflow-hidden',
            hovered
              ? 'border-yellow-500/60 bg-zinc-800 shadow-lg shadow-yellow-500/20'
              : 'border-zinc-700 bg-zinc-900'
          )}
        >
          {hovered && (
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(circle at center, rgba(234,179,8,0.15), transparent 70%)',
              }}
            />
          )}

          {IconComponent ? (
            <IconComponent 
              className={clsx(
                "transition-all duration-300 z-10 w-8 h-8",
                hovered ? "text-yellow-400 scale-110" : "text-gray-400"
              )} 
            />
          ) : (
            <span className={clsx("font-bold z-10 text-sm", hovered ? "text-yellow-400" : "text-gray-400")}>
              {skill.name.substring(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <p
          className={clsx(
            'text-[10px] font-medium text-center leading-tight transition-colors duration-200 max-w-[64px] truncate',
            hovered ? 'text-yellow-500' : 'text-gray-500'
          )}
        >
          {skill.name}
        </p>
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-800 border border-yellow-500/30 rounded-lg px-3 py-1.5 whitespace-nowrap z-20 pointer-events-none shadow-xl"
          >
            <p className="text-[11px] text-white font-medium">{skill.name}</p>
            <p className="text-[9px] text-yellow-500/80 text-center">{skill.category}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- Main Page Component ---
export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const positionsRef = useRef<ReturnType<typeof generatePositions>>([]);

  const filtered = activeCategory === 'All'
    ? sortedSkills
    : sortedSkills.filter((s) => s.category === activeCategory);

  useEffect(() => {
    positionsRef.current = generatePositions(filtered);
  }, [activeCategory, filtered]);

  if (positionsRef.current.length === 0) {
    positionsRef.current = generatePositions(filtered);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 sm:px-8 lg:px-12 font-sans overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto flex flex-col gap-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center sm:text-left"
        >
          <p className="text-yellow-500 font-mono text-xs tracking-[0.2em] uppercase mb-2">Expertise</p>
          <h1 className="text-4xl font-bold text-white pb-2 md:text-5xl">Technical Skills</h1>
          <p className="text-gray-400 text-sm mt-4">
            {filtered.length} technologies · hover to explore
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center sm:justify-start gap-2"
        >
          {categories.map((cat) => {
            const count = cat === 'All' 
              ? sortedSkills.length 
              : sortedSkills.filter(s => s.category === cat).length;
              
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  'px-4 py-2 rounded-xl text-xs font-medium border transition-all duration-300',
                  activeCategory === cat
                    ? 'bg-yellow-500 text-black border-yellow-500 font-semibold shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                    : 'bg-zinc-900 border-zinc-700 text-gray-400 hover:border-yellow-500/50 hover:text-white'
                )}
              >
                {cat}
                {cat !== 'All' && (
                  <span className={clsx(
                    "ml-2 text-[10px]", 
                    activeCategory === cat ? "text-black/70" : "text-gray-500"
                  )}>
                    ({count})
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        <div className="relative w-full min-h-[300px]">
          <motion.div
            layout 
            className="grid gap-x-4 gap-y-8 justify-items-center sm:justify-items-start"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((skill, index) => {
                const pos = positionsRef.current[index] || {
                  floatY: 5,
                  floatDuration: 4,
                  floatDelay: 0,
                  rotation: 0,
                };
                return (
                  <IconTile
                    key={skill.name} 
                    skill={skill}
                    index={index}
                    floatY={pos.floatY}
                    floatDuration={pos.floatDuration}
                    floatDelay={pos.floatDelay}
                    rotation={pos.rotation}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5 mt-8"
        >
          <p className="text-yellow-500 font-mono text-xs tracking-[0.2em] uppercase">
            Category Breakdown
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {categories.filter(c => c !== 'All').map((cat, i) => {
              const count = skillsData.filter(s => s.category === cat).length;
              if (count === 0) return null; 
              const pct = Math.round((count / skillsData.length) * 100);
              
              return (
                <div key={cat} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300 font-medium">{cat}</span>
                    <span className="text-yellow-500 font-mono">{count} skills</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}






