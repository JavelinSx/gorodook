// tailwind.config.js
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const nuxtUIConfigPath = join(__dirname, 'node_modules/@nuxt/ui/dist/tailwind.config.cjs');

/** @type {import('tailwindcss').Config} */
export default {
  // Импортируем конфигурацию из @nuxt/ui
  presets: [require(nuxtUIConfigPath)],
  // Дополняем её вашими настройками
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d7fe',
          300: '#a4bdfc',
          400: '#799cf7',
          500: '#5a7ff0',
          600: '#3e63e4',
          700: '#3352cf',
          800: '#2c44a8',
          900: '#293d85',
          950: '#1a2352',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
    },
  },
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    // Важно: укажите путь к компонентам Nuxt UI
    './node_modules/@nuxt/ui/dist/**/*.{mjs,js,vue}',
  ],
};
