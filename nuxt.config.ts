// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  ssr: false, // SPA mode
  ui: {
    prefix: 'Nuxt',
    global: true,
    icons: ['heroicons', 'mdi'],
    // Set primary color to a soft blue
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
  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@pinia/nuxt',
    'nuxt-swiper',
  ],
  swiper: {
    // Optional module configuration
    enableComposables: true, // Enable the useSwiper composable
    bundled: true, // Bundle Swiper CSS and modules (recommended)
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      // Загружаем стили Swiper глобально
      link: [{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css' }],
      // Загружаем скрипты Swiper глобально (опция для дополнительной надежности)
      script: [{ src: 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js', defer: true }],
    },
  },
  // Auto-import components
  components: ['~/components'],
  // TypeScript settings
  typescript: {
    shim: false,
    strict: true,
  },
  // Vite configuration
  vite: {
    // Настройки для CSS
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/css/variables.scss";`,
        },
      },
    },
  },
});
