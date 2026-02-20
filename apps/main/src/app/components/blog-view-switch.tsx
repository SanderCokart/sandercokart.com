import { getBlogViewPreference, setBlogViewPreference } from '@/lib/actions/blog-view';

import { BlogViewClient } from './blog-view-client';
import { BlogViewProviderClient } from './blog-view-context';

export const BlogViewSwitch: React.FC = async () => {
  return <BlogViewClient setViewAction={setBlogViewPreference} />;
};

export const BlogViewProvider = async ({ children }: { children: React.ReactNode }) => {
  const initialView = await getBlogViewPreference();

  return <BlogViewProviderClient initialView={initialView}>{children}</BlogViewProviderClient>;
};
