import { useEffect, useRef, useState } from 'react';
import MagicalBackground from './MagicalBackground';
import NextButton from './NextButton';
import { FloatingHearts } from './Effects';
import { birthdayData } from '@/data/birthdayData';

type Props = { onContinue: () => void };

export default function Letter({ onContinue }: Props) {
  const full = birthdayData.letter;
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);
  const raf = useRef<number | null>(null);
  const posRef = useRef(0);

  // typewriter
  useEffect(() => {
    const chars = Array.from(full); // handles emoji surrogate pairs
    const step = () => {
      posRef.current += 1;
      setShown(chars.slice(0, posRef.current).join(''));
      if (posRef.current >= chars.length) {
        setDone(true);
        return;
      }
      raf.current = window.setTimeout(step, 22) as unknown as number;
    };
    raf.current = window.setTimeout(step, 400) as unknown as number;
    return () => {
      if (raf.current) window.clearTimeout(raf.current);
    };
  }, [full]);

  const skip = () => {
    if (raf.current) window.clearTimeout(raf.current);
    setShown(full);
    setDone(true);
  };

  // emphasize the final "cutieeee" line with a heart when done
  const renderText = (text: string) => {
    if (!done) return text;
    return text.split(/(cutieeee 😘💕❤️😍)/).map((part, i) =>
      part === 'cutieeee 😘💕❤️😍' ? (
        <span
          key={i}
          className="font-hand text-2xl text-blush-400 sm:text-3xl animate-pulseGlow"
          style={{ textShadow: '0 0 16px rgba(255,61,143,0.6)' }}
        >
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center overflow-hidden px-5 py-10">
      <MagicalBackground particles={22} stars={36} bokeh={8} glow={0.8} />
      {done && <FloatingHearts count={14} duration={3} />}

      <div className="relative z-10 w-full max-w-lg animate-scaleIn">
        {/* paper */}
        <div
          onClick={skip}
          className="paper-edge relative cursor-pointer rounded-sm bg-[#fff8e7] p-6 shadow-glowSoft ring-1 ring-black/10 sm:p-8"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(0,0,0,0.02) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.02) 1px, transparent 1px)',
            backgroundSize: '24px 24px, 32px 32px',
          }}
        >
          {/* paper corner folds */}
          <div className="absolute right-0 top-0 h-8 w-8 bg-[#efe2c4] shadow-md [clip-path:polygon(100%_0,0_0,100%_100%)]" />
          <div className="absolute bottom-0 left-0 h-8 w-8 bg-[#efe2c4] shadow-md [clip-path:polygon(0_100%,0_0,100%_100%)]" />

          <p
            className="whitespace-pre-wrap font-hand text-xl leading-relaxed text-[#3a2a1a] sm:text-2xl sm:leading-relaxed"
            style={{ minHeight: '60vh' }}
          >
            {renderText(shown)}
            {!done && (
              <span className="ml-0.5 inline-block w-0.5 bg-[#3a2a1a] animate-caretBlink align-middle">
                &nbsp;
              </span>
            )}
          </p>

          {!done && (
            <p className="mt-4 text-center font-body text-xs text-black/40">
              Tap the letter to reveal it all ✨
            </p>
          )}
        </div>

        {done && (
          <div className="mt-8 flex flex-col items-center gap-4 animate-fadeInUp">
            <p className="font-script text-2xl text-blush-200 sm:text-3xl">
              With all my love ❤️
            </p>
            <NextButton onClick={onContinue} delay={400}>
              Continue →
            </NextButton>
          </div>
        )}
      </div>
    </div>
  );
}
