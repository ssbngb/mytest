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
      <div className="relative min-h-[calc(100vh-var(--navbar-height))] px-6 md:px-8 lg:px-12 py-12 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1 h-10 rounded-full" style={{ background: 'var(--ow-primary)' }} />
            <h1 className="ow-title font-black text-4xl md:text-5xl" style={{ color: 'var(--ow-text)' }}>
              BLOG
            </h1>
          </div>
          <p className="ml-5 text-sm" style={{ color: 'var(--ow-text-muted)' }}>
            前端开发 · 游戏设计 · 动效探索
          </p>
          <div className="mt-4 ml-5 h-px w-32" style={{ background: 'linear-gradient(90deg, var(--ow-accent), transparent)' }} />
        </motion.div>

        {/* Post count */}
        <motion.div
          className="mb-6 ml-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span
            className="text-xs ow-title tracking-widest uppercase px-2 py-1 rounded-sm"
            style={{ background: 'rgba(65, 166, 246, 0.1)', color: 'var(--ow-accent)', border: '1px solid var(--ow-border)' }}
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
