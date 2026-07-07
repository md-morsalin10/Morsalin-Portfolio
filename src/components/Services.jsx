'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

/* ─── Data ─────────────────────────────────────────────── */
const services = [
    {
        title: 'Frontend Engineering',
        desc: 'Building high-performance, interactive, and responsive UIs using Next.js, React, and Tailwind CSS — with a sharp focus on core web vitals and pixel-perfect design.',
        icon: '💻',
        tag: 'UI / UX',
        accent: '#3b82f6',
        grad: 'from-blue-500/10 via-cyan-500/5 to-transparent',
        border: 'rgba(59,130,246,0.25)',
        glow: 'rgba(59,130,246,0.18)',
        skills: ['Next.js', 'React', 'Tailwind', 'TypeScript'],
    },
    {
        title: 'Full-Stack Solutions',
        desc: 'Developing robust, scalable server-side applications with the MERN stack — from RESTful APIs and auth systems to database design and cloud deployment.',
        icon: '⚙️',
        tag: 'Backend / API',
        accent: '#22c55e',
        grad: 'from-green-500/10 via-emerald-500/5 to-transparent',
        border: 'rgba(34,197,94,0.25)',
        glow: 'rgba(34,197,94,0.15)',
        skills: ['MongoDB', 'Express', 'Node.js', 'REST API'],
    },
    {
        title: 'Motion & UI Design',
        desc: 'Crafting premium digital experiences through advanced animations with Framer Motion and GSAP — turning ordinary interfaces into smooth, engaging journeys.',
        icon: '✨',
        tag: 'Animation',
        accent: '#a855f7',
        grad: 'from-violet-500/10 via-fuchsia-500/5 to-transparent',
        border: 'rgba(168,85,247,0.25)',
        glow: 'rgba(168,85,247,0.18)',
        skills: ['Framer Motion', 'GSAP', 'CSS', 'SVG'],
    },
];

/* ─── Easing ────────────────────────────────────────────── */
const expo = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.75, delay, ease: expo },
    },
});

const stagger = (delay = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

const cardVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.94 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.7, ease: expo },
    },
};

const skillVariant = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 20 } },
};

