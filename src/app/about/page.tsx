'use client';

import { motion } from 'framer-motion';
import Scene from '@/components/Scene';
import OWButton from '@/components/OWButton';
import { SceneLevel } from '@/lib/constants';

const skills = [
  { name: 'React / Next.js', level: 90, color: 'var(--ow-accent)' },
  { name: 'TypeScript', level: 85, color: 'var(--ow-primary)' },
  { name: 'Framer Motion', level: 80, color: 'var(--ow-accent-glow)' },
  { name: 'Tailwind CSS', level: 88, color: 'var(--ow-accent)' },
  { name: 'Node.js', level: 75, color: 'var(--ow-primary)' },
  { name: 'UI/UX Design', level: 70, color: 'var(--ow-accent-glow)' },
];

const abilityItems = [
  { icon: '⚡', title: '高性能动画', desc: '使用 Framer Motion spring 物理引擎打造流畅体验' },
  { icon: '🎨', title: 'UI 设计还原', desc: '精准还原游戏级 UI 设计，注重细节和交互反馈' },
  { icon: '🚀', title: 'SSG 优化', desc: 'Next.js App Router 静态生成，极速加载' },
  { icon: '📱', title: '响应式设计', desc: '从移动端到桌面端的无缝体验适配' },
];

export default function AboutPage() {
  return (
    <>
      <Scene level={SceneLevel.One} />
      <div className="relative min-h-[calc(100vh-var(--navbar-height))] px-6 md:px-8 lg:px-12 py-12 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1 h-10 rounded-full" style={{ background: 'var(--ow-accent)' }} />
            <h1 className="ow-title font-black text-4xl md:text-5xl" style={{ color: 'var(--ow-text)' }}>
              ABOUT
            </h1>
          </div>
          <p className="ml-5 text-sm" style={{ color: 'var(--ow-text-muted)' }}>
            英雄档案 · HERO PROFILE
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 22, delay: 0.1 }}
          >
            <div className="ow-panel rounded-sm p-6">
              {/* Avatar section */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-16 h-16 rounded-sm flex items-center justify-center ow-title font-black text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--ow-accent), var(--ow-bg-dark))',
                    border: '2px solid var(--ow-accent)',
                    color: 'var(--ow-text)',
                  }}
                  whileHover={{ rotate: 5, scale: 1.05, transition: { type: 'spring', stiffness: 400 } }}
                >
                  P
                </motion.div>
                <div>
                  <h2 className="ow-title font-bold text-xl" style={{ color: 'var(--ow-text)' }}>PLAYER</h2>
                  <p className="text-xs ow-title tracking-widest uppercase" style={{ color: 'var(--ow-primary)' }}>
                    FRONTEND DEVELOPER
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: '项目', value: '10+' },
                  { label: '文章', value: '4' },
                  { label: '技术', value: '6+' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 rounded-sm"
                    style={{ background: 'rgba(65, 166, 246, 0.1)', border: '1px solid var(--ow-border)' }}
                  >
                    <div className="ow-title font-black text-xl" style={{ color: 'var(--ow-primary)' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--ow-text-muted)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--ow-text)', lineHeight: '1.8' }}>
                热爱游戏 UI 设计与前端开发的开发者。专注于打造沉浸式、高性能的 Web 体验，
                用 Framer Motion 的物理弹性动画让界面充满生命力。
              </p>

              <div className="mt-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <OWButton variant="secondary" size="sm">
                    GitHub 主页
                  </OWButton>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 22, delay: 0.2 }}
          >
            <div className="ow-panel rounded-sm p-6">
              <h3 className="ow-title font-bold text-sm tracking-widest uppercase mb-5" style={{ color: 'var(--ow-accent)' }}>
                技能面板 / SKILLS
              </h3>
              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 250, damping: 22 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-xs ow-title tracking-wide" style={{ color: 'var(--ow-text)' }}>
                        {skill.name}
                      </span>
                      <span className="text-xs" style={{ color: skill.color }}>{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: skill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.4 + i * 0.07, type: 'spring', stiffness: 100, damping: 20 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Abilities */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22, delay: 0.4 }}
        >
          <h3 className="ow-title font-bold text-sm tracking-widest uppercase mb-5 flex items-center gap-3" style={{ color: 'var(--ow-text-muted)' }}>
            <div className="h-px w-8" style={{ background: 'var(--ow-accent)' }} />
            能力 / ABILITIES
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {abilityItems.map((ability, i) => (
              <motion.div
                key={ability.title}
                className="ow-panel rounded-sm p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 250, damping: 22 }}
                whileHover={{
                  y: -4,
                  boxShadow: '0 8px 24px rgba(65, 166, 246, 0.2)',
                  transition: { type: 'spring', stiffness: 400 },
                }}
              >
                <div className="text-2xl mb-2">{ability.icon}</div>
                <h4 className="ow-title font-bold text-sm mb-1" style={{ color: 'var(--ow-accent)' }}>
                  {ability.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--ow-text-muted)' }}>
                  {ability.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
