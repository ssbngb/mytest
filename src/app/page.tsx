'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Scene from '@/components/Scene';
import MenuItem from '@/components/MenuItem';
import { SceneLevel } from '@/lib/constants';

const primaryMenuItems = [
  { label: '博客', route: '/blog' },
  { label: '关于', route: '/about' },
];

const secondaryMenuItems = [
  { label: '项目', route: '/about#projects' },
  { label: 'GitHub', route: 'https://github.com' },
  { label: '更新说明', route: '#' },
];

// CSS gradient presets — no external image dependencies
const GRADIENT_PRESETS = [
  // Blue atmosphere (default OW)
  `radial-gradient(ellipse at 25% 35%, rgba(100,190,255,0.4) 0%, transparent 55%),
   radial-gradient(ellipse at 75% 20%, rgba(80,165,245,0.3) 0%, transparent 45%),
   radial-gradient(ellipse at 85% 75%, rgba(60,130,210,0.2) 0%, transparent 50%),
   radial-gradient(ellipse at 15% 80%, rgba(40,100,180,0.25) 0%, transparent 40%),
   linear-gradient(155deg, #1e3a5f 0%, #2a5080 30%, #3a6898 55%, #2e5580 75%, #1a3050 100%)`,
  // Purple-blue (deep space feel)
  `radial-gradient(ellipse at 30% 30%, rgba(140,100,255,0.35) 0%, transparent 50%),
   radial-gradient(ellipse at 70% 65%, rgba(80,60,200,0.25) 0%, transparent 45%),
   radial-gradient(ellipse at 15% 75%, rgba(60,40,180,0.2) 0%, transparent 40%),
   linear-gradient(155deg, #1a1550 0%, #25208a 30%, #2e2878 55%, #1e1c60 75%, #120f3a 100%)`,
  // Teal ocean
  `radial-gradient(ellipse at 25% 30%, rgba(60,220,200,0.3) 0%, transparent 50%),
   radial-gradient(ellipse at 75% 65%, rgba(40,180,220,0.25) 0%, transparent 45%),
   radial-gradient(ellipse at 50% 85%, rgba(20,140,180,0.2) 0%, transparent 40%),
   linear-gradient(155deg, #0a2a35 0%, #154050 30%, #1a5060 55%, #0e3848 75%, #081c28 100%)`,
];

export default function Home() {
  const [sceneLevel, setSceneLevel] = useState<SceneLevel>(SceneLevel.Zero);
  const [gradientIndex, setGradientIndex] = useState(0);
  const router = useRouter();

  const handleNavigate = (route: string) => {
    if (route.startsWith('http')) {
      window.open(route, '_blank');
      return;
    }
    if (route === '#') return;
    setSceneLevel(SceneLevel.One);
    setTimeout(() => router.push(route), 300);
  };

  const switchGradient = () => {
    setGradientIndex((i) => (i + 1) % GRADIENT_PRESETS.length);
  };

  return (
    <>
      <Scene level={sceneLevel} bgGradient={GRADIENT_PRESETS[gradientIndex]} isHome />

      {/* Main layout — full viewport */}
      <div className="fixed inset-0 flex flex-col pointer-events-none">

        {/* Top spacer for navbar */}
        <div style={{ height: 'var(--navbar-height)' }} />

        {/* Center-left content */}
        <div
          className="flex-1 flex flex-col justify-center pointer-events-auto px-8 md:px-16 lg:px-24"
          style={{ paddingBottom: '80px' }}
        >
          {/* Blog title — OW style large glowing text */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 22, delay: 0.05 }}
          >
            <h1
              style={{
                fontSize: 'min(10vh, 72px)',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 0 5px white',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
                lineHeight: 1.1,
              }}
            >
              OW BLOG
            </h1>
            <p
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                marginTop: '4px',
                textShadow: '0 0 2px black',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
              }}
            >
              v1.0.0 · 守望先锋风格个人博客
            </p>
          </motion.div>

          {/* Primary menu */}
          <ul style={{ padding: 0, margin: 0, marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {primaryMenuItems.map((item, i) => (
              <MenuItem
                key={item.route}
                label={item.label}
                index={i}
                isPrimary
                onClick={() => handleNavigate(item.route)}
              />
            ))}
          </ul>

          {/* Secondary menu */}
          <ul style={{ padding: 0, margin: 0 }}>
            {secondaryMenuItems.map((item, i) => (
              <MenuItem
                key={`${item.route}-${i}`}
                label={item.label}
                index={primaryMenuItems.length + i}
                isPrimary={false}
                onClick={() => handleNavigate(item.route)}
              />
            ))}
          </ul>
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-end justify-between px-8 md:px-16 lg:px-24 pb-6 pointer-events-auto"
        >
          {/* Bottom-left hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
            style={{
              fontSize: '12px',
              color: 'white',
              textShadow: '0 0 4px black',
              fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
            }}
          >
            按下回车开始聊天
          </motion.p>

          {/* Bottom-right: activity banner + wallpaper switcher */}
          <div className="flex flex-col items-end gap-3">
            {/* Activity announcement banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, type: 'spring', stiffness: 260, damping: 22 }}
              style={{
                background: 'rgba(15, 20, 40, 0.75)',
                border: '1px solid rgba(249, 158, 26, 0.6)',
                borderLeft: '3px solid #f99e1a',
                padding: '8px 12px',
                maxWidth: '220px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <p style={{
                fontSize: '11px',
                color: '#f99e1a',
                fontWeight: 'bold',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                marginBottom: '2px',
              }}>
                ★ 最新活动
              </p>
              <p style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.85)',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
              }}>
                欢迎来到守望先锋风格博客
              </p>
            </motion.div>

            {/* Wallpaper switcher */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 400 } }}
              whileTap={{ scale: 0.95 }}
              onClick={switchGradient}
              style={{
                padding: '6px 14px',
                background: 'rgba(249,158,26,0.85)',
                color: '#1a1e2e',
                fontSize: '12px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              }}
            >
              切换壁纸
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
