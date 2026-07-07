'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════
   DATA — তোমার resume থেকে নেওয়া সব তথ্য
═══════════════════════════════════════════════════════════ */
const TIMELINE = [
  {
    type:         'learning',
    year:         '2025 – Present',
    title:        'Web Development (MERN Stack)',
    organization: 'Programming Hero',
    location:     'Online',
    description:  'Intensive full-stack web development course focusing on professional software engineering. Building production-grade projects including SkillSphere, KeenKeeper, and Wanderlust using MongoDB, Express, React, and Node.js.',
    icon:         '🚀',
    accent:       '#a855f7',
    tags:         ['MongoDB', 'Express.js', 'React', 'Node.js', 'Next.js', 'Tailwind'],
    status:       'active',
    result:       null,
  },
  {
    type:         'education',
    year:         '2020 – 2024',
    title:        'Diploma in Engineering',
    organization: 'Dinajpur Polytechnic Institute',
    location:     'Dinajpur, Bangladesh',
    description:  'Completed 4-year Diploma in Engineering with a focus on Computer Science & Technology. Gained strong foundation in core engineering principles, programming fundamentals, and technical problem-solving.',
    icon:         '🎓',
    accent:       '#3b82f6',
    tags:         ['Computer Science', 'Engineering', 'Programming', 'CST'],
    status:       'done',
    result:       'CGPA: 3.46 / 4.00',
  },
  {
    type:         'education',
    year:         '2020',
    title:        'Secondary School Certificate (SSC)',
    organization: 'Nilphamari Govt Technical School & College',
    location:     'Nilphamari, Bangladesh',
    description:  'Completed SSC examination with excellent results. Built early foundation in Mathematics, Science, and technical subjects that laid the groundwork for engineering studies.',
    icon:         '📚',
    accent:       '#22c55e',
    tags:         ['Mathematics', 'Science', 'Technical'],
    status:       'done',
    result:       'GPA: 4.86 / 5.00',
  },
  {
    type:         'challenge',
    year:         '2026 (Ongoing)',
    title:        '100 Days of Coding Challenge',
    organization: 'Self-Driven',
    location:     'Remote',
    description:  'Consistently building and shipping daily updates to sharpen problem-solving skills, explore new libraries, and strengthen DSA fundamentals. Documenting progress publicly on GitHub.',
    icon:         '⚡',
    accent:       '#f97316',
    tags:         ['DSA', 'Daily Build', 'Open Source', 'GitHub'],
    status:       'active',
    result:       null,
  },
];

const TYPE_LABEL = {
  learning:  'Course',
  education: 'Education',
  challenge: 'Challenge',
};

/* ─── Easing ─────────────────────────────────────────────── */
const expo = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 36, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.72, delay, ease: expo },
  },
});

const stagger = (d = 0) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: d } },
});

const tagV = {
  hidden:  { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 20 } },
};

