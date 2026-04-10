'use client';

import { SceneLevel } from '@/lib/constants';

interface SceneProps {
  level: SceneLevel;
  bgGradient?: string;
  isHome?: boolean;
}

// OW-style bright blue atmospheric gradient — no external image dependencies
export const owDefaultBg = `
  radial-gradient(ellipse at 25% 35%, rgba(100,190,255,0.4) 0%, transparent 55%),
  radial-gradient(ellipse at 75% 20%, rgba(80,165,245,0.3) 0%, transparent 45%),
  radial-gradient(ellipse at 85% 75%, rgba(60,130,210,0.2) 0%, transparent 50%),
  radial-gradient(ellipse at 15% 80%, rgba(40,100,180,0.25) 0%, transparent 40%),
  linear-gradient(155deg, #1e3a5f 0%, #2a5080 30%, #3a6898 55%, #2e5580 75%, #1a3050 100%)
`.trim();

export default function Scene({ level, bgGradient, isHome = false }: SceneProps) {
  const getScale = (lvl: SceneLevel): string => {
    switch (lvl) {
      case SceneLevel.Zero: return 'scale(1.0)';
      case SceneLevel.One: return 'scale(1.06)';
      case SceneLevel.Fill: return 'scale(1.12)';
    }
  };

  const getDimOpacity = (lvl: SceneLevel): number => {
    if (isHome) return 0;
    switch (lvl) {
      case SceneLevel.Zero: return 0;
      case SceneLevel.One: return 0.12;
      case SceneLevel.Fill: return 0.28;
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* OW atmospheric gradient — always visible, no external URLs */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          background: bgGradient || owDefaultBg,
          transform: getScale(level),
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Subtle dim overlay for sub-pages to improve panel readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(10,15,30,1)',
          opacity: getDimOpacity(level),
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Left gradient for home — darkens left side so menu text is always readable */}
      {isHome && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(6,8,15,0.5) 0%, rgba(6,8,15,0.2) 35%, transparent 60%)',
          }}
        />
      )}

      {/* Corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  );
}
