'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
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
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: expo },
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.97,
        transition: { duration: 0.25, ease: 'easeIn' },
    },
};

const linkVariant = {
    hidden: { opacity: 0, x: -16 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
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
            className="relative py-1 font-mono text-[13px] tracking-wide text-gray-400 transition-colors duration-200 hover:text-white"
        >
            {label}
            <motion.span
                className="absolute -bottom-0.5 left-0 h-px rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500"
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
            className="relative flex h-9 w-9 flex-col items-center justify-center gap-1.25 rounded-lg border border-violet-500/20 bg-violet-500/5 transition-colors hover:border-violet-500/45 hover:bg-violet-500/10"
        >
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="block h-[1.5px] origin-center rounded-full bg-violet-300"
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
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const handleHireMe = () => {
        const section = document.getElementById('contact');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.location.href = '#contact';
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!isDesktop) return;
            setIsScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            const desktop = window.innerWidth >= 1024;
            setIsDesktop(desktop);

            if (!desktop) {
                setIsScrolled(false);
            } else {
                setIsScrolled(window.scrollY > 50);
            }
        };

        handleResize();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [isDesktop]);

    const isFloating = isDesktop && isScrolled;

    return (
        <motion.header
            className="fixed left-0 right-0 top-0 z-50"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: expo }}
        >
            <div className="w-full px-0 sm:px-4 md:px-6">
                <div
                    className={`mx-auto flex w-full items-center justify-between transition-all duration-300 ease-in-out ${
                        isFloating
                            ? 'mt-4 max-w-5xl rounded-full border border-violet-500/20 bg-[#0f0b1e]/80 px-6 py-3 shadow-lg shadow-violet-950/30 backdrop-blur-md'
                            : 'max-w-7xl rounded-none border-transparent bg-transparent px-6 py-4'
                    }`}
                >
                    <div className="flex h-full w-full items-center justify-between">
                        {/* ── Logo ── */}
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.07 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <motion.div
                                    className="absolute -inset-0.75 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    style={{ background: 'conic-gradient(from 0deg,#7c3aed,#a855f7,#7c3aed)' }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                />
                                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-violet-500/30">
                                    <Image
                                        src={logo}
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        alt="Logo"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>

                            <div className="hidden sm:block">
                                <motion.span
                                    className="font-mono text-[13px] font-bold tracking-tight text-white"
                                    animate={{ color: ['#ffffff', '#c4b5fd', '#ffffff'] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                >
                                    morsalin
                                </motion.span>
                                <span className="font-mono text-[13px] text-violet-400">.dev</span>
                            </div>
                        </Link>

                        {/* ── Desktop Nav ── */}
                        <nav className="hidden items-center gap-8 lg:flex">
                            {NAV_LINKS.map(({ href, label }) => (
                                <NavLink key={label} href={href} label={label} />
                            ))}
                        </nav>

                        {/* ── CTA + Hamburger ── */}
                        <div className="flex items-center gap-3">
                            <motion.button
                                onClick={handleHireMe}
                                className="relative hidden cursor-pointer overflow-hidden rounded-xl px-5 py-2 font-mono text-[13px] font-semibold text-white sm:inline-flex"
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
                            </motion.button>

                            <div className="lg:hidden">
                                <Hamburger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
                            </div>
                        </div>
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
                        className="absolute left-4 right-4 top-full mt-2 overflow-hidden rounded-2xl border border-violet-500/15 bg-[#0a0616]/95 shadow-2xl shadow-violet-950/50 backdrop-blur-2xl lg:hidden"
                    >
                        <div className="h-0.5 bg-linear-to-r from-violet-600 via-fuchsia-500 to-transparent" />

                        <nav className="flex flex-col gap-1 p-5">
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
                                        className="flex items-center justify-between rounded-xl px-4 py-3 font-mono text-[13px] text-gray-400 transition-colors group hover:bg-violet-500/10 hover:text-white"
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className="h-1 w-1 rounded-full bg-violet-500/50 transition-colors group-hover:bg-violet-400" />
                                            {label}
                                        </span>
                                        <motion.span
                                            className="text-xs text-violet-500/50 group-hover:text-violet-400"
                                            whileHover={{ x: 3 }}
                                        >
                                            →
                                        </motion.span>
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                custom={NAV_LINKS.length}
                                variants={linkVariant}
                                initial="hidden"
                                animate="visible"
                                className="mt-3 border-t border-violet-500/10 pt-3"
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        handleHireMe();
                                    }}
                                    className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3 font-mono text-[13px] font-bold text-white"
                                >
                                    <span className="absolute inset-0 bg-linear-to-br from-violet-600 to-fuchsia-500" />
                                    <span className="relative z-10 flex items-center gap-2">Hire Me ✦</span>
                                </button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}