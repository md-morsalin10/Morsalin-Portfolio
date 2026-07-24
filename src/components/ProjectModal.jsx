'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';

export default function ProjectModal({ project, isOpen, onClose }) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <div className="absolute inset-0 bg-[#02030a]/80 backdrop-blur-sm" />

                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-10 w-full max-w-3xl rounded-[28px] border border-violet-500/25 bg-[#090611]/95 p-6 shadow-[0_30px_90px_rgba(91,33,182,0.35)]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                            aria-label="Close project details"
                        >
                            <FiX size={18} />
                        </button>

                        <div className="space-y-6 pr-8">
                            <div>
                                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-violet-400">
                                    Project Overview
                                </p>
                                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-gray-400">{project.desc}</p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-violet-400">Tech Stack</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((item) => (
                                            <span
                                                key={item}
                                                className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[12px] text-violet-200"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-violet-400">Quick Links</p>
                                    <div className="space-y-2">
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 text-sm text-violet-300 transition hover:text-white"
                                        >
                                            <FiExternalLink size={14} />
                                            Live Demo
                                        </a>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 text-sm text-violet-300 transition hover:text-white"
                                        >
                                            <FiGithub size={14} />
                                            GitHub Repository
                                        </a>
                                        {project.ServerLink && (
                                            <a
                                                href={project.ServerLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 text-sm text-violet-300 transition hover:text-white"
                                            >
                                                <FiGithub size={14} />
                                                Server Repository
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl border border-white/10 bg-[#0f0b1e]/80 p-4">
                                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-violet-400">Challenges Faced</p>
                                    <ul className="space-y-2 text-sm leading-7 text-gray-300">
                                        {project.challenges.map((item) => (
                                            <li key={item} className="flex gap-2">
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-[#0f0b1e]/80 p-4">
                                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-violet-400">Future Improvements / Plans</p>
                                    <ul className="space-y-2 text-sm leading-7 text-gray-300">
                                        {project.improvements.map((item) => (
                                            <li key={item} className="flex gap-2">
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-400" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
