'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Scene from '@/components/Scene';
import MenuItem from '@/components/MenuItem';
import { SceneLevel } from '@/lib/constants';

const primaryMenuItems = [
  { label: '博客', subLabel: 'BLOG', route: '/blog' },
  { label: '关于', subLabel: 'ABOUT', route: '/about' },
];

const secondaryMenuItems = [
  { label: '项目', route: '/about#projects' },
];

export default function Home() {
  const [sceneLevel, setSceneLevel] = useState<SceneLevel>(SceneLevel.Zero);
  const router = useRouter();

  const handleNavigate = (route: string) => {
    setSceneLevel(SceneLevel.One);
    setTimeout(() => router.push(route), 300);
  };

  return (
    <>
      <Scene level={sceneLevel} />
      <div className="relative min-h-[calc(100vh-var(--navbar-height))] flex items-center">
        <div className="px-8 md:px-16 lg:px-24 py-12 max-w-3xl">
          {/* Blog title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
            className="mb-8"
          >
            <h1
              className="ow-title font-black text-5xl md:text-7xl lg:text-8xl leading-none"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.15) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.1))',
              }}
            >
              OW
            </h1>
            <h2
              className="ow-title font-bold text-xl md:text-2xl tracking-[0.3em] uppercase mt-1"
              style={{ color: 'var(--ow-primary)', textShadow: '0 0 20px rgba(249, 158, 26, 0.5)' }}
            >
              BLOG
            </h2>
            <p className="mt-3 text-sm" style={{ color: 'var(--ow-text-muted)', maxWidth: '320px', lineHeight: '1.6' }}>
              守望先锋风格的个人博客 — 弹性物理动画，沉浸式游戏体验
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="mb-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.3 }}
            style={{ originX: 0 }}
          >
            <div className="h-px w-48" style={{ background: 'linear-gradient(90deg, var(--ow-primary), transparent)' }} />
          </motion.div>

          {/* Primary menu */}
          <ul className="space-y-1 mb-4">
            {primaryMenuItems.map((item, i) => (
              <MenuItem
                key={item.route}
                label={item.label}
                subLabel={item.subLabel}
                index={i}
                isPrimary
                onClick={() => handleNavigate(item.route)}
              />
            ))}
          </ul>

          {/* Secondary menu */}
          <ul className="space-y-0.5 mt-6">
            {secondaryMenuItems.map((item, i) => (
              <MenuItem
                key={item.route}
                label={item.label}
                index={primaryMenuItems.length + i}
                isPrimary={false}
                onClick={() => handleNavigate(item.route)}
              />
            ))}
          </ul>
        </div>

        {/* Side decoration */}
        <motion.div
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 rounded-full"
              style={{ background: 'var(--ow-accent)', height: i === 2 ? '48px' : '16px' }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
}
