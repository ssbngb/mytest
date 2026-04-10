'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Scene from '@/components/Scene';
import { SceneLevel } from '@/lib/constants';
import { posts } from '@/data/posts';

export default function BlogPage() {
  return (
    <>
      <Scene level={SceneLevel.One} />
      <div
        className="relative min-h-screen overflow-y-auto px-8 md:px-16 lg:px-24"
        style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)' }}
      >
        {/* Header — OW large italic title */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        >
          <h1
            style={{
              fontSize: 'min(8vh, 64px)',
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'white',
              textShadow: '0 0 4px black, 0 2px 12px rgba(0,0,0,0.5)',
              fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
              lineHeight: 1.1,
            }}
          >
            博客
          </h1>
          <div className="mt-3 h-px w-24" style={{ background: 'linear-gradient(90deg, rgba(90,255,255,0.8), transparent)' }} />
        </motion.div>

        {/* Post list — OW menu style */}
        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
          {posts.map((post, i) => (
            <motion.li
              key={post.slug}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22, delay: i * 0.07 + 0.1 }}
              whileHover={{
                x: 30,
                scale: 1.03,
                transition: { type: 'spring', stiffness: 400, damping: 20 },
              }}
              style={{ marginBottom: '8px', originX: 0 }}
            >
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <h2
                  style={{
                    fontSize: 'min(5vh, 42px)',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    color: 'white',
                    textShadow: '0 0 2px black',
                    fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
                    lineHeight: 1.25,
                  }}
                >
                  {post.title}
                </h2>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '2px',
                    fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                    textShadow: '0 0 2px black',
                  }}
                >
                  {new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  {post.tags.length > 0 && ` · ${post.tags.join(' · ')}`}
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
}
