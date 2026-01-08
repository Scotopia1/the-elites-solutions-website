import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog/markdown';
import BlogPageClient from './BlogPageClient';

export default async function BlogPage() {
  // Load static data on server
  const [allPosts, categories, tags] = await Promise.all([
    getAllBlogPosts(),
    getAllCategories(),
    getAllTags(),
  ]);

  return (
    <BlogPageClient
      initialPosts={allPosts}
      categories={categories}
      tags={tags.slice(0, 10)}
    />
  );
}
