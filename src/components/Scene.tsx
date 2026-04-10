'use client';

import { SceneLevel } from '@/lib/constants';

interface SceneProps {
  level: SceneLevel;
  isHome?: boolean;
  customBg?: string;
}

// OW-style gradient — bright blue atmosphere matching the game's matchmaking/menu screen
const owBackground = `
  radial-gradient(ellipse at 75% 25%, rgba(255, 220, 150, 0.15) 0%, transparent 50%),
  radial-gradient(ellipse at 25% 35%, rgba(130, 180, 240, 0.25) 0%, transparent 55%),
  radial-gradient(ellipse at 65% 60%, rgba(100, 160, 230, 0.2) 0%, transparent 50%),
  radial-gradient(ellipse at 40% 80%, rgba(60, 100, 180, 0.15) 0%, transparent 45%),
  linear-gradient(155deg, #1e3a5f 0%, #2a5080 20%, #3a6898 40%, #2e5580 60%, #1a3050 80%, #152840 100%)
`.trim();

export default function Scene({ level, isHome = false, customBg }: SceneProps) {
  const getDarkOverlayOpacity = (lvl: SceneLevel): number => {
    if (isHome) {
      return 0;
    }
    switch (lvl) {
      case SceneLevel.Zero: return 0.1;
      case SceneLevel.One: return 0.2;
      case SceneLevel.Fill: return 0.35;
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* OW-style atmospheric gradient — always visible, no external image dependency */}
      <div
        className="absolute inset-0"
        style={{
          background: customBg ?? owBackground,
          transition: 'background 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Dark overlay — deepens per scene level for sub-pages readability */}
      <div
        className="absolute inset-0"
        style={{
          background: '#06080f',
          opacity: getDarkOverlayOpacity(level),
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Left gradient — softly darkens the left side so white menu text is always readable */}
      {isHome && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(10,15,30,0.35) 0%, rgba(10,15,30,0.1) 30%, transparent 55%)',
          }}
        />
      )}

      {/* Corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.35) 100%)',
        }}
      />
    </div>
  );
}
