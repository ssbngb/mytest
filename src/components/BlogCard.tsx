'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Post } from '@/data/posts';

interface BlogCardProps {
  post: Post;
  index: number;
}

const rowVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.07,
      type: 'spring',
      stiffness: 280,
      damping: 22,
      mass: 0.9,
    },
  }),
};

export default function BlogCard({ post, index }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <motion.li
      custom={index}
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      style={{
        listStyle: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <motion.div
          whileHover={{
            x: 30,
            transition: { type: 'spring', stiffness: 400, damping: 20 },
          }}
          whileTap={{
            x: 14,
            scale: 0.99,
            transition: { type: 'spring', stiffness: 600, damping: 25 },
          }}
          style={{ padding: '14px 0', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px' }}>
            <h2
              style={{
                fontSize: 'min(4.5vh, 38px)',
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: 'white',
                textShadow: '0 0 6px rgba(0,0,0,0.8)',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
                lineHeight: 1.2,
              }}
            >
              {post.title}
            </h2>
            <span
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
              }}
            >
              {formattedDate}
            </span>
          </div>
          <div style={{ marginTop: '5px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '12px',
                  color: 'rgba(65, 166, 246, 0.85)',
                  fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>→</span>
          </div>
        </motion.div>
      </Link>
    </motion.li>
  );
}
