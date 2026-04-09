'use client';

import { motion } from 'framer-motion';
import Scene from '@/components/Scene';
import BlogCard from '@/components/BlogCard';
import { SceneLevel } from '@/lib/constants';
import { posts } from '@/data/posts';

export default function BlogPage() {
  return (
    <>
      <Scene level={SceneLevel.One} />
      <div
        className="relative min-h-screen overflow-y-auto px-6 md:px-8 lg:px-12 py-8 max-w-4xl mx-auto"
        style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)' }}
      >
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        >
          <h1
            style={{
              fontSize: 'min(6vh, 52px)',
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'white',
              textShadow: '0 0 2px black',
              display: 'inline-block',
              transform: 'skewX(-4deg)',
              fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
            }}
          >
            博客
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.55)', textShadow: '0 0 2px black' }}>
            前端开发 · 游戏设计 · 动效探索
          </p>
          <div className="mt-3 h-px w-24" style={{ background: 'linear-gradient(90deg, rgba(90,255,255,0.8), transparent)' }} />
        </motion.div>

        {/* Post count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span
            className="text-xs tracking-widest uppercase px-2 py-1"
            style={{
              background: 'rgba(65, 166, 246, 0.15)',
              color: 'var(--ow-accent)',
              border: '1px solid var(--ow-border)',
              fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
            }}
          >
            {posts.length} 篇文章
          </span>
        </motion.div>

        {/* Blog cards */}
        <div className="space-y-4">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
