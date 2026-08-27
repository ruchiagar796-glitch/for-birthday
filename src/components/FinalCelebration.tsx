import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import MagicalBackground from './MagicalBackground';
import { ConfettiBurst, FloatingHearts } from './Effects';
import { birthdayData } from '@/data/birthdayData';

type Props = { onReplay: () => void };

export default function FinalCelebration({ onReplay }: Props) {
  const lines = birthdayData.final.lines;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= lines.length) return;
    const t = window.setTimeout(() => setStep((s) => s + 1), 1400);
    return () => window.clearTimeout(t);
  }, [step]);

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
      <MagicalBackground particles={40} stars={50} bokeh={12} glow={1} />
      <ConfettiBurst count={120} />
      <FloatingHearts count={22} duration={3} />

      <div className="relative z-10 max-w-lg animate-fadeInUp">
        <div className="mb-6 text-6xl animate-floatY sm:text-7xl">🎂🎉</div>

        <h1 className="font-display text-3xl font-bold leading-tight text-shimmer sm:text-4xl">
          {birthdayData.final.heading}
        </h1>

        <div className="mt-8 space-y-5">
          {lines.map((line, i) => (
            <p
              key={i}
              className={`font-display text-base font-medium transition-all duration-700 sm:text-lg ${
                i < step
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              } ${i === lines.length - 1 ? 'text-shimmer text-xl font-bold sm:text-2xl' : 'text-white/90'}`}
            >
              {line}
            </p>
          ))}
        </div>

        {step >= lines.length && (
          <div className="mt-10 flex flex-col items-center gap-4 animate-fadeInUp">
            <div className="mb-2 text-4xl animate-pulse">❤️</div>
            <button
              onClick={onReplay}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blush-500 to-blush-400 px-7 py-3 font-display text-base font-semibold text-white shadow-glowPink ring-1 ring-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <RotateCcw className="h-5 w-5 transition-transform group-hover:-rotate-180 duration-500" />
              {birthdayData.final.watchAgain}
            </button>
          </div>
        )}
      </div>

      {/* decorative floating emojis */}
      <span className="pointer-events-none absolute left-6 top-20 text-3xl animate-floatYsm">✨</span>
      <span className="pointer-events-none absolute right-8 top-28 text-3xl animate-floatY">🎈</span>
      <span className="pointer-events-none absolute left-10 bottom-24 text-3xl animate-floatYsm">🎉</span>
      <span className="pointer-events-none absolute right-12 bottom-32 text-3xl animate-floatY">💕</span>
    </div>
  );
}
