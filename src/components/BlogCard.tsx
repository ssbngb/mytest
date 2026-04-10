'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Post } from '@/data/posts';

interface BlogCardProps {
  post: Post;
  index: number;
}

const rowVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.07,
      type: 'spring',
      stiffness: 280,
      damping: 22,
      mass: 0.8,
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
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        x: 48,
        scale: 1.03,
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
      whileTap={{
        scale: 0.98,
        transition: { type: 'spring', stiffness: 600, damping: 25 },
      }}
      style={{ originX: 0 }}
    >
      <Link href={`/blog/${post.slug}`} className="block no-underline">
        <div
          style={{
            padding: '10px 0',
            borderBottom: '1px solid rgba(100, 170, 240, 0.12)',
          }}
        >
          {/* Title */}
          <h2
            style={{
              fontSize: 'min(5vh, 42px)',
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'white',
              textShadow: '0 0 2px black',
              lineHeight: 1.2,
              fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
            }}
          >
            {post.title}
          </h2>

          {/* Meta: date + tags */}
          <div className="flex items-center gap-3 mt-1">
            <span
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
              }}
            >
              {formattedDate}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '11px',
                  color: 'rgba(90, 200, 255, 0.75)',
                  fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
