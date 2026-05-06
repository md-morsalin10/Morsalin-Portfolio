'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import image from '@/assets/Morsalin.png';

/* ─── Data ─────────────────────────────────────────────── */
const stats = [
    { num: '15+', label: 'Projects Built' },
    { num: '1yr+', label: 'Experience' },
    { num: '100%', label: 'Client Focused' },
];

const cards = [
    { icon: '🎓', label: 'Education', val: 'Diploma in Engineering' },
    { icon: '⚡', label: 'Specialization', val: 'MERN Stack' },
    { icon: '📍', label: 'Location', val: 'Bangladesh' },
    { icon: '🎨', label: 'Passion', val: 'Modern UI & Animations' },
];

const skills = ['Next.js', 'React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'];

/* ─── Shared easing ─────────────────────────────────────── */
const expo = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.75, delay, ease: expo },
    },
});

const stagger = (delayChildren = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren } },
});

const cardVariant = {
    hidden: { opacity: 0, y: 24, scale: 0.93 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { type: 'spring', stiffness: 240, damping: 22 },
    },
};

const skillVariant = {
    hidden: { opacity: 0, x: -14 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};

/* ─── 3-D Tilt Card ─────────────────────────────────────── */
function TiltCard({ children, className }) {
    const ref = useRef(null);
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 120, damping: 16 });
    const sry = useSpring(ry, { stiffness: 120, damping: 16 });
    const rotX = useTransform(srx, v => `${v}deg`);
    const rotY = useTransform(sry, v => `${v}deg`);

    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx.set(-py * 14);
        ry.set(px * 14);
    };
    const onLeave = () => { rx.set(0); ry.set(0); };

    return (
        <motion.div
            ref={ref}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 800 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ─── Animated Counter ──────────────────────────────────── */
function StatBadge({ num, label, delay }) {
    return (
        <motion.div
            variants={fadeUp(delay)}
            className="flex flex-col items-center gap-1"
        >
            <motion.span
                className="text-3xl font-extrabold bg-gradient-to-br from-violet-300 to-fuchsia-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 14, delay }}
                viewport={{ once: true }}
            >
                {num}
            </motion.span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-gray-500">{label}</span>
        </motion.div>
    );
}

/* ─── Main ──────────────────────────────────────────────── */
export default function About() {
    return (
        <section className="relative py-28 px-6 bg-[#060412] overflow-hidden">

            {/* Ambient orbs */}
            <motion.div
                className="pointer-events-none absolute top-1/4 -left-40 w-[480px] h-[480px] rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.18, 0.28, 0.18] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#5b21b6,transparent_65%)]" />
            </motion.div>
            <motion.div
                className="pointer-events-none absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full"
                animate={{ scale: [1, 1.15, 1], opacity: [0.14, 0.24, 0.14] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#a855f7,transparent_65%)]" />
            </motion.div>

            {/* Subtle grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        'linear-gradient(#a855f7 1px,transparent 1px),linear-gradient(90deg,#a855f7 1px,transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="max-w-6xl mx-auto">

                {/* Section label */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                    variants={fadeUp(0)}
                    className="flex items-center gap-3 mb-16"
                >
                    <span className="h-px flex-1 max-w-[48px] bg-gradient-to-r from-transparent to-violet-500/50" />
                    <span className="font-mono text-[11px] tracking-[.18em] uppercase text-violet-400/70">About Me</span>
                    <span className="h-px w-8 bg-violet-500/30" />
                </motion.div>

                {/* Main 2-col layout */}
                <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-20">

                    {/* ── Left: Avatar ── */}
                    <motion.div
                        className="w-full lg:w-auto flex-shrink-0 flex flex-col items-center gap-8"
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                        variants={stagger(0)}
                    >
                        {/* Avatar card with 3D tilt */}
                        <motion.div variants={fadeUp(0)}>
                            <TiltCard className="relative w-64 h-72 md:w-72 md:h-80">
                                {/* Glow */}
                                <div className="absolute inset-0 rounded-3xl bg-violet-500/15 blur-[50px]" />
                                {/* Spinning border */}
                                <motion.div
                                    className="absolute inset-[-3px] rounded-3xl"
                                    style={{
                                        background: 'conic-gradient(from 0deg,#7c3aed,#a855f7,#c084fc,transparent,#7c3aed)',
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                                />
                                {/* Image */}
                                <div className="relative  z-10 w-full h-full rounded-3xl overflow-hidden bg-[#0f0b1e] border border-violet-500/10">
                                    <Image
                                        src={image}
                                        alt="Morsalin"
                                        priority
                                        fill
                                        className="object-cover" />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#060412]/70 via-transparent to-transparent" />
                                </div>

                                {/* Floating badge */}
                                <motion.div
                                    className="absolute -top-5 -right-5 bg-violet-600 text-white px-3.5 py-2 rounded-2xl text-[13px] font-semibold shadow-lg shadow-violet-600/40 z-20 whitespace-nowrap"
                                    initial={{ rotate: -12, scale: 0, opacity: 0 }}
                                    whileInView={{ rotate: -6, scale: 1, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    whileHover={{ rotate: -2, scale: 1.06 }}
                                >
                                    Building the future ✨
                                </motion.div>

                                {/* Bottom name chip */}
                                <motion.div
                                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0f0b1e] border border-violet-500/30 px-4 py-2 rounded-full text-[13px] font-mono text-violet-300 whitespace-nowrap z-20 shadow-xl"
                                    initial={{ y: 16, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, ease: expo, duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    @morsalin.dev
                                </motion.div>
                            </TiltCard>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            variants={stagger(0.3)}
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="flex gap-8 mt-6"
                        >
                            {stats.map((s, i) => (
                                <StatBadge key={s.label} num={s.num} label={s.label} delay={0.3 + i * 0.1} />
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── Right: Content ── */}
                    <motion.div
                        className="flex-1 text-left"
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                        variants={stagger(0.05)}
                    >
                        {/* Headline */}
                        <motion.h2
                            variants={fadeUp(0)}
                            className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
                        >
                            Engineering digital solutions{' '}
                            <br className="hidden md:block" />
                            with{' '}
                            <motion.span
                                className="bg-gradient-to-br from-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
                                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                precision & purpose.
                            </motion.span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            variants={fadeUp(0.08)}
                            className="text-gray-400 text-[15px] leading-[1.85] mb-8 max-w-xl"
                        >
                            I&apos;m an aspiring{' '}
                            <span className="text-violet-200 font-medium">Software Engineer</span>{' '}
                            dedicated to crafting high-performance web applications. With a strong foundation from my{' '}
                            <span className="text-violet-200 font-medium">Diploma in Engineering</span>, I&apos;ve
                            specialized in{' '}
                            <span className="text-violet-200 font-medium">MERN Stack</span>{' '}
                            development — focused on premium, user-centric experiences with clean code and modern UI/UX.
                        </motion.p>

                        {/* Skill pills */}
                        <motion.div
                            variants={stagger(0.12)}
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="flex flex-wrap gap-2 mb-10"
                        >
                            {skills.map((s) => (
                                <motion.span
                                    key={s}
                                    variants={skillVariant}
                                    whileHover={{ scale: 1.07, y: -2, borderColor: 'rgba(168,85,247,.6)' }}
                                    className="px-3.5 py-1.5 rounded-full font-mono text-[12px] text-violet-300 bg-violet-500/8 border border-violet-500/20 cursor-default"
                                >
                                    {s}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Info cards grid */}
                        <motion.div
                            variants={stagger(0.16)}
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="grid grid-cols-2 gap-3"
                        >
                            {cards.map((c) => (
                                <motion.div
                                    key={c.label}
                                    variants={cardVariant}
                                    whileHover={{
                                        scale: 1.03,
                                        borderColor: 'rgba(168,85,247,.35)',
                                        backgroundColor: 'rgba(139,92,246,.08)',
                                        y: -2,
                                    }}
                                    className="p-4 rounded-2xl border border-white/6 bg-white/4 cursor-default transition-colors group"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <motion.span
                                            className="text-lg"
                                            animate={{ rotate: [0, 8, -8, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
                                        >
                                            {c.icon}
                                        </motion.span>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">{c.label}</p>
                                    </div>
                                    <p className="text-white font-semibold text-[13px] md:text-sm leading-snug">{c.val}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div variants={fadeUp(0.45)} className="mt-10 flex gap-3 flex-wrap">
                            <motion.button
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                                className="relative px-7 py-3 rounded-xl font-bold text-[14px] text-white overflow-hidden"
                            >
                                <motion.span
                                    className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-500"
                                    animate={{ opacity: [1, 0.82, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <motion.span
                                    className="absolute inset-0 rounded-xl"
                                    animate={{ boxShadow: ['0 0 16px rgba(139,92,246,.35)', '0 0 32px rgba(139,92,246,.6)', '0 0 16px rgba(139,92,246,.35)'] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <span className="relative z-10 flex items-center gap-2">
                                    Download CV
                                    <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>↓</motion.span>
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.04, y: -2, borderColor: 'rgba(168,85,247,.6)' }}
                                whileTap={{ scale: 0.96 }}
                                className="px-7 py-3 border border-violet-500/30 text-violet-300 font-semibold text-[14px] rounded-xl hover:bg-violet-500/8 transition-colors"
                            >
                                <motion.span className="flex items-center gap-2" whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 300 }}>
                                    Let&apos;s Talk →
                                </motion.span>
                            </motion.button>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}