import { useCallback, useEffect, useRef, useState } from 'react';
import GiftBox from '@/components/GiftBox';
import PinLock from '@/components/PinLock';
import BirthdayIntro from '@/components/BirthdayIntro';
import BirthdayCake from '@/components/BirthdayCake';
import BalloonWishes from '@/components/BalloonWishes';
import BirthdayPuzzle from '@/components/BirthdayPuzzle';
import SurpriseReveal from '@/components/SurpriseReveal';
import LetterIntro from '@/components/LetterIntro';
import Letter from '@/components/Letter';
import FinalCelebration from '@/components/FinalCelebration';
import MusicPlayer from '@/components/MusicPlayer';
import type { Stage } from '@/data/birthdayData';

const ORDER: Stage[] = [
  'gift',
  'pin',
  'intro',
  'cake',
  'balloons',
  'puzzle',
  'surprise',
  'letterIntro',
  'letter',
  'final',
];

export default function App() {
  const [stage, setStage] = useState<Stage>('gift');
  const [transitioning, setTransitioning] = useState(false);
  const [interacted, setInteracted] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const lastInteraction = useRef(0);

  const go = useCallback((next: Stage) => {
    setTransitioning(true);
    window.setTimeout(() => {
      setStage(next);
      setTransitioning(false);
    }, 650);
  }, []);

  const advance = useCallback(() => {
    const i = ORDER.indexOf(stage);
    if (i < ORDER.length - 1) go(ORDER[i + 1]);
  }, [stage, go]);

  const replay = useCallback(() => {
    setTransitioning(true);
    window.setTimeout(() => {
      setStage('gift');
      setReplayKey((k) => k + 1);
      setTransitioning(false);
    }, 650);
  }, []);

  // bump the music start signal on the first user interaction anywhere
  useEffect(() => {
    const onFirst = () => {
      const now = Date.now();
      if (now - lastInteraction.current > 400) {
        lastInteraction.current = now;
        setInteracted((n) => (n === 0 ? 1 : n));
      }
    };
    window.addEventListener('pointerdown', onFirst, { once: false });
    window.addEventListener('keydown', onFirst, { once: false });
    return () => {
      window.removeEventListener('pointerdown', onFirst);
      window.removeEventListener('keydown', onFirst);
    };
  }, []);

  const renderStage = () => {
    switch (stage) {
      case 'gift':
        return <GiftBox key={`gift-${replayKey}`} onOpen={() => go('pin')} />;
      case 'pin':
        return <PinLock key={`pin-${replayKey}`} onSuccess={() => go('intro')} />;
      case 'intro':
        return <BirthdayIntro key={`intro-${replayKey}`} onContinue={advance} />;
      case 'cake':
        return <BirthdayCake key={`cake-${replayKey}`} onContinue={advance} />;
      case 'balloons':
        return <BalloonWishes key={`bal-${replayKey}`} onContinue={advance} />;
      case 'puzzle':
        return <BirthdayPuzzle key={`puz-${replayKey}`} onContinue={advance} />;
      case 'surprise':
        return <SurpriseReveal key={`sur-${replayKey}`} onDone={() => go('letterIntro')} />;
      case 'letterIntro':
        return (
          <LetterIntro
            key={`li-${replayKey}`}
            onOpen={() => go('letter')}
            onReplay={replay}
          />
        );
      case 'letter':
        return <Letter key={`let-${replayKey}`} onContinue={() => go('final')} />;
      case 'final':
        return <FinalCelebration key={`fin-${replayKey}`} onReplay={replay} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-ink-900 text-white">
      <div
        className={`transition-opacity duration-500 ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {renderStage()}
      </div>

      {/* cinematic fade overlay during transitions */}
      <div
        className={`pointer-events-none fixed inset-0 z-40 bg-ink-900 transition-opacity duration-500 ${
          transitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <MusicPlayer startSignal={interacted} />
    </div>
  );
}
