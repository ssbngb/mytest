'use client';

import { SceneLevel } from '@/lib/constants';

interface SceneProps {
  level: SceneLevel;
  imageUrl?: string;
  isHome?: boolean;
}

const defaultBgUrl = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80';

// OW-style gradient — bright blue-gray atmosphere matching the game's matchmaking screen
const owFallbackBg = `
  radial-gradient(ellipse at 30% 20%, rgba(180, 210, 255, 0.25) 0%, transparent 50%),
  radial-gradient(ellipse at 70% 30%, rgba(120, 180, 240, 0.3) 0%, transparent 45%),
  radial-gradient(ellipse at 80% 70%, rgba(90, 150, 220, 0.15) 0%, transparent 50%),
  radial-gradient(ellipse at 20% 80%, rgba(40, 80, 160, 0.2) 0%, transparent 40%),
  linear-gradient(135deg, #1a2a4a 0%, #2a4068 25%, #2d4a72 50%, #1e3454 75%, #162a48 100%)
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
        case SceneLevel.Zero: return 0.85;
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
        case SceneLevel.Zero: return 0;
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
            background: 'linear-gradient(90deg, rgba(6,8,15,0.45) 0%, rgba(6,8,15,0.2) 30%, transparent 55%)',
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
