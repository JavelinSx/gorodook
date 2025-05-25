#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🚀 Script started!');
console.log('Arguments:', process.argv);
console.log('Node version:', process.version);

console.log('✅ Modules imported successfully');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('✅ File paths resolved');
console.log('Script location:', __filename);

class ImageConverter {
  constructor(options = {}) {
    this.inputDir = options.inputDir || './public/img';
    this.quality = options.quality || 80;
    this.formats = options.formats || ['webp'];
    this.skipExisting = options.skipExisting !== false;
    this.verbose = options.verbose || false;
    this.deleteOriginals = options.deleteOriginals || false;

    this.stats = {
      processed: 0,
      skipped: 0,
      errors: 0,
      totalSaved: 0,
    };
  }

  log(message, type = 'info') {
    if (!this.verbose && type === 'verbose') return;

    const colors = {
      info: '\x1b[36m', // cyan
      success: '\x1b[32m', // green
      warning: '\x1b[33m', // yellow
      error: '\x1b[31m', // red
      verbose: '\x1b[90m', // gray
    };

    const reset = '\x1b[0m';
    console.log(`${colors[type] || ''}${message}${reset}`);
  }

  async getAllFiles(dir) {
    const files = [];

    async function scan(currentDir) {
      const items = await fs.promises.readdir(currentDir);

      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stats = await fs.promises.stat(fullPath);

        if (stats.isDirectory()) {
          await scan(fullPath);
        } else if (stats.isFile()) {
          files.push(fullPath);
        }
      }
    }

