'use client';

import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa6';

/* ─── Data ─────────────────────────────────────────────── */
const INFO = [
    { icon: MdEmail, label: 'Email', val: 'morsalinafsan501921@gmail.com', href: 'mailto:morsalinafsan501921@gamil.com', accent: '#a855f7' },
    { icon: MdPhone, label: 'Phone', val: '+880 1842007859', href: 'tel:+8801842007859', accent: '#22c55e' },
    { icon: FaWhatsapp, label: 'WhatsApp', val: 'Chat on WhatsApp', href: 'https://wa.me/8801842007859', accent: '#25D366' },
    { icon: MdLocationOn, label: 'Location', val: 'Rangpur, Bangladesh', href: '#', accent: '#3b82f6' },
];

const SOCIALS = [
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/md-morsalin10/', label: 'LinkedIn', color: '#0a66c2' },
    { icon: FaGithub, href: 'https://github.com/md-morsalin10', label: 'GitHub', color: '#e2e8f0' },
    { icon: FaFacebook, href: 'https://www.facebook.com/mohammad.morsalin.335910', label: 'Facebook', color: '#1877f2' },
];

const initialForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

const initialTouched = {
    name: false,
    email: false,
    subject: false,
    message: false,
};

/* ─── Easing ────────────────────────────────────────────── */
const expo = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 38, filter: 'blur(8px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
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

function Field({
    label,
    name,
    type = 'text',
    rows,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
}) {
    const [focused, setFocused] = useState(false);
    const Tag = rows ? 'textarea' : 'input';
    const hasError = touched && Boolean(error);

    return (
        <motion.div variants={itemVariant} className="relative">
            <motion.label
                className="pointer-events-none absolute left-4 z-10 font-mono text-[11px] uppercase tracking-widest transition-all duration-200"
                animate={{
                    top: focused || value ? '-10px' : rows ? '16px' : '50%',
                    y: focused || value ? 0 : rows ? 0 : '-50%',
                    color: hasError ? '#f87171' : focused ? '#a855f7' : '#6b7280',
                    fontSize: focused || value ? '10px' : '12px',
                }}
                transition={{ duration: 0.2 }}
            >
                {label}
            </motion.label>

            <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl"
                animate={{ opacity: focused ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ boxShadow: '0 0 0 1.5px #a855f7, 0 0 20px rgba(168,85,247,.18)' }}
            />

            <Tag
                id={name}
                name={name}
                type={type}
                rows={rows}
                placeholder={focused ? placeholder : ''}
                value={value}
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                    setFocused(false);
                    onBlur(e);
                }}
                onChange={onChange}
                className={`w-full rounded-xl border bg-[#0c0818] px-4 text-[14px] text-white outline-none transition-colors duration-200 placeholder:text-gray-600 ${hasError ? 'border-red-500/70' : 'border-white/8'
                    }`}
                style={{ paddingTop: rows ? '24px' : undefined, paddingBottom: rows ? '12px' : undefined, height: rows ? `${rows * 38}px` : '56px', lineHeight: rows ? '1.7' : undefined }}
            />

            {hasError && (
                <p className="mt-2 text-[11px] text-red-400">{error}</p>
            )}
        </motion.div>
    );
}

