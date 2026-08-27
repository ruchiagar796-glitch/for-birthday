import MagicalBackground from './MagicalBackground';
import NextButton from './NextButton';
import { FloatingHearts } from './Effects';
import { birthdayData } from '@/data/birthdayData';

type Props = { onContinue: () => void };

export default function BirthdayIntro({ onContinue }: Props) {
  const { birthdayIntro: d } = birthdayData;

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
      <MagicalBackground particles={26} stars={44} bokeh={8} glow={0.85} />
      <FloatingHearts count={12} duration={4} />

      <div className="relative z-10 max-w-lg animate-fadeInUp">
        <p className="mb-4 text-5xl animate-floatY sm:text-6xl">🎂</p>

        <h1 className="font-display text-3xl font-bold leading-tight text-shimmer sm:text-4xl">
          {d.heading}
        </h1>

        <p className="mt-4 font-script text-2xl text-blush-200 sm:text-3xl">
          {d.subheading}
        </p>

        <p className="mx-auto mt-6 max-w-md font-body text-base leading-relaxed text-white/85 sm:text-lg">
          {d.message}
        </p>

        <p className="mt-8 font-display text-lg font-semibold text-gold-200 sm:text-xl">
          {d.prompt}
        </p>

        <div className="mt-8 flex justify-center">
          <NextButton onClick={onContinue}>{d.button}</NextButton>
        </div>
      </div>

      {/* decorative emoji */}
      <span className="pointer-events-none absolute left-8 top-20 text-3xl animate-floatYsm">✨</span>
      <span className="pointer-events-none absolute right-10 top-28 text-3xl animate-floatY">🎈</span>
      <span className="pointer-events-none absolute left-12 bottom-24 text-3xl animate-floatYsm">🎉</span>
      <span className="pointer-events-none absolute right-12 bottom-32 text-3xl animate-floatY">💕</span>
    </div>
  );
}
