'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiGitCommit, FiFolder, FiStar, FiZap } from 'react-icons/fi';

const expo = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, delay, ease: expo },
  },
});

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: expo },
  },
};

// Smooth Number Counter Component
function AnimatedNumber({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const end = parseInt(value, 10);
    if (isNaN(end) || end === 0) {
      setCount(0);
      return;
    }

    const duration = 1500;
    const frameTime = 1000 / 60;
    const totalFrames = Math.round(duration / frameTime);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(end * (1 - Math.pow(2, -10 * progress)));
      
      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, frameTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {isInView ? count : 0}
      {suffix}
    </span>
  );
}

export default function GithubStats() {
  const username = "md-morsalin10";
  
  const [stats, setStats] = useState({
    repos: 0,
    stars: 0,
    contributions: 0,
    streak: 66,
  });

  const [topLanguages, setTopLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchGithubData() {
    setLoading(true);
    try {
      const res = await fetch('/api/github');
      if (!res.ok) throw new Error("API Fetch Failed");

      const data = await res.json();

      if (data && !data.error) {
        setTopLanguages(data.topLanguages || []);
        setStats((prev) => ({
          ...prev,
          repos: data.repos || prev.repos,
          stars: data.stars || prev.stars,
          contributions: data.contributions || prev.contributions,
        }));
      }
    } catch (error) {
      console.error("GitHub Data Fetching Error:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchGithubData();
}, []);

  return (
    <section id="github" className="relative py-20 px-6 bg-[#060412]/40 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp(0)} className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/50" />
            <span className="font-mono text-[11px] tracking-[.18em] uppercase text-violet-400/70">Open Source</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/50" />
          </motion.div>

          <motion.h2
            variants={fadeUp(0.06)}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-[1.1] mb-4"
          >
            GitHub{' '}
            <motion.span
              className="bg-gradient-to-br from-violet-400 to-fuchsia-500 bg-clip-text text-transparent inline-block"
              style={{ backgroundSize: '200% 200%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Activity
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Overview Stats Card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp(0)}
            className="p-6 rounded-3xl border border-white/10 bg-[#0c0818]/80 backdrop-blur-md overflow-hidden relative group hover:border-violet-500/30 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h3 className="font-mono text-[12px] text-violet-300 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              Overview Stats
            </h3>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div variants={cardItem} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors duration-300">
                <FiFolder className="text-violet-400 text-xl shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Public Repos</p>
                  <p className="text-xl font-bold text-white">
                    {loading ? "..." : <AnimatedNumber value={stats.repos} />}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={cardItem} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors duration-300">
                <FiGitCommit className="text-fuchsia-400 text-xl shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Total Commits</p>
                  <p className="text-xl font-bold text-white">
                    {loading ? "..." : <AnimatedNumber value={stats.contributions} suffix="+" />}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={cardItem} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors duration-300">
                <FiStar className="text-yellow-400 text-xl shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Total Stars</p>
                  <p className="text-xl font-bold text-white">
                    {loading ? "..." : <AnimatedNumber value={stats.stars} />}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={cardItem} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors duration-300">
                <FiZap className="text-cyan-400 text-xl shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Contributions</p>
                  <p className="text-xl font-bold text-white">
                    {loading ? "..." : <AnimatedNumber value={stats.contributions} />}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Top Languages Card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp(0.15)}
            className="p-6 rounded-3xl border border-white/10 bg-[#0c0818]/80 backdrop-blur-md overflow-hidden relative group hover:border-fuchsia-500/30 transition-colors duration-500 min-h-[220px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h3 className="font-mono text-[12px] text-fuchsia-300 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
              Top Languages
            </h3>
            
            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-white/5 rounded-full w-full" />
                ))}
              </div>
            ) : topLanguages.length > 0 ? (
              <div className="space-y-4">
                {topLanguages.map((lang, idx) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-300 font-medium">{lang.name}</span>
                      <span className="text-gray-400 font-mono">
                        <AnimatedNumber value={lang.percent} suffix="%" />
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + idx * 0.1, ease: expo }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">No language data available.</p>
            )}
          </motion.div>
        </div>
        
        {/* Contribution Streak */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp(0.25)}
          className="mt-6 p-6 rounded-3xl border border-white/10 bg-[#0c0818]/80 backdrop-blur-md overflow-hidden relative group max-w-3xl mx-auto hover:border-violet-500/30 transition-colors duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <h3 className="font-mono text-[12px] text-violet-300 uppercase tracking-widest mb-6 flex justify-center items-center gap-2">
            <span className="text-orange-500 animate-bounce">🔥</span>
            Contribution Streak
          </h3>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 text-center"
          >
            <motion.div variants={cardItem} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
              <p className="text-2xl font-black text-violet-400">
                {loading ? "..." : <AnimatedNumber value={stats.contributions} />}
              </p>
              <p className="text-[10px] md:text-[11px] text-gray-400 uppercase tracking-wider mt-1">Total Contributions</p>
            </motion.div>

            <motion.div variants={cardItem} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
              <p className="text-2xl md:text-3xl font-black text-fuchsia-400">
                {loading ? "..." : <AnimatedNumber value={stats.streak} />}
              </p>
              <p className="text-[10px] md:text-[11px] text-gray-400 uppercase tracking-wider mt-1">Longest Streak</p>
            </motion.div>

            <motion.div variants={cardItem} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
              <p className="text-2xl font-black text-cyan-400">Active</p>
              <p className="text-[10px] md:text-[11px] text-gray-400 uppercase tracking-wider mt-1">Current Status</p>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}