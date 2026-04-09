import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { posts, getPostBySlug } from '@/data/posts';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
