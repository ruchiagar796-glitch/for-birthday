import { useEffect, useRef, useState } from 'react';
import MagicalBackground from './MagicalBackground';
import NextButton from './NextButton';
import { ConfettiBurst, FloatingHearts } from './Effects';
import { birthdayData } from '@/data/birthdayData';

type Props = { onContinue: () => void };

const N = birthdayData.cake.candleCount;

export default function BirthdayCake({ onContinue }: Props) {
  const [lit, setLit] = useState<boolean[]>(Array(N).fill(true));
  const [blowActive, setBlowActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const allOut = lit.every((l) => !l);

  const blowOut = (i: number) => {
    setLit((prev) => {
      const next = [...prev];
      next[i] = false;
      return next;
    });
  };

  // microphone blow detection (optional, gracefully degrades)
  const startMic = async () => {
    if (blowActive) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctx();
      audioCtxRef.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      src.connect(analyser);
      analyserRef.current = analyser;
      setBlowActive(true);

      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(data);
        // low-frequency energy spike indicates blow
        let low = 0;
        for (let i = 2; i < 20; i++) low += data[i];
        low /= 18;
        if (low > 120) {
          // blow detected — extinguish first lit candle
          setLit((prev) => {
            const firstLit = prev.findIndex((l) => l);
            if (firstLit === -1) return prev;
            const next = [...prev];
            next[firstLit] = false;
            return next;
          });
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      /* mic denied or unavailable — tap still works */
      setBlowActive(false);
    }
  };

  useEffect(() => {
    if (allOut) {
      // stop mic
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      audioCtxRef.current?.close();
      setBlowActive(false);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [allOut]);

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-10">
      <MagicalBackground
        particles={allOut ? 40 : 24}
        stars={40}
        bokeh={8}
        glow={allOut ? 1 : 0.7}
      />
      {allOut && (
        <>
          <ConfettiBurst count={80} />
          <FloatingHearts count={18} duration={3} />
        </>
      )}

      <div className="relative z-10 w-full max-w-md text-center animate-fadeInUp">
        <h2 className="font-display text-2xl font-bold text-shimmer sm:text-3xl">
          {birthdayData.cake.heading}
        </h2>

        {/* Cake */}
        <div className="relative mx-auto mt-6 w-64 sm:w-72">
          {/* candles */}
          <div className="relative flex items-end justify-center gap-3 sm:gap-4">
            {lit.map((isLit, i) => (
              <button
                key={i}
                onClick={() => blowOut(i)}
                aria-label={`Candle ${i + 1}`}
                className="touch-none relative flex flex-col items-center"
              >
                {/* flame */}
                {isLit && (
                  <span className="relative -mb-1 block">
                    <span className="block h-5 w-3 animate-flameFlicker rounded-full bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-100 blur-[1px] shadow-[0_0_12px_4px_rgba(255,200,80,0.8)]" />
                    <span className="absolute left-1/2 top-1 h-2.5 w-1.5 -translate-x-1/2 rounded-full bg-white/80" />
                  </span>
                )}
                {!isLit && (
                  <span className="block h-5 w-1 bg-white/10" aria-hidden>
                    <span className="block h-1.5 w-1 rounded-full bg-white/25" />
                  </span>
                )}
                {/* wax stick */}
                <span className="block h-9 w-1.5 rounded-full bg-gradient-to-b from-blush-200 to-blush-400 sm:h-10" />
              </button>
            ))}
          </div>

          {/* top tier */}
          <div className="relative mt-1 h-16 w-48 mx-auto rounded-t-xl rounded-b-md bg-gradient-to-b from-blush-100 to-blush-200 shadow-glowSoft sm:w-56 sm:h-20">
            {/* frosting drips */}
            <div className="absolute -top-1 left-0 right-0 h-4">
              {[...Array(9)].map((_, i) => (
                <span
                  key={i}
                  className="absolute top-0 block h-4 w-5 rounded-b-full bg-blush-50"
                  style={{ left: `${i * 12}%` }}
                />
              ))}
            </div>
            {/* sprinkles */}
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className="absolute block h-1 w-2.5 rounded-full"
                style={{
                  left: `${10 + i * 8}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  background: ['#ff3d8f', '#ffd966', '#a855f7'][i % 3],
                  transform: `rotate(${i * 30}deg)`,
                }}
              />
            ))}
          </div>

          {/* middle tier */}
          <div className="relative mx-auto -mt-1 h-20 w-60 rounded-md bg-gradient-to-b from-blush-200 to-blush-300 shadow-glowSoft sm:w-72 sm:h-24">
            <div className="absolute -top-1 left-0 right-0 h-4">
              {[...Array(11)].map((_, i) => (
                <span
                  key={i}
                  className="absolute top-0 block h-4 w-5 rounded-b-full bg-blush-100"
                  style={{ left: `${i * 9.5}%` }}
                />
              ))}
            </div>
            <p className="absolute inset-0 grid place-items-center font-script text-xl text-blush-600 sm:text-2xl">
              Shakshi ❤️
            </p>
          </div>

          {/* base tier */}
          <div className="relative mx-auto -mt-1 h-14 w-72 rounded-md rounded-b-xl bg-gradient-to-b from-blush-300 to-blush-400 shadow-glowSoft sm:w-80 sm:h-16">
            <div className="absolute -top-1 left-0 right-0 h-4">
              {[...Array(13)].map((_, i) => (
                <span
                  key={i}
                  className="absolute top-0 block h-4 w-5 rounded-b-full bg-blush-200"
                  style={{ left: `${i * 8}%` }}
                />
              ))}
            </div>
          </div>

          {/* plate */}
          <div className="mx-auto mt-1 h-2 w-80 rounded-full bg-white/20 blur-[1px]" />
          <div className="mx-auto h-3 w-72 rounded-b-xl bg-black/40 blur-md" />

          {/* glow when done */}
          {allOut && (
            <div className="pointer-events-none absolute inset-0 -z-10 animate-fadeIn rounded-full bg-gold-300/40 blur-3xl" />
          )}
        </div>

        {/* mic toggle */}
        {!allOut && (
          <button
            onClick={startMic}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-700/60 px-4 py-2 font-display text-sm text-white/80 backdrop-blur transition hover:scale-105 active:scale-95"
          >
            🎤 Blow to extinguish
          </button>
        )}
        {blowActive && (
          <p className="mt-2 font-display text-xs text-gold-200/80">
            Listening… blow gently 🌬️
          </p>
        )}

        {/* completion */}
        {allOut && (
          <div className="mt-8 animate-fadeInUp">
            <p className="font-display text-xl font-semibold text-blush-100 sm:text-2xl">
              {birthdayData.cake.wishMade}
            </p>
            <p className="mt-2 font-script text-2xl text-gold-200 sm:text-3xl">
              {birthdayData.cake.wishHope}
            </p>
            <div className="mt-6 flex justify-center">
              <NextButton onClick={onContinue} delay={600}>
                {birthdayData.cake.button}
              </NextButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
