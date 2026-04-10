'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Post } from '@/data/posts';

interface BlogCardProps {
  post: Post;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      type: 'spring',
      stiffness: 250,
      damping: 22,
      mass: 0.9,
    },
  }),
};

export default function BlogCard({ post, index }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className="ow-panel rounded-sm p-5 group"
          style={{
            borderLeft: '3px solid rgba(90,255,255,0.6)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderLeftColor = 'var(--ow-primary)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(65, 166, 246, 0.25)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderLeftColor = 'rgba(90,255,255,0.6)';
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          {/* Tags */}
          <div className="flex gap-2 mb-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-sm ow-title tracking-wider uppercase"
                style={{
                  background: 'rgba(65, 166, 246, 0.15)',
                  color: 'var(--ow-accent)',
                  border: '1px solid rgba(65, 166, 246, 0.3)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2
            className="ow-title text-xl font-bold mb-2 group-hover:text-[color:var(--ow-accent)] transition-colors"
            style={{ color: 'var(--ow-text)' }}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm mb-3" style={{ color: 'var(--ow-text-muted)', lineHeight: '1.6' }}>
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: 'var(--ow-text-muted)' }}>
              {formattedDate}
            </span>
            <motion.span
              className="text-xs ow-title tracking-wider uppercase"
              style={{ color: 'var(--ow-accent)' }}
              whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400 } }}
            >
              阅读全文 →
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
