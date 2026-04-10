'use client';

import { SceneLevel } from '@/lib/constants';

interface SceneProps {
  level: SceneLevel;
  gradientIndex?: number;
  isHome?: boolean;
}

// Bright OW-style blue CSS gradients — no external images needed
const OW_GRADIENTS = [
  // Classic blue atmosphere
  `radial-gradient(ellipse at 75% 25%, rgba(255, 220, 150, 0.10) 0%, transparent 50%),
   radial-gradient(ellipse at 25% 35%, rgba(130, 200, 255, 0.30) 0%, transparent 55%),
   radial-gradient(ellipse at 65% 60%, rgba(90, 160, 230, 0.20) 0%, transparent 50%),
   radial-gradient(ellipse at 40% 80%, rgba(50, 100, 180, 0.15) 0%, transparent 45%),
   linear-gradient(155deg, #1e3a5f 0%, #2a5080 20%, #3a6898 40%, #2e5580 60%, #1a3050 80%, #152840 100%)`,
  // Purple-blue
  `radial-gradient(ellipse at 70% 30%, rgba(180, 130, 255, 0.15) 0%, transparent 50%),
   radial-gradient(ellipse at 30% 40%, rgba(100, 120, 230, 0.25) 0%, transparent 55%),
   radial-gradient(ellipse at 60% 70%, rgba(80, 100, 210, 0.20) 0%, transparent 50%),
   linear-gradient(155deg, #1a2550 0%, #2a3580 20%, #3a4590 40%, #2a3570 60%, #1a2040 100%)`,
  // Sunset blue-orange
  `radial-gradient(ellipse at 80% 20%, rgba(255, 180, 80, 0.18) 0%, transparent 45%),
   radial-gradient(ellipse at 20% 50%, rgba(80, 150, 230, 0.25) 0%, transparent 55%),
   radial-gradient(ellipse at 50% 80%, rgba(60, 100, 180, 0.15) 0%, transparent 45%),
   linear-gradient(155deg, #1a3050 0%, #2a4565 20%, #3a5a80 40%, #3a4a65 60%, #2a3045 100%)`,
];

export default function Scene({ level, gradientIndex = 0, isHome = false }: SceneProps) {
  const bg = OW_GRADIENTS[gradientIndex % OW_GRADIENTS.length];

  const getScale = (lvl: SceneLevel): string => {
    switch (lvl) {
      case SceneLevel.Zero: return 'scale(1.0)';
      case SceneLevel.One: return 'scale(1.05)';
      case SceneLevel.Fill: return 'scale(1.1)';
    }
  };

  const getDarkOverlayOpacity = (lvl: SceneLevel): number => {
    if (isHome) return 0;
    switch (lvl) {
      case SceneLevel.Zero: return 0;
      case SceneLevel.One: return 0.15;
      case SceneLevel.Fill: return 0.25;
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* OW-style atmospheric gradient — no external images needed */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          background: bg,
          transform: getScale(level),
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
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
            background: 'linear-gradient(90deg, rgba(10,15,30,0.4) 0%, rgba(10,15,30,0.15) 30%, transparent 55%)',
          }}
        />
      )}

      {/* Corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)',
        }}
      />
    </div>
  );
}
