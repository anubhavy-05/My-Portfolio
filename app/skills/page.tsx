"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiCss,
  SiTailwindcss,
  SiTypescript
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

type Skill = {
  name: string;
  Icon: IconType;
};

type SkillGroup = {
  label: string;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "HTML5", Icon: SiHtml5 },
      { name: "CSS3", Icon: SiCss }
    ]
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express.js", Icon: SiExpress },
      { name: "Python", Icon: SiPython },
      { name: "REST APIs", Icon: SiPostman },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "PostgreSQL", Icon: SiPostgresql }
    ]
  },
  {
    label: "Tools & Others",
    skills: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "VS Code", Icon: VscVscode },
      { name: "Figma", Icon: SiFigma },
      { name: "Docker", Icon: SiDocker },
      { name: "Postman", Icon: SiPostman }
    ]
  }
];

const groupVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05 }
  }
} as const;

const badgeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
} as const;

function SkillGroupBlock({ group }: { group: SkillGroup }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  const badges = useMemo(() => group.skills, [group.skills]);

  return (
    <section ref={ref} className="space-y-4">
      <div className="space-y-2">
        <div className="font-mono text-sm uppercase tracking-[0.38em] text-accent">{group.label}</div>
        <div className="h-px w-full bg-border" aria-hidden="true" />
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={groupVariants}
        className="flex flex-wrap gap-3"
      >
        {badges.map((skill) => (
          <motion.div
            key={skill.name}
            variants={badgeVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text transition duration-300 hover:border-accent hover:text-white hover:shadow-[0_0_12px_rgba(225,29,72,0.3)]"
          >
            <skill.Icon className="h-4 w-4 shrink-0 text-accent transition duration-300 group-hover:text-white" />
            <span>{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default function SkillsPage() {
  return (
    <main className="bg-background px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-14">
        <header className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Skills &amp; Technologies
          </h1>
          <div className="mt-4 flex justify-center">
            <span className="h-1 w-12 rounded-full bg-accent" aria-hidden="true" />
          </div>
          <p className="mt-4 font-mono text-sm text-muted">Technologies I work with</p>
        </header>

        <div className="space-y-12">
          {skillGroups.map((group) => (
            <SkillGroupBlock key={group.label} group={group} />
          ))}
        </div>

        <p className="font-mono text-sm text-muted">// Always learning new technologies</p>
      </div>
    </main>
  );
}