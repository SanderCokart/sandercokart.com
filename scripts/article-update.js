/**
 * This script is ran during lint-staged and is meant for MDX files only.
 * It will update the frontmatter of the MDX file.
 * It will update the updated_at to
 */

const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    process.exit(1);
  }

  // update the updatedAt field
  // example
  //---
  // createdAt: 2024-06-18T22:34:22.877Z
  // updatedAt: 2024-06-18T22:34:22.877Z
  // title: 'Coding Example'
  // publishedAt:
  // authors: ['Sander Cokart']
  // summary: 'Here is a code example'
  // ---

  const updatedData = data.replace(/updatedAt: .*/, `updatedAt: ${new Date().toISOString()}`);

  fs.writeFile(filePath, updatedData, 'utf8', err => {
    if (err) {
      console.error(`Error writing file: ${err}`);
      process.exit(1);
    }

    console.log(`File ${filePath} updated successfully.`);
  });
});
