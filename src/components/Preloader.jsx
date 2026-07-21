'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check if already visited in this session
        const hasVisited = sessionStorage.getItem('hasVisitedPreloader');
        
        if (hasVisited) {
            setIsLoading(false);
            return;
        }

        // Simulate loading progress
        const duration = 2000; // 2 seconds total loading
        const intervalTime = 30;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
            setProgress(newProgress);

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(() => {
                    setIsLoading(false);
                    sessionStorage.setItem('hasVisitedPreloader', 'true');
                }, 400); // slight pause at 100%
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060412]"
                >
                    <div className="relative flex items-center justify-center">
                        {/* Outer Glow Ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            className="absolute w-32 h-32 rounded-full border-t-[3px] border-r-[3px] border-violet-500/80 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                        />
                        {/* Inner Gradient Ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className="absolute w-24 h-24 rounded-full border-b-[3px] border-l-[3px] border-fuchsia-500/80 shadow-[0_0_20px_rgba(217,70,239,0.5)]"
                        />
                        
                        {/* Percentage Text */}
                        <div className="relative z-10 font-mono text-2xl font-bold bg-gradient-to-br from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
                            {progress}%
                        </div>
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mt-16 font-mono text-[12px] tracking-[0.3em] uppercase text-violet-400/70"
                    >
                        morsalin.dev
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
