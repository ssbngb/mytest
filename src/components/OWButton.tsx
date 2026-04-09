'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface OWButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function OWButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: OWButtonProps) {
  const baseClasses = 'relative inline-flex items-center justify-center font-bold uppercase tracking-widest ow-title overflow-hidden select-none focus:outline-none';

  const sizeClasses = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #f99e1a 0%, #e8870e 100%)',
      border: '1px solid rgba(249, 158, 26, 0.5)',
      color: '#1a1e2e',
    },
    secondary: {
      background: 'linear-gradient(135deg, rgba(65, 166, 246, 0.2) 0%, rgba(65, 166, 246, 0.1) 100%)',
      border: '1px solid rgba(65, 166, 246, 0.5)',
      color: '#41a6f6',
    },
    ghost: {
      background: 'transparent',
      border: '1px solid rgba(232, 237, 243, 0.2)',
      color: '#e8edf3',
    },
  };

  const glowColors = {
    primary: 'rgba(249, 158, 26, 0.6)',
    secondary: 'rgba(65, 166, 246, 0.6)',
    ghost: 'rgba(232, 237, 243, 0.3)',
  };

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      style={{
        ...variantStyles[variant],
        borderRadius: '2px',
        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
      }}
      whileHover={{
        scale: 1.04,
        boxShadow: `0 0 20px 4px ${glowColors[variant]}`,
        transition: { type: 'spring', stiffness: 400, damping: 15 },
      }}
      whileTap={{
        scale: 0.96,
        transition: { type: 'spring', stiffness: 600, damping: 20 },
      }}
      {...props}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
