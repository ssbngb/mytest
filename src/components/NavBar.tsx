'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { UserStatus } from '@/lib/constants';
import StatusIndicator from './StatusIndicator';

const NAV_LINKS = [
  { href: '/', label: '主页' },
  { href: '/blog', label: '博客' },
  { href: '/about', label: '关于' },
];

export default function NavBar() {
  const [status, setStatus] = useState<UserStatus>(UserStatus.Online);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 'var(--navbar-height)',
        background: 'linear-gradient(180deg, rgba(10, 13, 20, 0.98) 0%, rgba(13, 17, 23, 0.85) 100%)',
        borderBottom: '1px solid rgba(65, 166, 246, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
      }}
    >
      <div className="h-full flex items-center justify-between px-6 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <Link href="/" className="ow-title text-xl font-bold tracking-wider" style={{ color: 'var(--ow-primary)' }}>
            OW<span style={{ color: 'var(--ow-text)' }}> BLOG</span>
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, i) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 25 }}
              >
                <Link
                  href={link.href}
                  className="relative px-4 py-1.5 text-sm ow-title tracking-widest uppercase transition-colors"
                  style={{ color: isActive ? 'var(--ow-accent)' : 'var(--ow-text-muted)' }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: 'var(--ow-accent)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Right section: user info + social */}
        <div className="flex items-center gap-4">
          {/* GitHub link */}
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-sm opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--ow-text)', border: '1px solid var(--ow-border)' }}
            whileHover={{ scale: 1.1, rotate: 5, transition: { type: 'spring', stiffness: 400 } }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </motion.a>

          {/* User info */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              {/* Avatar */}
              <div
                className="w-7 h-7 rounded-sm flex items-center justify-center text-xs ow-title font-bold"
                style={{
                  background: 'linear-gradient(135deg, #41a6f6, #1a1e2e)',
                  border: '1px solid var(--ow-accent)',
                  color: 'var(--ow-text)',
                }}
              >
                P
              </div>
              <span className="hidden md:block text-sm ow-title tracking-wide" style={{ color: 'var(--ow-text)' }}>
                PLAYER
              </span>
              <StatusIndicator status={status} onChange={setStatus} />
            </div>
          </motion.div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-0.5 w-5"
                style={{ background: 'var(--ow-text)' }}
                animate={{
                  rotate: mobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  translateY: mobileOpen ? (i === 0 ? 6 : i === 2 ? -6 : 0) : 0,
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 ow-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-6 py-3 ow-title tracking-widest uppercase text-sm border-b"
                style={{
                  color: pathname === link.href ? 'var(--ow-accent)' : 'var(--ow-text)',
                  borderColor: 'var(--ow-border)',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