    await scan(dir);
    return files;
  }

  isImageFile(filePath) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif'];
    const ext = path.extname(filePath).toLowerCase();
    return imageExtensions.includes(ext);
  }

  getOutputPath(inputPath, format) {
    const parsed = path.parse(inputPath);
    return path.join(parsed.dir, `${parsed.name}.${format}`);
  }

  async getFileSize(filePath) {
    try {
      const stats = await fs.promises.stat(filePath);
      return stats.size;
    } catch {
      return 0;
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async convertImage(inputPath, format) {
    const outputPath = this.getOutputPath(inputPath, format);

    try {
      // Проверяем, нужно ли пропустить существующий файл
      if (this.skipExisting && fs.existsSync(outputPath)) {
        this.log(`Skipping existing: ${path.relative(process.cwd(), outputPath)}`, 'verbose');
        this.stats.skipped++;
        return false;
      }

      const originalSize = await this.getFileSize(inputPath);

      // Настройки конвертации для разных форматов
      let sharpInstance = sharp(inputPath);

      switch (format) {
        case 'webp':
          sharpInstance = sharpInstance.webp({
            quality: this.quality,
            effort: 6, // Лучшее сжатие
          });
          break;
        case 'avif':
          sharpInstance = sharpInstance.avif({
            quality: this.quality,
            effort: 6,
          });
          break;
        case 'jpeg':
        case 'jpg':
          sharpInstance = sharpInstance.jpeg({
            quality: this.quality,
            progressive: true,
            mozjpeg: true,
          });
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      await sharpInstance.toFile(outputPath);

      const newSize = await this.getFileSize(outputPath);
      const saved = originalSize - newSize;
      const savedPercent = originalSize > 0 ? ((saved / originalSize) * 100).toFixed(1) : 0;

      this.stats.totalSaved += saved;
      this.stats.processed++;

      this.log(
        `✓ ${path.relative(process.cwd(), inputPath)} → ${path.relative(process.cwd(), outputPath)} ` +
          `(${this.formatBytes(originalSize)} → ${this.formatBytes(newSize)}, -${savedPercent}%)`,
        'success'
      );

      // Удаляем оригинал если указано
      if (this.deleteOriginals && format !== path.extname(inputPath).slice(1)) {
        await fs.promises.unlink(inputPath);
        this.log(`Deleted original: ${path.relative(process.cwd(), inputPath)}`, 'verbose');
      }

      return true;
    } catch (error) {
      this.stats.errors++;
      this.log(`✗ Error converting ${inputPath}: ${error.message}`, 'error');
      return false;
    }
  }

  async convert() {
    console.log('🔍 Convert method called');

    this.log(`🚀 Starting image conversion...`, 'info');
    this.log(`Input directory: ${this.inputDir}`, 'info');
    this.log(`Quality: ${this.quality}%`, 'info');
    this.log(`Formats: ${this.formats.join(', ')}`, 'info');
    this.log(`Skip existing: ${this.skipExisting}`, 'info');
    this.log('', 'info');

    try {
      console.log('🔍 Checking directory existence...');

      // Проверяем существование директории
      if (!fs.existsSync(this.inputDir)) {
        throw new Error(`Directory not found: ${this.inputDir}`);
      }

      console.log('✅ Directory exists, getting files...');

      // Получаем все файлы
      const allFiles = await this.getAllFiles(this.inputDir);
      console.log(`✅ Found ${allFiles.length} total files`);

      const imageFiles = allFiles.filter((file) => this.isImageFile(file));
      console.log(`✅ Found ${imageFiles.length} image files`);

      if (imageFiles.length === 0) {
        this.log('No image files found.', 'warning');
        return;
      }

      this.log(`Found ${imageFiles.length} image files`, 'info');

      console.log('🔍 Processing files...');

      // Фильтруем файлы, которые нужно конвертировать
      const filesToProcess = [];

      for (const imageFile of imageFiles) {
        for (const format of this.formats) {
          const outputPath = this.getOutputPath(imageFile, format);
          const inputExt = path.extname(imageFile).slice(1).toLowerCase();

          // Пропускаем если входной файл уже в целевом формате
          if (inputExt === format.toLowerCase()) {
            this.log(`Skipping ${path.relative(process.cwd(), imageFile)} - already in ${format}`, 'verbose');
            continue;
          }

          // Проверяем существование выходного файла
          if (this.skipExisting && fs.existsSync(outputPath)) {
            this.log(`Skipping ${path.relative(process.cwd(), imageFile)} - ${format} version exists`, 'verbose');
            this.stats.skipped++;
            continue;
          }

          filesToProcess.push({ input: imageFile, format, output: outputPath });
        }
      }

      console.log(`✅ Found ${filesToProcess.length} files to process`);

      if (filesToProcess.length === 0) {
        this.log('🎉 All images are already converted!', 'success');
        this.log('Use --force to reconvert existing files', 'info');
        return;
      }

      this.log(`Will process ${filesToProcess.length} conversions:`, 'info');
      filesToProcess.forEach((file) => {
        const size = this.getFileSizeSync(file.input);
        this.log(
          `  📄 ${path.relative(process.cwd(), file.input)} → ${file.format} (${this.formatBytes(size)})`,
          'info'
        );
      });
      this.log('', 'info');

      console.log('🔍 Starting conversions...');

      // Конвертируем файлы
      for (const file of filesToProcess) {
        console.log(`Converting: ${file.input}`);
        await this.convertImage(file.input, file.format);
      }

      // Выводим статистику
      this.log('', 'info');
      this.log('📊 Conversion complete!', 'success');
      this.log(`✓ Processed: ${this.stats.processed}`, 'success');
      this.log(`⚠ Skipped: ${this.stats.skipped}`, 'warning');
      this.log(`✗ Errors: ${this.stats.errors}`, this.stats.errors > 0 ? 'error' : 'info');

      if (this.stats.totalSaved > 0) {
        this.log(`💾 Total space saved: ${this.formatBytes(this.stats.totalSaved)}`, 'success');
      }
    } catch (error) {
      console.error('❌ Error in convert method:', error);
      this.log(`Fatal error: ${error.message}`, 'error');
      process.exit(1);
    }
  }

  getFileSizeSync(filePath) {
    try {
      const stats = fs.statSync(filePath);
      return stats.size;
    } catch {
      return 0;
    }
  }
}

// CLI интерфейс
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    inputDir: './public/img',
    quality: 80,
    formats: ['webp'],
    skipExisting: true,
    verbose: false,
    deleteOriginals: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--input':
      case '-i':
        options.inputDir = args[++i];
        break;
      case '--quality':
      case '-q':
        options.quality = parseInt(args[++i]);
        break;
      case '--formats':
      case '-f':
        options.formats = args[++i].split(',');
        break;
      case '--force':
        options.skipExisting = false;
        break;
      case '--verbose':
      case '-v':
        options.verbose = true;
        break;
      case '--delete-originals':
        options.deleteOriginals = true;
        break;
      case '--help':
      case '-h':
        console.log(`
Image Converter - Convert images to modern formats

Usage: node convert-images.js [options]

Options:
  -i, --input <dir>        Input directory (default: ./public/img)
  -q, --quality <number>   Quality 1-100 (default: 80)
  -f, --formats <list>     Comma-separated formats (default: webp)
  --force                  Overwrite existing files
  --delete-originals       Delete original files after conversion
  -v, --verbose            Verbose output
  -h, --help               Show this help

Examples:
  node convert-images.js
  node convert-images.js -i ./assets/images -q 85 -f webp,avif
  node convert-images.js --force --verbose
        `);
        process.exit(0);
    }
  }

  return options;
}

// Запускаем если файл вызван напрямую
console.log('🔍 Checking if script is main module...');
console.log('import.meta.url:', import.meta.url);
console.log('process.argv[1]:', process.argv[1]);

// Нормализуем пути для сравнения (особенно важно для Windows)
const currentFile = fileURLToPath(import.meta.url);
const executedFile = process.argv[1];

console.log('Normalized current file:', currentFile);
console.log('Normalized executed file:', executedFile);

if (currentFile === executedFile) {
  console.log('✅ Script is main module, starting conversion...');

  try {
    const options = parseArgs();
    console.log('✅ Arguments parsed:', options);

    const converter = new ImageConverter(options);
    console.log('✅ Converter created');

    await converter.convert();
    console.log('✅ Conversion completed');
  } catch (error) {
    console.error('❌ Error in main execution:', error);
    process.exit(1);
  }
} else {
  console.log('ℹ️ Script imported as module, not executing');
  console.log('Current !== Executed:', currentFile !== executedFile);
}
