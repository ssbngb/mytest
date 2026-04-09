export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'overwatch-ui-design',
    title: '守望先锋 UI 设计分析',
    date: '2024-07-15',
    tags: ['设计', '游戏'],
    excerpt: '深入分析守望先锋标志性 UI 风格的设计原则，包括配色系统、动效设计和交互反馈。',
    content: `# 守望先锋 UI 设计分析

守望先锋的用户界面是现代游戏 UI 设计的典范之一。它成功地将复杂的游戏信息以清晰、美观的方式呈现给玩家。

## 配色系统

守望先锋的配色以 **橙色 (#F99E1A)** 和 **蓝色 (#41A6F6)** 为主色调，搭配深色背景，形成强烈的视觉对比。

- 橙色：用于主要行动按钮、重要标题
- 蓝色：用于导航、链接、状态指示
- 青光 (#5AFFFF)：激活状态、选中高亮
- 深蓝灰：面板背景，半透明效果

## 动效设计

OW 的动效区别于普通游戏的线性过渡，它使用了：

1. **弹性缓动 (Elastic Easing)**：元素入场时会有轻微的超越再回弹
2. **指数减速 (Expo Out)**：快速加速后缓慢停下，充满力量感
3. **交错动画 (Stagger)**：列表项依次入场，而非同时

## 交互反馈

每个交互元素都有即时的视觉反馈：
- 按钮 hover：发光效果 + 轻微放大
- 按钮 press：快速缩小 + 反弹
- 菜单选中：滑动高亮条

这些细节共同营造了游戏感十足的沉浸式体验。`,
  },
  {
    slug: 'framer-motion-animations',
    title: '用 Framer Motion 打造游戏级动效',
    date: '2024-07-22',
    tags: ['前端', '动画'],
    excerpt: '探索如何使用 Framer Motion 的 spring 物理引擎，实现接近守望先锋游戏 UI 的高质量动效。',
    content: `# 用 Framer Motion 打造游戏级动效

Framer Motion 是 React 生态中最强大的动画库之一，它内置的物理弹性引擎让我们可以轻松实现游戏级别的动效。

## 核心概念

### Spring 动画

不同于 CSS 的 ease 函数，Framer Motion 的 spring 类型动画基于物理模型：

调整这三个参数可以得到不同的弹性感：
- 高 stiffness + 低 damping = 快速弹性
- 低 stiffness + 高 damping = 缓慢惯性

### Variants 系统

通过 variants 定义动画状态，实现复杂的交错动画。

### AnimatePresence

用于实现组件进出场动画，是页面切换过渡的关键。

## 实践示例

完整的 OW 风格菜单实现见本博客源码。`,
  },
  {
    slug: 'nextjs-app-router',
    title: 'Next.js 14 App Router 实践',
    date: '2024-08-01',
    tags: ['前端', 'React'],
    excerpt: '系统介绍 Next.js 14 App Router 架构，包括布局嵌套、服务端组件与客户端组件的配合使用。',
    content: `# Next.js 14 App Router 实践

Next.js 14 的 App Router 带来了全新的文件系统路由方式，与传统的 Pages Router 相比有许多优势。

## 目录结构

App Router 使用基于文件系统的路由，每个文件夹对应一个路由段。

## Server vs Client Components

App Router 默认所有组件都是 Server Components。只有需要浏览器 API 或状态的组件才加 use client。

### Server Components 优势

- 直接访问数据库/文件系统
- 减少客户端 JS 包体积
- 自动代码分割

### 何时使用 use client

- 使用 useState, useEffect
- 使用浏览器 API
- 使用 Framer Motion（需要浏览器环境）

## 静态生成 (SSG)

通过 generateStaticParams，Next.js 会在构建时为每篇文章预生成静态 HTML，实现最快的加载速度。`,
  },
  {
    slug: 'tailwind-theming',
    title: 'Tailwind CSS 主题化技巧',
    date: '2024-08-10',
    tags: ['CSS', '前端'],
    excerpt: '深入探讨 Tailwind CSS 与 CSS 变量结合使用的主题化方案，以及如何构建灵活的设计系统。',
    content: `# Tailwind CSS 主题化技巧

将 Tailwind CSS 与 CSS Custom Properties（CSS 变量）结合，可以构建出既灵活又高效的主题系统。

## 方案一：tailwind.config.ts 中引用 CSS 变量

在配置文件中扩展颜色，引用 CSS 变量，这样就可以在 Tailwind 类名中使用主题色。

## 方案二：直接在 CSS 变量中定义

在 :root 中定义基础主题，通过 .dark 类切换暗色主题。

## 缓动函数变量

将常用缓动函数存为 CSS 变量，方便在整个项目中复用，统一动画风格。

## 最佳实践

1. 在 CSS 变量中定义语义化的 token
2. 在 Tailwind 中引用这些 token
3. 通过切换 CSS 变量实现主题切换
4. 使用 @layer 组织自定义样式`,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
