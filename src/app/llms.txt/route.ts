import { NextResponse } from 'next/server';

/**
 * Dynamic llms.txt generation for AI crawler optimization
 * Serves at /llms.txt with text/plain content type
 *
 * This file provides a structured overview of the site for AI crawlers (Claude, GPT, etc.)
 */
export async function GET() {
  // TODO: When blog is implemented, fetch blog posts and add them dynamically
  // const blogPosts = await fetchBlogPosts();
  // const blogLinks = blogPosts.map(post => `- [${post.title}](/blog/${post.slug})`).join('\n');

  const content = `# The Elites

> We are a digital agency that thrives on innovation, strategic thinking, and solutions that make you lean in and say 'yes.'

## Navigation

- [Full Documentation](llms-full.txt)
- [Home](/)
- [About](/about)
- [Services](/services)
- [Work](/work)
- [Contact](/contact)

## Legal

- [Privacy Policy](/privacy)
- [Terms of Service](/terms)
- [Cookie Policy](/cookies)
`;

  // TODO: Add blog section when implemented
  // ## Blog
  //
  // ${blogLinks}

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}
