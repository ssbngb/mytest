'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserStatus, USER_STATUS_COLORS } from '@/lib/constants';

const TAB_LINKS = [
  { href: '/blog', label: '博客' },
  { href: '/about', label: '关于' },
];

export default function NavBar() {
  const [status, setStatus] = useState<UserStatus>(UserStatus.Online);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      setCurrentTime(`${h12}:${m} ${ampm}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const cycleStatus = () => {
    const order = [UserStatus.Online, UserStatus.Away, UserStatus.Busy, UserStatus.Offline];
    const idx = order.indexOf(status);
    setStatus(order[(idx + 1) % order.length]);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 'var(--navbar-height)',
        background: isHome ? 'transparent' : 'rgba(40, 53, 82, 0.92)',
        backdropFilter: isHome ? 'none' : 'blur(12px)',
        WebkitBackdropFilter: isHome ? 'none' : 'blur(12px)',
        borderBottom: isHome ? 'none' : '1px solid rgba(65,166,246,0.2)',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <div className="h-full flex items-center justify-between px-6 md:px-8">

        {/* Left: Logo (home) or Tabs (sub-pages) */}
        {isHome ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <Link
              href="/"
              style={{
                fontSize: '15px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 0 4px black',
                textDecoration: 'none',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
              }}
            >
              守望先锋
            </Link>
          </motion.div>
        ) : (
          <nav className="flex items-stretch h-full">
            <Link
              href="/"
              className="flex items-center px-4 text-sm font-medium"
              style={{
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                transition: 'color 0.2s',
              }}
            >
              主页
            </Link>
            {TAB_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative flex items-center px-5 text-sm font-medium"
                  style={{
                    color: isActive ? 'white' : 'rgba(255,255,255,0.65)',
                    textDecoration: 'none',
                    background: isActive ? 'rgba(87,188,255,0.18)' : 'transparent',
                    boxShadow: isActive ? '0 0 8px 1px rgba(87,188,255,0.25)' : 'none',
                    fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                    transition: 'color 0.2s, background 0.2s',
                    borderBottom: isActive
                      ? '2px solid rgba(90,255,255,1)'
                      : '2px solid transparent',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right: time + social + user info */}
        <div className="flex items-center gap-2">
          {/* Clock — OW-style top-right time display */}
          {currentTime && (
            <div
              style={{
                padding: '2px 6px 4px',
                background: 'rgba(25, 28, 45, 0.5)',
                color: '#b0d5e0',
                fontSize: '14px',
                lineHeight: 1,
                fontFamily: "'PingFang SC', 'Microsoft YaHei', monospace",
                flexShrink: 0,
              }}
            >
              {currentTime}
            </div>
          )}

          {/* GitHub */}
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8"
            style={{
              color: 'white',
              background: '#2993e1',
              textDecoration: 'none',
              flexShrink: 0,
              boxShadow: '0 0 4px 1px rgba(41, 148, 224, 0.5)',
            }}
            whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 400 } }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </motion.a>

          {/* User info area */}
          <motion.div
            className="flex items-center"
            style={{
              background: 'rgba(52, 68, 93, 0.65)',
              height: '36px',
              cursor: 'pointer',
            }}
            whileHover={{ background: 'rgba(52,68,93,0.85)' }}
            onClick={cycleStatus}
            title="点击切换状态"
          >
            {/* Status color strip */}
            <div
              style={{
                width: '7px',
                height: '100%',
                background: USER_STATUS_COLORS[status],
                flexShrink: 0,
                transition: 'background 0.3s ease',
              }}
            />
            {/* Square avatar */}
            <div
              className="flex items-center justify-center text-xs font-bold"
              style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #41a6f6, #1a2a4a)',
                color: 'white',
                flexShrink: 0,
                fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
              }}
            >
              P
            </div>
            {/* Nickname */}
            <span
              className="hidden md:block px-3 text-sm"
              style={{
                color: 'white',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              PLAYER
            </span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
