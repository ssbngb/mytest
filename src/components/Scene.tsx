'use client';

import { SceneLevel } from '@/lib/constants';

interface SceneProps {
  level: SceneLevel;
  imageUrl?: string;
}

const defaultBgUrl = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80';

// OW-style CSS gradient fallback — used behind the photo so there's always a rich background
const owGradientBg = `
  radial-gradient(ellipse at 20% 50%, rgba(65, 166, 246, 0.15) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 20%, rgba(249, 158, 26, 0.1) 0%, transparent 40%),
  radial-gradient(ellipse at 60% 80%, rgba(90, 255, 255, 0.08) 0%, transparent 40%),
  linear-gradient(135deg, #0d1117 0%, #1a1e2e 40%, #0f1623 100%)
`.trim();

export default function Scene({ level, imageUrl = defaultBgUrl }: SceneProps) {
  const getScale = (lvl: SceneLevel): string => {
    switch (lvl) {
      case SceneLevel.Zero: return 'scale(1)';
      case SceneLevel.One: return 'scale(1.08)';
      case SceneLevel.Fill: return 'scale(1.15)';
    }
  };

  const getOverlayOpacity = (lvl: SceneLevel): string => {
    switch (lvl) {
      case SceneLevel.Zero: return '0.2';
      case SceneLevel.One: return '0.45';
      case SceneLevel.Fill: return '0.65';
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* CSS gradient base — always visible even when external image is blocked */}
      <div className="absolute inset-0" style={{ background: owGradientBg }} />

      {/* Photo layer — loads on top of gradient when available */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: getScale(level),
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: 0.55,
        }}
      />

      {/* Dark overlay that deepens per scene level */}
      <div
        className="absolute inset-0"
        style={{
          background: '#0d1117',
          opacity: getOverlayOpacity(level),
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Subtle OW-style corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* OW scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />
    </div>
  );
}
