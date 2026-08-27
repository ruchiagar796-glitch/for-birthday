import { useMemo } from 'react';

type BurstProps = {
  count?: number;
  emojis?: string[];
  className?: string;
  duration?: number;
};

const HEART_EMOJIS = ['❤️', '💖', '💕', '💗', '✨', '🌟'];

export function FloatingHearts({
  count = 10,
  className = '',
  duration = 4,
}: BurstProps) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 3,
        dur: duration + Math.random() * 3,
        emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
        size: 14 + Math.random() * 18,
      })),
    [count, duration],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {items.map((it, i) => (
        <span
          key={i}
          className="absolute bottom-[-40px] animate-driftUp"
          style={{
            left: `${it.left}%`,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.dur}s`,
            fontSize: it.size,
          }}
        >
          {it.emoji}
        </span>
      ))}
    </div>
  );
}

const CONFETTI_COLORS = ['#ff3d8f', '#ffd966', '#a855f7', '#ff9ecb', '#6ee7ff', '#fff'];

export function ConfettiBurst({ count = 60, className = '' }: BurstProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        dur: 2.5 + Math.random() * 2.5,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 6 + Math.random() * 8,
        rotate: Math.random() * 360,
        round: Math.random() > 0.6,
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-[-20px] block animate-driftUp"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.5,
            background: p.color,
            borderRadius: p.round ? '999px' : '2px',
            transform: `rotate(${p.rotate}deg)`,
            boxShadow: `0 0 6px ${p.color}66`,
          }}
        />
      ))}
    </div>
  );
}

/** Sparkle burst at a point (used for pops / transitions) */
export function SparkleBurst({ count = 16, className = '' }: BurstProps) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        angle: Math.random() * 360,
        dist: 20 + Math.random() * 80,
        delay: Math.random() * 0.2,
        dur: 0.8 + Math.random() * 0.6,
        size: 4 + Math.random() * 6,
        hue: Math.random() > 0.5 ? '#ffd966' : '#ff9ecb',
      })),
    [count],
  );
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 block rounded-full"
          style={{
            width: s.size,
            height: s.size,
            background: s.hue,
            boxShadow: `0 0 10px ${s.hue}`,
            transform: `translate(-50%,-50%) rotate(${s.angle}deg) translateY(-${s.dist}px)`,
            animation: `fadeIn 0.2s ease-out ${s.delay}s both, pop 0.6s ease-out ${s.delay + 0.1}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
