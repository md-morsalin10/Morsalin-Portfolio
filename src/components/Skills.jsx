'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss, SiHtml5,
    SiNodedotjs, SiExpress, SiMongodb, SiStripe,
    SiGit, SiGithub, SiVercel, SiRender,
    SiNetlify, SiGsap, SiHeroui, SiDaisyui, SiMongoose, SiGooglechrome, SiPostman
} from 'react-icons/si';
import { MdSecurity } from 'react-icons/md';
import { ImCss3 } from 'react-icons/im';
import { FiFramer } from 'react-icons/fi';
import { PiSparkleDuotone } from 'react-icons/pi';
import { BiBot, BiBrain } from 'react-icons/bi';
import { DiVisualstudio } from 'react-icons/di';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────── */
const CATEGORIES = ['All', 'Frontend', 'Backend & Auth', 'Tools & Deploy', 'AI & Skills'];

const ALL_SKILLS = [
    { name: 'React.js',       category: 'Frontend',       icon: SiReact,          color: '#61DAFB' },
    { name: 'Next.js',        category: 'Frontend',       icon: SiNextdotjs,      color: '#ffffff' },
    { name: 'JavaScript',     category: 'Frontend',       icon: SiJavascript,     color: '#F7DF1E' },
    { name: 'TypeScript',     category: 'Frontend',       icon: SiTypescript,     color: '#3178C6' },
    { name: 'Tailwind CSS',   category: 'Frontend',       icon: SiTailwindcss,    color: '#06B6D4' },
    { name: 'HTML5',          category: 'Frontend',       icon: SiHtml5,          color: '#E34F26' },
    { name: 'CSS3',           category: 'Frontend',       icon: ImCss3,           color: '#1572B6' },
    { name: 'GSAP',           category: 'Frontend',       icon: SiGsap,           color: '#0AE448' },
    { name: 'Framer Motion',  category: 'Frontend',       icon: FiFramer,         color: '#0055FF' },
    { name: 'HeroUI',         category: 'Frontend',       icon: SiHeroui,         color: '#EC4899' },
    { name: 'DaisyUI',        category: 'Frontend',       icon: SiDaisyui,        color: '#5A0EF8' },
    { name: 'Node.js',        category: 'Backend & Auth', icon: SiNodedotjs,      color: '#339933' },
    { name: 'Express.js',     category: 'Backend & Auth', icon: SiExpress,        color: '#ffffff' },
    { name: 'MongoDB',        category: 'Backend & Auth', icon: SiMongodb,        color: '#47A248' },
    { name: 'BetterAuth',     category: 'Backend & Auth', icon: MdSecurity,       color: '#F59E0B' },
    { name: 'Stripe',         category: 'Backend & Auth', icon: SiStripe,         color: '#008CDD' },
    { name: 'Mongoose',       category: 'Backend & Auth', icon: SiMongoose,       color: '#880000' },
    { name: 'Git',            category: 'Tools & Deploy', icon: SiGit,            color: '#F05032' },
    { name: 'GitHub',         category: 'Tools & Deploy', icon: SiGithub,         color: '#ffffff' },
    { name: 'VS Code',        category: 'Tools & Deploy', icon: DiVisualstudio,   color: '#007ACC' },
    { name: 'Postman',        category: 'Tools & Deploy', icon: SiPostman,        color: '#FF6C37' },
    { name: 'Chrome Tools',   category: 'Tools & Deploy', icon: SiGooglechrome,   color: '#4285F4' },
    { name: 'Vercel',         category: 'Tools & Deploy', icon: SiVercel,         color: '#ffffff' },
    { name: 'Render',         category: 'Tools & Deploy', icon: SiRender,         color: '#46E3B7' },
    { name: 'Netlify',        category: 'Tools & Deploy', icon: SiNetlify,        color: '#00C7B7' },
    { name: 'Antigravity AI', category: 'AI & Skills',    icon: PiSparkleDuotone, color: '#06B6D4' },
    { name: 'Claude AI',      category: 'AI & Skills',    icon: BiBot,            color: '#D97706' },
    { name: 'Problem Solving',category: 'AI & Skills',    icon: BiBrain,          color: '#A855F7' },
];

const expo = [0.16, 1, 0.3, 1];

const countFor = (cat) =>
    cat === 'All' ? ALL_SKILLS.length : ALL_SKILLS.filter(s => s.category === cat).length;

