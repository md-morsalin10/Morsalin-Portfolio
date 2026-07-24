'use client';

import { motion } from 'framer-motion';
import {
    SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss, SiHtml5, SiCss3,
    SiNodedotjs, SiExpress, SiMongodb, SiStripe,
    SiGit, SiGithub, SiVercel, SiRender,
    SiNetlify,
    SiGsap,
    SiHeroui,
    SiDaisyui,
    SiMongoose,
    SiGooglechrome,
    SiPostman
} from 'react-icons/si';
// Note: For BetterAuth we can use a generic shield/auth icon or placeholder since it doesn't have an official Si icon.
import { MdSecurity } from 'react-icons/md';
import { ImCss3 } from 'react-icons/im';
import { FiFramer } from 'react-icons/fi';
import { PiSparkleDuotone } from 'react-icons/pi';
import { BiBot, BiBrain } from 'react-icons/bi';
import { DiVisualstudio } from 'react-icons/di';

const SKILL_CATEGORIES = [
    {
        title: 'Frontend',
        accent: '#3b82f6', // blue
        skills: [
            { name: 'React.js', icon: SiReact, color: '#61DAFB' },
            { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
            { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
            { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
            { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
            { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
            { name: 'CSS3', icon: ImCss3, color: '#1572B6' },
            { name: 'GSAP', icon: SiGsap, color: '#0AE448' },          // GSAP Bright Green
            { name: 'Framer Motion', icon: FiFramer, color: '#0055FF' }, // Framer Motion Blue
            { name: 'HeroUI', icon: SiHeroui, color: '#000000' },       // HeroUI Sleek Black (অথবা ডার্ক মোডের জন্য '#FFFFFF')
            { name: 'DaisyUI', icon: SiDaisyui, color: '#5A0EF8' },
        ]
    },
    {
        title: 'Backend & Auth',
        accent: '#22c55e', // green
        skills: [
            { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
            { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
            { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
            { name: 'BetterAuth', icon: MdSecurity, color: '#F59E0B' },
            { name: 'Stripe', icon: SiStripe, color: '#008CDD' },
            { name: 'Mongoose', icon: SiMongoose, color: '#880000' }
        ]
    },
    {
        title: 'Tools & Deployment',
        accent: '#a855f7', // purple
        skills: [
            { name: 'Git', icon: SiGit, color: '#F05032' },
            { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
            { name: 'VS Code', icon: DiVisualstudio, color: '#007ACC' },
            { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
            { name: 'Chrome DevTools', icon: SiGooglechrome, color: '#4285F4' },
            { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
            { name: 'Render', icon: SiRender, color: '#46E3B7' },
            { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
        ]
    },
    {
        title: 'AI Workflow & Soft Skills',
        accent: '#ec4899', // pink
        skills: [
            { name: 'Antigravity AI', icon: PiSparkleDuotone, color: '#06B6D4' },
            { name: 'Claude AI', icon: BiBot, color: '#D97706' },
            { name: 'Problem Solving', icon: BiBrain, color: '#A855F7' },
        ]
    }
];

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Skills() {
    return (
        <section id="skills" className="relative py-28 px-6 bg-[#060412] overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
            <div className="pointer-events-none absolute bottom-1/4 -right-32 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                    variants={stagger}
                    className="text-center mb-16 md:mb-24"
                >
                    <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
                        <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/50" />
                        <span className="font-mono text-[11px] tracking-[.18em] uppercase text-violet-400/70">Expertise</span>
                        <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/50" />
                    </motion.div>

                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
                    >
                        Technical{' '}
                        <motion.span
                            className="bg-gradient-to-br from-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
                            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            Arsenal
                        </motion.span>
                    </motion.h2>
                </motion.div>

                {/* Skills Grid */}
                <div className="flex flex-col gap-6 md:gap-8">
                    {SKILL_CATEGORIES.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                            className="rounded-2xl border border-purple-900/30 bg-[#12121e]/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]"
                        >
                            {/* Category Title */}
                            <motion.h3
                                variants={fadeUp}
                                className="flex items-center gap-4 text-xl font-bold text-white"
                            >
                                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[14px]" style={{ backgroundColor: `${category.accent}15`, color: category.accent }}>
                                    0{idx + 1}
                                </span>
                                {category.title}
                                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                            </motion.h3>

                            {/* Skills Row */}
                            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                {category.skills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        variants={fadeUp}
                                        whileHover={{ scale: 1.05, y: -4 }}
                                        className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-[#0c0818] p-5 transition-all duration-300"
                                    >
                                        {/* Hover Glow */}
                                        <div
                                            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                            style={{ boxShadow: `0 0 20px ${skill.color}30, inset 0 0 10px ${skill.color}15`, border: `1px solid ${skill.color}50` }}
                                        />

                                        <skill.icon
                                            className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
                                            style={{ color: skill.color }}
                                        />
                                        <span className="font-semibold text-[13px] text-gray-400 transition-colors duration-300 group-hover:text-white">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
