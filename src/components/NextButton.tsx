import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  delay?: number;
};

export default function NextButton({
  children,
  onClick,
  className = '',
  delay = 0,
}: Props) {
  const [shown, setShown] = useState(delay === 0);
  const t = useRef<number | null>(null);
  useEffect(() => {
    if (delay === 0) return;
    t.current = window.setTimeout(() => setShown(true), delay);
    return () => {
      if (t.current) window.clearTimeout(t.current);
    };
  }, [delay]);

  if (!shown) return null;

  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blush-500 to-blush-400 px-7 py-3 font-display text-base font-semibold text-white shadow-glowPink ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:shadow-glowPink active:scale-95 ${className}`}
    >
      <span className="drop-shadow">{children}</span>
      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </button>
  );
}
