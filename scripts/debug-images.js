#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔍 Debugging image conversion...');
console.log('Current working directory:', process.cwd());

const inputDir = './public/img';
console.log('Looking for images in:', path.resolve(inputDir));

// Проверяем существование папки
if (!fs.existsSync(inputDir)) {
  console.log('❌ Directory does not exist:', inputDir);
  console.log('📁 Available directories in public/:');

  if (fs.existsSync('./public')) {
    const publicContents = fs.readdirSync('./public');
    publicContents.forEach((item) => {
      const itemPath = path.join('./public', item);
      const isDir = fs.statSync(itemPath).isDirectory();
      console.log(`  ${isDir ? '📁' : '📄'} ${item}`);
    });
  } else {
    console.log('❌ public/ directory does not exist!');
    console.log('📁 Available directories in root:');
    const rootContents = fs.readdirSync('./');
    rootContents.forEach((item) => {
      const itemPath = path.join('./', item);
      const isDir = fs.statSync(itemPath).isDirectory();
      console.log(`  ${isDir ? '📁' : '📄'} ${item}`);
    });
  }
  process.exit(1);
}

// Сканируем папку
console.log('✅ Directory exists, scanning for images...');

async function scanDirectory(dir, level = 0) {
  const indent = '  '.repeat(level);
  const items = fs.readdirSync(dir);

  console.log(`${indent}📁 ${path.basename(dir)}/ (${items.length} items)`);

  let imageCount = 0;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif', '.webp'];

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      const subImageCount = await scanDirectory(itemPath, level + 1);
      imageCount += subImageCount;
    } else {
      const ext = path.extname(item).toLowerCase();
      const isImage = imageExtensions.includes(ext);
      const size = (stats.size / 1024).toFixed(1);

      if (isImage) {
        console.log(`${indent}  🖼️  ${item} (${size} KB)`);
        imageCount++;
      } else {
        console.log(`${indent}  📄 ${item} (${size} KB)`);
      }
    }
  }

  return imageCount;
}

const totalImages = await scanDirectory(inputDir);
console.log(`\n📊 Total images found: ${totalImages}`);

if (totalImages === 0) {
  console.log('\n💡 No images found. To test the converter:');
  console.log('1. Add some .jpg or .png files to public/img/');
  console.log('2. Or run: npm run optimize:images -- --help');
} else {
  console.log('\n✅ Ready for conversion! Run: npm run optimize:images');
}
