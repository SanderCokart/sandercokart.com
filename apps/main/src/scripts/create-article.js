import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

import fg from 'fast-glob';
import slugify from 'slugify';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = path.dirname(currentFilename);

const rl = readline.createInterface({
  input: globalThis.process.stdin,
  output: globalThis.process.stdout,
});

function question(query) {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

async function getArticleTypes() {
  const articlesPath = path.join(currentDirname, '../app/articles');
  const directories = await fg('*/', { cwd: articlesPath, onlyDirectories: true });
  return directories.map(dir => dir.replace(/\/$/, ''));
}

async function createArticle() {
  try {
    const articleTypes = await getArticleTypes();
    articleTypes.forEach((type, index) => {
      console.log(`${index + 1}: ${type}`);
    });

    const typeIndex = parseInt(await question('Enter the number of the article type you want to create: ')) - 1;
    if (typeIndex < 0 || typeIndex >= articleTypes.length) {
      console.error('Invalid choice');
      return;
    }

    const type = articleTypes[typeIndex];
    const title = await question('Enter the article title: ');
    const authors = await question('Enter the authors (comma separated): ');

    const slug = slugify(title, { lower: true });
    const filename = `${slug}.mdx`;
    const filepath = path.join(currentDirname, `../app/articles/${type}`, filename);

    const frontMatter = `---
createdAt: ${new Date().toISOString()}
updatedAt: ${new Date().toISOString()}
title: "${title}"
publishedAt:
authors: [${authors.split(',').map(author => `"${author.trim()}"`)}]
summary:
---`;

    const content = `# ${title}\n\nContent goes here...`;

    await fs.writeFile(filepath, `${frontMatter}\n\n${content}`);
    console.log(`File created successfully at ${filepath}`);
  } catch (err) {
    console.error(`Error creating file: ${err}`);
  } finally {
    rl.close();
  }
}

createArticle();
