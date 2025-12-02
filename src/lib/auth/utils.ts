import { auth } from './index';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();

  if (session.user.role !== 'admin') {
    redirect('/');
  }

  return session;
}

export async function getSession() {
  return await auth();
}

export async function isAuthenticated() {
  const session = await auth();
  return !!session?.user;
}

export async function hasRole(role: 'admin' | 'editor') {
  const session = await auth();
  return session?.user?.role === role;
}
