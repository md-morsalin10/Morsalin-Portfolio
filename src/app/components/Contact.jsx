'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa';

/* ─── Data ─────────────────────────────────────────────── */
const INFO = [
    { icon: MdEmail, label: 'Email', val: 'morsalin@email.com', href: 'mailto:morsalin@email.com', accent: '#a855f7' },
    { icon: MdPhone, label: 'Phone', val: '+880 1XXX XXXXXX', href: 'tel:+8801XXXXXXXXX', accent: '#22c55e' },
    { icon: MdLocationOn, label: 'Location', val: 'Dinajpur, Bangladesh', href: '#', accent: '#3b82f6' },
];

const SOCIALS = [
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: '#0a66c2' },
    { icon: FaGithub, href: '#', label: 'GitHub', color: '#e2e8f0' },
    { icon: FaFacebook, href: '#', label: 'Facebook', color: '#1877f2' },
];

/* ─── Easing ────────────────────────────────────────────── */
const expo = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 38, filter: 'blur(8px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.75, delay, ease: expo },
    },
});

const stagger = (d = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: d } },
});

const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: expo } },
};

/* ─── Animated Input ────────────────────────────────────── */
function Field({ label, type = 'text', rows, placeholder }) {
    const [focused, setFocused] = useState(false);
    const [filled, setFilled] = useState(false);
    const Tag = rows ? 'textarea' : 'input';

    return (
        <motion.div variants={itemVariant} className="relative">
            <motion.label
                className="absolute left-4 font-mono text-[11px] tracking-widest uppercase pointer-events-none transition-all duration-200 z-10"
                animate={{
                    top: focused || filled ? '-10px' : rows ? '16px' : '50%',
                    y: focused || filled ? 0 : rows ? 0 : '-50%',
                    color: focused ? '#a855f7' : '#6b7280',
                    fontSize: focused || filled ? '10px' : '12px',
                }}
                transition={{ duration: 0.2 }}
            >
                {label}
            </motion.label>

            {/* Focus glow border */}
            <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                animate={{ opacity: focused ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ boxShadow: '0 0 0 1.5px #a855f7, 0 0 20px rgba(168,85,247,.18)' }}
            />

            <Tag
                type={type}
                rows={rows}
                placeholder={focused ? placeholder : ''}
                onFocus={() => setFocused(true)}
                onBlur={(e) => { setFocused(false); setFilled(!!e.target.value); }}
                onChange={(e) => setFilled(!!e.target.value)}
                className="w-full bg-[#0c0818] border border-white/8 rounded-xl px-4 text-white text-[14px] outline-none resize-none transition-colors duration-200 placeholder:text-gray-600"
                style={{ paddingTop: rows ? '24px' : undefined, paddingBottom: rows ? '12px' : undefined, height: rows ? `${rows * 38}px` : '56px', lineHeight: rows ? '1.7' : undefined }}
            />
        </motion.div>
    );
}

