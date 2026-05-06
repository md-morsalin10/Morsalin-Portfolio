'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useHasMounted } from '@/hooks/useHasMounted';

/* ─── Data ──────────────────────────────────────────────── */
const techLogos = [
    { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#e34f26' },
    { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572b6' },
    { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#f7df1e' },
    { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178c6' },
    { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61dafb' },
    { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg', color: '#ffffff' },
    { name: 'Tailwind', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#38bdf8' },
    { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#83cd29' },
    { name: 'Express', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: '#ffffff' },
    { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#4db380' },
    { name: 'Firebase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#ffca28' },
    { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#f05032' },
    { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#ffffff' },
    { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#f24e1e' },
    { name: 'Vercel', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', color: '#ffffff' },
    { name: 'Redux', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', color: '#764abc' },
];

const ROW1 = [...techLogos, ...techLogos];
const ROW2 = [...[...techLogos].reverse(), ...[...techLogos].reverse()];

/* ─── Easing & Variants ─────────────────────────────────── */
const expo = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.7, delay, ease: expo },
    },
});

const stagger = (d = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: d } },
});

/* ─── Components ────────────────────────────────────────── */
function LogoChip({ tech }) {
    return (
        <motion.div
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            className="group flex-shrink-0 flex items-center gap-3 px-5 py-3 mx-2
                 rounded-2xl border border-white/6 bg-[#0c0818]/70
                 hover:border-white/18 hover:bg-white/4
                 backdrop-blur-sm cursor-default select-none"
        >
            <div className="relative w-6 h-6 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image
                    src={tech.url}
                    alt={tech.name}
                    fill
                    sizes="24px"
                    className="object-contain"
                    unoptimized
                />
            </div>
            <span className="font-mono text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap
                   text-gray-600 group-hover:text-white transition-colors duration-300">
                {tech.name}
            </span>
            <motion.span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: tech.color, boxShadow: `0 0 6px ${tech.color}` }}
            />
        </motion.div>
    );
}

function MarqueeRow({ items, duration = 38, reverse = false }) {
    return (
        <div className="relative flex overflow-hidden py-1.5">
            <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none bg-gradient-to-r from-[#060412] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none bg-gradient-to-l from-[#060412] to-transparent" />

            <motion.div
                className="flex"
                animate={{
                    x: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: 'loop',
                }}
                style={{ willChange: 'transform' }}
            >
                {items.map((tech, i) => (
                    <LogoChip key={`${tech.name}-${i}`} tech={tech} />
                ))}
            </motion.div>
        </div>
    );
}

/* ─── Main Section ──────────────────────────────────────── */
export default function TechMarquee() {
    const hasMounted = useHasMounted();

    if (!hasMounted) {
        return (
            <section className="relative py-24 bg-[#060412] overflow-hidden min-h-[600px]" />
        );
    }

    return (
        <section className="relative py-24 bg-[#060412] overflow-hidden min-h-[600px]">
            {/* Ambient Glow & Grid */}
            <motion.div
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] rounded-full"
                animate={{ opacity: [0.06, 0.13, 0.06], scale: [1, 1.08, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse,#7c3aed,transparent_60%)]" />
            </motion.div>

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.024]"
                style={{
                    backgroundImage: 'linear-gradient(#a855f7 1px,transparent 1px),linear-gradient(90deg,#a855f7 1px,transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Content Container */}
            <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                variants={stagger(0)}
                className="text-center mb-12 px-6"
            >
                <motion.div variants={fadeUp(0)} className="flex items-center justify-center gap-3 mb-4">
                    <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/50" />
                    <span className="font-mono text-[11px] tracking-[.18em] uppercase text-violet-400/70">Tech Stack</span>
                    <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/50" />
                </motion.div>

                <motion.h2 variants={fadeUp(0.06)} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                    Tools I{' '}
                    <motion.span
                        className="bg-gradient-to-br from-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        style={{ backgroundSize: '200% 200%' }}
                    >
                        Work With
                    </motion.span>
                </motion.h2>

                <motion.p variants={fadeUp(0.12)} className="text-gray-500 max-w-xs mx-auto text-[13.5px]">
                    Technologies I use to build fast, scalable, and beautiful web applications.
                </motion.p>
            </motion.div>

            {/* Marquee Rows */}
            <div className="flex flex-col gap-3">
                <MarqueeRow items={ROW1} duration={40} reverse={false} />
                <MarqueeRow items={ROW2} duration={34} reverse={true} />
            </div>

            {/* Stats strip - ২ বছরের মধ্যে অর্জিত দক্ষতা ও প্রজেক্ট সংখ্যা প্রতিফলিত করে */}
            <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={stagger(0.1)}
                className="mt-14 px-6 max-w-2xl mx-auto grid grid-cols-3 gap-3"
            >
                {[
                    { num: '16+', label: 'Technologies' },
                    { num: '10+', label: 'Projects Built' },
                    { num: '1yr+', label: 'Experience' },
                ].map(({ num, label }) => (
                    <motion.div
                        key={label}
                        variants={fadeUp(0)}
                        whileHover={{ borderColor: 'rgba(168,85,247,.3)', backgroundColor: 'rgba(139,92,246,.06)', y: -3 }}
                        className="flex flex-col items-center gap-1.5 py-5 rounded-2xl border border-white/6 bg-white/3"
                    >
                        <motion.span
                            className="text-2xl font-extrabold bg-gradient-to-br from-violet-300 to-fuchsia-400 bg-clip-text text-transparent"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                        >
                            {num}
                        </motion.span>
                        <span className="font-mono text-[10px] tracking-widest uppercase text-gray-600">{label}</span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}