/* ─── 3-D Tilt Service Card ─────────────────────────────── */
function ServiceCard({ service, index }) {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 100, damping: 14 });
    const sry = useSpring(ry, { stiffness: 100, damping: 14 });
    const rotX = useTransform(srx, v => `${v}deg`);
    const rotY = useTransform(sry, v => `${v}deg`);

    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        rx.set(-(((e.clientY - r.top) / r.height) - 0.5) * 16);
        ry.set((((e.clientX - r.left) / r.width) - 0.5) * 16);
    };
    const onLeave = () => { rx.set(0); ry.set(0); setHovered(false); };

    return (
        <motion.div
            variants={cardVariant}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 900 }}
            ref={ref}
            onMouseMove={onMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={onLeave}
            className="relative group cursor-default"
        >
            {/* Outer glow */}
            <motion.div
                className="absolute -inset-px rounded-3xl pointer-events-none"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: `radial-gradient(circle at 50% 0%, ${service.glow}, transparent 70%)` }}
            />

            {/* Card body */}
            <div
                className={`relative h-full p-7 rounded-3xl border bg-linear-to-br ${service.grad} backdrop-blur-xl overflow-hidden transition-colors duration-300`}
                style={{ borderColor: hovered ? service.border : 'rgba(255,255,255,0.06)' }}
            >

                {/* Inner shine */}
                <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        background: `radial-gradient(ellipse at 30% 10%, ${service.accent}18, transparent 60%)`,
                    }}
                />

                {/* Number watermark */}
                <span
                    className="absolute top-5 right-6 font-mono font-black text-[56px] leading-none select-none pointer-events-none"
                    style={{ color: `${service.accent}12` }}
                >
                    {String(index + 1).padStart(2, '0')}
                </span>

                {/* Tag */}
                <motion.span
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[.16em] uppercase px-3 py-1 rounded-full border mb-5"
                    style={{
                        color: service.accent,
                        borderColor: `${service.accent}35`,
                        backgroundColor: `${service.accent}10`,
                    }}
                    animate={hovered ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260 }}
                >
                    <motion.span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: service.accent }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    {service.tag}
                </motion.span>

                {/* Icon */}
                <motion.div
                    className="text-4xl mb-4 w-14 h-14 flex items-center justify-center rounded-2xl border"
                    style={{ borderColor: `${service.accent}25`, background: `${service.accent}0f` }}
                    animate={hovered ? { rotate: [0, -8, 8, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {service.icon}
                </motion.div>

                {/* Title */}
                <h3
                    className="text-[19px] font-bold text-white mb-3 tracking-tight leading-snug"
                >
                    {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-[13.5px] leading-[1.8] mb-6">
                    {service.desc}
                </p>

                {/* Skill pills */}
                <motion.div
                    variants={stagger(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2"
                >
                    {service.skills.map((s) => (
                        <motion.span
                            key={s}
                            variants={skillVariant}
                            className="px-2.5 py-1 rounded-lg font-mono text-[11px] border"
                            style={{
                                color: `${service.accent}cc`,
                                borderColor: `${service.accent}22`,
                                backgroundColor: `${service.accent}0a`,
                            }}
                        >
                            {s}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Animated bottom bar */}
                <motion.div
                    className="absolute bottom-0 left-0 h-0.5 rounded-b-3xl"
                    style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
                    animate={{ width: hovered ? '100%' : '0%' }}
                    transition={{ duration: 0.55, ease: expo }}
                />
            </div>
        </motion.div>
    );
}

/* ─── Main ──────────────────────────────────────────────── */
export default function Services() {
    return (
        <section id='services' className="relative py-28 px-6 bg-[#060412] overflow-hidden">

            {/* Ambient orbs */}
            <motion.div
                className="pointer-events-none absolute -top-10 right-0 w-125 h-125 rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.2, 0.12] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#7c3aed,transparent_65%)]" />
            </motion.div>
            <motion.div
                className="pointer-events-none absolute bottom-0 -left-20 w-100 h-100 rounded-full"
                animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#a855f7,transparent_65%)]" />
            </motion.div>

            {/* Grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.028]"
                style={{
                    backgroundImage:
                        'linear-gradient(#a855f7 1px,transparent 1px),linear-gradient(90deg,#a855f7 1px,transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                    variants={stagger(0)}
                    className="text-center mb-18"
                >
                    {/* Section label */}
                    <motion.div variants={fadeUp(0)} className="flex items-center justify-center gap-3 mb-5">
                        <span className="h-px w-10 bg-linear-to-r from-transparent to-violet-500/50" />
                        <span className="font-mono text-[11px] tracking-[.18em] uppercase text-violet-400/70">
                            What I Do
                        </span>
                        <span className="h-px w-10 bg-linear-to-l from-transparent to-violet-500/50" />
                    </motion.div>

                    <motion.h2
                        variants={fadeUp(0.06)}
                        className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5"
                    >
                        My Specialized{' '}
                        <motion.span
                            className="bg-linear-to-br from-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
                            style={{ backgroundSize: '200% 200%' }}
                            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                            Services
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        variants={fadeUp(0.12)}
                        className="text-gray-400 max-w-md mx-auto text-[14.5px] leading-relaxed"
                    >
                        Transforming complex ideas into seamless digital realities — through precision engineering and modern design.
                    </motion.p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={stagger(0.15)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-14"
                >
                    {services.map((s, i) => (
                        <ServiceCard key={s.title} service={s} index={i} />
                    ))}
                </motion.div>

                {/* Bottom CTA strip */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp(0.2)}
                    className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-5 p-6 rounded-2xl border border-white/6 bg-white/3"
                >
                    <div>
                        <p className="text-white font-semibold text-[15px] mb-0.5">Have a project in mind?</p>
                        <p className="text-gray-500 text-[13px] font-mono">Let&apos;s build something great together.</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className="relative px-7 py-3 rounded-xl font-bold text-[14px] text-white overflow-hidden shrink-0"
                    >
                        <motion.span
                            className="absolute inset-0 bg-linear-to-br from-violet-600 to-fuchsia-500"
                            animate={{ opacity: [1, 0.82, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.span
                            className="absolute inset-0 rounded-xl"
                            animate={{ boxShadow: ['0 0 16px rgba(139,92,246,.35)', '0 0 30px rgba(139,92,246,.6)', '0 0 16px rgba(139,92,246,.35)'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                            Start a Project
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                →
                            </motion.span>
                        </span>
                    </motion.button>
                </motion.div>

            </div>
        </section>
    );
}