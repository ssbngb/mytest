# OW Blog — 守望先锋风格博客

一个基于守望先锋游戏 UI 风格设计的个人博客，使用 Next.js 14 App Router、Framer Motion 弹性物理动画实现。

## 特性

- 🎮 守望先锋标志性 UI 风格（橙色、蓝色、深色背景）
- 🎬 Framer Motion Spring 物理动画（交错弹出、弹性缩放、发光效果）
- 📝 博客列表 + 文章详情页
- 👤 关于页面（英雄档案风格）
- 🌐 全屏背景场景（三级缩放系统）
- 📱 响应式设计（移动端 + 桌面端）
- ⚡ Next.js 14 SSG 静态生成

## 快速开始

\`\`\`bash
npm install
npm run dev
\`\`\`

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 项目结构

\`\`\`
src/
├── app/
│   ├── layout.tsx       # 根布局
│   ├── page.tsx         # 主页（OW 主菜单）
│   ├── globals.css      # 全局样式 + OW CSS 变量
│   ├── blog/
│   │   ├── page.tsx     # 博客列表
│   │   └── [slug]/
│   │       └── page.tsx # 文章详情
│   └── about/
│       └── page.tsx     # 关于页面
├── components/
│   ├── Scene.tsx        # 全屏背景场景
│   ├── NavBar.tsx       # 导航栏（状态灯、Tab）
│   ├── MenuItem.tsx     # OW 风格菜单项
│   ├── OWButton.tsx     # OW 风格按钮
│   ├── PageTransition.tsx # 页面切换动画
│   ├── BlogCard.tsx     # 博客卡片
│   └── StatusIndicator.tsx # 状态指示灯
├── data/
│   └── posts.ts         # 示例博客数据（4 篇）
└── lib/
    └── constants.ts     # OW 主题常量
\`\`\`

## 技术栈

- **Next.js 14** (App Router, SSG)
- **TypeScript**
- **Tailwind CSS** + CSS 变量主题系统
- **Framer Motion** — spring 物理动画
- **Rajdhani** (Google Fonts) — OW 风格标题字体
