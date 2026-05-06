'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from 'react-icons/fa';

/* ─── Data ─────────────────────────────────────────────── */
const LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
    { icon: FaGithub, href: 'https://github.com/md-morsalin10', label: 'GitHub', color: '#e2e8f0' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: '#0a66c2' },
    { icon: FaFacebook, href: '#', label: 'Facebook', color: '#1877f2' },
    { icon: FaEnvelope, href: 'mailto:your-email@example.com', label: 'Email', color: '#a855f7' },
];

const STACK = ['MongoDB', 'Express', 'React', 'Node.js', 'Next.js', 'Tailwind'];

/* ─── Easing ─────────────────────────────────────────────── */
const expo = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.65, delay, ease: expo },
    },
});

const stagger = (d = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: d } },
});

const linkItem = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: expo } },
};

/* ─── Footer ──────────────────────────────────────────────── */
export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative bg-[#060412] overflow-hidden">

            {/* Top gradient divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/40 to-transparent" />

            {/* Bottom ambient orb */}
            <motion.div
                className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-175 h-70 rounded-full"
                animate={{ opacity: [0.08, 0.16, 0.08], scale: [1, 1.06, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse,#7c3aed,transparent_60%)]" />
            </motion.div>

            {/* Side orb */}
            <motion.div
                className="pointer-events-none absolute top-0 -left-24 w-75 h-75 rounded-full"
                animate={{ opacity: [0.06, 0.12, 0.06] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#5b21b6,transparent_65%)]" />
            </motion.div>

            {/* Subtle grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.022]"
                style={{
                    backgroundImage:
                        'linear-gradient(#a855f7 1px,transparent 1px),linear-gradient(90deg,#a855f7 1px,transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-8">

                {/* ── Top: Brand ── */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                    variants={stagger(0)}
                    className="text-center mb-14"
                >
                    <motion.div variants={fadeUp(0)} className="flex items-center justify-center gap-3 mb-4">
                        <span className="h-px w-12 bg-linear-to-r from-transparent to-violet-500/40" />
                        <span className="font-mono text-[10px] tracking-[.2em] uppercase text-violet-400/50">Portfolio</span>
                        <span className="h-px w-12 bg-linear-to-l from-transparent to-violet-500/40" />
                    </motion.div>

                    <motion.div variants={fadeUp(0.05)} className="flex items-baseline justify-center gap-1 mb-3">
                        <span className="font-mono text-3xl font-black text-white tracking-tight">morsalin</span>
                        <motion.span
                            className="font-mono text-3xl font-black text-violet-400"
                            animate={{ color: ['#a855f7', '#c084fc', '#e879f9', '#a855f7'] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            .dev
                        </motion.span>
                    </motion.div>

                    <motion.p
                        variants={fadeUp(0.1)}
                        className="text-gray-500 text-[13px] max-w-sm mx-auto leading-relaxed"
                    >
                        MERN Stack Developer crafting high-performance, user-centric web applications with clean code and modern UI aesthetics.
                    </motion.p>

                    {/* Stack tags */}
                    <motion.div variants={fadeUp(0.15)} className="flex flex-wrap justify-center gap-1.5 mt-5">
                        {STACK.map((s) => (
                            <span
                                key={s}
                                className="font-mono text-[10px] px-2.5 py-1 rounded-lg border border-violet-500/15 bg-violet-500/6 text-violet-400/60"
                            >
                                {s}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* ── Middle 3-col ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

                    {/* Availability */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={stagger(0)}
                        className="flex flex-col gap-4"
                    >
                        <motion.p variants={fadeUp(0)} className="font-mono text-[10px] tracking-[.18em] uppercase text-violet-400/60">
                            Status
                        </motion.p>

                        <motion.div
                            variants={fadeUp(0.05)}
                            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-green-500/20 bg-green-500/6 w-fit"
                        >
                            <motion.span
                                className="w-2 h-2 rounded-full bg-green-400 shrink-0"
                                animate={{ boxShadow: ['0 0 0 3px rgba(34,197,94,.2)', '0 0 0 7px rgba(34,197,94,.04)', '0 0 0 3px rgba(34,197,94,.2)'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="font-mono text-[11px] text-green-400">Available for work</span>
                        </motion.div>

                        <motion.a
                            href="#contact"
                            variants={fadeUp(0.1)}
                            whileHover={{ x: 4 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="inline-flex items-center gap-2 font-mono text-[12px] text-violet-400 hover:text-violet-300 transition-colors w-fit"
                        >
                            Let&apos;s work together
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                →
                            </motion.span>
                        </motion.a>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={stagger(0.05)}
                    >
                        <motion.p variants={fadeUp(0)} className="font-mono text-[10px] tracking-[.18em] uppercase text-violet-400/60 mb-5">
                            Quick Links
                        </motion.p>
                        <ul className="space-y-2">
                            {LINKS.map(({ label, href }) => (
                                <motion.li key={label} variants={linkItem}>
                                    <motion.a
                                        href={href}
                                        className="group inline-flex items-center gap-2.5 text-[13px] text-gray-500 hover:text-white transition-colors duration-200"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <span className="w-1 h-1 rounded-full bg-violet-500/35 group-hover:bg-violet-400 transition-colors shrink-0" />
                                        {label}
                                    </motion.a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={stagger(0.05)}
                    >
                        <motion.p variants={fadeUp(0)} className="font-mono text-[10px] tracking-[.18em] uppercase text-violet-400/60 mb-5">
                            Connect With Me
                        </motion.p>

                        <motion.div variants={fadeUp(0.06)} className="grid grid-cols-2 gap-2.5">
                            {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel="noreferrer"
                                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/6 bg-white/3 text-gray-500 hover:text-white transition-colors"
                                    whileHover={{ borderColor: `${color}45`, backgroundColor: `${color}12`, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: 'spring', stiffness: 280 }}
                                >
                                    <motion.span
                                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: `${color}15` }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Icon size={13} style={{ color }} />
                                    </motion.span>
                                    <span className="font-mono text-[11px]">{label}</span>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── Divider ── */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: expo }}
                    className="h-px bg-linear-to-r from-transparent via-violet-500/25 to-transparent mb-7 origin-center"
                />

                {/* ── Bottom bar ── */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={stagger(0)}
                    className="flex flex-col sm:flex-row items-center justify-between gap-3"
                >
                    <motion.p variants={fadeUp(0)} className="font-mono text-[11px] text-gray-600 text-center sm:text-left">
                        © {year}{' '}
                        <span className="text-violet-400/60">morsalin.dev</span>
                        {' '}— All rights reserved.
                    </motion.p>

                    <motion.p
                        variants={fadeUp(0.05)}
                        className="font-mono text-[11px] text-gray-700 flex items-center gap-1.5"
                    >
                        Built with
                        <motion.span
                            className="text-pink-500/70"
                            animate={{ scale: [1, 1.35, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            ♥
                        </motion.span>
                        using Next.js &amp; Framer Motion
                    </motion.p>
                </motion.div>

            </div>
        </footer>
    );
}