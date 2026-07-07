'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import logo from '@/assets/LogoT.png';

/* ─── Nav Links ─────────────────────────────────────────── */
const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

/* ─── Easing ────────────────────────────────────────────── */
const expo = [0.16, 1, 0.3, 1];

/* ─── Mobile menu variants ──────────────────────────────── */
const menuVariant = {
    hidden: { opacity: 0, y: -12, scale: 0.97 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.35, ease: expo },
    },
    exit: {
        opacity: 0, y: -10, scale: 0.97,
        transition: { duration: 0.25, ease: 'easeIn' },
    },
};

const linkVariant = {
    hidden: { opacity: 0, x: -16 },
    visible: (i) => ({
        opacity: 1, x: 0,
        transition: { delay: i * 0.055, duration: 0.35, ease: expo },
    }),
};

/* ─── Desktop NavLink with animated underline ───────────── */
function NavLink({ href, label }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative font-mono text-[13px] tracking-wide text-gray-400 hover:text-white transition-colors duration-200 py-1"
        >
            {label}
            <motion.span
                className="absolute -bottom-0.5 left-0 h-px bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-full"
                animate={{ width: hovered ? '100%' : '0%' }}
                transition={{ duration: 0.3, ease: expo }}
            />
        </Link>
    );
}

/* ─── Hamburger icon ────────────────────────────────────── */
function Hamburger({ open, onClick }) {
    return (
        <button
            onClick={onClick}
            aria-label="Toggle menu"
            className="relative w-9 h-9 flex flex-col items-center justify-center gap-1.25 rounded-lg border border-violet-500/20 hover:border-violet-500/45 bg-violet-500/5 hover:bg-violet-500/10 transition-colors"
        >
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="block h-[1.5px] bg-violet-300 rounded-full origin-center"
                    animate={
                        open
                            ? i === 0
                                ? { rotate: 45, y: 6.5, width: 18 }
                                : i === 2
                                    ? { rotate: -45, y: -6.5, width: 18 }
                                    : { opacity: 0, width: 0 }
                            : { rotate: 0, y: 0, opacity: 1, width: i === 1 ? 12 : 18 }
                    }
                    transition={{ duration: 0.3, ease: expo }}
                />
            ))}
        </button>
    );
}

/* ─── Main Navbar ───────────────────────────────────────── */
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    /* Scroll-aware background */
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: expo }}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    backgroundColor: scrolled ? 'rgba(6,4,18,0.88)' : 'rgba(6,4,18,0)',
                    borderBottomColor: scrolled ? 'rgba(139,92,246,0.14)' : 'rgba(139,92,246,0)',
                    backdropFilter: scrolled ? 'blur(18px)' : 'blur(0px)',
                }}
                transition={{ duration: 0.4 }}
                style={{ borderBottom: '1px solid' }}
            />

            <div className="relative max-w-6xl mx-auto px-6 h-17 flex items-center justify-between">

                {/* ── Logo ── */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.07 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        {/* Spinning ring on logo hover */}
                        <motion.div
                            className="absolute -inset-0.75 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: 'conic-gradient(from 0deg,#7c3aed,#a855f7,#7c3aed)' }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        />
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-violet-500/30">
                            <Image
                             src={logo} 
                             priority
                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                             alt="Logo" 
                             fill
                              className="object-cover" />
                        </div>
                    </motion.div>

                    <div className="hidden sm:block">
                        <motion.span
                            className="font-mono text-[13px] font-bold text-white tracking-tight"
                            animate={{ color: ['#ffffff', '#c4b5fd', '#ffffff'] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                            morsalin
                        </motion.span>
                        <span className="font-mono text-[13px] text-violet-400">.dev</span>
                    </div>
                </Link>

                {/* ── Desktop Nav ── */}
                <nav className="hidden lg:flex items-center gap-8">
                    {NAV_LINKS.map(({ href, label }) => (
                        <NavLink key={label} href={href} label={label} />
                    ))}
                </nav>

                {/* ── CTA + Hamburger ── */}
                <div className="flex items-center gap-3">
                    {/* CTA button */}
                    <motion.a
                        href="#contact"
                        className="relative hidden sm:inline-flex px-5 py-2 rounded-xl font-mono font-semibold text-[13px] text-white overflow-hidden"
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <motion.span
                            className="absolute inset-0 bg-linear-to-br from-violet-600 to-fuchsia-500"
                            animate={{ opacity: [1, 0.8, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.span
                            className="absolute inset-0 rounded-xl"
                            animate={{
                                boxShadow: [
                                    '0 0 12px rgba(139,92,246,.35)',
                                    '0 0 24px rgba(139,92,246,.6)',
                                    '0 0 12px rgba(139,92,246,.35)',
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <span className="relative z-10 flex items-center gap-1.5">
                            Hire Me
                            <motion.span
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                ✦
                            </motion.span>
                        </span>
                    </motion.a>

                    {/* Hamburger (mobile) */}
                    <div className="lg:hidden">
                        <Hamburger open={menuOpen} onClick={() => setMenuOpen(v => !v)} />
                    </div>
                </div>
            </div>

            {/* ── Mobile Menu ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        variants={menuVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="lg:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl border border-violet-500/15 bg-[#0a0616]/95 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-violet-950/50"
                    >
                        {/* Top accent line */}
                        <div className="h-0.5 bg-linear-to-r from-violet-600 via-fuchsia-500 to-transparent" />

                        <nav className="p-5 flex flex-col gap-1">
                            {NAV_LINKS.map(({ href, label }, i) => (
                                <motion.div
                                    key={label}
                                    custom={i}
                                    variants={linkVariant}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <Link
                                        href={href}
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center justify-between px-4 py-3 rounded-xl font-mono text-[13px] text-gray-400 hover:text-white hover:bg-violet-500/10 transition-colors group"
                                    >
                                        <span className="flex items-center gap-3">
                                            <span
                                                className="w-1 h-1 rounded-full bg-violet-500/50 group-hover:bg-violet-400 transition-colors"
                                            />
                                            {label}
                                        </span>
                                        <motion.span
                                            className="text-violet-500/50 group-hover:text-violet-400 text-xs"
                                            whileHover={{ x: 3 }}
                                        >
                                            →
                                        </motion.span>
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile CTA */}
                            <motion.div
                                custom={NAV_LINKS.length}
                                variants={linkVariant}
                                initial="hidden"
                                animate="visible"
                                className="mt-3 pt-3 border-t border-violet-500/10"
                            >
                                <a
                                    href="#contact"
                                    onClick={() => setMenuOpen(false)}
                                    className="relative flex items-center justify-center gap-2 py-3 rounded-xl font-mono font-bold text-[13px] text-white overflow-hidden"
                                >
                                    <span className="absolute inset-0 bg-linear-to-br from-violet-600 to-fuchsia-500" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        Hire Me ✦
                                    </span>
                                </a>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}