/* ─── TiltCard ───────────────────────────────────────────── */
function TiltCard({ children, className, accent }) {
  const ref = useRef(null);
  const [hov, setHov] = useState(false);
  const rx  = useMotionValue(0);
  const ry  = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 100, damping: 14 });
  const sry = useSpring(ry, { stiffness: 100, damping: 14 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    rx.set(-(((e.clientY - r.top)  / r.height) - 0.5) * 12);
    ry.set( (((e.clientX - r.left) / r.width)  - 0.5) * 12);
  };
  const onLeave = () => { rx.set(0); ry.set(0); setHov(false); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
    >
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(ellipse at 40% 0%, ${accent}25, transparent 65%)` }}
      />
      {children}
    </motion.div>
  );
}

/* ─── Timeline Item ──────────────────────────────────────── */
function TimelineItem({ item, index, isLast }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">

      {/* ── Spine ── */}
      <div className="flex flex-col items-center shrink-0 w-10">

        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: index * 0.12 }}
          className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0"
          style={{ borderColor: item.accent, background: '#060412' }}
        >
          {item.status === 'active' && (
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.7, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ background: item.accent }}
            />
          )}
          <motion.span
            animate={{ boxShadow: [`0 0 0 3px ${item.accent}30`, `0 0 0 7px ${item.accent}05`, `0 0 0 3px ${item.accent}30`] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-base z-10 relative"
          >
            {item.icon}
          </motion.span>
        </motion.div>

        {/* Line */}
        {!isLast && (
          <div className="relative flex-1 w-px mt-2 overflow-hidden bg-white/5">
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{ background: `linear-gradient(to bottom, ${item.accent}50, transparent)` }}
              initial={{ height: '0%' }}
              animate={inView ? { height: '100%' } : {}}
              transition={{ duration: 1.2, delay: index * 0.12 + 0.3, ease: expo }}
            />
          </div>
        )}
      </div>

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, x: 28, filter: 'blur(8px)' }}
        animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.72, delay: index * 0.12 + 0.1, ease: expo }}
        className="pb-10 flex-1 min-w-0"
      >
        <TiltCard accent={item.accent} className="w-full">
          <div
            className="relative p-6 rounded-2xl border bg-[#0c0818] overflow-hidden"
            style={{ borderColor: `${item.accent}20` }}
          >
            {/* Top sweep line */}
            <motion.div
              className="absolute top-0 left-0 h-[2px] rounded-tl-2xl"
              style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
              initial={{ width: '0%' }}
              animate={inView ? { width: '100%' } : {}}
              transition={{ duration: 1, delay: index * 0.12 + 0.4, ease: expo }}
            />

            {/* Index watermark */}
            <span
              className="absolute top-4 right-5 font-mono font-black text-[52px] leading-none select-none pointer-events-none"
              style={{ color: `${item.accent}10` }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Header row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Type badge */}
              <span
                className="font-mono text-[10px] tracking-[.14em] uppercase px-2.5 py-1 rounded-full border"
                style={{ color: item.accent, borderColor: `${item.accent}35`, background: `${item.accent}10` }}
              >
                {TYPE_LABEL[item.type]}
              </span>

              {/* Year */}
              <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                {item.year}
              </span>

              {/* Active badge */}
              {item.status === 'active' && (
                <motion.span
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-green-400 bg-green-500/8 border border-green-500/20 px-2.5 py-1 rounded-full"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  Active
                </motion.span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-[18px] font-bold text-white leading-snug mb-1">{item.title}</h3>

            {/* Org + location */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <p className="font-mono text-[12px]" style={{ color: `${item.accent}bb` }}>
                @ {item.organization}
              </p>
              <span className="text-gray-600 text-[11px]">·</span>
              <span className="font-mono text-[11px] text-gray-600">{item.location}</span>
            </div>

            {/* Result badge */}
            {item.result && (
              <motion.div
                className="inline-flex items-center gap-2 mt-1 mb-3 px-3 py-1.5 rounded-xl border"
                style={{ borderColor: `${item.accent}30`, background: `${item.accent}0d` }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.12 + 0.5, ease: expo, duration: 0.5 }}
              >
                <motion.span
                  className="text-sm"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🏆
                </motion.span>
                <span
                  className="font-mono text-[11px] font-bold tracking-wider"
                  style={{ color: item.accent }}
                >
                  {item.result}
                </span>
              </motion.div>
            )}

            {/* Description */}
            <p className="text-gray-500 text-[13.5px] leading-[1.8] mb-5 mt-2">{item.description}</p>

            {/* Tags */}
            <motion.div
              variants={stagger(0.05)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-1.5"
            >
              {item.tags.map((t) => (
                <motion.span
                  key={t}
                  variants={tagV}
                  className="font-mono text-[10px] px-2.5 py-1 rounded-lg border"
                  style={{ color: `${item.accent}bb`, borderColor: `${item.accent}22`, background: `${item.accent}0c` }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 bg-[#060412] overflow-hidden">

      {/* Orbs */}
      <motion.div
        className="pointer-events-none absolute top-1/4 -right-32 w-[420px] h-[420px] rounded-full"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#7c3aed,transparent_65%)]" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-1/4 -left-20 w-[300px] h-[300px] rounded-full"
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#a855f7,transparent_65%)]" />
      </motion.div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.026]"
        style={{
          backgroundImage:
            'linear-gradient(#a855f7 1px,transparent 1px),linear-gradient(90deg,#a855f7 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0)}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp(0)} className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/50" />
            <span className="font-mono text-[11px] tracking-[.18em] uppercase text-violet-400/70">My Journey</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/50" />
          </motion.div>

          <motion.h2
            variants={fadeUp(0.06)}
            className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4"
          >
            Education &{' '}
            <motion.span
              className="bg-gradient-to-br from-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
              style={{ backgroundSize: '200% 200%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Experience
            </motion.span>
          </motion.h2>

          <motion.p
            variants={fadeUp(0.12)}
            className="text-gray-500 text-[14px] max-w-sm mx-auto leading-relaxed"
          >
            From SSC to Diploma to full-stack engineering — a timeline of continuous growth.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            variants={fadeUp(0.18)}
            className="flex items-center justify-center gap-6 mt-8"
          >
            {[
              { val: '4.86', label: 'SSC GPA' },
              { val: '3.46', label: 'Diploma CGPA' },
              { val: '10+',  label: 'Projects' },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span className="text-xl font-extrabold bg-gradient-to-br from-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                  {val}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="mt-10">
          {TIMELINE.map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              index={i}
              isLast={i === TIMELINE.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}