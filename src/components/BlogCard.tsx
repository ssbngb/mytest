'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Post } from '@/data/posts';

interface BlogCardProps {
  post: Post;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.li
      initial={{ opacity: 0, x: -30 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { delay: 0.15 + index * 0.06, type: 'spring', stiffness: 300, damping: 22 },
      }}
      whileHover={{ x: 30, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
      whileTap={{ scale: 0.98 }}
      className="list-none cursor-pointer"
      style={{ marginBottom: '16px' }}
    >
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
        <h2
          style={{
            fontSize: 'min(4vh, 36px)',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 0 2px black',
            lineHeight: 1.3,
            fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
          }}
        >
          {post.title}
        </h2>
        <p
          style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.45)',
            textShadow: '0 0 2px black',
            marginTop: '2px',
            fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
          }}
        >
          {formattedDate}<span aria-hidden="true">{' · '}</span>{post.tags.join(' · ')}
        </p>
      </Link>
    </motion.li>
  );
}
