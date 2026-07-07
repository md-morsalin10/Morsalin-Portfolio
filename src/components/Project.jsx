'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════
   DATA  — add as many projects as you want here.
   Only first 3 shown by default; rest revealed on click.
═══════════════════════════════════════════════════════════ */
const ALL_PROJECTS = [
    {
        id: '01',
        title: 'SkillSphere Learning',
        desc: 'A modern, high-performance online learning platform designed to empower students with new skills and career-ready knowledge. Built with a focus on premium UI/UX and seamless functionality.',
        tech: ['Next.js', 'MongoDB', 'Framer Motion'],
        link: 'https://github.com/md-morsalin10/A8-SkillSphere-Online-Learning-Platform',
        live: 'https://a8-skill-sphere-online-learning-pla.vercel.app/',
        image: 'https://i.ibb.co.com/XxxDD72j/Screenshot-2026-05-04-153523.png',
        accent: '#a855f7',
        tag: 'EdTech',
    },
    {
        id: '02',
        title: 'Apps Hub — Productive Tools',
        desc: 'A diverse collection of innovative web applications and tools designed to simplify digital tasks and enhance user experiences, built with modern technologies.',
        tech: ['React', 'Tailwind CSS', 'GitHub API'],
        link: 'https://github.com/md-morsalin10/Morsalin-Stack-Ai-Hub',
        live: 'https://morsalin-stack-ai-model.netlify.app/',
        image: 'https://i.ibb.co.com/MD3tcnwr/apps.png',
        accent: '#3b82f6',
        tag: 'Ai Tools',
    },
    {
        id: '03',
        title: 'KeenKeeper — Social App',
        desc: 'A modern web application designed to help users maintain meaningful connections with friends and family by tracking interactions and setting communication goals.',
        tech: ['React', 'Tailwind', 'React Router'],
        link: 'https://github.com/md-morsalin10/A07-kin-keeper-Keep-Your-Friendships-Alive',
        live: 'https://a7-keen-keeper-friends.netlify.app/',
        image: 'https://i.ibb.co.com/b5fnLgmy/keenkipper.png',
        accent: '#22c55e',
        tag: 'Social App',
    },
    /* ── Add more projects below ─────────────────────────── */
    {
        id: '04',
        title: 'DigiTools Platform',
        desc: 'DigiTools Platform is a React-based web application where multiple digital tools are organized and displayed in a clean and user-friendly interface. It helps users explore different tools in one place.',
        tech: ['React', 'Tailwind', 'React Router'],
        link: 'https://github.com/md-morsalin10/a06-DigiTools-Platform',
        live: 'https://digitools-platform-a06-morsalin.netlify.app/',
        image: 'https://i.ibb.co.com/Vcx74btq/digi-Tools.png',
        accent: '#f97316',
        tag: 'Tools App',
    },
    {
        id: '05',
        title: 'Book-Vipe Online BookStore',
        desc: 'A full-featured e-commerce platform for seasonal products with cart management, authentication, and a smooth checkout experience built on the MERN stack.',
        tech: ['React', 'JavaScript', 'Tailwind'],
        link: 'https://github.com/md-morsalin10/Book-Vipe-project',
        live: 'https://book-vipe-morsalin.netlify.app/',
        image: 'https://i.ibb.co.com/PGzcZvHs/bookvipe.png',
        accent: '#eab308',
        tag: 'Book Shop',
    },
];

const DEFAULT_VISIBLE = 3;

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════ */
const EXPO = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.75, delay, ease: EXPO },
    },
});

const stagger = (delay = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
});

const cardVariant = {
    hidden: { opacity: 0, y: 56, scale: 0.93, filter: 'blur(6px)' },
    visible: {
        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
        transition: { duration: 0.7, ease: EXPO },
    },
    // ✅ Exit animation when collapsing
    exit: {
        opacity: 0, y: 32, scale: 0.95, filter: 'blur(6px)',
        transition: { duration: 0.45, ease: 'easeIn' },
    },
};

