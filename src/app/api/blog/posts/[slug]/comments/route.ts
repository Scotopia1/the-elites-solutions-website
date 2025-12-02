import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { blogPosts, blogComments } from '@/db/schema/postgres';
import { eq, and, desc, isNull } from 'drizzle-orm';

// GET comments for a post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get post
    const post = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (!post.length) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    // Get approved top-level comments
    const comments = await db
      .select()
      .from(blogComments)
      .where(
        and(
          eq(blogComments.postId, post[0].id),
          eq(blogComments.isApproved, true),
          isNull(blogComments.parentId)
        )
      )
      .orderBy(desc(blogComments.createdAt));

    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await db
          .select()
          .from(blogComments)
          .where(
            and(
              eq(blogComments.parentId, comment.id),
              eq(blogComments.isApproved, true)
            )
          )
          .orderBy(blogComments.createdAt);
        return { ...comment, replies };
      })
    );

    return NextResponse.json({
      success: true,
      data: commentsWithReplies,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST new comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { authorName, authorEmail, authorWebsite, content, parentId } = body;

    // Validation
    if (!authorName || !authorEmail || !content) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and comment are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authorEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get post
    const post = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)))
      .limit(1);

    if (!post.length) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if comments are allowed
    if (!post[0].allowComments) {
      return NextResponse.json(
        { success: false, message: 'Comments are disabled for this post' },
        { status: 403 }
      );
    }

    // If parentId provided, verify it exists
    if (parentId) {
      const parentComment = await db
        .select()
        .from(blogComments)
        .where(eq(blogComments.id, parentId))
        .limit(1);

      if (!parentComment.length) {
        return NextResponse.json(
          { success: false, message: 'Parent comment not found' },
          { status: 404 }
        );
      }
    }

    // Get IP and user agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || '';
    const userAgent = request.headers.get('user-agent') || '';

    // Create comment (not approved by default)
    const newComment = await db
      .insert(blogComments)
      .values({
        postId: post[0].id,
        parentId: parentId || null,
        authorName,
        authorEmail,
        authorWebsite: authorWebsite || null,
        content,
        isApproved: false, // Requires moderation
        ipAddress,
        userAgent,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Comment submitted and awaiting moderation',
      data: {
        id: newComment[0].id,
        authorName: newComment[0].authorName,
        content: newComment[0].content,
        createdAt: newComment[0].createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit comment' },
      { status: 500 }
    );
  }
}
