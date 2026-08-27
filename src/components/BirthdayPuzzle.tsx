import { useCallback, useEffect, useMemo, useState } from 'react';
import { RotateCw, Shuffle } from 'lucide-react';
import MagicalBackground from './MagicalBackground';
import NextButton from './NextButton';
import { ConfettiBurst, FloatingHearts } from './Effects';
import { birthdayData } from '@/data/birthdayData';

type Props = { onContinue: () => void };

const SIZE = 3;
const TILES = ['🎂', '🎁', '❤️', '⭐', '🌙', '✨', '🎈', '🍰', ''];

function solvedState(): number[] {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8];
}

/** produce a solvable shuffled board by doing many random valid moves */
function shuffleBoard(): number[] {
  let board = solvedState();
  let empty = board.indexOf(8);
  for (let i = 0; i < 200; i++) {
    const neighbors = movesFor(empty);
    const pick = neighbors[Math.floor(Math.random() * neighbors.length)];
    [board[empty], board[pick]] = [board[pick], board[empty]];
    empty = pick;
  }
  if (board.every((v, i) => v === i)) {
    // edge case: shuffle again
    return shuffleBoard();
  }
  return board;
}

function movesFor(empty: number): number[] {
  const row = Math.floor(empty / SIZE);
  const col = empty % SIZE;
  const res: number[] = [];
  if (row > 0) res.push(empty - SIZE);
  if (row < SIZE - 1) res.push(empty + SIZE);
  if (col > 0) res.push(empty - 1);
  if (col < SIZE - 1) res.push(empty + 1);
  return res;
}

export default function BirthdayPuzzle({ onContinue }: Props) {
  const [board, setBoard] = useState<number[]>(() => shuffleBoard());
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const empty = board.indexOf(8);

  const isSolved = useMemo(() => board.every((v, i) => v === i), [board]);

  useEffect(() => {
    if (isSolved && moves > 0) setWon(true);
  }, [isSolved, moves]);

  const tryMove = useCallback(
    (index: number) => {
      if (won) return;
      const neighbors = movesFor(empty);
      if (!neighbors.includes(index)) return;
      setBoard((prev) => {
        const next = [...prev];
        const e = next.indexOf(8);
        [next[e], next[index]] = [next[index], next[e]];
        return next;
      });
      setMoves((m) => m + 1);
    },
    [empty, won],
  );

  const reshuffle = () => {
    setBoard(shuffleBoard());
    setMoves(0);
    setWon(false);
  };

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-10">
      <MagicalBackground particles={20} stars={34} bokeh={6} glow={0.7} />
      {won && (
        <>
          <ConfettiBurst count={70} />
          <FloatingHearts count={14} duration={3} />
        </>
      )}

      <div className="relative z-10 w-full max-w-sm text-center animate-fadeInUp">
        <h2 className="font-display text-2xl font-bold text-shimmer sm:text-3xl">
          A little puzzle for you 🧩
        </h2>
        <p className="mt-1 font-display text-sm text-white/60">
          Arrange the birthday symbols in order. Tap a tile next to the empty space.
        </p>

        {/* stats */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="rounded-full border border-white/10 bg-ink-700/60 px-4 py-1.5 font-display text-sm text-white/80 backdrop-blur">
            Moves: <span className="font-bold text-gold-200">{moves}</span>
          </div>
          <button
            onClick={reshuffle}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-700/60 px-4 py-1.5 font-display text-sm text-white/80 backdrop-blur transition hover:scale-105 active:scale-95"
          >
            <Shuffle className="h-4 w-4" /> Shuffle
          </button>
        </div>

        {/* board */}
        <div className="relative mx-auto mt-6 grid grid-cols-3 gap-1.5 rounded-2xl border border-white/10 bg-ink-900/60 p-2 shadow-glowSoft">
          {board.map((tile, i) => {
            const isEmpty = tile === 8;
            const correct = tile === i;
            const neighbors = movesFor(empty);
            const movable = neighbors.includes(i) && !won;
            return (
              <button
                key={i}
                onClick={() => tryMove(i)}
                disabled={isEmpty || won}
                className={`touch-none grid h-20 w-20 place-items-center rounded-xl text-3xl transition-all duration-200 sm:h-24 sm:w-24 ${
                  isEmpty
                    ? 'bg-transparent'
                    : movable
                      ? 'bg-gradient-to-br from-blush-400/80 to-blush-600/80 ring-1 ring-white/20 hover:scale-105 active:scale-95'
                      : 'bg-gradient-to-br from-ink-600 to-ink-700 ring-1 ring-white/10'
                } ${correct ? 'shadow-glowGold ring-1 ring-gold-300/50' : ''}`}
                style={{
                  boxShadow: correct && !isEmpty ? '0 0 18px rgba(245,196,58,0.45)' : undefined,
                }}
              >
                <span className={isEmpty ? '' : 'drop-shadow'}>
                  {TILES[tile]}
                </span>
              </button>
            );
          })}
        </div>

        {/* hint of solved order */}
        <p className="mt-3 font-display text-xs text-white/40">
          Goal: 🎂 🎁 ❤️ ⭐ 🌙 ✨ 🎈 🍰
        </p>

        {/* win */}
        {won && (
          <div className="mt-6 animate-fadeInUp">
            <p className="font-display text-2xl font-bold text-shimmer sm:text-3xl">
              {birthdayData.puzzle.successTitle}
            </p>
            <p className="mt-2 font-script text-xl text-gold-200 sm:text-2xl">
              {birthdayData.puzzle.successSubtitle}
            </p>
            <p className="mt-1 font-display text-sm text-white/60">
              Solved in {moves} moves
            </p>
            <div className="mt-5 flex justify-center">
              <NextButton onClick={onContinue} delay={400}>
                {birthdayData.puzzle.button}
              </NextButton>
            </div>
          </div>
        )}

        {!won && (
          <p className="mt-4 flex items-center justify-center gap-1 font-display text-xs text-white/40">
            <RotateCw className="h-3 w-3" /> Tap tiles or shuffle to restart
          </p>
        )}
      </div>
    </div>
  );
}
