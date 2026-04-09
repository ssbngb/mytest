'use client';

import { motion } from 'framer-motion';

interface MenuItemProps {
  label: string;
  index: number;
  isPrimary?: boolean;
  isActive?: boolean;
  onClick?: () => void;
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
}: MenuItemProps) {
  return (
    <motion.li
      custom={index}
      variants={menuItemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        x: isPrimary ? 50 : 20,
        scale: 1.08,
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
      whileTap={{
        scale: 0.97,
        x: isPrimary ? 30 : 10,
        transition: { type: 'spring', stiffness: 600, damping: 25 },
      }}
      onClick={onClick}
      className="list-none cursor-pointer"
      style={{ originX: 0 }}
    >
      <span
        style={
          isPrimary
            ? {
                display: 'block',
                fontSize: 'min(8vh, 72px)',
                lineHeight: 1.2,
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 0 2px black',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
              }
            : {
                display: 'block',
                fontSize: 'min(3.1vh, 29px)',
                lineHeight: 1.5,
                fontStyle: 'normal',
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'var(--ow-primary)' : 'white',
                textShadow: '0 0 2px black',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
              }
        }
      >
        {label}
      </span>
    </motion.li>
  );
}
