import { pgTable, uuid, varchar, jsonb, text, boolean, integer, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { relations } from 'drizzle-orm';

// Blog Authors
export const blogAuthors = pgTable('blog_authors', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: jsonb('name').$type<{ en: string; fr: string; ar: string }>().notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  bio: jsonb('bio').$type<{ en: string; fr: string; ar: string }>(),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  email: varchar('email', { length: 255 }),
  role: jsonb('role').$type<{ en: string; fr: string; ar: string }>(),
  socialLinks: jsonb('social_links').$type<{
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  }>(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Blog Categories
export const blogCategories = pgTable('blog_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: jsonb('name').$type<{ en: string; fr: string; ar: string }>().notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  description: jsonb('description').$type<{ en: string; fr: string; ar: string }>(),
  color: varchar('color', { length: 7 }), // hex color like #C9A227
  iconUrl: varchar('icon_url', { length: 500 }),
  orderIndex: integer('order_index').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Blog Tags
export const blogTags = pgTable('blog_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: jsonb('name').$type<{ en: string; fr: string; ar: string }>().notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Blog Posts
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: jsonb('title').$type<{ en: string; fr: string; ar: string }>().notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  excerpt: jsonb('excerpt').$type<{ en: string; fr: string; ar: string }>(),
  content: jsonb('content').$type<{ en: string; fr: string; ar: string }>().notNull(),
  featuredImageUrl: varchar('featured_image_url', { length: 500 }),
  featuredImageAlt: jsonb('featured_image_alt').$type<{ en: string; fr: string; ar: string }>(),
  authorId: uuid('author_id').references(() => blogAuthors.id).notNull(),
  categoryId: uuid('category_id').references(() => blogCategories.id),
  readingTime: integer('reading_time'), // in minutes
  viewCount: integer('view_count').notNull().default(0),
  isFeatured: boolean('is_featured').notNull().default(false),
  isPublished: boolean('is_published').notNull().default(false),
  allowComments: boolean('allow_comments').notNull().default(true),
  metaTitle: jsonb('meta_title').$type<{ en: string; fr: string; ar: string }>(),
  metaDescription: jsonb('meta_description').$type<{ en: string; fr: string; ar: string }>(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Blog Post Tags (Junction Table)
export const blogPostTags = pgTable('blog_post_tags', {
  postId: uuid('post_id').references(() => blogPosts.id, { onDelete: 'cascade' }).notNull(),
  tagId: uuid('tag_id').references(() => blogTags.id, { onDelete: 'cascade' }).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.postId, t.tagId] }),
}));

// Blog Comments
export const blogComments = pgTable('blog_comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').references(() => blogPosts.id, { onDelete: 'cascade' }).notNull(),
  parentId: uuid('parent_id'), // for nested replies
  authorName: varchar('author_name', { length: 255 }).notNull(),
  authorEmail: varchar('author_email', { length: 255 }).notNull(),
  authorWebsite: varchar('author_website', { length: 500 }),
  content: text('content').notNull(),
  isApproved: boolean('is_approved').notNull().default(false),
  isSpam: boolean('is_spam').notNull().default(false),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const blogAuthorsRelations = relations(blogAuthors, ({ many }) => ({
  posts: many(blogPosts),
}));

export const blogCategoriesRelations = relations(blogCategories, ({ many }) => ({
  posts: many(blogPosts),
}));

export const blogTagsRelations = relations(blogTags, ({ many }) => ({
  postTags: many(blogPostTags),
}));

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(blogAuthors, {
    fields: [blogPosts.authorId],
    references: [blogAuthors.id],
  }),
  category: one(blogCategories, {
    fields: [blogPosts.categoryId],
    references: [blogCategories.id],
  }),
  postTags: many(blogPostTags),
  comments: many(blogComments),
}));

export const blogPostTagsRelations = relations(blogPostTags, ({ one }) => ({
  post: one(blogPosts, {
    fields: [blogPostTags.postId],
    references: [blogPosts.id],
  }),
  tag: one(blogTags, {
    fields: [blogPostTags.tagId],
    references: [blogTags.id],
  }),
}));

export const blogCommentsRelations = relations(blogComments, ({ one, many }) => ({
  post: one(blogPosts, {
    fields: [blogComments.postId],
    references: [blogPosts.id],
  }),
  parent: one(blogComments, {
    fields: [blogComments.parentId],
    references: [blogComments.id],
    relationName: 'replies',
  }),
  replies: many(blogComments, { relationName: 'replies' }),
}));

// Zod Schemas
export const insertBlogAuthorSchema = createInsertSchema(blogAuthors);
export const selectBlogAuthorSchema = createSelectSchema(blogAuthors);

export const insertBlogCategorySchema = createInsertSchema(blogCategories);
export const selectBlogCategorySchema = createSelectSchema(blogCategories);

export const insertBlogTagSchema = createInsertSchema(blogTags);
export const selectBlogTagSchema = createSelectSchema(blogTags);

export const insertBlogPostSchema = createInsertSchema(blogPosts);
export const selectBlogPostSchema = createSelectSchema(blogPosts);

export const insertBlogCommentSchema = createInsertSchema(blogComments);
export const selectBlogCommentSchema = createSelectSchema(blogComments);

// Types
export type BlogAuthor = z.infer<typeof selectBlogAuthorSchema>;
export type NewBlogAuthor = z.infer<typeof insertBlogAuthorSchema>;

export type BlogCategory = z.infer<typeof selectBlogCategorySchema>;
export type NewBlogCategory = z.infer<typeof insertBlogCategorySchema>;

export type BlogTag = z.infer<typeof selectBlogTagSchema>;
export type NewBlogTag = z.infer<typeof insertBlogTagSchema>;

export type BlogPost = z.infer<typeof selectBlogPostSchema>;
export type NewBlogPost = z.infer<typeof insertBlogPostSchema>;

export type BlogComment = z.infer<typeof selectBlogCommentSchema>;
export type NewBlogComment = z.infer<typeof insertBlogCommentSchema>;
