import { useEffect, useState } from 'react';
import MagicalBackground from './MagicalBackground';
import { birthdayData } from '@/data/birthdayData';

type Props = { onDone: () => void };

export default function SurpriseReveal({ onDone }: Props) {
  const lines = birthdayData.surprise.lines;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= lines.length) {
      const t = window.setTimeout(onDone, 1600);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 1500 : 2200);
    return () => window.clearTimeout(t);
  }, [step, lines.length, onDone]);

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <MagicalBackground particles={18} stars={40} bokeh={6} glow={0.5} />

      {/* glowing heart */}
      <div className="relative z-10 mb-8">
        <div
          className="text-6xl sm:text-7xl transition-all duration-700"
          style={{
            transform: step >= 1 ? 'scale(1)' : 'scale(0.4)',
            opacity: step >= 1 ? 1 : 0,
            filter: 'drop-shadow(0 0 24px rgba(255,61,143,0.7))',
          }}
        >
          💗
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-24 w-24 animate-pulseGlow rounded-full" />
      </div>

      {/* lines */}
      <div className="relative z-10 h-40 max-w-md">
        {lines.map((l, i) => (
          <p
            key={i}
            className={`absolute inset-0 m-auto grid place-items-center font-display text-xl font-semibold transition-all duration-700 sm:text-2xl ${
              i === step - 1
                ? 'opacity-100 translate-y-0'
                : i < step
                  ? 'opacity-0 -translate-y-4'
                  : 'opacity-0 translate-y-4'
            } ${i === 3 ? 'text-gold-200' : 'text-blush-100'}`}
          >
            {l}
          </p>
        ))}
      </div>

      {/* progress dots */}
      <div className="relative z-10 mt-8 flex gap-2">
        {lines.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i < step ? 'w-6 bg-gold-300' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
