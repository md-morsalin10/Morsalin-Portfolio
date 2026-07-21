'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    
    // Mouse position coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth trailing effect
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            // Find if the hovered element or its parents are clickable
            const target = e.target;
            const isClickable = target.closest('a') || target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('select') || target.classList.contains('clickable');
            
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Center Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-violet-400 rounded-full pointer-events-none z-[9999] hidden md:block"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            {/* Trailing Aura */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    border: isHovering ? '1px solid rgba(168, 85, 247, 0.8)' : '1px solid rgba(168, 85, 247, 0.3)',
                    backgroundColor: isHovering ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                    boxShadow: isHovering ? '0 0 20px rgba(168, 85, 247, 0.4)' : 'none',
                    backdropFilter: isHovering ? 'blur(2px)' : 'none',
                    scale: isHovering ? 1.5 : 1,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            />
        </>
    );
}