/* ─── Main ──────────────────────────────────────────────── */
export default function Contact() {
    const formRef = useRef(null);
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState(initialTouched);
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    const emailConfig = useMemo(() => ({
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
    }), []);

    const validate = (values) => {
        const nextErrors = {};
        const requiredFields = ['name', 'email', 'subject', 'message'];

        requiredFields.forEach((field) => {
            const value = values[field]?.trim();
            if (!value) {
                nextErrors[field] = 'This field is required.';
            }
        });

        if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
            nextErrors.email = 'Please enter a valid email address.';
        }

        return nextErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nextErrors = validate(form);
        setErrors(nextErrors);
        setTouched({ name: true, email: true, subject: true, message: true });

        if (Object.keys(nextErrors).length > 0) {
            toast.error('Please fix the highlighted fields before sending.');
            return;
        }

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error('Missing EmailJS Env Variables');
            toast.error('EmailJS Environment variables are not loaded!');
            return;
        }

        setSending(true);

        try {
            // Standard EmailJS template parameters
            const templateParams = {
                from_name: form.name,
                from_email: form.email,
                reply_to: form.email,
                subject: form.subject,
                message: form.message,
            };

            const result = await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );

            if (result?.status === 200 || result?.text === 'OK') {
                toast.success('Message sent successfully!');
                setForm(initialForm);
                setErrors({});
                setTouched(initialTouched);
                setSent(true);
            }
        } catch (err) {
            // আসল এরর ব্রাউজার কনসোলে দেখার জন্য
            console.error('EmailJS Error Detailed:', err);

            const errorMsg = err?.text || err?.message || 'Failed to send message';
            toast.error(`Error: ${errorMsg}`);
        } finally {
            setSending(false);
        }
    };
    return (
        <section id="contact" className="relative flex min-h-screen items-center overflow-hidden px-6 py-28 bg-[#060412]/40">
            <Toaster position="top-right" toastOptions={{ duration: 4000, className: 'bg-[#0c0818] text-white border border-violet-500/20' }} />

            {/* Ambient orbs */}
            <motion.div
                className="pointer-events-none absolute top-1/4 -left-32 h-125 w-125 rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.14, 0.22, 0.14] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="h-full w-full rounded-full bg-[radial-gradient(circle,#5b21b6,transparent_65%)]" />
            </motion.div>
            <motion.div
                className="pointer-events-none absolute bottom-0 -right-20 h-95 w-95 rounded-full"
                animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            >
                <div className="h-full w-full rounded-full bg-[radial-gradient(circle,#a855f7,transparent_65%)]" />
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

            <div className="relative z-10 mx-auto w-full max-w-6xl">
                {/* ── Header ── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={stagger(0)}
                    className="mb-16 text-center"
                >
                    <motion.div variants={fadeUp(0)} className="mb-5 flex items-center justify-center gap-3">
                        <span className="h-px w-10 bg-linear-to-r from-transparent to-violet-500/50" />
                        <span className="font-mono text-[11px] uppercase tracking-[.18em] text-violet-400/70">Contact</span>
                        <span className="h-px w-10 bg-linear-to-l from-transparent to-violet-500/50" />
                    </motion.div>

                    <motion.h2
                        variants={fadeUp(0.06)}
                        className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl"
                    >
                        Get In{' '}
                        <motion.span
                            className="bg-linear-to-br from-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
                            style={{ backgroundSize: '200% 200%' }}
                            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                            Touch
                        </motion.span>
                    </motion.h2>

                    <motion.p variants={fadeUp(0.12)} className="mx-auto max-w-sm text-[14px] leading-relaxed text-gray-400">
                        Open for collaborations, freelance work, or just a technical chat. Let&apos;s build something great.
                    </motion.p>
                </motion.div>

                {/* ── Two Columns ── */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-6">
                    {/* ── Left Panel ── */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        variants={stagger(0.1)}
                        className="flex flex-col gap-5 lg:col-span-2"
                    >
                        <motion.div variants={fadeUp(0)} className="relative flex-1 overflow-hidden rounded-3xl border border-white/6 bg-[#0c0818] p-6 sm:p-7">
                            <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-violet-600 via-fuchsia-500 to-transparent" />

                            <p className="mb-5 font-mono text-[10px] uppercase tracking-[.18em] text-violet-400/60">Contact Info</p>

                            <motion.div variants={stagger(0.15)} className="grid gap-3 sm:grid-cols-2">
                                {INFO.map(({ icon: Icon, label, val, href, accent }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        variants={itemVariant}
                                        whileHover={{ x: 4 }}
                                        className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/8 bg-white/5 p-3"
                                    >
                                        <motion.div
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                                            style={{ borderColor: `${accent}30`, background: `${accent}10` }}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <Icon size={15} style={{ color: accent }} />
                                        </motion.div>
                                        <div className="flex min-w-0 flex-1 flex-col">
                                            <p className="font-mono text-[10px] uppercase tracking-widest text-violet-400/70">{label}</p>
                                            <p
                                                className="truncate text-[12px] font-medium text-gray-200 transition-colors group-hover:text-violet-300"
                                                title={val}
                                            >
                                                {val}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </motion.div>

                            <div className="my-6 h-px bg-white/5" />

                            <p className="mb-4 font-mono text-[10px] uppercase tracking-[.18em] text-violet-400/60">Find Me On</p>
                            <div className="flex gap-3">
                                {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-gray-400 transition-colors hover:text-white"
                                        whileHover={{ scale: 1.12, y: -3, borderColor: `${color}55`, backgroundColor: `${color}18` }}
                                        whileTap={{ scale: 0.94 }}
                                        transition={{ type: 'spring', stiffness: 280 }}
                                    >
                                        <Icon size={16} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp(0.1)} className="flex items-center gap-4 rounded-2xl border border-white/6 bg-[#0c0818] p-5">
                            <motion.div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-500/25 bg-green-500/10">
                                <motion.span
                                    className="h-2.5 w-2.5 rounded-full bg-green-400"
                                    animate={{ boxShadow: ['0 0 0 3px rgba(34,197,94,.2)', '0 0 0 7px rgba(34,197,94,.04)', '0 0 0 3px rgba(34,197,94,.2)'] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.div>
                            <div>
                                <p className="text-[13px] font-semibold text-white">Available for work</p>
                                <p className="font-mono text-[11px] text-gray-500">Response within 24 hrs</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ── Right: Form ── */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        variants={stagger(0.05)}
                        className="relative overflow-hidden rounded-3xl border border-white/6 bg-[#0c0818] p-7 md:p-9 lg:col-span-3"
                    >
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-violet-500 to-fuchsia-500" />

                        <motion.p variants={fadeUp(0)} className="mb-6 font-mono text-[10px] uppercase tracking-[.18em] text-violet-400/60">
                            Send a Message
                        </motion.p>

                        <AnimatePresence mode="wait">
                            {sent ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                                    className="flex flex-col items-center justify-center gap-5 py-16 text-center"
                                >
                                    <motion.div
                                        className="flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-500/15 text-3xl"
                                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.12, 1] }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        ✅
                                    </motion.div>
                                    <div>
                                        <p className="mb-1 text-xl font-bold text-white">Message Sent!</p>
                                        <p className="text-[13px] text-gray-400">I&apos;ll get back to you within 24 hours.</p>
                                    </div>
                                    <motion.button
                                        onClick={() => setSent(false)}
                                        whileHover={{ scale: 1.04 }}
                                        className="font-mono text-[12px] text-violet-400 transition-colors hover:text-violet-300"
                                    >
                                        Send another →
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    variants={stagger(0)}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-5"
                                >
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <Field
                                            label="Your Name"
                                            name="name"
                                            placeholder="Morsalin..."
                                            value={form.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.name}
                                            touched={touched.name}
                                        />
                                        <Field
                                            label="Your Email"
                                            name="email"
                                            type="email"
                                            placeholder="you@email.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.email}
                                            touched={touched.email}
                                        />
                                    </div>
                                    <Field
                                        label="Subject"
                                        name="subject"
                                        placeholder="Project inquiry..."
                                        value={form.subject}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.subject}
                                        touched={touched.subject}
                                    />
                                    <Field
                                        label="Message"
                                        name="message"
                                        rows={5}
                                        placeholder="Tell me about your project..."
                                        value={form.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.message}
                                        touched={touched.message}
                                    />

                                    <motion.div variants={itemVariant}>
                                        <motion.button
                                            type="submit"
                                            disabled={sending}
                                            whileHover={sending ? {} : { scale: 1.02, y: -1 }}
                                            whileTap={sending ? {} : { scale: 0.97 }}
                                            className="relative w-full overflow-hidden rounded-xl py-4 text-[14px] font-bold text-white disabled:cursor-not-allowed"
                                        >
                                            <motion.span
                                                className="absolute inset-0 bg-linear-to-br from-violet-600 to-fuchsia-500"
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
                                                            className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
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