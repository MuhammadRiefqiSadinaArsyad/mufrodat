'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useApp } from '@/context/AppProvider';
import { P } from '@/data/vocabulary';
import { sample, shuffle } from '@/utils/scoring';
import Icon from '@/components/Icon';

const PAIRS = 6;

const deal = () =>
  shuffle(
    sample(P, PAIRS).flatMap((word, pair) => [
      { key: `ar-${pair}-${word.ar}`, pair, kind: 'ar', text: word.ar, word },
      { key: `id-${pair}-${word.ar}`, pair, kind: 'id', text: word.id, word }
    ])
  );

export default function MemoryPage() {
  const { markActivity } = useApp();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const [won, setWon] = useState(false);
  const timerRef = useRef(null);

  const newGame = useCallback(() => {
    clearTimeout(timerRef.current);
    setCards(deal());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setLock(false);
    setWon(false);
  }, []);

  useEffect(() => {
    newGame();
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [newGame]);

  useEffect(() => {
    if (won) markActivity();
  }, [won, markActivity]);

  const flip = (index) => {
    if (lock || won) return;
    const card = cards[index];
    if (!card || flipped.includes(index) || matched.includes(card.pair)) return;
    if (!flipped.length) {
      setFlipped([index]);
      return;
    }
    const first = cards[flipped[0]];
    setFlipped([flipped[0], index]);
    setMoves((v) => v + 1);
    setLock(true);
    if (first.pair === card.pair) {
      setMatched((prev) => {
        const next = [...prev, card.pair];
        if (next.length === PAIRS) setWon(true);
        return next;
      });
      setFlipped([]);
      setLock(false);
    } else {
      timerRef.current = setTimeout(() => {
        setFlipped([]);
        setLock(false);
      }, 900);
    }
  };

  return (
    <div className="page memory-page">
      <div className="subbar">
        <Link href="/latihan" className="back-link"><Icon name="chevLeft" /> Latihan</Link>
        <button type="button" className="lnk" onClick={newGame}><Icon name="refresh" /> Kocok ulang</button>
      </div>

      <div className="page-title-row">
        <div>
          <span className="eyebrow">Permainan memori</span>
          <h1>Cocokkan kata & arti</h1>
          <p>Balik dua kartu. Temukan pasangan kata Arab dengan arti Indonesianya.</p>
        </div>
        <div className="mem-scores">
          <div><strong>{matched.length}/{PAIRS}</strong><small>pasangan</small></div>
          <div><strong>{moves}</strong><small>langkah</small></div>
        </div>
      </div>

      <div className="memory-board" aria-label="Papan permainan memori">
        {cards.map((card, index) => {
          const isMatched = matched.includes(card.pair);
          const isOpen = flipped.includes(index) || isMatched;
          return (
            <button
              key={card.key}
              type="button"
              className={`mem-card ${isOpen ? 'open' : ''} ${isMatched ? 'matched' : ''} ${card.kind === 'ar' ? 'arabic' : 'meaning'}`}
              onClick={() => flip(index)}
              disabled={isOpen || lock || won}
              aria-label={isOpen ? card.text : 'Kartu tertutup'}
            >
              <span className="mem-inner">
                <span className="mem-back"><span className="mem-pattern" /></span>
                <span className="mem-front">
                  <span className={card.kind === 'ar' ? 'mem-arabic' : 'mem-meaning'}>{card.text}</span>
                  {isMatched ? <Icon name="check" className="mem-check" /> : null}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {won ? (
        <div className="win-panel" role="status">
          <span className="win-ar">مُمْتَاز!</span>
          <div>
            <h3>Semua pasangan ditemukan</h3>
            <p>Kamu menyelesaikannya dalam {moves} langkah. Coba kocok ulang untuk kata yang berbeda.</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={newGame}>Main lagi <Icon name="refresh" /></button>
        </div>
      ) : (
        <p className="materi-hint"><Icon name="info" /> Cocokkan kartu Arab dengan artinya. Klik kartu untuk membalik.</p>
      )}
    </div>
  );
}
