'use client';

import Image from 'next/image';
import {
    motion,
    useMotionValue,
    useTransform,
    useSpring,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import image from '@/assets/Morsalin.png';


/* ─── Data ─────────────────────────────────────────────── */
const techStack = [
    { name: 'MongoDB', dot: '#4db380' },
    { name: 'Express.js', dot: '#f0db4f' },
    { name: 'React', dot: '#61dafb' },
    { name: 'Node.js', dot: '#83cd29' },
    { name: 'JavaScript', dot: '#f7df1e' },
];

/* ─── Shared Easing ─────────────────────────────────────── */
const expo = [0.16, 1, 0.3, 1];

/* ─── Variants ──────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 44, filter: 'blur(10px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.8, delay, ease: expo },
    },
});

const staggerWrap = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } },
};

const tagItem = {
    hidden: { opacity: 0, scale: 0.7, y: 18 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { type: 'spring', stiffness: 280, damping: 20 },
    },
};

/* ─── Typewriter ────────────────────────────────────────── */
const WORDS = ['MERN Stack', 'Full-Stack', 'React & Node'];

function useTypewriter(speed = 78, pause = 2000) {
    const [display, setDisplay] = useState('');
    const [wIdx, setWIdx] = useState(0);
    const [cIdx, setCIdx] = useState(0);
    const [del, setDel] = useState(false);

    useEffect(() => {
        const word = WORDS[wIdx];
        const id = setTimeout(() => {
            if (!del) {
                const next = word.slice(0, cIdx + 1);
                setDisplay(next);
                if (cIdx + 1 === word.length) setTimeout(() => setDel(true), pause);
                else setCIdx(c => c + 1);
            } else {
                const next = word.slice(0, cIdx - 1);
                setDisplay(next);
                if (cIdx - 1 === 0) {
                    setDel(false);
                    setWIdx(w => (w + 1) % WORDS.length);
                    setCIdx(0);
                } else {
                    setCIdx(c => c - 1);
                }
            }
        }, del ? speed / 2 : speed);
        return () => clearTimeout(id);
    }, [cIdx, del, wIdx, speed, pause]);

    return display;
}

/* ─── Floating Particle ─────────────────────────────────── */
function Particle({ x, y, size, dur, delay }) {
    return (
        <motion.div
            className="absolute rounded-full bg-violet-400/25 pointer-events-none"
            style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
            animate={{ y: [0, -36, 0], opacity: [0, 0.55, 0], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
        />
    );
}

/* ─── Magnetic Button ───────────────────────────────────── */
function MagBtn({ children, className }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 140, damping: 14 });
    const sy = useSpring(y, { stiffness: 140, damping: 14 });

    const move = (e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.38);
        y.set((e.clientY - r.top - r.height / 2) * 0.38);
    };
    const leave = () => { x.set(0); y.set(0); };

    return (
        <motion.button
            ref={ref}
            style={{ x: sx, y: sy }}
            onMouseMove={move}
            onMouseLeave={leave}
            whileTap={{ scale: 0.94 }}
            className={className}
        >
            {children}
        </motion.button>
    );
}

