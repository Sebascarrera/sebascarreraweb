import { useEffect, useRef } from 'react';

const SPACING = 18;
const BASE_RADIUS = 1;
const MAX_RADIUS = 5;
const INFLUENCE = 140;

export default function DotGridBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function buildGrid() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;

      const dots = [];
      for (let x = SPACING / 2; x < W; x += SPACING) {
        for (let y = SPACING / 2; y < H; y += SPACING) {
          dots.push({ x, y });
        }
      }
      dotsRef.current = dots;
    }

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const dot of dotsRef.current) {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / INFLUENCE);

        const radius = lerp(BASE_RADIUS, MAX_RADIUS, proximity);

        // interpolate alpha from 0.35 to 0.9, and colour from teal to white
        const r = Math.round(lerp(0, 255, proximity));
        const g = Math.round(lerp(212, 255, proximity));
        const b = Math.round(lerp(200, 255, proximity));
        const a = lerp(0.35, 0.9, proximity);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);

        if (proximity > 0.85) {
          ctx.shadowColor = 'rgba(255,255,255,0.8)';
          ctx.shadowBlur = 12;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function onTouchMove(e) {
      const t = e.touches[0];
      if (t) mouseRef.current = { x: t.clientX, y: t.clientY };
    }

    function onResize() {
      buildGrid();
    }

    buildGrid();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
