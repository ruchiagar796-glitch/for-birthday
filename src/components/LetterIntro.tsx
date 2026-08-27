import { useEffect, useState } from 'react';
import { Music } from 'lucide-react';
import MagicalBackground from './MagicalBackground';
import { SparkleBurst } from './Effects';
import { birthdayData } from '@/data/birthdayData';

type Props = {
  onOpen: () => void;
  onReplay: () => void;
};

/**
 * Letter intro screen + envelope opening animation.
 * Calls onOpen after the opening animation completes.
 */
export default function LetterIntro({ onOpen, onReplay }: Props) {
  const [opening, setOpening] = useState(false);
  const [burst, setBurst] = useState(false);

  const handleTap = () => {
    if (opening) return;
    setOpening(true);
    setBurst(true);
    window.setTimeout(() => onOpen(), 2300);
  };

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-between overflow-hidden px-6 py-10">
      <MagicalBackground particles={26} stars={44} bokeh={10} glow={0.85} />
      {burst && <SparkleBurst count={30} />}

      {/* Top: small pale card with pink heart */}
      <div className="relative z-10 mt-6 flex flex-col items-center animate-fadeInUp">
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-glowSoft">
          <span className="text-3xl">💌</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-shimmer sm:text-3xl">
          {birthdayData.letterIntro.heading}
        </h1>
      </div>

      {/* Center: large realistic envelope */}
      <div className="relative z-10 my-6 flex w-full max-w-sm flex-col items-center">
        <Envelope opening={opening} onTap={handleTap} />
      </div>

      {/* Bottom: tap hint + replay */}
      <div className="relative z-10 mb-8 flex w-full max-w-sm flex-col items-center gap-4 animate-fadeInUp">
        {!opening ? (
          <p className="font-display text-lg font-semibold text-blush-200 animate-pulse">
            {birthdayData.letterIntro.tapHint}
          </p>
        ) : (
          <p className="font-display text-lg font-semibold text-gold-200 animate-fadeIn">
            Opening your letter… ✨
          </p>
        )}

        <button
          onClick={onReplay}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-700/50 px-5 py-2 font-display text-sm text-white/75 backdrop-blur transition hover:scale-105 active:scale-95"
        >
          {birthdayData.letterIntro.watchAgain}
        </button>

        {/* small circular music note hint (decorative; real player is global) */}
        <div className="pointer-events-none absolute -bottom-2 right-0 grid h-9 w-9 place-items-center rounded-full border border-blush-300/40 bg-ink-800/70 text-blush-200">
          <Music className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

/** A realistic envelope with a heart seal and an opening flap animation. */
function Envelope({ opening, onTap }: { opening: boolean; onTap: () => void }) {
  // flap animation stage
  const [flapOpen, setFlapOpen] = useState(false);
  const [paperOut, setPaperOut] = useState(false);

  useEffect(() => {
    if (!opening) {
      setFlapOpen(false);
      setPaperOut(false);
      return;
    }
    const t1 = window.setTimeout(() => setFlapOpen(true), 400);
    const t2 = window.setTimeout(() => setPaperOut(true), 900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [opening]);

  return (
    <button
      onClick={onTap}
      aria-label="Open the envelope"
      className="touch-none relative block w-72 sm:w-80"
    >
      {/* shadow */}
      <div className="absolute left-1/2 top-[105%] h-4 w-56 -translate-x-1/2 rounded-full bg-black/50 blur-md" />

      {/* Envelope body */}
      <div className="relative h-48 w-full rounded-lg bg-gradient-to-br from-[#e8c98a] via-[#d9b06a] to-[#c79a52] shadow-glowSoft ring-1 ring-white/20 sm:h-52">
        {/* inner paper (visible when opening) */}
        <div
          className="absolute inset-x-3 bottom-3 top-3 rounded-md bg-[#fff8e7] shadow-inner transition-all duration-700"
          style={{
            transform: paperOut ? 'translateY(-130px) scale(1.02)' : 'translateY(0)',
            opacity: paperOut ? 1 : 0,
          }}
        >
          <div className="h-3 w-2/3 rounded-full bg-blush-300/40" />
          <div className="mt-2 h-2 w-full rounded-full bg-black/5" />
          <div className="mt-1.5 h-2 w-5/6 rounded-full bg-black/5" />
          <div className="mt-1.5 h-2 w-4/6 rounded-full bg-black/5" />
          <div className="mt-4 text-center text-2xl">❤️</div>
        </div>

        {/* envelope flaps (back triangles, decorative) */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div className="absolute left-0 top-0 h-0 w-0 border-l-[144px] border-l-[#d4ad5a] border-t-[96px] border-t-[#cfak52] sm:border-l-[160px] sm:border-t-[104px]" />
          <div className="absolute right-0 top-0 h-0 w-0 border-r-[144px] border-r-[#d4ad5a] border-t-[96px] border-t-[#cfak52] sm:border-r-[160px] sm:border-t-[104px]" />
          <div className="absolute bottom-0 left-0 h-0 w-0 border-l-[144px] border-l-[#c79a52] border-b-[96px] border-b-[#bd9248] sm:border-l-[160px] sm:border-b-[104px]" />
          <div className="absolute bottom-0 right-0 h-0 w-0 border-r-[144px] border-r-[#c79a52] border-b-[96px] border-b-[#bd9248] sm:border-r-[160px] sm:border-b-[104px]" />
        </div>

        {/* Top flap (opens upward) */}
        <div
          className="preserve-3d absolute left-0 top-0 z-20 h-0 w-full origin-top"
          style={{
            borderBottom: '96px solid #e0bd72',
            borderLeft: '144px solid transparent',
            borderRight: '144px solid transparent',
            transform: flapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
            transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Heart seal */}
        <div
          className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
          style={{
            transform: flapOpen
              ? 'translate(-50%,-50%) scale(0)'
              : 'translate(-50%,-50%) scale(1)',
          }}
        >
          <span
            className="block animate-sealPulse text-4xl"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }}
          >
            ❤️
          </span>
        </div>

        {/* glow when opening */}
        {opening && (
          <div className="pointer-events-none absolute inset-0 -z-10 animate-fadeIn rounded-full bg-gold-300/40 blur-2xl" />
        )}
      </div>
    </button>
  );
}
