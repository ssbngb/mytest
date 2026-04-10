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
        style={{ paddingTop: 'calc(var(--navbar-height) + 2.5rem)', paddingBottom: '4rem' }}
      >
        {/* Header — OW large italic style */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          <h1
            style={{
              fontSize: 'min(8vh, 64px)',
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'white',
              textShadow: '0 0 4px rgba(0,0,0,0.8)',
              fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
              lineHeight: 1.1,
            }}
          >
            博客
          </h1>
          <p
            style={{
              marginTop: '6px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              textShadow: '0 0 2px black',
              fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
            }}
          >
            前端开发 · 游戏设计 · 动效探索 &nbsp;|&nbsp; {posts.length} 篇文章
          </p>
          <div
            className="mt-3"
            style={{
              height: '2px',
              width: '48px',
              background: 'linear-gradient(90deg, rgba(90,255,255,0.9), transparent)',
            }}
          />
        </motion.div>

        {/* Post list — OW menu row style */}
        <ul style={{ padding: 0, margin: 0 }}>
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </ul>
      </div>
    </>
  );
}
