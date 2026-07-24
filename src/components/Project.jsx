'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import ProjectModal from './ProjectModal';

/* ═══════════════════════════════════════════════════════════
   DATA — Total 6 Projects
═══════════════════════════════════════════════════════════ */
const ALL_PROJECTS = [
    {
        id: '01',
        title: 'Fable - Ebook Sharing Platform',
        desc: 'Developed a full-stack ebook publishing platform with role-based dashboards, secure authentication, and Stripe payment integration',
        tech: ['Next.js', 'React.js', 'MongoDB', 'Express.js', "JWT", "Stripe", "Motion"],
        link: 'https://github.com/md-morsalin10/Fable-Ebook-Sharing-Platform-Client',
        ServerLink: 'https://github.com/md-morsalin10/Fable-Ebook-Sharing-Platform-Server',
        live: 'https://fable-ebook-sharing-client.vercel.app',
        image: 'https://i.ibb.co.com/Nnp0HnFh/image.png',
        accent: '#ec4899',
        tag: 'Ebook',
        challenges: ['Implemented secure role-based authentication and protected dashboard flows.', 'Balanced Stripe checkout with fast content delivery and polished UX on a large content platform.'],
        improvements: ['Add real-time reading analytics and personalized reading recommendations.', 'Expand admin tools for content moderation and creator insights.'],
    },
    {
        id: '02',
        title: 'StudyNook',
        desc: 'Engineered a full-stack library space reservation system featuring automated time-conflict prevention, HTTP-only cookie JWT security, and real-time room availability management.',
        tech: ['Next.js', 'React.js', 'MongoDB', 'Express.js', "JWT", "Node.js", "Motion"],
        link: 'https://github.com/md-morsalin10/Study-Nook-Frontend',
        ServerLink: 'https://github.com/md-morsalin10/Study-Nook-Server',
        live: 'https://study-nook-frontend.vercel.app',
        image: 'https://i.ibb.co.com/DD2rHjkV/image.png',
        accent: '#06b6d4',
        tag: 'Reservation',
        challenges: ['Solved room availability conflicts with a robust reservation rule engine.', 'Managed secure JWT authentication and responsive booking experiences across devices.'],
        improvements: ['Introduce live notifications for booking updates and waitlist handling.', 'Add analytics for peak usage and faculty scheduling insights.'],
    },
    {
        id: '03',
        title: 'LuxeSpace - Real Estate Management',
        desc: 'Developed a full-stack luxury real estate platform featuring role-based dashboards, live property filtering, and secure booking management using Next.js and TypeScript.',
        tech: ['Next.js', 'React.js', "TypeScript", 'MongoDB', 'Express.js', "JWT", "Node.js", "Motion"],
        link: 'https://github.com/md-morsalin10/Luxe-Space-Client-Server',
        ServerLink: 'https://github.com/md-morsalin10/Luxe-Space-Server-side-code',
        live: 'https://luxe-space-client-server.vercel.app',
        image: 'https://i.ibb.co.com/V0qNtxH1/image.png',
        accent: '#eab308',
        tag: 'Real Estate',
        challenges: ['Built a multi-role property platform with fast filtering and booking workflows.', 'Maintained consistency between complex UI states and backend API structure.'],
        improvements: ['Add AI-based property recommendations and virtual tour previews.', 'Improve owner dashboards with richer lead and booking insights.'],
    },
    {
        id: '04',
        title: 'NexusAI Marketplace',
        desc: 'NexusAI Marketplace is an AI-powered full-stack E-Commerce platform featuring role-based access for Buyers, Sellers, and Admins wrapped in a sleek dark UI.',
        tech: ['Next.js', 'Express.js', 'MongoDB', 'Better Auth', 'Groq API', 'Tailwind CSS', 'Framer Motion'],
        link: 'https://github.com/md-morsalin10/NexusAi-Marketplace-Frontend',
        ServerLink: 'https://github.com/md-morsalin10/Nexus-Ai-Marketplace-Backend',
        live: 'https://nexus-ai-marketplace-frontend.vercel.app',
        image: 'https://i.ibb.co.com/kggXRYvZ/image.png',
        accent: '#10b981',
        tag: 'AI Agent',
        challenges: ['Integrated multiple AI capabilities into a marketplace while keeping the UX simple and trustworthy.', 'Ensured secure seller and buyer flows with flexible role-based access.'],
        improvements: ['Deploy more intelligent agent workflows and smarter search filtering.', 'Introduce seller analytics, AI summaries, and richer payment controls.'],
    },
    {
        id: '05',
        title: 'SkillSphere Learning',
        desc: 'A modern, high-performance online learning platform designed to empower students with new skills and career-ready knowledge.',
        tech: ['Next.js', 'MongoDB', 'Framer Motion', 'Tailwind CSS'],
        link: 'https://github.com/md-morsalin10/A8-SkillSphere-Online-Learning-Platform',
        live: 'https://a8-skill-sphere-online-learning-pla.vercel.app/',
        image: 'https://i.ibb.co.com/XxxDD72j/Screenshot-2026-05-04-153523.png',
        accent: '#a855f7',
        tag: 'EdTech',
        challenges: ['Shaped a fast, accessible learning experience around interactive course browsing.', 'Kept the product lightweight while serving modern educational workflows.'],
        improvements: ['Add progress tracking, certificates, and personalized lesson recommendations.', 'Expand with instructor tools and real-time community features.'],
    },
    {
        id: '06',
        title: 'KeenKeeper — Social Connection App',
        desc: 'A modern web application designed to help users maintain meaningful connections with friends and family by tracking interactions.',
        tech: ['React', 'Tailwind CSS', 'React Router', 'Express'],
        link: 'https://github.com/md-morsalin10/A07-kin-keeper-Keep-Your-Friendships-Alive',
        live: 'https://a7-keen-keeper-friends.netlify.app/',
        image: 'https://i.ibb.co.com/b5fnLgmy/keenkipper.png',
        accent: '#3b82f6',
        tag: 'Social Platform',
        challenges: ['Designed a friendly social experience while keeping the interface simple and responsive.', 'Balanced reusable UI components with a lightweight stack for quick iteration.'],
        improvements: ['Introduce social feeds, reminders, and richer interaction history.', 'Expand into a full community experience with private groups and notifications.'],
    },
];

