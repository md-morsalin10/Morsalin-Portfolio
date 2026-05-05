'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

/* ─── Data ──────────────────────────────────────────────── */
const TIMELINE = [
    {
        year: '2026 – Present',
        title: 'Specializing in MERN Stack',
        organization: 'Programming Hero',
        description: 'Focusing on professional software engineering, building production-grade projects like SkillSphere and Summer Essentials Store using the full MERN stack.',
        icon: '🚀',
        accent: '#a855f7',
        tags: ['MongoDB', 'Express', 'React', 'Node.js'],
        status: 'active',
    },
    {
        year: '2025',
        title: 'Diploma in Engineering',
        organization: 'Dinajpur Polytechnic Institute',
        description: 'Completed graduation with a focus on core engineering principles, technical development, and problem-solving fundamentals.',
        icon: '🎓',
        accent: '#3b82f6',
        tags: ['Engineering', 'Mathematics', 'Physics'],
        status: 'done',
    },
    {
        year: '2026 (Ongoing)',
        title: '100 Days of Coding Challenge',
        organization: 'Self-Driven',
        description: 'Consistently building and shipping daily updates to sharpen problem-solving skills, explore new libraries, and strengthen DSA fundamentals.',
        icon: '⚡',
        accent: '#22c55e',
        tags: ['DSA', 'Daily Build', 'Open Source'],
        status: 'active',
    },
];

/* ─── Easing ─────────────────────────────────────────────── */
const expo = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.72, delay, ease: expo },
    },
});

const stagger = (d = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: d } },
});

const tagV = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 20 } },
};

/* ─── 3-D Tilt Card ─────────────────────────────────────── */
function TiltCard({ children, className, accent }) {
    const ref = useRef(null);
    const [hov, setHov] = useState(false);
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 100, damping: 14 });
    const sry = useSpring(ry, { stiffness: 100, damping: 14 });

    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        rx.set(-(((e.clientY - r.top) / r.height) - 0.5) * 12);
        ry.set((((e.clientX - r.left) / r.width) - 0.5) * 12);
    };
    const onLeave = () => { rx.set(0); ry.set(0); setHov(false); };

    return (
        <motion.div
            ref={ref}
            style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', perspective: 800 }}
            onMouseMove={onMove}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={onLeave}
            className={`relative ${className}`}
        >
            {/* outer glow */}
            <motion.div
                className="absolute -inset-px rounded-2xl pointer-events-none"
                animate={{ opacity: hov ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: `radial-gradient(ellipse at 40% 0%, ${accent}28, transparent 65%)` }}
            />
            {children}
        </motion.div>
    );
}