/* ═══════════════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════════════ */
export default function Skills() {
    const [activeTab, setActiveTab] = useState('All');
    const sectionRef   = useRef(null);
    const containerRef = useRef(null);
    const headerRef    = useRef(null);
    const tabsRef      = useRef(null);

    /* GSAP entrance */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                defaults: { ease: 'power3.out' },
            });

            tl.fromTo(containerRef.current,
                { opacity: 0, y: 50, scale: 0.97 },
                { opacity: 1, y: 0,  scale: 1, duration: 1 }
            );
            tl.fromTo(headerRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.65 },
                '-=0.6'
            );
            tl.fromTo(tabsRef.current,
                { opacity: 0, y: 14 },
                { opacity: 1, y: 0, duration: 0.55 },
                '-=0.4'
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const filtered = activeTab === 'All'
        ? ALL_SKILLS
        : ALL_SKILLS.filter(s => s.category === activeTab);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative py-28 px-4 sm:px-6 bg-[#060412] overflow-hidden"
        >
            {/* ── Section grid ── */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(139,92,246,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.025) 1px,transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* ══════════════════════════════════════
                SKILLS CONTENT
            ══════════════════════════════════════ */}
            <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-2 sm:px-6 opacity-0">

                {/* ── Header ── */}
                <div ref={headerRef} className="text-center mb-12 relative z-10 opacity-0">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span
                            className="h-px w-10"
                            style={{ background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.5))' }}
                        />
                        <span className="font-mono text-[11px] tracking-[.22em] uppercase text-violet-400/70 font-semibold">
                            Expertise &amp; Stack
                        </span>
                        <span
                            className="h-px w-10"
                            style={{ background: 'linear-gradient(to left, transparent, rgba(139,92,246,0.5))' }}
                        />
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-3">
                        Technical{' '}
                        <motion.span
                            className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent"
                            style={{ backgroundSize: '200% 200%' }}
                            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                        >
                            Arsenal
                        </motion.span>
                    </h2>

                    <p className="text-gray-600 text-[12px] font-mono tracking-wide">
                        {ALL_SKILLS.length} technologies &amp; tools I work with
                    </p>
                </div>

                {/* ── Filter tabs ── */}
                <div
                    ref={tabsRef}
                    className="flex flex-wrap justify-center gap-1.5 mb-12 relative z-10 opacity-0"
                >
                    <div className="flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-[#060412]/60 border border-violet-900/30 backdrop-blur-xl">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`relative px-4 py-2 rounded-xl text-xs font-mono font-medium
                                            transition-colors duration-300 flex items-center gap-2
                                            ${activeTab === cat ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}
                            >
                                {activeTab === cat && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-xl"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(109,40,217,0.45), rgba(168,85,247,0.25))',
                                            border: '1px solid rgba(139,92,246,0.4)',
                                            boxShadow: '0 0 16px rgba(139,92,246,0.18)',
                                        }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                                <span className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-md font-mono
                                                  ${activeTab === cat
                                                      ? 'bg-violet-500/25 text-violet-300'
                                                      : 'bg-white/[0.04] text-gray-700'}`}
                                >
                                    {countFor(cat)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Skills grid ── */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 relative z-10"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((skill, i) => {
                            const Icon = skill.icon;
                            return (
                                <motion.div
                                    layout
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.84, y: 16 }}
                                    animate={{
                                        opacity: 1, scale: 1, y: 0,
                                        transition: { duration: 0.36, delay: i * 0.025, ease: expo },
                                    }}
                                    exit={{
                                        opacity: 0, scale: 0.84, y: 8,
                                        transition: { duration: 0.2 },
                                    }}
                                    whileHover={{ y: -5, scale: 1.04 }}
                                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                                    className="group relative flex flex-col items-center justify-center
                                               gap-3 p-5 rounded-2xl cursor-pointer overflow-hidden
                                               bg-[#090614]/90 border border-white/[0.05]
                                               hover:border-violet-500/30
                                               shadow-sm
                                               transition-all duration-300"
                                >
                                    {/* Hover glow effects */}
                                    <div
                                        className="pointer-events-none absolute inset-0 rounded-2xl
                                                   opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(90px circle at 50% 38%, ${skill.color}18, transparent 70%)`,
                                        }}
                                    />
                                    <div
                                        className="pointer-events-none absolute inset-0 rounded-2xl
                                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            boxShadow: `inset 0 0 14px ${skill.color}18`,
                                            border: `1px solid ${skill.color}28`,
                                        }}
                                    />
                                    <div
                                        className="absolute top-0 left-6 right-6 h-[1px]
                                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: `linear-gradient(90deg, transparent, ${skill.color}60, transparent)`,
                                        }}
                                    />

                                    {/* Icon */}
                                    <div className="relative z-10 p-2 rounded-xl
                                                    bg-white/[0.03] border border-white/[0.04]
                                                    group-hover:bg-transparent group-hover:border-transparent
                                                    transition-all duration-300">
                                        <Icon
                                            className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
                                            style={{ color: skill.color }}
                                        />
                                    </div>

                                    {/* Name */}
                                    <span className="relative z-10 text-[11px] font-semibold
                                                     text-gray-500 group-hover:text-gray-200
                                                     transition-colors duration-300
                                                     text-center tracking-wide leading-tight">
                                        {skill.name}
                                    </span>

                                    {/* Bottom dot */}
                                    <div
                                        className="absolute bottom-2 w-1 h-1 rounded-full
                                                   opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                                        style={{ background: skill.color }}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* ── Bottom bar ── */}
                <div className="mt-10 pt-6 border-t border-white/[0.05] flex items-center justify-between relative z-10">
                    <span className="font-mono text-[11px] text-gray-700">
                        Showing{' '}
                        <span className="text-violet-400/80 font-semibold">{filtered.length}</span>
                        {' '}of{' '}
                        <span className="text-gray-500">{ALL_SKILLS.length}</span>
                        {' '}technologies
                    </span>

                    <div className="hidden sm:flex items-center gap-1.5">
                        {['#61DAFB', '#339933', '#F7DF1E', '#47A248', '#F05032'].map((c, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: c, opacity: 0.35 }}
                                animate={{ opacity: [0.25, 0.55, 0.25] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                            />
                        ))}
                        <span className="text-[10px] text-gray-700 font-mono ml-1">stack</span>
                    </div>
                </div>

            </div>
        </section>
    );
}