/* ─── Hero ──────────────────────────────────────────────── */
export default function Hero() {
    const typed = useTypewriter();
    const [mounted, setMounted] = useState(false);
    const [particleList, setParticleList] = useState([]);

    /* Mouse-parallax for orbs */
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const o1x = useTransform(mx, [0, 1], [-28, 28]);
    const o1y = useTransform(my, [0, 1], [-28, 28]);
    const o2x = useTransform(mx, [0, 1], [24, -24]);
    const o2y = useTransform(my, [0, 1], [24, -24]);

    const onMouse = (e) => {
        mx.set(e.clientX / window.innerWidth);
        my.set(e.clientY / window.innerHeight);
    };

    /* Particles */
    useEffect(() => {
        // মাউন্ট হওয়ার পর পার্টিকেল জেনারেট করা
        const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 5 + 3,
            dur: Math.random() * 4 + 3,
            delay: Math.random() * 5,
        }));

        setParticleList(generatedParticles);
        setMounted(true); // সব ডেটা সেট হওয়ার পর মাউন্টেড ট্রু করা
    }, []);

    if (!mounted) return <section className="relative min-h-screen bg-[#060412]" />;

    return (
        <motion.section
            className="relative min-h-screen bg-[#060412] flex items-center justify-center overflow-hidden px-6 py-25"
            onMouseMove={onMouse}
            initial="hidden"
            animate="visible"
        >
            {/* Particles */}
            {particleList.map(p => <Particle key={p.id} {...p} />)}

            {/* Orb 1 */}
            <motion.div
                style={{ x: o1x, y: o1y }}
                className="pointer-events-none absolute -top-24 -left-32 w-135 h-135 rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.42, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#5b21b6,transparent_65%)]" />
            </motion.div>

            {/* Orb 2 */}
            <motion.div
                style={{ x: o2x, y: o2y }}
                className="pointer-events-none absolute -bottom-20 -right-28 w-[440px] h-[440px] rounded-full"
                animate={{ scale: [1, 1.14, 1], opacity: [0.2, 0.32, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#a855f7,transparent_65%)]" />
            </motion.div>

            {/* Grid */}
            <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(139,92,246,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.04) 1px,transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* ── Content ── */}
            <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center">

                {/* Status badge */}
                <motion.div variants={fadeUp(0)} className="flex items-center gap-2.5 mb-8">
                    <motion.span
                        className="w-2 h-2 rounded-full bg-green-400"
                        animate={{
                            boxShadow: [
                                '0 0 0 3px rgba(34,197,94,.22)',
                                '0 0 0 8px rgba(34,197,94,.04)',
                                '0 0 0 3px rgba(34,197,94,.22)',
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.span
                        className="font-mono text-[11px] tracking-[.15em] uppercase text-violet-400 bg-violet-500/10 border border-violet-500/25 px-3.5 py-1.5 rounded-full"
                        whileHover={{ borderColor: 'rgba(168,85,247,0.5)', scale: 1.03 }}
                    >
                        Available for work
                    </motion.span>
                </motion.div>

                {/* Avatar */}
                <motion.div
                    className="relative w-32 h-32 mb-9"
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.12, ease: expo }}
                >
                    {/* Outer slow ring */}
                    <motion.div
                        className="absolute -inset-2.5 rounded-full"
                        style={{ background: 'conic-gradient(from 180deg,#7c3aed33,transparent,#a855f733)' }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Main spinning ring */}
                    <motion.div
                        className="absolute -inset-1.25 rounded-full"
                        style={{
                            background: 'conic-gradient(from 0deg,#7c3aed,#a855f7,#c084fc,#e879f9,#7c3aed)',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Avatar image */}
                    <div className="absolute inset-0.75 rounded-full bg-[#0f0b1e] overflow-hidden">
                        <Image
                            src={image}
                            alt="Morsalin"  
                            fill
                            priority
                            className="object-cover" />
                    </div>

                    {/* Greeting bubble */}
                    <motion.div
                        className="absolute -top-3 -right-24 bg-[#0f0b1e]/95 border border-violet-500/30 text-violet-300 text-[12px] font-mono px-3.5 py-2 rounded-xl whitespace-nowrap z-20"
                        initial={{ opacity: 0, x: -16, scale: 0.82 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.7 }}
                        whileHover={{ scale: 1.06, borderColor: 'rgba(168,85,247,.6)' }}
                    >
                        Hi! I&apos;m{' '}
                        <motion.span
                            className="font-bold"
                            animate={{ color: ['#a855f7', '#c084fc', '#e879f9', '#a855f7'] }}
                            transition={{ duration: 3.5, repeat: Infinity }}
                        >
                            Morsalin
                        </motion.span>{' '}
                        👋
                        <span className="absolute -left-1.75 top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-violet-500/30" />
                    </motion.div>
                </motion.div>

                {/* Label */}
                <motion.p
                    variants={fadeUp(0.1)}
                    className="font-mono text-[11px] tracking-[.18em] uppercase text-violet-300/70 mb-5"
                >
                    Full-Stack Magician
                </motion.p>

                {/* Headline */}
                <motion.h1
                    variants={fadeUp(0.18)}
                    className="text-5xl md:text-[62px] font-extrabold leading-[1.08] tracking-tight text-[#f5f3ff] mb-2"
                >
                    Building scalable
                    <br />
                    apps with{' '}
                    <span className="inline-flex items-end">
                        <motion.span
                            className="bg-linear-to-br from-violet-400 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent"
                            style={{ backgroundSize: '200% 200%' }}
                            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                        >
                            {typed}
                        </motion.span>
                        {/* blinking cursor */}
                        <motion.span
                            className="inline-block w-0.75 h-[0.85em] bg-violet-400 ml-1 mb-1 align-bottom rounded-sm"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.75, repeat: Infinity }}
                        />
                    </span>
                </motion.h1>

                {/* Animated SVG underline */}
                <motion.div variants={fadeUp(0.24)} className="mb-7">
                    <svg viewBox="0 0 180 14" className="mx-auto w-38.75" fill="none">
                        <motion.path
                            d="M4 10 Q90 1 176 10"
                            stroke="url(#ug)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.4, delay: 0.65, ease: expo }}
                        />
                        <defs>
                            <linearGradient id="ug" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#7c3aed" />
                                <stop offset="100%" stopColor="#e879f9" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>

                {/* Description */}
                <motion.p
                    variants={fadeUp(0.3)}
                    className="text-gray-400 max-w-2xl mx-auto text-[15px] leading-relaxed mb-9"
                >
                    Crafting high-performance web applications using{' '}
                    <span className="text-violet-200 font-medium">
                        MongoDB, Express.js, React &amp; Node.js
                    </span>
                    . Turning complex business requirements into elegant, scalable code solutions.
                </motion.p>

                {/* Tech tags — stagger */}
                <motion.div
                    variants={staggerWrap}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center gap-2.5 mb-10"
                >
                    {techStack.map(({ name, dot }) => (
                        <motion.span
                            key={name}
                            variants={tagItem}
                            whileHover={{
                                scale: 1.09,
                                y: -4,
                                borderColor: 'rgba(168,85,247,.6)',
                                backgroundColor: 'rgba(139,92,246,.12)',
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#0f0b1e]/80 border border-violet-500/20 rounded-full font-mono text-[12px] text-violet-300 cursor-default"
                        >
                            <motion.span
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ background: dot }}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.65, 1, 0.65] }}
                                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            {name}
                        </motion.span>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div variants={fadeUp(0.52)} className="flex gap-4 flex-wrap justify-center">

                    <MagBtn className="relative px-8 py-3.5 rounded-xl font-bold text-[14px] text-white overflow-hidden group">
                        <motion.span
                            className="absolute inset-0 bg-linear-to-br from-violet-600 to-fuchsia-500"
                            animate={{ opacity: [1, 0.82, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.span
                            className="absolute inset-0"
                            animate={{
                                boxShadow: [
                                    '0 0 18px rgba(139,92,246,.38)',
                                    '0 0 38px rgba(139,92,246,.62)',
                                    '0 0 18px rgba(139,92,246,.38)',
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                            View My Work
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                ↗
                            </motion.span>
                        </span>
                    </MagBtn>

                    <MagBtn className="px-8 py-3.5 border border-violet-500/35 text-violet-300 font-semibold text-[14px] rounded-xl hover:border-violet-400 hover:bg-violet-500/8 transition-colors">
                        <motion.span
                            className="inline-flex items-center gap-2"
                            whileHover={{ x: 3 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            Contact Me
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                →
                            </motion.span>
                        </motion.span>
                    </MagBtn>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div variants={fadeUp(0.72)} className="mt-14 flex flex-col items-center gap-2">
                    <motion.span
                        className="font-mono text-[10px] tracking-[.18em] uppercase text-violet-400/40"
                        animate={{ opacity: [0.4, 0.75, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    >
                        Scroll
                    </motion.span>
                    <div className="relative w-px h-12 overflow-hidden bg-transparent">
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-linear-to-b from-violet-500 to-transparent"
                            animate={{ height: ['0%', '100%', '100%', '0%'], top: ['0%', '0%', '0%', '100%'] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.6, 1] }}
                        />
                    </div>
                </motion.div>

            </div>
        </motion.section>
    );
}