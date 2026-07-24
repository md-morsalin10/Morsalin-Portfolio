'use client';

import { useEffect, useRef } from 'react';

const CFG = {
    nodes: 72,
    connectDist: 145,
    speed: 0.32,
    dotRadius: 1.5,
    lineOpacity: 0.11,
    color: '139, 92, 246',   // violet — আপনার theme
    mouseRadius: 170,
    repelForce: 0.3,
};

function mkNode(w, h) {
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * CFG.speed,
        vy: (Math.random() - 0.5) * CFG.speed,
        r: CFG.dotRadius + Math.random() * 1.1,
        op: 0.3 + Math.random() * 0.5,
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

        const tick = () => {
            ctx.clearRect(0, 0, W, H);
            const ns = nodes.current;
            const m = mouse.current;

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
                const maxSp = CFG.speed * 2.2;
                if (sp > maxSp) { n.vx = n.vx / sp * maxSp; n.vy = n.vy / sp * maxSp; }
                if (sp < CFG.speed * 0.2) { n.vx += (Math.random() - 0.5) * 0.04; n.vy += (Math.random() - 0.5) * 0.04; }
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0 || n.x > W) { n.vx *= -1; n.x = Math.max(0, Math.min(W, n.x)); }
                if (n.y < 0 || n.y > H) { n.vy *= -1; n.y = Math.max(0, Math.min(H, n.y)); }
            });

            for (let i = 0; i < ns.length; i++) {
                for (let j = i + 1; j < ns.length; j++) {
                    const d = Math.hypot(ns[i].x - ns[j].x, ns[i].y - ns[j].y);
                    if (d < CFG.connectDist) {
                        const op = (1 - d / CFG.connectDist) * CFG.lineOpacity;
                        ctx.beginPath();
                        ctx.moveTo(ns[i].x, ns[i].y);
                        ctx.lineTo(ns[j].x, ns[j].y);
                        ctx.strokeStyle = `rgba(${CFG.color},${op})`;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }

            ns.forEach(n => {
                const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.5);
                g.addColorStop(0, `rgba(${CFG.color},${n.op * 0.25})`);
                g.addColorStop(1, `rgba(${CFG.color},0)`);
                ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2);
                ctx.fillStyle = g; ctx.fill();
                ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${CFG.color},${n.op})`; ctx.fill();
            });

            raf.current = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            cancelAnimationFrame(raf.current);
            ro.disconnect();
            window.removeEventListener('mousemove', onMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 h-screen w-screen pointer-events-none z-0"
        />
    );
}