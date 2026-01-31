import { promises as fs } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import fg from 'fast-glob';
import slugify from 'slugify';
import terminalKit from 'terminal-kit';

const { terminal } = terminalKit;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getArticleTypes() {
  const articlesPath = path.join(__dirname, '../app/articles');
  const directories = await fg('*/', { cwd: articlesPath, onlyDirectories: true });
  return directories.map(dir => dir.replace(/\/$/, ''));
}

async function createArticle() {
  terminal.clear();
  terminal.grabInput(true);

  terminal.on('key', function (name) {
    if (name === 'CTRL_C') {
      terminal.red('\nCTRL-C detected. Exiting...\n');
      process.exit();
    }
  });

  try {
    const articleTypes = await getArticleTypes();

    terminal.green('Select the article type you want to create:\n');
    const typeResponse = await terminal.singleColumnMenu(articleTypes).promise;
    const articleType = typeResponse.selectedText;

    terminal.green('\nEnter the article title: ');
    const articleTitle = await terminal.inputField().promise;

    terminal.green('\nEnter the authors (comma separated): ');
    const rawAuthorsInput = await terminal.inputField().promise;

    const baseSlug = slugify(articleTitle, { lower: true });
    let articleSlug = baseSlug;
    let fileName = `${articleSlug}.mdx`;
    let filePath = path.join(__dirname, `../app/articles/${articleType}`, fileName);
    let duplicateCounter = 1;

    while (true) {
      try {
        await fs.access(filePath);
        articleSlug = `${baseSlug}-${duplicateCounter}`;
        fileName = `${articleSlug}.mdx`;
        filePath = path.join(__dirname, `../app/articles/${articleType}`, fileName);
        duplicateCounter++;
      } catch {
        break;
      }
    }

    const authors = rawAuthorsInput
      .split(',')
      .map((author) => `"${author.trim()}"`)
      .join(', ');

    const frontMatter = `---
createdAt: ${new Date().toISOString()}
updatedAt: ${new Date().toISOString()}
title: "${articleTitle}"
publishedAt:
authors: [${authors}]
summary:
---`;

    const content = `# ${articleTitle}\n\nContent goes here...`;

    await fs.writeFile(filePath, `${frontMatter}\n\n${content}`);
    terminal.green(`\n\nFile created successfully at ${filePath}\n`);
  } catch (err) {
    terminal.red(`\n\nError creating file: ${err.message}\n`);
  } finally {
    process.exit();
  }
}

createArticle();
