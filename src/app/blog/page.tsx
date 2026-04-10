'use client';

import { motion } from 'framer-motion';
import Scene from '@/components/Scene';
import BlogCard from '@/components/BlogCard';
import { SceneLevel } from '@/lib/constants';
import { posts } from '@/data/posts';

export default function BlogPage() {
  return (
    <>
      <Scene level={SceneLevel.Zero} />

      {/* Full-viewport layout matching home page style */}
      <div className="fixed inset-0 flex flex-col pointer-events-none">
        {/* Top spacer for navbar */}
        <div style={{ height: 'var(--navbar-height)' }} />

        {/* Center-left content */}
        <div
          className="flex-1 flex flex-col justify-center pointer-events-auto px-8 md:px-16 lg:px-24 overflow-y-auto"
          style={{ paddingBottom: '48px' }}
        >
          {/* Page title — OW style large italic */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 22 }}
          >
            <h1
              style={{
                fontSize: 'min(9vh, 68px)',
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: 'white',
                textShadow: '0 0 4px rgba(0,0,0,0.9), 0 0 20px rgba(90,190,255,0.25)',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
                lineHeight: 1.1,
              }}
            >
              博客
            </h1>
            <p
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                marginTop: '4px',
                textShadow: '0 0 2px black',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
              }}
            >
              前端开发 · 游戏设计 · 动效探索
            </p>
          </motion.div>

          {/* Post list — OW menu row style */}
          <ul style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
