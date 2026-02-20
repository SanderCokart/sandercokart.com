'use server';

import { cookies } from 'next/headers';

export type BlogView = 'video' | 'blog';

const BLOG_VIEW_COOKIE = 'blog-view-preference';

/**
 * Get the blog view preference from cookies
 */
export async function getBlogViewPreference(): Promise<BlogView> {
  const cookieStore = await cookies();
  const preference = cookieStore.get(BLOG_VIEW_COOKIE)?.value;

  // Default to 'blog' if no preference is set
  return (preference === 'video' ? 'video' : 'blog') as BlogView;
}

/**
 * Set the blog view preference in cookies
 * This is a server action that can be called from client components
 */
export async function setBlogViewPreference(view: BlogView) {
  'use server';

  const cookieStore = await cookies();
  cookieStore.set(BLOG_VIEW_COOKIE, view, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });
}
