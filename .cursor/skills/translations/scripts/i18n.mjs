#!/usr/bin/env node
/**
 * Read and edit codehouse translations without loading the 45 KB message files.
 *
 *   node .cursor/skills/translations/scripts/i18n.mjs keys                       namespaces + key counts
 *   node .cursor/skills/translations/scripts/i18n.mjs get FreelanceHero          whole namespace, en + nl
 *   node .cursor/skills/translations/scripts/i18n.mjs get FreelanceHero.title    one key, en + nl
 *   node .cursor/skills/translations/scripts/i18n.mjs find "quote"               keys whose key or value matches (case-insensitive)
 *   node .cursor/skills/translations/scripts/i18n.mjs missing                    keys present in one locale but not the other
 *   node .cursor/skills/translations/scripts/i18n.mjs set FreelanceHero.title --en "Hi" --nl "Hoi"
 *   node .cursor/skills/translations/scripts/i18n.mjs rm FreelanceHero.title     remove from every locale
 *
 * Paths use dots; keys inside a namespace use `_` (see translations skill).
 * Writes keep key order (new keys append) and the existing 2-space format.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const DIR = path.join(ROOT, 'apps', 'codehouse', 'messages');
const LOCALES = ['en', 'nl'];

const file = locale => path.join(DIR, `${locale}.json`);
const load = () => Object.fromEntries(LOCALES.map(l => [l, JSON.parse(readFileSync(file(l), 'utf8'))]));
const save = (locale, data) => writeFileSync(file(locale), `${JSON.stringify(data, null, 2)}\n`);

function at(obj, keyPath) {
  return keyPath.split('.').reduce((node, key) => (node == null ? undefined : node[key]), obj);
}

function flatten(obj, prefix = '', out = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object') flatten(value, full, out);
    else out[full] = value;
  }
  return out;
}

function usage(message) {
  if (message) console.error(message);
  console.error('Usage: i18n.mjs keys | get <path> | find <text> | missing | set <path> --en <v> --nl <v> | rm <path>');
  process.exit(1);
}

const [command, target, ...rest] = process.argv.slice(2);
const data = load();

switch (command) {
  case 'keys': {
    for (const [ns, value] of Object.entries(data.en)) {
      const count = Object.keys(flatten({ [ns]: value })).length;
      console.log(`${ns} (${count})`);
    }
    break;
  }
  case 'get': {
    if (!target) usage('get needs a path');
    const result = Object.fromEntries(LOCALES.map(l => [l, at(data[l], target) ?? null]));
    console.log(JSON.stringify(result, null, 2));
    break;
  }
  case 'find': {
    if (!target) usage('find needs text');
    const needle = target.toLowerCase();
    const flat = Object.fromEntries(LOCALES.map(l => [l, flatten(data[l])]));
    const hits = new Set();
    for (const l of LOCALES) {
      for (const [key, value] of Object.entries(flat[l])) {
        if (`${key}\0${value}`.toLowerCase().includes(needle)) hits.add(key);
      }
    }
    for (const key of hits) {
      console.log(key);
      for (const l of LOCALES) console.log(`  ${l}: ${flat[l][key] ?? '—'}`);
    }
    if (!hits.size) console.log('no matches');
    break;
  }
  case 'missing': {
    const flat = Object.fromEntries(LOCALES.map(l => [l, new Set(Object.keys(flatten(data[l])))]));
    let any = false;
    for (const l of LOCALES) {
      for (const other of LOCALES.filter(o => o !== l)) {
        for (const key of flat[l]) {
          if (!flat[other].has(key)) {
            console.log(`${key}: in ${l}, missing in ${other}`);
            any = true;
          }
        }
      }
    }
    if (!any) console.log('locales in sync');
    break;
  }
  case 'set': {
    if (!target) usage('set needs a path');
    const values = {};
    for (let i = 0; i < rest.length; i += 2) {
      const flag = rest[i]?.replace(/^--/, '');
      if (!LOCALES.includes(flag) || rest[i + 1] === undefined) {
        usage(`bad flag ${rest[i]}`);
      }
      values[flag] = rest[i + 1];
    }
    const missing = LOCALES.filter(l => !(l in values));
    if (missing.length) usage(`set needs a value for every locale: ${missing.join(', ')}`);
    const keys = target.split('.');
    for (const l of LOCALES) {
      let node = data[l];
      for (const key of keys.slice(0, -1)) {
        node[key] ??= {};
        node = node[key];
      }
      node[keys.at(-1)] = values[l];
      save(l, data[l]);
    }
    console.log(`set ${target}`);
    break;
  }
  case 'rm': {
    if (!target) usage('rm needs a path');
    const keys = target.split('.');
    for (const l of LOCALES) {
      const parent = keys.length === 1 ? data[l] : at(data[l], keys.slice(0, -1).join('.'));
      if (parent && keys.at(-1) in parent) {
        delete parent[keys.at(-1)];
        save(l, data[l]);
      }
    }
    console.log(`removed ${target}`);
    break;
  }
  default:
    usage();
}
