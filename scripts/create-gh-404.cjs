const { copyFileSync, existsSync, mkdirSync } = require("fs");
const { resolve } = require("path");

const distDir = resolve(__dirname, "../dist");
const indexFile = resolve(distDir, "index.html");
const notFoundFile = resolve(distDir, "404.html");

if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

if (!existsSync(indexFile)) {
  console.error("Unable to create GitHub Pages 404.html because dist/index.html does not exist.");
  process.exit(0);
}

copyFileSync(indexFile, notFoundFile);
console.log("Created dist/404.html for GitHub Pages routing.");