/* ─── Single Timeline Item ──────────────────────────────── */
function TimelineItem({ item, index, isLast }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <div ref={ref} className="relative flex gap-6 md:gap-10">

            {/* ── Spine column ── */}
            <div className="flex flex-col items-center flex-shrink-0 w-10">

                {/* Dot */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: index * 0.15 }}
                    className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0"
                    style={{ borderColor: item.accent, background: '#060412' }}
                >
                    {/* Pulse ring */}
                    {item.status === 'active' && (
                        <motion.span
                            className="absolute inset-0 rounded-full"
                            animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{ duration: 2.2, repeat: Infinity }}
                            style={{ background: item.accent }}
                        />
                    )}
                    <motion.span
                        animate={{ boxShadow: [`0 0 0 3px ${item.accent}30`, `0 0 0 7px ${item.accent}05`, `0 0 0 3px ${item.accent}30`] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-base z-10 relative"
                    >
                        {item.icon}
                    </motion.span>
                </motion.div>

                {/* Spine line */}
                {!isLast && (
                    <div className="relative flex-1 w-px mt-2 overflow-hidden bg-white/5">
                        <motion.div
                            className="absolute top-0 left-0 w-full"
                            style={{ background: `linear-gradient(to bottom, ${item.accent}55, transparent)` }}
                            initial={{ height: '0%' }}
                            animate={inView ? { height: '100%' } : {}}
                            transition={{ duration: 1.2, delay: index * 0.15 + 0.3, ease: expo }}
                        />
                    </div>
                )}
            </div>

            {/* ── Card ── */}
            <motion.div
                initial={{ opacity: 0, x: 32, filter: 'blur(8px)' }}
                animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.75, delay: index * 0.15 + 0.1, ease: expo }}
                className="pb-12 flex-1 min-w-0"
            >
                <TiltCard accent={item.accent} className="w-full">
                    <div
                        className="relative p-6 rounded-2xl border bg-[#0c0818] overflow-hidden transition-colors duration-300"
                        style={{ borderColor: `${item.accent}20` }}
                    >
                        {/* Top accent line */}
                        <motion.div
                            className="absolute top-0 left-0 h-[2px] rounded-tl-2xl"
                            style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
                            initial={{ width: '0%' }}
                            animate={inView ? { width: '100%' } : {}}
                            transition={{ duration: 1, delay: index * 0.15 + 0.4, ease: expo }}
                        />

                        {/* Number watermark */}
                        <span
                            className="absolute top-4 right-5 font-mono font-black text-[52px] leading-none select-none pointer-events-none"
                            style={{ color: `${item.accent}10` }}
                        >
                            {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Year + status */}
                        <div className="flex items-center gap-2.5 mb-3">
                            <span
                                className="font-mono text-[10px] tracking-[.16em] uppercase px-2.5 py-1 rounded-full border"
                                style={{ color: item.accent, borderColor: `${item.accent}35`, background: `${item.accent}10` }}
                            >
                                {item.year}
                            </span>
                            {item.status === 'active' && (
                                <motion.span
                                    className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-green-400 bg-green-500/8 border border-green-500/20 px-2.5 py-1 rounded-full"
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <motion.span
                                        className="w-1.5 h-1.5 rounded-full bg-green-400"
                                        animate={{ scale: [1, 1.4, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                    Active
                                </motion.span>
                            )}
                        </div>

                        {/* Title */}
                        <h3 className="text-[18px] font-bold text-white leading-snug mb-1">{item.title}</h3>

                        {/* Org */}
                        <p className="font-mono text-[12px] mb-4" style={{ color: `${item.accent}bb` }}>
                            @ {item.organization}
                        </p>

                        {/* Description */}
                        <p className="text-gray-500 text-[13.5px] leading-[1.8] mb-5">{item.description}</p>

                        {/* Tags */}
                        <motion.div
                            variants={stagger(0.05)}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            className="flex flex-wrap gap-1.5"
                        >
                            {item.tags.map((t) => (
                                <motion.span
                                    key={t}
                                    variants={tagV}
                                    className="font-mono text-[10px] px-2.5 py-1 rounded-lg border"
                                    style={{ color: `${item.accent}bb`, borderColor: `${item.accent}22`, background: `${item.accent}0c` }}
                                >
                                    {t}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </TiltCard>
            </motion.div>
        </div>
    );
}

/* ─── Main ──────────────────────────────────────────────── */
export default function Experience() {
    return (
        <section className="relative py-28 px-6 bg-[#060412] overflow-hidden">

            {/* Ambient orbs */}
            <motion.div
                className="pointer-events-none absolute top-1/4 -right-32 w-[420px] h-[420px] rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#7c3aed,transparent_65%)]" />
            </motion.div>
            <motion.div
                className="pointer-events-none absolute bottom-1/4 -left-20 w-[300px] h-[300px] rounded-full"
                animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#a855f7,transparent_65%)]" />
            </motion.div>

            {/* Grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.026]"
                style={{
                    backgroundImage:
                        'linear-gradient(#a855f7 1px,transparent 1px),linear-gradient(90deg,#a855f7 1px,transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="max-w-3xl mx-auto">

                {/* ── Header ── */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                    variants={stagger(0)}
                    className="text-center mb-18"
                >
                    <motion.div variants={fadeUp(0)} className="flex items-center justify-center gap-3 mb-5">
                        <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/50" />
                        <span className="font-mono text-[11px] tracking-[.18em] uppercase text-violet-400/70">My Journey</span>
                        <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/50" />
                    </motion.div>

                    <motion.h2
                        variants={fadeUp(0.06)}
                        className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4"
                    >
                        Experience &{' '}
                        <motion.span
                            className="bg-gradient-to-br from-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
                            style={{ backgroundSize: '200% 200%' }}
                            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                            Education
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        variants={fadeUp(0.12)}
                        className="text-gray-500 text-[14px] max-w-sm mx-auto leading-relaxed"
                    >
                        A timeline of my growth — from academic foundations to real-world engineering.
                    </motion.p>
                </motion.div>

                {/* ── Timeline ── */}
                <div className="mt-14">
                    {TIMELINE.map((item, i) => (
                        <TimelineItem
                            key={i}
                            item={item}
                            index={i}
                            isLast={i === TIMELINE.length - 1}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}