/* ═══════════════════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════════════════ */
function ProjectCard({ project }) {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 90, damping: 14 });
    const sry = useSpring(ry, { stiffness: 90, damping: 14 });
    const rotX = useTransform(srx, v => `${v}deg`);
    const rotY = useTransform(sry, v => `${v}deg`);

    const onMove = useCallback((e) => {
        const r = ref.current.getBoundingClientRect();
        rx.set(-(((e.clientY - r.top) / r.height) - 0.5) * 13);
        ry.set((((e.clientX - r.left) / r.width) - 0.5) * 13);
    }, [rx, ry]);

    const onLeave = useCallback(() => {
        rx.set(0); ry.set(0); setHovered(false);
    }, [rx, ry]);

    return (
        <motion.article
            ref={ref}
            variants={cardVariant}
            layout
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 900 }}
            onMouseMove={onMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={onLeave}
            className="relative group"
        >
            {/* Outer glow on hover */}
            <motion.div
                className="absolute -inset-px rounded-3xl pointer-events-none"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.accent}28, transparent 70%)` }}
            />

            {/* Card body */}
            <div
                className="relative bg-[#0c0818] rounded-3xl overflow-hidden border transition-colors duration-300 h-full"
                style={{ borderColor: hovered ? `${project.accent}38` : 'rgba(255,255,255,0.05)' }}
            >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                    <motion.div
                        className="absolute inset-0 z-10 pointer-events-none"
                        animate={{ opacity: hovered ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ background: `linear-gradient(135deg, ${project.accent}30, #060412aa)` }}
                    />

                    <motion.div
                        className="relative w-full h-full"
                        animate={{ scale: hovered ? 1.08 : 1 }}
                        transition={{ duration: 0.7, ease: EXPO }}
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            unoptimized
                        />
                    </motion.div>

                    {/* ID watermark */}
                    <span
                        className="absolute top-4 left-5 font-mono font-black text-[42px] leading-none z-20 select-none pointer-events-none"
                        style={{ color: `${project.accent}22` }}
                    >
                        {project.id}
                    </span>

                    {/* Tag badge */}
                    <motion.span
                        className="absolute top-4 right-4 z-20 font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border"
                        style={{ color: project.accent, borderColor: `${project.accent}40`, backgroundColor: `${project.accent}15` }}
                        animate={hovered ? { scale: 1.06 } : { scale: 1 }}
                    >
                        {project.tag}
                    </motion.span>

                    {/* Bottom fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 z-10 bg-gradient-to-t from-[#0c0818] to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 pt-4">
                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                className="font-mono text-[10px] px-2.5 py-1 rounded-lg border"
                                style={{ color: `${project.accent}cc`, borderColor: `${project.accent}25`, backgroundColor: `${project.accent}0c` }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <motion.h3
                        className="text-[18px] font-bold leading-snug mb-2 transition-colors duration-300"
                        style={{ color: hovered ? project.accent : '#fff' }}
                    >
                        {project.title}
                    </motion.h3>

                    {/* Desc */}
                    <p className="text-gray-500 text-[13px] leading-[1.75] mb-5 line-clamp-2">{project.desc}</p>

                    {/* Links */}
                    <div className="flex items-center justify-between">
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 font-semibold text-[13px] text-white"
                        >
                            <motion.span
                                className="flex items-center gap-1.5"
                                whileHover={{ x: 4 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                Live Demo
                                <motion.span
                                    style={{ color: project.accent }}
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                                >→</motion.span>
                            </motion.span>
                        </a>

                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 font-mono text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                    </div>
                </div>

                {/* Bottom sweep bar */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
                    animate={{ width: hovered ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: EXPO }}
                />
            </div>
        </motion.article>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════ */
export default function Projects() {
    const [showAll, setShowAll] = useState(false);

    const visibleProjects = showAll ? ALL_PROJECTS : ALL_PROJECTS.slice(0, DEFAULT_VISIBLE);
    const hiddenCount = ALL_PROJECTS.length - DEFAULT_VISIBLE;

    return (
        <section id="projects" className="relative py-28 px-6 bg-[#060412] overflow-hidden">

            {/* Ambient orbs */}
            <motion.div
                className="pointer-events-none absolute top-1/3 -right-32 w-[480px] h-[480px] rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.2, 0.12] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#7c3aed,transparent_65%)]" />
            </motion.div>
            <motion.div
                className="pointer-events-none absolute bottom-0 -left-16 w-[360px] h-[360px] rounded-full"
                animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.16, 0.08] }}
                transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#a855f7,transparent_65%)]" />
            </motion.div>

            {/* Grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.027]"
                style={{
                    backgroundImage: 'linear-gradient(#a855f7 1px,transparent 1px),linear-gradient(90deg,#a855f7 1px,transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="max-w-6xl mx-auto">

                {/* ── Header ── */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                    variants={stagger(0)}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
                >
                    <div>
                        <motion.div variants={fadeUp(0)} className="flex items-center gap-3 mb-4">
                            <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/50" />
                            <span className="font-mono text-[11px] tracking-[.18em] uppercase text-violet-400/70">Featured Works</span>
                        </motion.div>

                        <motion.h2
                            variants={fadeUp(0.06)}
                            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
                        >
                            Selected{' '}
                            <motion.span
                                className="bg-gradient-to-br from-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% 200%' }}
                                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                                transition={{ duration: 5, repeat: Infinity }}
                            >
                                Projects
                            </motion.span>
                        </motion.h2>
                    </div>

                    <motion.div variants={fadeUp(0.1)} className="md:text-right max-w-xs">
                        <p className="text-gray-400 text-[13.5px] leading-relaxed">
                            High-performance web apps built with the MERN stack and modern frontend tools.
                        </p>
                        <motion.a
                            href="https://github.com/md-morsalin10"
                            target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-[12px] text-violet-400 mt-3 hover:text-violet-300 transition-colors"
                            whileHover={{ x: 4 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            View all on GitHub →
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* ── Cards grid with AnimatePresence ── */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {visibleProjects.map((p) => (
                            <ProjectCard key={p.id} project={p} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* ── Show More / Show Less button ── */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp(0.15)}
                    className="mt-12 flex flex-col items-center gap-4"
                >
                    {/* Progress indicator */}
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-gray-600">
                            Showing{' '}
                            <span className="text-violet-400">{visibleProjects.length}</span>
                            {' '}of{' '}
                            <span className="text-violet-400">{ALL_PROJECTS.length}</span>
                            {' '}projects
                        </span>
                        {/* Dot indicators */}
                        <div className="flex gap-1.5">
                            {ALL_PROJECTS.map((_, i) => (
                                <motion.span
                                    key={i}
                                    className="rounded-full"
                                    animate={{
                                        width: i < visibleProjects.length ? 16 : 6,
                                        background: i < visibleProjects.length ? '#a855f7' : 'rgba(168,85,247,0.2)',
                                    }}
                                    style={{ height: 6 }}
                                    transition={{ duration: 0.35, ease: EXPO }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Toggle button */}
                    {ALL_PROJECTS.length > DEFAULT_VISIBLE && (
                        <motion.button
                            onClick={() => setShowAll(v => !v)}
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            className="relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl overflow-hidden font-semibold text-[14px] text-white"
                        >
                            {/* Gradient bg */}
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-500"
                                animate={{ opacity: [1, 0.82, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            {/* Glow */}
                            <motion.span
                                className="absolute inset-0 rounded-xl"
                                animate={{ boxShadow: ['0 0 16px rgba(139,92,246,.35)', '0 0 30px rgba(139,92,246,.6)', '0 0 16px rgba(139,92,246,.35)'] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />

                            <span className="relative z-10 flex items-center gap-2.5">
                                <AnimatePresence mode="wait">
                                    {showAll ? (
                                        <motion.span
                                            key="less"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.22 }}
                                            className="flex items-center gap-2"
                                        >
                                            Show Less
                                            <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>↑</motion.span>
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="more"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.22 }}
                                            className="flex items-center gap-2"
                                        >
                                            See All {hiddenCount} More Projects
                                            <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>↓</motion.span>
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </span>
                        </motion.button>
                    )}
                </motion.div>

            </div>
        </section>
    );
}