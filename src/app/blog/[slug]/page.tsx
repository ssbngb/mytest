import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { posts, getPostBySlug } from '@/data/posts';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
