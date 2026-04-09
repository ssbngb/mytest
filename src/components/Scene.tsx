'use client';

import { SceneLevel } from '@/lib/constants';

interface SceneProps {
  level: SceneLevel;
  imageUrl?: string;
  isHome?: boolean;
}

const defaultBgUrl = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80';

// OW-style gradient that looks like the game's dark-blue atmospheric background
const owFallbackBg = `
  radial-gradient(ellipse at 75% 40%, rgba(65, 120, 200, 0.35) 0%, transparent 55%),
  radial-gradient(ellipse at 20% 60%, rgba(20, 40, 90, 0.6) 0%, transparent 50%),
  radial-gradient(ellipse at 85% 85%, rgba(249, 158, 26, 0.12) 0%, transparent 40%),
  linear-gradient(160deg, #0c1525 0%, #111d36 35%, #0d1520 65%, #080e18 100%)
`.trim();

export default function Scene({ level, imageUrl = defaultBgUrl, isHome = false }: SceneProps) {
  const getScale = (lvl: SceneLevel): string => {
    switch (lvl) {
      case SceneLevel.Zero: return 'scale(1.0)';
      case SceneLevel.One: return 'scale(1.08)';
      case SceneLevel.Fill: return 'scale(1.15)';
    }
  };

  const getImageOpacity = (lvl: SceneLevel): number => {
    if (isHome) {
      switch (lvl) {
        case SceneLevel.Zero: return 0.78;
        case SceneLevel.One: return 0.55;
        case SceneLevel.Fill: return 0.35;
      }
    }
    switch (lvl) {
      case SceneLevel.Zero: return 0.50;
      case SceneLevel.One: return 0.38;
      case SceneLevel.Fill: return 0.22;
    }
  };

  const getDarkOverlayOpacity = (lvl: SceneLevel): number => {
    if (isHome) {
      switch (lvl) {
        case SceneLevel.Zero: return 0.05;
        case SceneLevel.One: return 0.35;
        case SceneLevel.Fill: return 0.55;
      }
    }
    switch (lvl) {
      case SceneLevel.Zero: return 0.25;
      case SceneLevel.One: return 0.45;
      case SceneLevel.Fill: return 0.62;
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* OW-style atmospheric gradient base — always visible, rich color */}
      <div className="absolute inset-0" style={{ background: owFallbackBg }} />

      {/* Photo layer — loads on top when available */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: getScale(level),
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: getImageOpacity(level),
        }}
      />

      {/* Dark overlay — deepens per scene level */}
      <div
        className="absolute inset-0"
        style={{
          background: '#06080f',
          opacity: getDarkOverlayOpacity(level),
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Left gradient — darkens the left side so white menu text is always readable */}
      {isHome && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(6,8,15,0.6) 0%, rgba(6,8,15,0.35) 35%, transparent 65%)',
          }}
        />
      )}

      {/* Corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.45) 100%)',
        }}
      />
    </div>
  );
}
