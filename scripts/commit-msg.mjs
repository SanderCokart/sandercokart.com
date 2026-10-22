#!/usr/bin/env node
/**
 * Git hooks for the `topic | type(scope): description.` subject format.
 *
 *   node scripts/commit-msg.mjs prepare <msg-file> [source]   (prepare-commit-msg)
 *   node scripts/commit-msg.mjs check <msg-file>              (commit-msg)
 *
 * prepare: on a topic branch, prefixes the subject with a topic derived from the
 * branch name (feat/codehouse-light-mode → codehouse-light-mode) when it has none.
 * check: rejects subjects that don't match and lists recently used topics.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const TYPES = ['feat', 'fix', 'docs', 'format', 'refactor', 'perf', 'test', 'docker', 'ci', 'chore', 'revert'];
// kebab topic, or a legacy uppercase group ID (MAILSC) from older history
const TOPIC = '(?:[a-z0-9]{2,}(?:-[a-z0-9]+)*|[a-z0-9](?:-[a-z0-9]+)+|[A-Z]{2,8})';
const SUBJECT = new RegExp(
  `^${TOPIC} \\| (?:#\\d+ \\| )?(?:${TYPES.join('|')})(?:\\([a-z0-9-]+\\))?!?: [a-z0-9\`].*\\.$`,
);
const HAS_TOPIC = new RegExp(`^${TOPIC} \\| `);
const SKIP = /^(Merge |Revert "|fixup! |squash! |amend! )/;
const TRUNK = new Set(['development', 'main', 'HEAD']);

const git = (...args) => {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};

function topicFromBranch(branch) {
  if (!branch || TRUNK.has(branch)) return null;
  let slug = branch
    .replace(/^(feat|feature|fix|hotfix|chore|docs|refactor|perf|test|ci|claude|cursor)\//, '')
    .replace(/-[0-9a-f]{6}$/, '') // agent worktree suffix
    .replace(/^\d+-/, '') // issue number prefix
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  if (slug.length > 24) slug = slug.slice(0, 24).replace(/-[^-]*$/, '');
  return slug || null;
}

function recentTopics() {
  const subjects = git('log', '-60', '--format=%s').split('\n');
  const topics = subjects.map(s => s.match(HAS_TOPIC)?.[0].slice(0, -3)).filter(Boolean);
  return [...new Set(topics)].slice(0, 12);
}

const [mode, file, source] = process.argv.slice(2);
const text = readFileSync(file, 'utf8');
const lines = text.split('\n');
const subjectIndex = lines.findIndex(l => l.trim() && !l.startsWith('#'));
const subject = subjectIndex === -1 ? '' : lines[subjectIndex];

if (mode === 'prepare') {
  if (['merge', 'squash', 'commit'].includes(source) || subjectIndex === -1) process.exit(0);
  if (SKIP.test(subject) || HAS_TOPIC.test(subject)) process.exit(0);
  const topic = topicFromBranch(git('symbolic-ref', '--short', '-q', 'HEAD'));
  if (!topic) process.exit(0);
  lines[subjectIndex] = `${topic} | ${subject}`;
  writeFileSync(file, lines.join('\n'));
  process.exit(0);
}

if (mode === 'check') {
  if (!subject || SKIP.test(subject) || SUBJECT.test(subject)) process.exit(0);
  const topics = recentTopics();
  console.error(`\n✖ Bad commit subject:\n  ${subject}\n`);
  console.error('Expected: <topic> | [#issue | ]type(scope)[!]: description ending with a period.');
  console.error('  topic: lowercase kebab (2+ chars) shared by every commit of the workstream, e.g. open-source');
  console.error(`  type:  ${TYPES.join(', ')}`);
  console.error("  description: starts lowercase, ends with '.'");
  if (topics.length) console.error(`Recent topics: ${topics.join(', ')}`);
  console.error('');
  process.exit(1);
}

console.error('Usage: commit-msg.mjs prepare <file> [source] | check <file>');
process.exit(1);
