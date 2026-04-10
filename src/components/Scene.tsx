'use client';

import { SceneLevel } from '@/lib/constants';

interface SceneProps {
  level: SceneLevel;
  imageUrl?: string;
  isHome?: boolean;
  gradientVariant?: number;
}

// OW background gradient presets — pure CSS, no external images required
const owGradients = [
  // Default: bright blue-sky OW atmosphere with warm lens flare
  `
    radial-gradient(ellipse at 75% 25%, rgba(255, 220, 150, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 25% 35%, rgba(130, 180, 240, 0.25) 0%, transparent 55%),
    radial-gradient(ellipse at 65% 60%, rgba(100, 160, 230, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 80%, rgba(60, 100, 180, 0.15) 0%, transparent 45%),
    radial-gradient(ellipse at 85% 75%, rgba(160, 200, 255, 0.1) 0%, transparent 40%),
    linear-gradient(155deg, #1e3a5f 0%, #2a5080 20%, #3a6898 40%, #2e5580 60%, #1a3050 80%, #152840 100%)
  `,
  // Purple/violet OW variant
  `
    radial-gradient(ellipse at 70% 20%, rgba(200, 160, 255, 0.18) 0%, transparent 50%),
    radial-gradient(ellipse at 30% 40%, rgba(120, 100, 220, 0.25) 0%, transparent 55%),
    radial-gradient(ellipse at 60% 70%, rgba(80, 60, 200, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 90%, rgba(40, 30, 150, 0.15) 0%, transparent 45%),
    linear-gradient(155deg, #1a1850 0%, #2a1f70 20%, #382870 40%, #2a1f60 60%, #150f40 80%, #100c35 100%)
  `,
  // Orange/gold OW variant
  `
    radial-gradient(ellipse at 75% 25%, rgba(255, 180, 60, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 25% 55%, rgba(220, 120, 40, 0.18) 0%, transparent 55%),
    radial-gradient(ellipse at 60% 70%, rgba(180, 80, 20, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 85%, rgba(150, 60, 10, 0.1) 0%, transparent 45%),
    linear-gradient(155deg, #3a1a0f 0%, #502510 20%, #703520 40%, #502010 60%, #351008 80%, #200a05 100%)
  `,
];

export default function Scene({ level, imageUrl, isHome = false, gradientVariant = 0 }: SceneProps) {
  const gradient = owGradients[gradientVariant % owGradients.length];

  const getScale = (lvl: SceneLevel): string => {
    switch (lvl) {
      case SceneLevel.Zero: return 'scale(1.0)';
      case SceneLevel.One: return 'scale(1.08)';
      case SceneLevel.Fill: return 'scale(1.15)';
    }
  };

  const getImageOpacity = (lvl: SceneLevel): number => {
    switch (lvl) {
      case SceneLevel.Zero: return 0.85;
      case SceneLevel.One: return 0.65;
      case SceneLevel.Fill: return 0.45;
    }
  };

  const getDarkOverlayOpacity = (lvl: SceneLevel): number => {
    if (isHome) {
      switch (lvl) {
        case SceneLevel.Zero: return 0;
        case SceneLevel.One: return 0.15;
        case SceneLevel.Fill: return 0.3;
      }
    }
    switch (lvl) {
      case SceneLevel.Zero: return 0.15;
      case SceneLevel.One: return 0.25;
      case SceneLevel.Fill: return 0.4;
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* OW-style atmospheric gradient base — always visible, no external URLs */}
      <div
        className="absolute inset-0"
        style={{
          background: gradient.trim(),
          transition: 'background 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Photo layer — only rendered when imageUrl is explicitly provided */}
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: `url(${imageUrl})`,
            transform: getScale(level),
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: getImageOpacity(level),
          }}
        />
      )}

      {/* Dark overlay — deepens per scene level */}
      <div
        className="absolute inset-0"
        style={{
          background: '#06080f',
          opacity: getDarkOverlayOpacity(level),
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Left gradient — softly darkens left side for text readability */}
      {isHome && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(10,15,30,0.35) 0%, rgba(10,15,30,0.15) 30%, transparent 55%)',
          }}
        />
      )}

      {/* Corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </div>
  );
}
