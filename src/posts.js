/* Blog post data + tiny formatting helpers shared by home, blog, and post pages.
   content/posts/index.json is the source of truth — do not edit it here. */
import POSTS from '../content/posts/index.json';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2025-07-08" -> "8 Jul 2025" — the one date style used site-wide. */
export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Trim text to at most `n` words, appending an ellipsis when cut. */
export function trimWords(text, n) {
  const words = text.trim().split(/\s+/);
  if (words.length <= n) return text.trim();
  return words.slice(0, n).join(' ') + '…';
}

/** Unique topics in feed order (newest post first). */
export const TOPICS = [...new Set(POSTS.map((p) => p.topic))];

export const FEATURED_POST = POSTS.find((p) => p.featured);

export { POSTS };
