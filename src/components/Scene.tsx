'use client';

import { SceneLevel } from '@/lib/constants';

interface SceneProps {
  level: SceneLevel;
  gradientIndex?: number;
  isHome?: boolean;
}

// OW-style CSS gradient palettes — bright blue atmosphere, no external images
export const OW_GRADIENT_PALETTES = [
  // 0: Classic OW Blue Steel
  `radial-gradient(ellipse at 25% 20%, rgba(120, 190, 255, 0.5) 0%, transparent 48%),
   radial-gradient(ellipse at 78% 12%, rgba(80, 155, 235, 0.4) 0%, transparent 42%),
   radial-gradient(ellipse at 88% 78%, rgba(35, 90, 190, 0.3) 0%, transparent 50%),
   radial-gradient(ellipse at 8% 82%, rgba(55, 120, 210, 0.3) 0%, transparent 38%),
   radial-gradient(ellipse at 50% 50%, rgba(100, 165, 235, 0.2) 0%, transparent 60%),
   linear-gradient(135deg, #1e3a5f 0%, #2d5590 28%, #3a6898 55%, #2a4a78 80%, #1e3a5f 100%)`,
  // 1: OW Dusk Amber
  `radial-gradient(ellipse at 30% 25%, rgba(255, 185, 80, 0.35) 0%, transparent 48%),
   radial-gradient(ellipse at 75% 18%, rgba(220, 110, 30, 0.3) 0%, transparent 44%),
   radial-gradient(ellipse at 82% 72%, rgba(180, 60, 20, 0.2) 0%, transparent 48%),
   radial-gradient(ellipse at 12% 78%, rgba(80, 50, 120, 0.3) 0%, transparent 38%),
   radial-gradient(ellipse at 50% 50%, rgba(160, 80, 30, 0.15) 0%, transparent 60%),
   linear-gradient(135deg, #22213a 0%, #3a2820 28%, #502e12 55%, #3a2010 80%, #1e1a2a 100%)`,
  // 2: OW Electric Cyan
  `radial-gradient(ellipse at 22% 32%, rgba(90, 255, 255, 0.35) 0%, transparent 48%),
   radial-gradient(ellipse at 72% 18%, rgba(65, 166, 246, 0.45) 0%, transparent 42%),
   radial-gradient(ellipse at 85% 65%, rgba(30, 90, 185, 0.3) 0%, transparent 48%),
   radial-gradient(ellipse at 12% 78%, rgba(40, 120, 205, 0.3) 0%, transparent 38%),
   radial-gradient(ellipse at 50% 50%, rgba(70, 200, 230, 0.15) 0%, transparent 60%),
   linear-gradient(135deg, #0a2030 0%, #102a40 28%, #1a3f60 55%, #102a40 80%, #0a2030 100%)`,
];

export default function Scene({ level, gradientIndex = 0, isHome = false }: SceneProps) {
  const gradient = OW_GRADIENT_PALETTES[gradientIndex % OW_GRADIENT_PALETTES.length];

  const getScale = (lvl: SceneLevel): string => {
    switch (lvl) {
      case SceneLevel.Zero: return 'scale(1.0)';
      case SceneLevel.One: return 'scale(1.04)';
      case SceneLevel.Fill: return 'scale(1.08)';
    }
  };

  const getDarkOverlayOpacity = (lvl: SceneLevel): number => {
    if (isHome) {
      switch (lvl) {
        case SceneLevel.Zero: return 0;
        case SceneLevel.One: return 0.2;
        case SceneLevel.Fill: return 0.4;
      }
    }
    switch (lvl) {
      case SceneLevel.Zero: return 0.08;
      case SceneLevel.One: return 0.2;
      case SceneLevel.Fill: return 0.38;
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main CSS gradient — bright OW atmosphere, no external images */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          background: gradient,
          transform: getScale(level),
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Dark overlay for depth control per scene level */}
      <div
        className="absolute inset-0"
        style={{
          background: '#06080f',
          opacity: getDarkOverlayOpacity(level),
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Left gradient — text readability on home */}
      {isHome && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(6,8,15,0.3) 0%, rgba(6,8,15,0.08) 35%, transparent 60%)',
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
