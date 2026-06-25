"use client";

import { motion } from "framer-motion";
import { FileText, Download, Eye, Calendar } from "lucide-react";

export default function ResumeSection() {
  return (
    <section className="flex flex-col items-center justify-center py-12">
      {/* Header */}
      <div className="text-center mb-8">
        {/* Naya Cyan Color */}
        <p className="text-cyan-400 font-mono text-sm mb-2 tracking-widest">my-resume</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Want to know more?</h2>
        <p className="text-zinc-400 text-sm">Download my resume and see what I bring to the table.</p>
      </div>

      {/* Resume Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 max-w-md w-full flex flex-col items-center mb-8 transition-colors hover:border-cyan-500/30 shadow-lg"
      >
        {/* Cyan Icon Box - Red hata kar Cyan kar diya */}
        <div className="bg-cyan-500/10 p-4 rounded-2xl mb-4 border border-cyan-500/20">
          <FileText className="h-10 w-10 text-cyan-400" />
        </div>
        
        <h3 className="text-white font-semibold text-lg mb-2 tracking-wide">Anubhav_Yadav_Resume.pdf</h3>
        
        <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider font-medium">
          <Calendar className="h-4 w-4" />
          <span>Last updated: June 2026</span>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4 sm:px-0"
      >
        {/* Download Button - Solid Cyan */}
        <a 
          href="/Anubhav_Yadav_Resume.pdf" 
          download="Anubhav_Yadav_Resume.pdf"
          className="flex-1 flex items-center justify-center gap-2 bg-cyan-500 text-black font-bold py-3.5 px-6 rounded-xl transition-all duration-300 hover:bg-cyan-400 hover:scale-[1.02] shadow-[0_0_20px_rgba(6,182,212,0.2)]"
        >
          <Download className="h-5 w-5" />
          Download Resume
        </a>
        
        {/* View Online Button - Transparent with Cyan Border & Text */}
        <a 
          href="/Anubhav_Yadav_Resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-cyan-500 text-cyan-400 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 hover:bg-cyan-500/10 hover:scale-[1.02]"
        >
          <Eye className="h-5 w-5" />
          View Online
        </a>
      </motion.div>
    </section>
  );
}