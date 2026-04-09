'use client';

import { useRef } from 'react';
import { SceneLevel } from '@/lib/constants';

interface SceneProps {
  level: SceneLevel;
  imageUrl?: string;
}

const defaultBgUrl = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80';

export default function Scene({ level, imageUrl = defaultBgUrl }: SceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  const getScale = (lvl: SceneLevel): string => {
    switch (lvl) {
      case SceneLevel.Zero: return 'scale(1)';
      case SceneLevel.One: return 'scale(1.08)';
      case SceneLevel.Fill: return 'scale(1.15)';
    }
  };

  const getOverlayOpacity = (lvl: SceneLevel): string => {
    switch (lvl) {
      case SceneLevel.Zero: return '0.35';
      case SceneLevel.One: return '0.55';
      case SceneLevel.Fill: return '0.75';
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        ref={sceneRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: getScale(level),
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      <div
        className="absolute inset-0 bg-[#0d1117]"
        style={{
          opacity: getOverlayOpacity(level),
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
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
