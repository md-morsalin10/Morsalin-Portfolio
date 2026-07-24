'use client';

import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import image from '@/assets/morsalinnew.png';

gsap.registerPlugin(SplitText);

/* ─── Data ──────────────────────────────────────────────── */
const WORDS = ['MERN Stack', 'Full-Stack', 'React & Next.js', 'Node.js & Express', 'Frontend'];
const DESIGNATIONS = ['MERN Stack Developer', 'Full-Stack Engineer', 'UI-Driven Web Builder'];

const techStack = [
    { name: 'MongoDB', dot: '#4db380' },
    { name: 'Express.js', dot: '#f0db4f' },
    { name: 'React', dot: '#61dafb' },
    { name: 'Node.js', dot: '#83cd29' },
    { name: 'Next.js', dot: '#4bb360' },
    { name: 'JavaScript', dot: '#f7df1e' },
];

const STATS = [
    { value: 10, suffix: '+', label: 'Projects' },
    { value: 1, suffix: '+', label: 'Yr Exp.' },
    { value: 100, suffix: '%', label: 'Dedication' },
];

/* ─── Easing ─────────────────────────────────────────────── */
const expo = [0.16, 1, 0.3, 1];

/* ─── Variants ───────────────────────────────────────────── */
const staggerWrap = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};
const tagItem = {
    hidden: { opacity: 0, scale: 0.72, y: 16 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};
const fadeSlide = (dir = 'up', delay = 0) => ({
    hidden: {
        opacity: 0,
        x: dir === 'left' ? -40 : dir === 'right' ? 40 : 0,
        y: dir === 'up' ? 30 : 0,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1, x: 0, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.75, delay, ease: expo },
    },
});

/* ─── Typewriter ─────────────────────────────────────────── */
function useTypewriter(speed = 75, pause = 2200) {
    const [display, setDisplay] = useState('');
    const [wIdx, setWIdx] = useState(0);
    const [cIdx, setCIdx] = useState(0);
    const [del, setDel] = useState(false);

    useEffect(() => {
        const word = WORDS[wIdx];
        const id = setTimeout(() => {
            if (!del) {
                setDisplay(word.slice(0, cIdx + 1));
                if (cIdx + 1 === word.length) setTimeout(() => setDel(true), pause);
                else setCIdx(c => c + 1);
            } else {
                setDisplay(word.slice(0, cIdx - 1));
                if (cIdx - 1 === 0) { setDel(false); setWIdx(w => (w + 1) % WORDS.length); setCIdx(0); }
                else setCIdx(c => c - 1);
            }
        }, del ? speed / 2.2 : speed);
        return () => clearTimeout(id);
    }, [cIdx, del, wIdx, speed, pause]);

    return display;
}

function useAnimatedDesignation() {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % DESIGNATIONS.length);
        }, 2400);
        return () => clearInterval(id);
    }, []);

    return DESIGNATIONS[index];
}

/* ─── Count-up ───────────────────────────────────────────── */
function useCountUp(target, duration = 1.6, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        const ctrl = animate(0, target, {
            duration, ease: 'easeOut',
            onUpdate: v => setCount(Math.round(v)),
        });
        return () => ctrl.stop();
    }, [target, duration, start]);
    return count;
}

function StatItem({ value, suffix, label, started }) {
    const count = useCountUp(value, 1.8, started);
    return (
        <div className="flex flex-col items-center lg:items-start">
            <span className="text-2xl font-black bg-gradient-to-br from-violet-400 to-fuchsia-500 bg-clip-text text-transparent leading-none tabular-nums">
                {count}{suffix}
            </span>
            <span className="text-[11px] text-violet-300/50 mt-0.5 font-medium tracking-widest uppercase">
                {label}
            </span>
        </div>
    );
}

/* ─── Magnetic Button ────────────────────────────────────── */
function MagBtn({ children, className }) {
    const ref = useRef(null);
    const x = useMotionValue(0); const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 140, damping: 14 });
    const sy = useSpring(y, { stiffness: 140, damping: 14 });
    const move = (e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
    };
    const leave = () => { x.set(0); y.set(0); };
    return (
        <motion.button ref={ref} style={{ x: sx, y: sy }}
            onMouseMove={move} onMouseLeave={leave} whileTap={{ scale: 0.94 }}
            className={className}>
            {children}
        </motion.button>
    );
}

