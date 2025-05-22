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
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  // Site configuration for SEO
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://gorodook.ru',
    name: 'Городок - Аренда квартир в Мирном',
    description:
      'Аренда квартир посуточно в городе Мирный, Архангельская область. Комфортабельные квартиры с полным обустройством. Документы о проживании.',
    defaultLocale: 'ru',
  },

  // Robots configuration
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: (process.env.NUXT_PUBLIC_SITE_URL || 'https://gorodook.ru') + '/sitemap.xml',
  },

  // Sitemap configuration with dynamic routes
  sitemap: {
    hostname: process.env.NUXT_PUBLIC_SITE_URL || 'https://gorodook.ru',
    gzip: true,
    routes: async () => {
      // Static routes
      const staticRoutes = [
        { url: '/', changefreq: 'weekly', priority: 1.0 },
        { url: '/apartments', changefreq: 'daily', priority: 0.9 },
        { url: '/about', changefreq: 'monthly', priority: 0.7 },
        { url: '/contacts', changefreq: 'monthly', priority: 0.8 },
        { url: '/privacy', changefreq: 'yearly', priority: 0.3 },
        { url: '/terms', changefreq: 'yearly', priority: 0.3 },
      ];

      // Dynamic apartment routes
      const apartmentRoutes = Array.from({ length: 16 }, (_, i) => ({
        url: `/apartments/${i}`,
        changefreq: 'weekly',
        priority: 0.8,
      }));

      return [...staticRoutes, ...apartmentRoutes];
    },
  },

  // Prerendering for better SEO
  nitro: {
    prerender: {
      routes: [
        '/',
        '/apartments',
        '/about',
        '/contacts',
        '/privacy',
        '/terms',
        ...Array.from({ length: 16 }, (_, i) => `/apartments/${i}`),
      ],
      crawlLinks: true,
    },
  },

  swiper: {
    enableComposables: true,
    bundled: true,
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

        // SEO Meta Tags
        { name: 'author', content: 'Городок - Аренда квартир в Мирном' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'theme-color', content: '#0ea5e9' },

        // Regional SEO
        { name: 'geo.region', content: 'RU-ARK' },
        { name: 'geo.placename', content: 'Мирный, Архангельская область' },
        { name: 'geo.position', content: '62.7676;40.3348' },
        { name: 'ICBM', content: '62.7676, 40.3348' },

        // Business Information
        { name: 'contact', content: '9214794791@mail.ru' },
        { name: 'organization', content: 'Городок' },

        // Yandex and Google verification
        { name: 'yandex-verification', content: process.env.YANDEX_VERIFICATION || '' },
        { name: 'google-site-verification', content: process.env.GOOGLE_VERIFICATION || '' },

        // Additional SEO
        { name: 'application-name', content: 'Городок' },
        { name: 'apple-mobile-web-app-title', content: 'Городок' },
        { name: 'msapplication-TileColor', content: '#0ea5e9' },
      ],

      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'canonical', href: process.env.NUXT_PUBLIC_SITE_URL || 'https://gorodook.ru' },

        // Swiper CSS
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css' },

        // Preconnect to external domains
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://yandex.ru' },
        { rel: 'dns-prefetch', href: 'https://maps.yandex.ru' },
      ],

      script: [{ src: 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js', defer: true }],
    },
  },

  components: ['~/components'],

  typescript: {
    shim: false,
    strict: true,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/css/variables.scss";`,
        },
      },
    },
  },

  // Image optimization for better performance
  image: {
    quality: 80,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://gorodook.ru',
      siteName: 'Городок - Аренда квартир в Мирном',
      siteDescription:
        'Аренда квартир посуточно в городе Мирный, Архангельская область. Комфортабельные квартиры с полным обустройством.',
      contactPhone: '+79214794791',
      contactEmail: '9214794791@mail.ru',
      contactAddress: 'г. Мирный, ул. Ленина, д.65, офис 20',
      region: 'Архангельская область',
    },
  },
});
