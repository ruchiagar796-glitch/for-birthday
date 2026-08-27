import { useMemo } from 'react';

type Props = {
  /** number of golden floating particles */
  particles?: number;
  /** number of twinkling stars */
  stars?: number;
  /** number of bokeh orbs */
  bokeh?: number;
  /** extra pink glow intensity 0..1 */
  glow?: number;
  className?: string;
};

type Dot = {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  hue: 'gold' | 'pink' | 'lav';
};

const COLORS: Record<Dot['hue'], string> = {
  gold: 'rgba(245,196,58,0.9)',
  pink: 'rgba(255,61,143,0.85)',
  lav: 'rgba(192,132,252,0.8)',
};

export default function MagicalBackground({
  particles = 26,
  stars = 40,
  bokeh = 8,
  glow = 0.6,
  className = '',
}: Props) {
  const dots = useMemo<Dot[]>(() => {
    const pick = (hue: Dot['hue']): Dot => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 8,
      hue,
    });
    return [
      ...Array.from({ length: Math.round(particles * 0.6) }, () => pick('gold')),
      ...Array.from({ length: Math.round(particles * 0.25) }, () => pick('pink')),
      ...Array.from({ length: Math.round(particles * 0.15) }, () => pick('lav')),
    ];
  }, [particles]);

  const starList = useMemo(
    () =>
      Array.from({ length: stars }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 3,
        duration: 1.8 + Math.random() * 2,
      })),
    [stars],
  );

  const bokehList = useMemo(
    () =>
      Array.from({ length: bokeh }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 80 + Math.random() * 160,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 6,
        hue: Math.random() > 0.5 ? 'gold' : 'pink',
      })),
    [bokeh],
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#2a0f52_0%,_#150529_45%,_#0a0118_100%)]" />

      {/* pink + purple glows */}
      <div
        className="absolute -top-24 left-1/2 h-[55vh] w-[80vw] -translate-x-1/2 rounded-full blur-[100px]"
        style={{ background: `rgba(255,61,143,${0.18 * glow})` }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[45vh] w-[60vw] rounded-full blur-[110px]"
        style={{ background: `rgba(168,85,247,${0.16 * glow})` }}
      />
      <div
        className="absolute right-0 top-1/3 h-[40vh] w-[50vw] rounded-full blur-[100px]"
        style={{ background: `rgba(245,196,58,${0.08 * glow})` }}
      />

      {/* bokeh orbs */}
      {bokehList.map((b, i) => (
        <div
          key={`b-${i}`}
          className="absolute rounded-full blur-2xl animate-bokehFloat"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: b.size,
            background:
              b.hue === 'gold'
                ? 'radial-gradient(circle, rgba(245,196,58,0.22), transparent 70%)'
                : 'radial-gradient(circle, rgba(255,61,143,0.18), transparent 70%)',
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}

      {/* twinkling stars */}
      {starList.map((s, i) => (
        <div
          key={`s-${i}`}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: '0 0 6px rgba(255,255,255,0.8)',
          }}
        />
      ))}

      {/* floating particles drifting upward */}
      {dots.map((d, i) => (
        <div
          key={`p-${i}`}
          className="absolute rounded-full animate-driftUp"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: COLORS[d.hue],
            boxShadow: `0 0 ${d.size * 2}px ${COLORS[d.hue]}`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
