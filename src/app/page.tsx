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

// CSS gradient presets — no external URLs needed
const GRADIENT_COUNT = 3;

export default function Home() {
  const [sceneLevel, setSceneLevel] = useState<SceneLevel>(SceneLevel.Zero);
  const [gradientVariant, setGradientVariant] = useState(0);
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

  const switchWallpaper = () => {
    setGradientVariant((i) => (i + 1) % GRADIENT_COUNT);
  };

  return (
    <>
      <Scene level={sceneLevel} isHome gradientVariant={gradientVariant} />

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
              onClick={switchWallpaper}
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
