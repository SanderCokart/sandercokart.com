#!/usr/bin/env node
/**
 * Git hooks for the `topic | type(folder): description.` subject format.
 *
 *   node scripts/commit-msg.mjs prepare <msg-file> [source]   (prepare-commit-msg)
 *   node scripts/commit-msg.mjs check <msg-file>              (commit-msg)
 *
 * prepare: on a topic branch, prefixes the subject with a topic derived from the
 * branch name (feat/codehouse-light-mode → codehouse-light-mode) when it has none.
 * check: rejects subjects that don't match and lists recently used topics.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const TYPES = ['feat', 'fix', 'docs', 'format', 'refactor', 'perf', 'test', 'docker', 'ci', 'chore', 'revert'];
// kebab topic, or a legacy uppercase group ID (MAILSC) from older history
const TOPIC = '(?:[a-z0-9]{2,}(?:-[a-z0-9]+)*|[a-z0-9](?:-[a-z0-9]+)+|[A-Z]{2,8})';
const SUBJECT = new RegExp(
  `^${TOPIC} \\| (?:#\\d+ \\| )?(?:${TYPES.join('|')})\\(([a-z0-9@._/,-]+)\\)!?: [a-z0-9\`].*\\.$`,
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

// Scope = the folder the change lives in (apps/codehouse, packages/ui, .cursor),
// comma-separated for several, or `repo` for root files / cross-cutting changes.
function badScopes(scope) {
  const root = git('rev-parse', '--show-toplevel');
  return scope.split(',').filter(part => {
    if (part === 'repo') return false;
    if (part.startsWith('/') || part.endsWith('/') || part.includes('..')) return true;
    const full = path.join(root, part);
    return !existsSync(full) || !statSync(full).isDirectory();
  });
}

function suggestScope() {
  const files = git('diff', '--cached', '--name-only').split('\n').filter(Boolean);
  const folders = new Set(
    files.map(file => {
      const parts = file.split('/');
      if (['apps', 'packages'].includes(parts[0]) && parts.length > 2) return `${parts[0]}/${parts[1]}`;
      return parts.length > 1 ? parts[0] : 'repo';
    }),
  );
  if (!folders.size) return null;
  return folders.size > 2 || folders.has('repo') ? 'repo' : [...folders].join(',');
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
  if (!subject || SKIP.test(subject)) process.exit(0);
  const match = subject.match(SUBJECT);
  const invalid = match ? badScopes(match[1]) : [];
  if (match && !invalid.length) process.exit(0);
  const topics = recentTopics();
  const suggestion = suggestScope();
  console.error(`\n✖ Bad commit subject:\n  ${subject}\n`);
  if (invalid.length) console.error(`Scope is not a folder in the repo: ${invalid.join(', ')}\n`);
  console.error('Expected: <topic> | [#issue | ]type(scope)[!]: description ending with a period.');
  console.error('  topic: lowercase kebab (2+ chars) shared by every commit of the workstream, e.g. open-source');
  console.error(`  type:  ${TYPES.join(', ')}`);
  console.error('  scope: folder of the change (apps/codehouse, packages/ui, .cursor), comma-separated, or repo');
  if (suggestion) console.error(`         staged files suggest: (${suggestion})`);
  console.error("  description: starts lowercase, ends with '.'");
  if (topics.length) console.error(`Recent topics: ${topics.join(', ')}`);
  console.error('');
  process.exit(1);
}

console.error('Usage: commit-msg.mjs prepare <file> [source] | check <file>');
process.exit(1);
