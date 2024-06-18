const fs = require('fs');
const path = require('path');
const readline = require('readline');
const fg = require('fast-glob');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function publishArticle() {
  const files = await fg('**/app/articles/*/*.mdx', { cwd: path.join(__dirname, '..') });
  const articles = files.map((file, index) => {
    const match = file.match(/app\/articles\/(.+)\/(.+)\.mdx/);
    return {
      index: index + 1,
      type: match[1],
      slug: match[2],
      path: file,
    };
  });

  articles.forEach(article => {
    console.log(`${article.index}: ${article.type} - ${article.slug}`);
  });

  rl.question('Enter the number of the article to publish: ', input => {
    const chosenArticle = articles.find(article => article.index === parseInt(input));

    if (!chosenArticle) {
      console.error('Invalid choice');
      rl.close();
      return;
    }

    const filePath = path.join(__dirname, '..', chosenArticle.path);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        rl.close();
        return;
      }

      if (/publishedAt:.*$/m.test(data)) {
        const newData = data.replace(/(publishedAt:\s*).*$/m, `publishedAt: ${new Date().toISOString()}`);
        fs.writeFile(filePath, newData, 'utf8', err => {
          if (err) {
            console.error(`Error writing file: ${err}`);
          } else {
            console.log(`Published article: ${chosenArticle.type} - ${chosenArticle.slug}`);
          }
          rl.close();
        });
      } else {
        console.error('publishedAt not found in frontmatter');
        rl.close();
      }
    });
  });
}

publishArticle();