/* ─── Main ──────────────────────────────────────────────── */
export default function Contact() {
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => { setSending(false); setSent(true); }, 1800);
    };

    return (
        <section className="relative min-h-screen py-28 px-6 bg-[#060412] overflow-hidden flex items-center">

            {/* Ambient orbs */}
            <motion.div
                className="pointer-events-none absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.14, 0.22, 0.14] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#5b21b6,transparent_65%)]" />
            </motion.div>
            <motion.div
                className="pointer-events-none absolute bottom-0 -right-20 w-[380px] h-[380px] rounded-full"
                animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            >
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#a855f7,transparent_65%)]" />
            </motion.div>

            {/* Grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.027]"
                style={{
                    backgroundImage:
                        'linear-gradient(#a855f7 1px,transparent 1px),linear-gradient(90deg,#a855f7 1px,transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto w-full">

                {/* ── Header ── */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                    variants={stagger(0)}
                    className="text-center mb-16"
                >
                    <motion.div variants={fadeUp(0)} className="flex items-center justify-center gap-3 mb-5">
                        <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/50" />
                        <span className="font-mono text-[11px] tracking-[.18em] uppercase text-violet-400/70">Contact</span>
                        <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/50" />
                    </motion.div>

                    <motion.h2
                        variants={fadeUp(0.06)}
                        className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-4"
                    >
                        Get In{' '}
                        <motion.span
                            className="bg-gradient-to-br from-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
                            style={{ backgroundSize: '200% 200%' }}
                            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                            Touch
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        variants={fadeUp(0.12)}
                        className="text-gray-400 max-w-sm mx-auto text-[14px] leading-relaxed"
                    >
                        Open for collaborations, freelance work, or just a technical chat. Let&apos;s build something great.
                    </motion.p>
                </motion.div>

                {/* ── Two Columns ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6">

                    {/* ── Left Panel ── */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                        variants={stagger(0.1)}
                        className="lg:col-span-2 flex flex-col gap-5"
                    >
                        {/* Info card */}
                        <motion.div
                            variants={fadeUp(0)}
                            className="relative p-7 rounded-3xl border border-white/6 bg-[#0c0818] overflow-hidden flex-1"
                        >
                            {/* Top accent */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-transparent" />

                            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-violet-400/60 mb-5">
                                Contact Info
                            </p>

                            <motion.div variants={stagger(0.15)} className="space-y-4">
                                {INFO.map(({ icon: Icon, label, val, href, accent }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        variants={itemVariant}
                                        whileHover={{ x: 4 }}
                                        className="flex items-center gap-4 group"
                                    >
                                        <motion.div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0"
                                            style={{ borderColor: `${accent}30`, background: `${accent}10` }}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <Icon size={17} style={{ color: accent }} />
                                        </motion.div>
                                        <div>
                                            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-600">{label}</p>
                                            <p className="text-white text-[13px] font-medium group-hover:text-violet-300 transition-colors">{val}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </motion.div>

                            {/* Divider */}
                            <div className="my-6 h-px bg-white/5" />

                            {/* Socials */}
                            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-violet-400/60 mb-4">Find Me On</p>
                            <div className="flex gap-3">
                                {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className="w-10 h-10 rounded-xl border border-white/8 bg-white/4 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                        whileHover={{ scale: 1.12, y: -3, borderColor: `${color}55`, backgroundColor: `${color}18` }}
                                        whileTap={{ scale: 0.94 }}
                                        transition={{ type: 'spring', stiffness: 280 }}
                                    >
                                        <Icon size={16} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability card */}
                        <motion.div
                            variants={fadeUp(0.1)}
                            className="p-5 rounded-2xl border border-white/6 bg-[#0c0818] flex items-center gap-4"
                        >
                            <motion.div
                                className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/25 flex items-center justify-center flex-shrink-0"
                            >
                                <motion.span
                                    className="w-2.5 h-2.5 rounded-full bg-green-400"
                                    animate={{ boxShadow: ['0 0 0 3px rgba(34,197,94,.2)', '0 0 0 7px rgba(34,197,94,.04)', '0 0 0 3px rgba(34,197,94,.2)'] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.div>
                            <div>
                                <p className="text-white text-[13px] font-semibold">Available for work</p>
                                <p className="text-gray-500 font-mono text-[11px]">Response within 24 hrs</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ── Right: Form ── */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                        variants={stagger(0.05)}
                        className="lg:col-span-3 relative p-7 md:p-9 rounded-3xl border border-white/6 bg-[#0c0818] overflow-hidden"
                    >
                        {/* Top accent */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-fuchsia-500" />

                        <motion.p variants={fadeUp(0)} className="font-mono text-[10px] tracking-[.18em] uppercase text-violet-400/60 mb-6">
                            Send a Message
                        </motion.p>

                        <AnimatePresence mode="wait">
                            {sent ? (
                                /* ── Success state ── */
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                                    className="flex flex-col items-center justify-center text-center py-16 gap-5"
                                >
                                    <motion.div
                                        className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-3xl"
                                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.12, 1] }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        ✅
                                    </motion.div>
                                    <div>
                                        <p className="text-white text-xl font-bold mb-1">Message Sent!</p>
                                        <p className="text-gray-400 text-[13px]">I&apos;ll get back to you within 24 hours.</p>
                                    </div>
                                    <motion.button
                                        onClick={() => setSent(false)}
                                        whileHover={{ scale: 1.04 }}
                                        className="font-mono text-[12px] text-violet-400 hover:text-violet-300 transition-colors"
                                    >
                                        Send another →
                                    </motion.button>
                                </motion.div>
                            ) : (
                                /* ── Form ── */
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    variants={stagger(0)}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-5"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <Field label="Your Name" placeholder="Morsalin..." />
                                        <Field label="Your Email" type="email" placeholder="you@email.com" />
                                    </div>
                                    <Field label="Subject" placeholder="Project inquiry..." />
                                    <Field label="Message" rows={5} placeholder="Tell me about your project..." />

                                    <motion.div variants={itemVariant}>
                                        <motion.button
                                            type="submit"
                                            disabled={sending}
                                            whileHover={sending ? {} : { scale: 1.02, y: -1 }}
                                            whileTap={sending ? {} : { scale: 0.97 }}
                                            className="relative w-full py-4 rounded-xl font-bold text-[14px] text-white overflow-hidden disabled:cursor-not-allowed"
                                        >
                                            <motion.span
                                                className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-500"
                                                animate={{ opacity: sending ? 0.6 : [1, 0.82, 1] }}
                                                transition={{ duration: 3, repeat: sending ? 0 : Infinity }}
                                            />
                                            <motion.span
                                                className="absolute inset-0 rounded-xl"
                                                animate={{
                                                    boxShadow: sending
                                                        ? '0 0 0px rgba(139,92,246,0)'
                                                        : ['0 0 16px rgba(139,92,246,.35)', '0 0 30px rgba(139,92,246,.6)', '0 0 16px rgba(139,92,246,.35)'],
                                                }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                            />

                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {sending ? (
                                                    <>
                                                        <motion.span
                                                            className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                                        />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <motion.span
                                                            animate={{ x: [0, 4, 0] }}
                                                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                                        >
                                                            →
                                                        </motion.span>
                                                    </>
                                                )}
                                            </span>
                                        </motion.button>
                                    </motion.div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}