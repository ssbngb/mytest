'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserStatus, USER_STATUS_COLORS, USER_STATUS_LABELS } from '@/lib/constants';

interface StatusIndicatorProps {
  status: UserStatus;
  onChange?: (status: UserStatus) => void;
  showLabel?: boolean;
}

const statusOrder = [UserStatus.Online, UserStatus.Away, UserStatus.Busy, UserStatus.Offline];

export default function StatusIndicator({ status, onChange, showLabel = false }: StatusIndicatorProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => onChange ? setShowMenu(!showMenu) : undefined}
        className="flex items-center gap-1.5 focus:outline-none"
        aria-label={`Status: ${USER_STATUS_LABELS[status]}`}
      >
        <motion.div
          key={status}
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: USER_STATUS_COLORS[status] }}
          animate={{
            scale: status === UserStatus.Online ? [1, 1.2, 1] : 1,
            boxShadow: status === UserStatus.Online
              ? [`0 0 0px 0px ${USER_STATUS_COLORS[status]}40`, `0 0 6px 3px ${USER_STATUS_COLORS[status]}40`, `0 0 0px 0px ${USER_STATUS_COLORS[status]}40`]
              : `0 0 4px 1px ${USER_STATUS_COLORS[status]}60`,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {showLabel && (
          <span className="text-xs text-[color:var(--ow-text-muted)]">
            {USER_STATUS_LABELS[status]}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="absolute top-6 right-0 ow-panel rounded overflow-hidden z-50"
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {statusOrder.map((s) => (
              <button
                key={s}
                className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm hover:bg-white/10 transition-colors"
                onClick={() => {
                  onChange?.(s);
                  setShowMenu(false);
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: USER_STATUS_COLORS[s] }}
                />
                <span>{USER_STATUS_LABELS[s]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
