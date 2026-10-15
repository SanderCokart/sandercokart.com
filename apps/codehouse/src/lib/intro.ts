/** sessionStorage key and root attribute for "the header entrance has played in this session". */
export const INTRO_SEEN_KEY = 'codehouse:intro-seen';
export const INTRO_SEEN_ATTRIBUTE = 'data-intro-seen';

/** Inline before paint (see the `[locale]` layout): later loads in the session start on the final frame. */
export const introSeenScript = `try{if(sessionStorage.getItem(${JSON.stringify(INTRO_SEEN_KEY)}))document.documentElement.setAttribute(${JSON.stringify(INTRO_SEEN_ATTRIBUTE)},'')}catch(e){}`;

/** Whether this mount of the header comes after its entrance already played (reload, locale switch). */
export function hasSeenIntro(): boolean {
  return typeof document !== 'undefined' && document.documentElement.hasAttribute(INTRO_SEEN_ATTRIBUTE);
}
