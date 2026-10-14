import { createPreference } from '@repo/runtime-env/preference';

export const blogView = createPreference({
  storageKey: 'blog-view-preference',
  attribute: 'data-blog-view',
  defaultValue: 'blog',
  values: ['blog', 'video'],
});

export type BlogView = (typeof blogView.values)[number];
