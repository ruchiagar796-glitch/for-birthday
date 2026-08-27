import { useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import MagicalBackground from './MagicalBackground';
import NextButton from './NextButton';
import { SparkleBurst, FloatingHearts } from './Effects';
import { birthdayData } from '@/data/birthdayData';

type Props = { onContinue: () => void };

type Balloon = {
  id: number;
  text: string;
  color: string;
  left: number;
  top: number;
  delay: number;
};

const BALLOON_COLORS = [
  'from-blush-400 to-blush-600',
  'from-gold-300 to-gold-500',
  'from-lavender-400 to-lavender-500',
  'from-blush-300 to-blush-500',
  'from-gold-200 to-gold-400',
  'from-lavender-300 to-lavender-400',
];

export default function BalloonWishes({ onContinue }: Props) {
  const wishes = birthdayData.balloons.wishes;
  const [popped, setPopped] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number | null>(null);

  const balloons = useMemo<Balloon[]>(
    () =>
      wishes.map((text, i) => ({
        id: i,
        text,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        left: 8 + (i % 3) * 32 + Math.random() * 6,
        top: 14 + Math.floor(i / 3) * 34,
        delay: Math.random() * 2,
      })),
    [wishes],
  );

  const allPopped = popped.size === wishes.length;

  const handlePop = (b: Balloon) => {
    if (popped.has(b.id)) return;
    setPopped((prev) => new Set(prev).add(b.id));
    setActive(b.id);
  };

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-start overflow-hidden px-5 py-10">
      <MagicalBackground particles={20} stars={36} bokeh={6} glow={0.7} />
      {allPopped && <FloatingHearts count={16} duration={3} />}

      <div className="relative z-10 w-full max-w-md text-center animate-fadeInUp">
        <h2 className="font-display text-2xl font-bold text-shimmer sm:text-3xl">
          {birthdayData.balloons.heading}
        </h2>
        <p className="mt-1 font-display text-sm text-white/60">
          {popped.size}/{wishes.length} popped
        </p>
      </div>

      {/* Balloon field */}
      <div className="relative z-10 mt-4 h-[58vh] w-full max-w-md">
        {balloons.map((b) => {
          const isPopped = popped.has(b.id);
          return (
            <button
              key={b.id}
              onClick={() => handlePop(b)}
              aria-label={`Open wish ${b.id + 1}`}
              className="touch-none absolute"
              style={{
                left: `${b.left}%`,
                top: `${b.top}%`,
                animation: `floatY 4s ease-in-out ${b.delay}s infinite`,
              }}
            >
              {!isPopped ? (
                <span className="relative flex flex-col items-center">
                  {/* balloon body */}
                  <span
                    className={`relative block h-20 w-16 rounded-[50%] bg-gradient-to-b ${b.color} shadow-glowSoft ring-1 ring-white/20`}
                  >
                    <span className="absolute left-1/2 top-2 h-6 w-4 -translate-x-1/2 rounded-full bg-white/25 blur-[1px]" />
                    {/* knot */}
                    <span className="absolute -bottom-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black/30" />
                  </span>
                  {/* string */}
                  <span className="h-8 w-px bg-white/30" />
                  <span className="mt-0.5 text-xs">🎈</span>
                </span>
              ) : (
                <span className="relative flex h-20 w-16 items-center justify-center">
                  <SparkleBurst count={12} />
                  <span className="absolute text-2xl animate-pop">💥</span>
                  <Heart className="absolute h-5 w-5 fill-blush-300 text-blush-300 animate-heartUp" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Wish modal */}
      {active !== null && (
        <div
          className="fixed inset-0 z-30 grid place-items-center bg-black/70 p-6 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-sm animate-scaleIn rounded-3xl border border-blush-300/30 bg-gradient-to-br from-ink-700 to-ink-800 p-7 text-center shadow-glowPink"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-blush-500/20 ring-1 ring-blush-300/40">
              <Heart className="h-6 w-6 fill-blush-300 text-blush-300" />
            </div>
            <p className="font-script text-xl leading-relaxed text-blush-100 sm:text-2xl">
              {balloons[active].text}
            </p>
            <button
              onClick={() => setActive(null)}
              className="mt-6 rounded-full bg-blush-500/80 px-6 py-2 font-display text-sm font-semibold text-white transition hover:scale-105 active:scale-95"
            >
              Close ❤️
            </button>
          </div>
        </div>
      )}

      {/* Completion */}
      {allPopped && active === null && (
        <div className="relative z-10 mt-2 w-full max-w-md animate-fadeInUp text-center">
          <p className="font-display text-xl font-semibold text-blush-100 sm:text-2xl">
            {birthdayData.balloons.completeTitle}
          </p>
          <p className="mt-3 font-script text-xl text-gold-200 sm:text-2xl">
            {birthdayData.balloons.completeSubtitle}
          </p>
          <div className="mt-6 flex justify-center">
            <NextButton onClick={onContinue} delay={500}>
              {birthdayData.balloons.button}
            </NextButton>
          </div>
        </div>
      )}
    </div>
  );
}