/* ─── Particle ───────────────────────────────────────────── */
function Particle({ x, y, size, dur, delay }) {
    return (
        <motion.div
            className="absolute rounded-full bg-violet-400/20 pointer-events-none"
            style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.5, 0], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
        />
    );
}

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
export default function Hero() {
    const typed = useTypewriter();
    const designation = useAnimatedDesignation();
    const [mounted, setMounted] = useState(false);
    const [particles, setParticles] = useState([]);
    const [statsStarted, setStatsStarted] = useState(false);

    /* GSAP refs */
    const nameRef = useRef(null);
    const subRef = useRef(null);
    const descRef = useRef(null);
    const leftRef = useRef(null);   // text column
    const imageRef = useRef(null);   // image column
    const ringRef = useRef(null);
    const badgeRefs = useRef([]);

    /* Orb parallax */
    const mx = useMotionValue(0.5); const my = useMotionValue(0.5);
    const o1x = useTransform(mx, [0, 1], [-30, 30]);
    const o1y = useTransform(my, [0, 1], [-30, 30]);
    const o2x = useTransform(mx, [0, 1], [25, -25]);
    const o2y = useTransform(my, [0, 1], [25, -25]);
    const onMouse = (e) => {
        mx.set(e.clientX / window.innerWidth);
        my.set(e.clientY / window.innerHeight);
    };

    /* 3-D tilt */
    const tiltX = useMotionValue(0); const tiltY = useMotionValue(0);
    const rotX = useSpring(useTransform(tiltY, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });
    const rotY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });
    const glowX = useTransform(tiltX, [-0.5, 0.5], ['0%', '100%']);
    const glowY = useTransform(tiltY, [-0.5, 0.5], ['0%', '100%']);
    const onCardMove = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        tiltX.set((e.clientX - r.left) / r.width - 0.5);
        tiltY.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onCardLeave = () => { tiltX.set(0); tiltY.set(0); };

    /* Mount */
    useEffect(() => {
        setParticles(Array.from({ length: 18 }, (_, i) => ({
            id: i,
            x: Math.random() * 100, y: Math.random() * 100,
            size: Math.random() * 5 + 3,
            dur: Math.random() * 4 + 3,
            delay: Math.random() * 5,
        })));
        setMounted(true);
    }, []);

    /* GSAP timeline */
    useEffect(() => {
        if (!mounted) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            /* LEFT text column — slides from left */
            tl.fromTo(leftRef.current,
                { x: -70, opacity: 0, filter: 'blur(8px)' },
                { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1 }
            );

            /* Name chars */
            if (nameRef.current) {
                const split = SplitText.create(nameRef.current, { type: 'chars' });
                tl.fromTo(split.chars,
                    { y: 70, opacity: 0, rotationX: -90 },
                    { y: 0, opacity: 1, rotationX: 0, duration: 0.7, stagger: 0.04, ease: 'back.out(2)' },
                    '-=0.5'
                );
            }

            /* Sub label */
            if (subRef.current) {
                const split = SplitText.create(subRef.current, { type: 'words' });
                tl.fromTo(split.words,
                    { opacity: 0, y: 18, filter: 'blur(5px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, stagger: 0.06 },
                    '-=0.3'
                );
            }

            /* Desc */
            if (descRef.current) {
                tl.fromTo(descRef.current,
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, duration: 0.55 },
                    '-=0.2'
                );
            }

            /* RIGHT image column — slides from right */
            tl.fromTo(imageRef.current,
                { x: 90, opacity: 0, scale: 0.9, filter: 'blur(10px)' },
                { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1 },
                '-=1.2'   // runs mostly in parallel with text
            );

            /* Ring */
            tl.fromTo(ringRef.current,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.7 },
                '-=0.5'
            );

            /* Badges */
            badgeRefs.current.forEach((el, i) => {
                if (!el) return;
                tl.fromTo(el,
                    { opacity: 0, scale: 0.5, y: i === 2 ? 0 : 14, x: i === 2 ? 14 : 0 },
                    { opacity: 1, scale: 1, y: 0, x: 0, duration: 0.45, ease: 'back.out(2.2)' },
                    `-=${i === 0 ? 0.1 : 0.3}`
                );
            });

            tl.call(() => setStatsStarted(true), [], '+=0.1');
        });

        return () => ctx.revert();
    }, [mounted]);

    if (!mounted) return <section className="relative min-h-screen bg-transparent" />;

    return (
        <motion.section
            className="relative min-h-screen bg-transparent flex items-center overflow-hidden px-6 md:px-12 lg:px-20"
            onMouseMove={onMouse}
            style={{ perspective: 1200 }}
        >

            {particles.map(p => <Particle key={p.id} {...p} />)}

            {/* Orb 1 */}
            <motion.div style={{ x: o1x, y: o1y }}
                className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full"
                animate={{ scale: [1, 1.08, 1], opacity: [0.28, 0.4, 0.28] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#5b21b6,transparent_65%)]" />
            </motion.div>

            {/* Orb 2 */}
            <motion.div style={{ x: o2x, y: o2y }}
                className="pointer-events-none absolute -bottom-32 -right-32 w-[440px] h-[440px] rounded-full"
                animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.3, 0.18] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#a855f7,transparent_65%)]" />
            </motion.div>

            {/* Grid */}
            <div className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(139,92,246,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.035) 1px,transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />

            {/* ── SPLIT LAYOUT ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto pt-28 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-[calc(100vh-7rem)]">

                    {/* ══════════════════════
                        LEFT — Text
                    ══════════════════════ */}
                    <div
                        ref={leftRef}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left opacity-0 order-2 lg:order-1"
                    >
                        {/* Available badge */}
                        <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full
                                        border border-violet-500/25 bg-violet-500/[0.08]
                                        font-mono text-[11px] tracking-[.14em] uppercase text-violet-400">
                            <motion.span
                                className="w-1.5 h-1.5 rounded-full bg-green-400"
                                animate={{ boxShadow: ['0 0 0 2px rgba(74,222,128,.3)', '0 0 0 7px rgba(74,222,128,0)', '0 0 0 2px rgba(74,222,128,.3)'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            Available for work
                        </div>

                        {/* Sub-label */}
                        <p ref={subRef}
                            className="font-mono text-[11px] tracking-[.18em] uppercase text-violet-300/60 mb-4">
                            Full-Stack Magician
                        </p>

                        <motion.p
                            key={designation}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className="mb-4 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200"
                        >
                            {designation}
                        </motion.p>

                        {/* Name — GSAP SplitText */}
                        <h1
                            ref={nameRef}
                            className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.04] tracking-tight text-[#f5f3ff] mb-4"
                            style={{ perspective: 600 }}
                        >
                            Md. Morsalin
                        </h1>

                        {/* Typewriter */}
                        <div className="text-xl sm:text-2xl font-semibold mb-2 min-h-[2rem]
                                        flex items-center gap-1.5 justify-center lg:justify-start">
                            <motion.span
                                className="bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% 200%' }}
                                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                            >
                                {typed}
                            </motion.span>
                            <motion.span
                                className="inline-block w-[2.5px] bg-violet-400 rounded-sm"
                                style={{ height: '1.1em' }}
                                animate={{ opacity: [1, 1, 0, 0] }}
                                transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.45, 0.45, 1], ease: 'linear' }}
                            />
                        </div>

                        {/* SVG underline */}
                        <div className="mb-6">
                            <svg viewBox="0 0 220 12" className="w-48 sm:w-56" fill="none">
                                <motion.path
                                    d="M2 9 Q110 1 218 9"
                                    stroke="url(#ug2)"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 1, ease: expo }}
                                />
                                <defs>
                                    <linearGradient id="ug2" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#7c3aed" />
                                        <stop offset="100%" stopColor="#e879f9" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        {/* Description */}
                        <p ref={descRef}
                            className="text-gray-400 text-[15px] leading-relaxed max-w-[440px] mb-7 font-light">
                            Crafting high-performance web applications using{' '}
                            <span className="text-violet-200 font-medium">
                                MongoDB, Express.js, React &amp; Node.js
                            </span>
                            . Turning complex requirements into elegant, scalable solutions.
                        </p>

                        {/* Tech tags */}
                        <motion.div
                            variants={staggerWrap}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start"
                        >
                            {techStack.map(({ name, dot }) => (
                                <motion.span
                                    key={name}
                                    variants={tagItem}
                                    whileHover={{ scale: 1.08, y: -3, borderColor: 'rgba(168,85,247,.55)' }}
                                    className="flex items-center gap-1.5 px-3.5 py-1.5
                                               bg-[#0f0b1e]/80 border border-violet-500/20
                                               rounded-full font-mono text-[11px] text-violet-300 cursor-default"
                                >
                                    <motion.span
                                        className="w-1.5 h-1.5 rounded-full shrink-0"
                                        style={{ background: dot }}
                                        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                    {name}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            variants={fadeSlide('up', 0.6)}
                            initial="hidden" animate="visible"
                            className="flex gap-3.5 flex-wrap mb-10 justify-center lg:justify-start"
                        >
                            <MagBtn className="relative px-7 py-3.5 rounded-xl font-bold text-[14px] text-white overflow-hidden">
                                <motion.span
                                    className="absolute inset-0 bg-linear-to-br from-violet-600 to-fuchsia-500"
                                    animate={{ opacity: [1, 0.82, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <motion.span
                                    className="absolute inset-0"
                                    animate={{ boxShadow: ['0 0 18px rgba(139,92,246,.38)', '0 0 38px rgba(139,92,246,.62)', '0 0 18px rgba(139,92,246,.38)'] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <span className="relative z-10 flex items-center gap-2">
                                    View My Work
                                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>↗</motion.span>
                                </span>
                            </MagBtn>

                            <a
                                href="https://drive.google.com/file/d/1X9JnMv0sOYW8xx8dzdGAPOkbLBIx7h-p/view?usp=sharing"
                                target="_blank"
                                rel="noreferrer"
                                className="px-7 py-3.5 border border-violet-500/35 text-violet-300 font-semibold text-[14px] rounded-xl hover:border-violet-400 hover:bg-violet-500/8 transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    Download Resume
                                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>↓</motion.span>
                                </span>
                            </a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={fadeSlide('up', 0.75)}
                            initial="hidden" animate="visible"
                            className="flex items-center gap-8 justify-center lg:justify-start"
                        >
                            {STATS.map((s, i) => (
                                <div key={i} className="flex items-center gap-8">
                                    <StatItem {...s} started={statsStarted} />
                                    {i < STATS.length - 1 && <div className="w-px h-8 bg-violet-500/20" />}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ══════════════════════
                        RIGHT — Image
                    ══════════════════════ */}
                    <div
                        ref={imageRef}
                        className="flex justify-center lg:justify-end opacity-0 order-1 lg:order-2"
                    >
                        {/* 3-D tilt wrapper */}
                        <motion.div
                            style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
                            onMouseMove={onCardMove}
                            onMouseLeave={onCardLeave}
                            className="relative cursor-none select-none"
                        >
                            {/* Animated glow halo */}
                            <motion.div
                                className="absolute -inset-8 rounded-[2.5rem] blur-3xl opacity-50 pointer-events-none"
                                animate={{
                                    background: [
                                        'radial-gradient(ellipse at 30% 40%, #7c3aed 0%, transparent 60%)',
                                        'radial-gradient(ellipse at 70% 60%, #a855f7 0%, transparent 60%)',
                                        'radial-gradient(ellipse at 50% 30%, #e879f9 0%, transparent 60%)',
                                        'radial-gradient(ellipse at 30% 40%, #7c3aed 0%, transparent 60%)',
                                    ],
                                }}
                                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                            />

                            {/* Photo card */}
                            <div
                                className="relative w-[300px] sm:w-[340px] lg:w-[370px] xl:w-[400px]
                                           aspect-[3/4] rounded-[2rem] overflow-hidden
                                           border border-violet-500/20
                                           shadow-[0_32px_80px_rgba(91,33,182,0.4)]"
                                style={{ transform: 'translateZ(24px)' }}
                            >
                                {/* Mouse light reflection */}
                                <motion.div
                                    className="absolute inset-0 z-10 pointer-events-none rounded-[2rem]"
                                    style={{
                                        background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(168,85,247,0.2) 0%, transparent 55%)`,
                                    }}
                                />

                                {/* Bottom vignette */}
                                <div className="absolute inset-0 z-[5] pointer-events-none"
                                    style={{ background: 'linear-gradient(to top, rgba(6,4,18,0.72) 0%, transparent 48%)' }} />

                                {/* Shimmer scan line — loops top→bottom */}
                                <motion.div
                                    className="absolute left-0 right-0 h-[2px] z-[6] pointer-events-none"
                                    style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)' }}
                                    animate={{ top: ['-2%', '102%'] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                                />

                                <Image
                                    src={image}
                                    alt="Md. Morsalin — MERN Stack Developer"
                                    fill priority
                                    className="object-cover object-top"
                                    sizes="(max-width: 768px) 90vw, 400px"
                                />

                                {/* Name tag */}
                                <div className="absolute bottom-5 left-5 right-5 z-10"
                                    style={{ transform: 'translateZ(12px)' }}>
                                    <div className="bg-[#0f0b1e]/80 backdrop-blur-md border border-violet-500/25
                                                    rounded-xl px-4 py-3 flex items-center justify-between">
                                        <div>
                                            <p className="text-white font-bold text-sm leading-none">Md. Morsalin</p>
                                            <p className="text-violet-400 text-[11px] font-mono mt-1">MERN Stack Developer</p>
                                        </div>
                                        <motion.span
                                            className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0"
                                            animate={{ boxShadow: ['0 0 0 0px rgba(74,222,128,.5)', '0 0 0 6px rgba(74,222,128,0)', '0 0 0 0px rgba(74,222,128,.5)'] }}
                                            transition={{ duration: 1.8, repeat: Infinity }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Spinning ring */}
                            <div ref={ringRef}
                                className="absolute -inset-3 rounded-[2.6rem] opacity-0 pointer-events-none">
                                <motion.div
                                    className="w-full h-full rounded-[2.6rem]"
                                    style={{ background: 'conic-gradient(from 0deg, #7c3aed44, #a855f7, #e879f933, transparent, #7c3aed44)' }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                />
                            </div>

                            {/* Badge: Open to Work — bottom-left of card */}
                            <div ref={el => badgeRefs.current[0] = el}
                                className="absolute -bottom-10 -left-6 opacity-0">
                                <motion.div
                                    animate={{ y: [0, -7, 0] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl
                                               bg-[#0f0b1e]/90 border border-violet-500/25
                                               backdrop-blur-md shadow-xl"
                                >
                                    <motion.span
                                        className="w-2 h-2 rounded-full bg-green-400 shrink-0"
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 1.4, repeat: Infinity }}
                                    />
                                    <span className="text-[12px] font-mono text-violet-300 whitespace-nowrap">Open to Work</span>
                                </motion.div>
                            </div>

                            {/* Badge: MERN — top-right */}
                            <div ref={el => badgeRefs.current[1] = el}
                                className="absolute -top-5 -right-6 opacity-0">
                                <motion.div
                                    animate={{ y: [0, 7, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl
                                               bg-[#0f0b1e]/90 border border-violet-500/25
                                               backdrop-blur-md shadow-xl"
                                >
                                    <span className="text-sm">⚡</span>
                                    <span className="text-[12px] font-mono text-violet-300 whitespace-nowrap">MERN Stack</span>
                                </motion.div>
                            </div>

                            {/* Badge: 🔥 100 Days — right-center */}
                            <div ref={el => badgeRefs.current[2] = el}
                                className="absolute top-1/2 -translate-y-1/2 -right-10 opacity-0">
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                    className="flex flex-col items-center px-3 py-2.5 rounded-2xl
                                               bg-[#0f0b1e]/90 border border-violet-500/25
                                               backdrop-blur-md shadow-xl"
                                >
                                    <span className="text-lg leading-none">🔥</span>
                                    <span className="text-[10px] font-mono text-violet-300 mt-1 whitespace-nowrap">100 Days</span>
                                    <span className="text-[10px] font-mono text-violet-400/60 whitespace-nowrap">of Code</span>
                                </motion.div>
                            </div>

                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
            >
                <motion.span
                    className="font-mono text-[10px] tracking-[.2em] uppercase text-violet-400/35"
                    animate={{ opacity: [0.35, 0.7, 0.35] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    Scroll
                </motion.span>
                <div className="relative w-px h-10 overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-violet-500 to-transparent"
                        animate={{ height: ['0%', '100%', '100%', '0%'], top: ['0%', '0%', '0%', '100%'] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.6, 1] }}
                    />
                </div>
            </motion.div>

        </motion.section>
    );
}