'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

/* ─────────────────────────────────────────────────────────
   ✅ Rules followed:
   1. 'use client' at the very top — required for browser APIs
   2. useEffect with [] — runs ONCE, no re-instantiation
   3. cancelAnimationFrame + lenis.destroy() — proper cleanup
   4. No state — no re-renders
───────────────────────────────────────────────────────── */
export default function SmoothScrollProvider({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []); // ✅ Empty array — critical, do NOT add dependencies

    return <>{children}</>;
}