import { blogView } from './blog-view';

export { blogView } from './blog-view';
export type { BlogView } from './blog-view';

/**
 * Single source of truth for every HTML/localStorage preference in this app.
 * Spread onto `<PreferenceScripts />` and `<PreferenceProviders />`.
 * Add a preference by defining it with `createPreference` and putting it on this object.
 */
export const preferences = {
  blogView,
};
