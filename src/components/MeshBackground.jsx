'use client';

import { useEffect, useRef } from 'react';

// ─── Config ─────────────────────────────────────────────
const CFG = {
    nodes: 65,
    connectDist: 140,
    speed: 0.35,
    dotRadius: 1.6,
    lineOpacity: 0.13,
    color: '139, 92, 246',      // violet-500 — আপনার theme অনুযায়ী
    mouseRadius: 160,
    repelForce: 0.28,
};

function mkNode(w, h) {
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * CFG.speed,
        vy: (Math.random() - 0.5) * CFG.speed,
        r: CFG.dotRadius + Math.random() * 1.2,
        op: 0.35 + Math.random() * 0.55,
    };
}

export default function MeshBackground() {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -999, y: -999 });
    const raf = useRef(null);
    const nodes = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W, H;

        const resize = () => {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
            nodes.current = Array.from({ length: CFG.nodes }, () => mkNode(W, H));
        };
        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const onMove = (e) => {
            const r = canvas.getBoundingClientRect();
            mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
        };
        const onLeave = () => { mouse.current = { x: -999, y: -999 }; };
        window.addEventListener('mousemove', onMove);
        canvas.addEventListener('mouseleave', onLeave);

        const tick = () => {
            ctx.clearRect(0, 0, W, H);
            const ns = nodes.current;
            const m = mouse.current;

            // update
            ns.forEach(n => {
                const dx = n.x - m.x, dy = n.y - m.y;
                const d = Math.hypot(dx, dy);
                if (d < CFG.mouseRadius && d > 0) {
                    const f = (1 - d / CFG.mouseRadius) * CFG.repelForce;
                    n.vx += (dx / d) * f;
                    n.vy += (dy / d) * f;
                }
                n.vx *= 0.985; n.vy *= 0.985;
                const sp = Math.hypot(n.vx, n.vy);
                if (sp > CFG.speed * 2.2) { n.vx *= CFG.speed * 2.2 / sp; n.vy *= CFG.speed * 2.2 / sp; }
                if (sp < CFG.speed * 0.25) { n.vx += (Math.random() - 0.5) * 0.04; n.vy += (Math.random() - 0.5) * 0.04; }
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0 || n.x > W) { n.vx *= -1; n.x = Math.max(0, Math.min(W, n.x)); }
                if (n.y < 0 || n.y > H) { n.vy *= -1; n.y = Math.max(0, Math.min(H, n.y)); }
            });

            // lines
            for (let i = 0; i < ns.length; i++) {
                for (let j = i + 1; j < ns.length; j++) {
                    const d = Math.hypot(ns[i].x - ns[j].x, ns[i].y - ns[j].y);
                    if (d < CFG.connectDist) {
                        const op = (1 - d / CFG.connectDist) * CFG.lineOpacity;
                        ctx.beginPath();
                        ctx.moveTo(ns[i].x, ns[i].y);
                        ctx.lineTo(ns[j].x, ns[j].y);
                        ctx.strokeStyle = `rgba(${CFG.color},${op})`;
                        ctx.lineWidth = 0.75;
                        ctx.stroke();
                    }
                }
            }

            // dots
            ns.forEach(n => {
                // glow
                const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.5);
                g.addColorStop(0, `rgba(${CFG.color},${n.op * 0.28})`);
                g.addColorStop(1, `rgba(${CFG.color},0)`);
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2);
                ctx.fillStyle = g;
                ctx.fill();
                // core
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${CFG.color},${n.op})`;
                ctx.fill();
            });

            raf.current = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            cancelAnimationFrame(raf.current);
            ro.disconnect();
            window.removeEventListener('mousemove', onMove);
            canvas.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}