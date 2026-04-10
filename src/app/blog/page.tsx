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
        className="relative min-h-screen overflow-y-auto px-8 md:px-16 lg:px-24"
        style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)', paddingBottom: '4rem' }}
      >
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        >
          <h1
            style={{
              fontSize: 'min(8vh, 72px)',
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'white',
              textShadow: '0 0 2px black',
              lineHeight: 1.1,
              fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
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
            前端开发 · 游戏设计 · 动效探索 · {posts.length} 篇文章
          </p>
        </motion.div>

        {/* Blog list */}
        <div>
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
