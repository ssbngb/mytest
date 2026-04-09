'use client';

import { motion } from 'framer-motion';

interface MenuItemProps {
  label: string;
  index: number;
  isPrimary?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  subLabel?: string;
}

const menuItemVariants = {
  hidden: { opacity: 0, x: -40, scaleX: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scaleX: 1,
    transition: {
      delay: i * 0.06,
      type: 'spring',
      stiffness: 300,
      damping: 20,
      mass: 0.8,
    },
  }),
};

export default function MenuItem({
  label,
  index,
  isPrimary = true,
  isActive = false,
  onClick,
  subLabel,
}: MenuItemProps) {
  return (
    <motion.li
      custom={index}
      variants={menuItemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        x: 16,
        scale: 1.05,
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
      whileTap={{
        scale: 0.97,
        x: 8,
        transition: { type: 'spring', stiffness: 600, damping: 25 },
      }}
      onClick={onClick}
      className="list-none cursor-pointer select-none"
      style={{ originX: 0 }}
    >
      <div
        className="relative flex items-center gap-3 py-1"
        style={{
          borderLeft: isActive ? '3px solid var(--ow-primary)' : '3px solid transparent',
          paddingLeft: '12px',
          transition: 'border-color 0.2s ease',
        }}
      >
        {/* Hover background */}
        <motion.div
          className="absolute inset-y-0 -left-2 -right-4 -z-10 rounded-sm"
          style={{ background: 'rgba(65, 166, 246, 0.1)' }}
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileHover={{ opacity: 1, scaleX: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />

        <div>
          <span
            className={`ow-title block leading-tight ${
              isPrimary
                ? 'text-4xl md:text-5xl font-bold italic text-[color:var(--ow-text)]'
                : 'text-xl md:text-2xl font-semibold text-[color:var(--ow-text-muted)]'
            } ${isActive ? 'text-[color:var(--ow-primary)]' : ''}`}
            style={{
              textShadow: isActive ? '0 0 20px rgba(249, 158, 26, 0.5)' : undefined,
            }}
          >
            {label}
          </span>
          {subLabel && (
            <span className="text-xs text-[color:var(--ow-text-muted)] tracking-widest uppercase">
              {subLabel}
            </span>
          )}
        </div>
      </div>
    </motion.li>
  );
}
