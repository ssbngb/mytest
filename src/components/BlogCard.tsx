'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Post } from '@/data/posts';

interface BlogCardProps {
  post: Post;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const [hovered, setHovered] = useState(false);

  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.li
      style={{ listStyle: 'none' }}
      initial={{ opacity: 0, x: -40, scaleX: 0.88 }}
      animate={{ opacity: 1, x: 0, scaleX: 1 }}
      transition={{
        delay: index * 0.07,
        type: 'spring',
        stiffness: 280,
        damping: 22,
        mass: 0.85,
      }}
    >
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
        <motion.div
          animate={{ x: hovered ? 48 : 0, scale: hovered ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileTap={{ scale: 0.97, x: 28, transition: { type: 'spring', stiffness: 600, damping: 25 } }}
          style={{ cursor: 'pointer', originX: 0 }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 'min(5.5vh, 48px)',
              lineHeight: 1.2,
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: hovered ? 'rgba(90,210,255,1)' : 'white',
              textShadow: hovered
                ? '0 0 24px rgba(90,210,255,0.6), 0 0 4px rgba(0,0,0,0.9)'
                : '0 0 4px rgba(0,0,0,0.9)',
              fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
              transition: 'color 0.15s ease, text-shadow 0.15s ease',
            }}
          >
            {post.title}
          </span>
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.45)',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
              }}
            >
              {formattedDate}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '10px',
                  color: 'rgba(90,210,255,0.7)',
                  fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </Link>
    </motion.li>
  );
}
