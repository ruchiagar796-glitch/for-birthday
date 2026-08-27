import { useState } from 'react';
import { Gift, Heart } from 'lucide-react';
import MagicalBackground from './MagicalBackground';
import { ConfettiBurst, FloatingHearts, SparkleBurst } from './Effects';
import { birthdayData } from '@/data/birthdayData';

type Props = { onOpen: () => void };

export default function GiftBox({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);
  const [burst, setBurst] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setBurst(true);
    window.setTimeout(() => onOpen(), 1400);
  };

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6">
      <MagicalBackground particles={30} stars={50} bokeh={9} glow={0.8} />

      {burst && (
        <>
          <ConfettiBurst count={70} />
          <FloatingHearts count={14} duration={3} />
          <SparkleBurst count={26} />
        </>
      )}

      {/* Text above */}
      <div className="relative z-10 mb-6 text-center animate-fadeInUp">
        <p className="font-display text-lg font-semibold text-blush-100 sm:text-xl">
          {birthdayData.giftBox.title}
        </p>
        <p className="mt-2 font-display text-sm text-gold-200/90 sm:text-base">
          {birthdayData.giftBox.subtitle}
        </p>
      </div>

      {/* 3D gift */}
      <div
        className="perspective relative z-10 cursor-pointer select-none"
        onClick={handleOpen}
        role="button"
        aria-label="Open the gift"
      >
        <div
          className={`relative transition-transform duration-500 ${
            opening ? 'scale-110' : 'animate-floatY hover:scale-105'
          }`}
        >
          {/* glow under box */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush-500/40 blur-3xl" />

          {/* Box body */}
          <div className="relative h-40 w-44 rounded-xl bg-gradient-to-br from-blush-500 to-blush-600 shadow-glowPink ring-1 ring-white/20 sm:h-48 sm:w-52">
            {/* vertical ribbon */}
            <div className="absolute left-1/2 top-0 h-full w-7 -translate-x-1/2 bg-gradient-to-b from-gold-300 to-gold-500" />
            {/* horizontal ribbon */}
            <div className="absolute left-0 top-1/2 h-7 w-full -translate-y-1/2 bg-gradient-to-r from-gold-300 to-gold-500" />
            {/* bow knots */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-gold-300">
              <div className="flex items-center gap-0">
                <span className="text-4xl drop-shadow">🎀</span>
              </div>
            </div>
            {/* inner glow when opening */}
            {opening && (
              <div className="absolute inset-0 animate-fadeIn rounded-xl bg-white/80 blur-md" />
            )}
          </div>

          {/* Lid (opens) */}
          <div
            className="preserve-3d absolute left-1/2 top-0 h-10 w-48 -translate-x-1/2 -translate-y-2 origin-bottom rounded-t-xl bg-gradient-to-br from-blush-400 to-blush-500 shadow-glowSoft ring-1 ring-white/30 sm:h-12 sm:w-56"
            style={{
              transform: opening ? 'rotateX(-115deg)' : 'rotateX(0deg)',
              transition: 'transform 0.9s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <div className="absolute left-1/2 top-0 h-full w-7 -translate-x-1/2 bg-gradient-to-b from-gold-300 to-gold-500" />
          </div>

          {/* light beam when opened */}
          {opening && (
            <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-60 w-24 -translate-x-1/2 -translate-y-32 animate-fadeIn bg-gradient-to-t from-white/80 via-gold-200/40 to-transparent blur-md" />
          )}
        </div>

        {/* shadow */}
        <div className="mx-auto mt-2 h-3 w-36 rounded-full bg-black/50 blur-md" />
      </div>

      {/* Tap hint */}
      <div className="relative z-10 mt-10 animate-fadeInUp text-center">
        <p className="font-display text-base font-semibold text-blush-200/90 animate-pulse">
          {birthdayData.giftBox.tapHint}
        </p>
      </div>

      {/* floating little hearts decoration */}
      <div className="pointer-events-none absolute left-6 top-24 animate-floatYsm text-2xl">
        <Heart className="h-6 w-6 fill-blush-300 text-blush-300" />
      </div>
      <div className="pointer-events-none absolute right-8 top-40 animate-floatY text-2xl">
        <Gift className="h-7 w-7 text-gold-300" />
      </div>
      <div className="pointer-events-none absolute left-10 bottom-28 animate-floatYsm text-2xl">
        <span className="text-2xl">✨</span>
      </div>
      <div className="pointer-events-none absolute right-12 bottom-36 animate-floatY text-2xl">
        <span className="text-2xl">🌟</span>
      </div>
    </div>
  );
}
