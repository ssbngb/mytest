import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'OW Blog — 守望先锋风格博客',
  description: '一个守望先锋游戏 UI 风格的个人博客，使用 Next.js 14、Framer Motion 实现弹性物理动画。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <NavBar />
        <main style={{ paddingTop: 'var(--navbar-height)' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
