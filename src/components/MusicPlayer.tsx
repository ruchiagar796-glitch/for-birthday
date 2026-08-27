import { useEffect, useRef, useState } from 'react';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';
import { birthdayData } from '@/data/birthdayData';

type Props = {
  /** bump this to (try to) start music after first interaction */
  startSignal: number;
  className?: string;
};

export default function MusicPlayer({ startSignal, className = '' }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [tried, setTried] = useState(false);
  const [errored, setErrored] = useState(false);

  // create audio element once
  useEffect(() => {
    const a = new Audio(birthdayData.music.path);
    a.loop = true;
    a.volume = 0.45;
    a.preload = 'auto';
    a.addEventListener('error', () => setErrored(true));
    audioRef.current = a;
    return () => {
      a.pause();
      a.src = '';
      audioRef.current = null;
    };
  }, []);

  // attempt to start when signaled
  useEffect(() => {
    if (!startSignal || !audioRef.current || tried || errored) return;
    const a = audioRef.current;
    a.play()
      .then(() => setPlaying(true))
      .catch(() => {
        /* autoplay blocked — wait for manual toggle */
      })
      .finally(() => setTried(true));
  }, [startSignal, tried, errored]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a || errored) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setErrored(true));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const a = audioRef.current;
    if (!a) return;
    const next = !muted;
    a.muted = next;
    setMuted(next);
  };

  if (errored) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className={`fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full border border-blush-300/40 bg-ink-800/70 text-blush-200 shadow-glowSoft backdrop-blur-md transition hover:scale-110 active:scale-95 ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-blush-500/20 blur-md" />
      {playing ? (
        <Music2 className="relative h-5 w-5 animate-spinSlow" />
      ) : (
        <Music className="relative h-5 w-5" />
      )}
      {playing && (
        <span
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="absolute -left-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ink-700 text-gold-200 ring-1 ring-gold-300/40"
        >
          {muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
        </span>
      )}
      {playing && (
        <span className="absolute inset-0 -z-10 animate-pulseGlow rounded-full" />
      )}
    </button>
  );
}
