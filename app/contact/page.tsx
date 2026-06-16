"use client";
import ResumeSection from "@/components/ResumeSection";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link2, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
} as const;

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const revealTransition = useMemo(
    () => ({
      duration: prefersReducedMotion ? 0 : 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    }),
    [prefersReducedMotion],
  );

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="relative overflow-hidden bg-background px-6 py-20 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-rose-glow absolute right-[-10%] top-[-12%] h-[22rem] w-[22rem] rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.section
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-white md:text-5xl"
          >
            Get In Touch
          </motion.h1>
          <motion.div
            variants={itemVariants}
            className="mt-4 flex justify-center"
          >
            <span
              className="h-1 w-12 rounded-full bg-accent"
              aria-hidden="true"
            />
          </motion.div>
        </motion.section>

        <motion.section
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">
              I&apos;m open to freelance projects, internships, and
              collaborations. Let&apos;s build something great together.
            </p>

            <div className="space-y-4">
              {[
                { label: "Email", value: "placeholder@gmail.com", Icon: Mail },
                { label: "Location", value: "India", Icon: MapPin },
                {
                  label: "LinkedIn",
                  value: "linkedin.com/in/yourhandle",
                  Icon: Link2,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-4"
                >
                  <item.Icon className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-muted">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-5">
              {[
                { href: "#", label: "GitHub", Icon: FaGithub },
                { href: "#", label: "LinkedIn", Icon: FaLinkedinIn },
                { href: "#", label: "Twitter", Icon: FaTwitter },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-muted transition duration-300 hover:text-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-border bg-surface p-6 shadow-rose sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-white outline-none transition duration-300 placeholder:text-muted focus:border-accent focus:shadow-[0_0_0_1px_rgba(225,29,72,0.18),0_0_24px_rgba(225,29,72,0.12)]"
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-white outline-none transition duration-300 placeholder:text-muted focus:border-accent focus:shadow-[0_0_0_1px_rgba(225,29,72,0.18),0_0_24px_rgba(225,29,72,0.12)]"
                />
              </div>

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-white outline-none transition duration-300 placeholder:text-muted focus:border-accent focus:shadow-[0_0_0_1px_rgba(225,29,72,0.18),0_0_24px_rgba(225,29,72,0.12)]"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows={6}
                className="w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-white outline-none transition duration-300 placeholder:text-muted focus:border-accent focus:shadow-[0_0_0_1px_rgba(225,29,72,0.18),0_0_24px_rgba(225,29,72,0.12)]"
              />

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition duration-300 hover:scale-[1.02] hover:bg-[#c81b45]"
              >
                Send Message
              </button>

              {submitted ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-accent"
                >
                  Thanks! I&apos;ll get back to you soon 🚀
                </motion.p>
              ) : null}

              <p className="text-xs text-muted">
                No backend is required here. This form is ready for a future
                mailto handoff or API integration.
              </p>
            </form>
          </motion.div>
        </motion.section>

        <ResumeSection />

        <motion.footer
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={revealTransition}
          className="mt-14 text-center text-sm text-muted"
        >
          © 2025 Anubhav Yadav.
        </motion.footer>
      </div>
    </main>
  );
}