const DEFAULT_VISIBLE = 3;
const EXPO = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 35, filter: 'blur(6px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.8, delay, ease: EXPO },
    },
});

const cardVariant = {
    hidden: { opacity: 0, y: 45, scale: 0.94, filter: 'blur(10px)' },
    visible: {
        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
        transition: { duration: 0.65, ease: EXPO },
    },
    exit: {
        opacity: 0, y: 20, scale: 0.95, filter: 'blur(6px)',
        transition: { duration: 0.35, ease: 'easeIn' },
    },
};

/* ═══════════════════════════════════════════════════════════
   PREMIUM CARD COMPONENT
═══════════════════════════════════════════════════════════ */
function ProjectCard({ project, onOpen }) {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 120, damping: 18 });
    const sry = useSpring(ry, { stiffness: 120, damping: 18 });
    const rotX = useTransform(srx, v => `${v}deg`);
    const rotY = useTransform(sry, v => `${v}deg`);

    const onMove = useCallback((e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        rx.set(-(((e.clientY - r.top) / r.height) - 0.5) * 8);
        ry.set((((e.clientX - r.left) / r.width) - 0.5) * 8);
    }, [rx, ry]);

    const onLeave = useCallback(() => {
        rx.set(0); ry.set(0); setHovered(false);
    }, [rx, ry]);

    return (
        <motion.article
            ref={ref}
            variants={cardVariant}
            layout
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 1000 }}
            onMouseMove={onMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={onLeave}
            className="relative group cursor-default"
        >
            {/* Outer Soft Ambient Glow */}
            <motion.div
                className="absolute -inset-[1px] rounded-3xl pointer-events-none transition-opacity duration-500 blur-xl"
                animate={{ opacity: hovered ? 0.35 : 0 }}
                style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}, transparent 75%)` }}
            />

            {/* Main Card Body (Matching Theme BG & Glass Effect) */}
            <div
                className="relative bg-[#070415]/70 backdrop-blur-xl rounded-3xl overflow-hidden border transition-all duration-500 h-full flex flex-col justify-between"
                style={{ 
                    borderColor: hovered ? `${project.accent}55` : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: hovered ? `0 20px 40px -15px ${project.accent}20` : 'none'
                }}
            >
                <div>
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                        <motion.div
                            className="absolute inset-0 z-10 pointer-events-none"
                            animate={{ opacity: hovered ? 0.2 : 0.6 }}
                            transition={{ duration: 0.5 }}
                            style={{ background: `linear-gradient(180deg, transparent 30%, #070415 100%)` }}
                        />

                        <motion.div
                            className="relative w-full h-full"
                            animate={{ scale: hovered ? 1.06 : 1 }}
                            transition={{ duration: 0.7, ease: EXPO }}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover object-top"
                                unoptimized
                            />
                        </motion.div>

                        {/* ID Watermark */}
                        <span
                            className="absolute top-3 left-5 font-mono font-black text-[46px] leading-none z-20 select-none pointer-events-none opacity-20"
                            style={{ color: project.accent }}
                        >
                            {project.id}
                        </span>

                        {/* Tag Badge */}
                        {project.tag && (
                            <motion.span
                                className="absolute top-4 right-4 z-20 font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border backdrop-blur-md"
                                style={{ color: project.accent, borderColor: `${project.accent}50`, backgroundColor: `${project.accent}18` }}
                                animate={hovered ? { scale: 1.05 } : { scale: 1 }}
                            >
                                {project.tag}
                            </motion.span>
                        )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 pt-2">
                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="font-mono text-[10px] px-2.5 py-1 rounded-md border backdrop-blur-sm transition-colors duration-300"
                                    style={{ 
                                        color: hovered ? '#ffffff' : `${project.accent}ee`, 
                                        borderColor: `${project.accent}30`, 
                                        backgroundColor: hovered ? `${project.accent}25` : `${project.accent}0d` 
                                    }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <motion.h3
                            className="text-[19px] font-bold leading-snug mb-2.5 transition-colors duration-300"
                            style={{ color: hovered ? project.accent : '#ffffff' }}
                        >
                            {project.title}
                        </motion.h3>

                        {/* Description */}
                        <p className="text-gray-400 text-[13px] leading-[1.7] line-clamp-3">
                            {project.desc}
                        </p>
                    </div>
                </div>

                {/* Footer Action Links */}
                <div className="p-6 pt-0 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] mt-4 pt-4">
                    <button
                        onClick={() => onOpen(project)}
                        className="inline-flex items-center gap-1.5 font-semibold text-[13px] text-white hover:text-violet-300 transition-colors"
                    >
                        <span>View Details</span>
                        <motion.span
                            style={{ color: project.accent }}
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            →
                        </motion.span>
                    </button>

                    {/* Repositories (Client & Server) */}
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                        {/* Client GitHub */}
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors py-1 px-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10"
                            title="Frontend Repository"
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            <span>Client</span>
                        </a>

                        {/* Server GitHub */}
                        {project.ServerLink && (
                            <a
                                href={project.ServerLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors py-1 px-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20"
                                title="Backend Server Repository"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                                </svg>
                                <span>Server</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Bottom Active Glow Accent Bar */}
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
   MAIN CONTAINER SECTION
═══════════════════════════════════════════════════════════ */
export default function Projects() {
    const [showAll, setShowAll] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const visibleProjects = showAll ? ALL_PROJECTS : ALL_PROJECTS.slice(0, DEFAULT_VISIBLE);

    return (
        <section id="projects" className="relative py-28 px-6 bg-transparent overflow-hidden">
            {/* Ambient Background Glow matching global dark purple tone */}
            <motion.div
                className="pointer-events-none absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15"
                animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
            />

            {/* Seamless Grid Background matching site theme */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
                >
                    <div>
                        <motion.div variants={fadeUp(0)} className="flex items-center gap-3 mb-3">
                            <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/80" />
                            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-violet-400">Featured Works</span>
                        </motion.div>

                        <motion.h2
                            variants={fadeUp(0.06)}
                            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
                        >
                            Selected{' '}
                            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
                                Projects
                            </span>
                        </motion.h2>
                    </div>

                    <motion.p variants={fadeUp(0.1)} className="text-gray-400 text-[14px] max-w-xs">
                        Full-stack production applications built with Next.js, TypeScript, Node.js, and modern tools.
                    </motion.p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {visibleProjects.map((p) => (
                            <ProjectCard key={p.id} project={p} onOpen={setSelectedProject} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Show More / Less Button */}
                {ALL_PROJECTS.length > DEFAULT_VISIBLE && (
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={fadeUp(0.15)}
                        className="mt-14 flex flex-col items-center gap-4"
                    >
                        <button
                            onClick={() => setShowAll(v => !v)}
                            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl font-semibold text-[14px] text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] cursor-pointer"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600" />
                            <span className="relative z-10 flex items-center gap-2">
                                {showAll ? 'Show Less' : `Explore All ${ALL_PROJECTS.length} Projects`}
                                <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                                    {showAll ? '↑' : '↓'}
                                </span>
                            </span>
                        </button>
                    </motion.div>
                )}
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={Boolean(selectedProject)}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}