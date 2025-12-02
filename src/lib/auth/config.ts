import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/database/postgres';
import { users } from '@/db/schema/postgres';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .limit(1);

        if (!user || user.length === 0) {
          return null;
        }

        const foundUser = user[0];

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          foundUser.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'admin' | 'editor';
      }
      return session;
    },
  },
  trustHost: true,
};
