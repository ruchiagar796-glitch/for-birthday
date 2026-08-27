import { useEffect, useRef, useState } from 'react';
import { Lock, Sparkles } from 'lucide-react';
import MagicalBackground from './MagicalBackground';
import { SparkleBurst } from './Effects';
import { birthdayData } from '@/data/birthdayData';

type Props = { onSuccess: () => void };

export default function PinLock({ onSuccess }: Props) {
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const idx = useRef(0);

  const setDigit = (i: number, v: string) => {
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    setError(false);
  };

  const appendDigit = (d: string) => {
    if (success) return;
    setError(false);
    const firstEmpty = digits.findIndex((x) => x === '');
    const i = firstEmpty === -1 ? 3 : firstEmpty;
    const next = [...digits];
    next[i] = d;
    setDigits(next);
  };

  const backspace = () => {
    if (success) return;
    const lastFilled = [...digits].map((x) => x !== '').lastIndexOf(true);
    if (lastFilled === -1) return;
    const next = [...digits];
    next[lastFilled] = '';
    setDigits(next);
    setError(false);
  };

  // check when all filled
  useEffect(() => {
    if (digits.every((d) => d !== '')) {
      const entered = digits.join('');
      if (entered === birthdayData.secretPin) {
        setSuccess(true);
        window.setTimeout(() => onSuccess(), 1300);
      } else {
        setError(true);
        window.setTimeout(() => setDigits(['', '', '', '']), 600);
      }
    }
  }, [digits, onSuccess]);

  // desktop keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (success) return;
      if (/^[0-9]$/.test(e.key)) appendDigit(e.key);
      else if (e.key === 'Backspace') backspace();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits, success]);

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-10">
      <MagicalBackground particles={20} stars={36} bokeh={6} glow={0.7} />
      {success && <SparkleBurst count={28} />}

      <div className="relative z-10 w-full max-w-xs animate-fadeInUp text-center">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-ink-700/70 ring-1 ring-gold-300/40 backdrop-blur">
          <Lock
            className={`h-6 w-6 text-gold-300 transition ${
              success ? 'scale-110 text-blush-300' : ''
            }`}
          />
        </div>

        <p className="font-display text-base font-semibold text-blush-100 sm:text-lg">
          {birthdayData.pinLock.title}
        </p>
        <p className="mt-1 font-display text-sm text-gold-200/80">
          {birthdayData.pinLock.subtitle}
        </p>

        {/* PIN boxes */}
        <div
          className={`mt-8 flex justify-center gap-3 ${
            error ? 'animate-shake' : ''
          }`}
        >
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                if (i === idx.current && el) el.focus();
              }}
              value={d}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '').slice(-1);
                setDigit(i, v);
              }}
              disabled={success}
              className={`h-14 w-12 rounded-xl border bg-ink-800/60 text-center font-display text-2xl font-bold text-white outline-none transition backdrop-blur sm:h-16 sm:w-14 ${
                success
                  ? 'border-gold-300 text-gold-200 shadow-glowGold'
                  : error
                    ? 'border-red-400/80'
                    : d
                      ? 'border-blush-400 shadow-glowPink'
                      : 'border-blush-300/30 focus:border-blush-400'
              }`}
            />
          ))}
        </div>

        <div className="mt-3 h-5">
          {error && (
            <p className="font-display text-sm text-red-300">
              {birthdayData.pinLock.error}
            </p>
          )}
          {success && (
            <p className="font-display text-sm text-gold-200 animate-fadeIn">
              Unlocking... ✨
            </p>
          )}
        </div>

        {/* numeric keypad */}
        <div className="mt-6 grid grid-cols-3 gap-2.5">
          {keys.map((k, i) =>
            k === '' ? (
              <div key={i} />
            ) : (
              <button
                key={i}
                onClick={() => (k === '⌫' ? backspace() : appendDigit(k))}
                disabled={success}
                className="touch-none grid h-14 place-items-center rounded-2xl border border-white/10 bg-ink-700/60 font-display text-xl font-semibold text-white backdrop-blur transition active:scale-90 disabled:opacity-40"
              >
                {k === '⌫' ? '⌫' : k}
              </button>
            ),
          )}
        </div>

        <p className="mt-5 flex items-center justify-center gap-1 font-display text-xs text-white/40">
          <Sparkles className="h-3 w-3" /> hint: 1234
        </p>
      </div>
    </div>
  );
}
