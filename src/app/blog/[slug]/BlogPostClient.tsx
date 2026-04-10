'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Scene from '@/components/Scene';
import OWButton from '@/components/OWButton';
import { SceneLevel } from '@/lib/constants';
import { Post } from '@/data/posts';

interface BlogPostClientProps {
  post: Post;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const lines = post.content.split('\n');

  return (
    <>
      <Scene level={SceneLevel.Fill} />
      <div
        className="relative min-h-screen overflow-y-auto px-6 md:px-8 lg:px-12 py-8 max-w-3xl mx-auto"
        style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)', paddingBottom: '4rem' }}
      >
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="mb-8"
        >
          <Link href="/blog">
            <OWButton variant="ghost" size="sm">
              ← 返回博客
            </OWButton>
          </Link>
        </motion.div>

        {/* Article header */}
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22, delay: 0.1 }}
        >
          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  background: 'rgba(65, 166, 246, 0.15)',
                  color: 'rgba(90, 200, 255, 0.85)',
                  border: '1px solid rgba(65, 166, 246, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'min(7vh, 56px)',
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'white',
              textShadow: '0 0 2px black',
              lineHeight: 1.2,
              fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
            }}
          >
            {post.title}
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>
            {formattedDate}
          </p>

          {/* Divider */}
          <div className="mt-4 h-px" style={{ background: 'linear-gradient(90deg, rgba(249,158,26,0.8), rgba(65,166,246,0.6), transparent)' }} />
        </motion.header>

        {/* Article content — semi-transparent deep blue panel */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22, delay: 0.2 }}
          style={{
            background: 'rgba(15, 25, 45, 0.75)',
            border: '1px solid rgba(100, 170, 240, 0.2)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '2px',
            padding: '1.5rem 2rem',
          }}
        >
          <div
            className="selectable"
            style={{
              color: 'var(--ow-text)',
              lineHeight: '1.8',
            }}
          >
            {lines.map((line, i) => {
              if (line.startsWith('# ')) {
                return <h1 key={i} className="ow-title text-2xl font-black mt-8 mb-4" style={{ color: 'white' }}>{line.slice(2)}</h1>;
              } else if (line.startsWith('## ')) {
                return (
                  <h2 key={i} className="ow-title text-xl font-bold mt-6 mb-3 flex items-center gap-2" style={{ color: 'var(--ow-accent)' }}>
                    <span className="w-3 h-0.5 inline-block" style={{ background: 'var(--ow-primary)' }} />
                    {line.slice(3)}
                  </h2>
                );
              } else if (line.startsWith('### ')) {
                return <h3 key={i} className="ow-title text-lg font-semibold mt-4 mb-2" style={{ color: 'var(--ow-primary)' }}>{line.slice(4)}</h3>;
              } else if (line.startsWith('```')) {
                return null;
              } else if (line.startsWith('- ')) {
                return (
                  <li key={i} className="ml-4 mb-1 text-sm" style={{ color: 'var(--ow-text)', listStyleType: 'none' }}>
                    <span style={{ color: 'var(--ow-primary)', marginRight: '8px' }}>▸</span>
                    {line.slice(2)}
                  </li>
                );
              } else if (line.trim() === '') {
                return <div key={i} className="h-3" />;
              } else {
                return <p key={i} className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--ow-text)' }}>{line}</p>;
              }
            })}
          </div>
        </motion.article>

        {/* Navigation */}
        <motion.div
          className="mt-8 flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/blog">
            <OWButton variant="secondary" size="sm">← 所有文章</OWButton>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
