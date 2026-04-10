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
        className="relative min-h-screen px-8 md:px-16 lg:px-24"
        style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)' }}
      >
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        >
          <h1
            style={{
              fontSize: 'min(6vh, 52px)',
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'white',
              textShadow: '0 0 2px black',
              fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
            }}
          >
            博客
          </h1>
          <div className="mt-3 h-px w-32" style={{ background: 'linear-gradient(90deg, rgba(90,255,255,0.8), transparent)' }} />
        </motion.div>

        {/* Post list — OW menu style */}
        <ul style={{ padding: 0, margin: 0 }}>
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </ul>
      </div>
    </>
  );
}
