import { promises as fs } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import fg from 'fast-glob';
import terminalKit from 'terminal-kit';

const { terminal } = terminalKit;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function publishArticle() {
  terminal.clear();
  terminal.grabInput(true);

  terminal.on('key', function (name) {
    if (name === 'CTRL_C') {
      terminal.red('\nCTRL-C detected. Exiting...\n');
      process.exit();
    }
  });

  try {
    const articleFiles = await fg('**/app/articles/*/*.mdx', { cwd: path.join(__dirname, '..') });
    const articles = articleFiles.map((file, index) => {
      const match = file.match(/app\/articles\/(.+)\/(.+)\.mdx/);
      return {
        index: index + 1,
        type: match[1],
        slug: match[2],
        relativePath: file,
        label: `${match[1]} - ${match[2]}`,
      };
    });

    if (articles.length === 0) {
      terminal.yellow('No articles found to publish.\n');
      process.exit();
    }

    terminal.green('Select the article to publish:\n');
    const selectionResponse = await terminal.singleColumnMenu(articles.map(a => a.label)).promise;
    const chosenArticle = articles[selectionResponse.selectedIndex];

    const absoluteFilePath = path.join(__dirname, '..', chosenArticle.relativePath);
    const fileContent = await fs.readFile(absoluteFilePath, 'utf8');

    const publishedAtRegex = /^(publishedAt:\s*).*$/m;
    if (publishedAtRegex.test(fileContent)) {
      const updatedContent = fileContent.replace(
        publishedAtRegex,
        `publishedAt: ${new Date().toISOString()}`
      );
      await fs.writeFile(absoluteFilePath, updatedContent, 'utf8');
      terminal.green(`\n\nPublished article: ${chosenArticle.type} - ${chosenArticle.slug}\n`);
    } else {
      terminal.red('\n\n"publishedAt" field not found in frontmatter\n');
    }
  } catch (err) {
    terminal.red(`\n\nError: ${err.message}\n`);
  } finally {
    process.exit();
  }
}

publishArticle();
