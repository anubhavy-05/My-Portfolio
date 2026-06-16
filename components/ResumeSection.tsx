'use client';

import { motion, useInView } from 'framer-motion';
import { FileText, Download, Calendar, Eye } from 'lucide-react';
import { useRef } from 'react';

export default function ResumeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      style={{ backgroundColor: '#0F0A0A', borderTop: '1px solid #2D1515' }}
      className="py-20 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Top label */}
        <p
          className="text-sm mb-3 tracking-widest"
          style={{ color: '#E11D48', fontFamily: 'Fira Code, monospace' }}
        >
          // my-resume.pdf
        </p>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white mb-3">
          Want to know more?
        </h2>
        <p style={{ color: '#94A3B8' }} className="text-base mb-10">
          Download my resume and see what I bring to the table.
        </p>

        {/* Resume Card */}
        <motion.div
          whileHover={{
            borderColor: '#E11D48',
            boxShadow: '0 0 24px rgba(225,29,72,0.2)',
          }}
          transition={{ duration: 0.3 }}
          className="max-w-sm mx-auto rounded-xl p-8 mb-8 cursor-default"
          style={{
            backgroundColor: '#1A1010',
            border: '1px solid #2D1515',
          }}
        >
          {/* File Icon */}
          <div className="flex justify-center mb-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(225,29,72,0.1)', border: '1px solid #2D1515' }}
            >
              <FileText size={32} style={{ color: '#E11D48' }} />
            </div>
          </div>

          {/* File name */}
          <p
            className="text-white text-sm font-medium mb-1"
            style={{ fontFamily: 'Fira Code, monospace' }}
          >
            Anubhav_Yadav_Resume.pdf
          </p>

          {/* Last updated */}
          <div
            className="flex items-center justify-center gap-1.5 text-xs"
            style={{ color: '#94A3B8' }}
          >
            <Calendar size={12} />
            <span>Last updated: June 2025</span>
          </div>
        </motion.div>

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Download Button */}
          <motion.a
            href="/Anubhav_Yadav_Resume.pdf"
            download="Anubhav_Yadav_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white"
            style={{ backgroundColor: '#E11D48' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#BE123C')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E11D48')}
          >
            <Download size={18} />
            Download Resume
          </motion.a>

          {/* View Button */}
          <motion.a
            href="/Anubhav_Yadav_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold"
            style={{
              border: '1px solid #E11D48',
              color: '#E11D48',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(225,29,72,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Eye size={18} />
            View Online
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}