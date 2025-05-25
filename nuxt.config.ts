// nuxt.config.ts - Исправленная версия для SPA
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  ssr: false, // SPA mode

  // Экспериментальные функции для производительности
  experimental: {
    payloadExtraction: false, // Отключаем для SPA
    inlineSSRStyles: false, // Не нужно для SPA
    viewTransition: true, // Плавные переходы между страницами
  },

  // Оптимизация модулей
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@pinia/nuxt',
    'nuxt-swiper',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  // Оптимизация иконок
  icon: {
    serverBundle: 'remote',
    clientBundle: {
      scan: true,
      includeCustomCollections: false,
    },
  },

  // Оптимизация шрифтов
  fonts: {
    defaults: {
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin', 'cyrillic'],
    },
    families: [
      {
        name: 'Roboto',
        provider: 'google',
        weights: [400, 700],
        display: 'swap',
        preload: true,
      },
    ],
  },

  // Оптимизация Swiper
  swiper: {
    modules: ['navigation', 'pagination', 'autoplay', 'zoom'],
    bundled: true,
  },

  // Настройка цветов UI
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

  // Pinia оптимизация
  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },

  // Оптимизация сайта
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://gorodook.ru',
    name: 'Городок - Аренда квартир посуточно в Мирном Архангельской области',
    description:
      'Снять квартиру посуточно в городе Мирный Архангельской области. Комфортные 1-2 комнатные квартиры с современным ремонтом для командировочных и туристов.',
    defaultLocale: 'ru',
  },

  // Robots.txt
  robots: {
    UserAgent: '*',
    Allow: '/',
    Disallow: ['/admin/', '/api/', '/_nuxt/', '/_ipx/'],
    Sitemap: (process.env.NUXT_PUBLIC_SITE_URL || 'https://gorodook.ru') + '/sitemap.xml',
  },

  // Sitemap оптимизация
  sitemap: {
    discoverImages: false,
    exclude: ['/admin/**', '/api/**', '/_nuxt/**', '/_ipx/**'],
    defaults: {
      changefreq: 'weekly' as const,
      priority: 0.5,
      lastmod: new Date().toISOString(),
    },
    autoLastmod: false,
    credits: false,
    sitemapName: 'sitemap.xml',
  },

  // Nitro оптимизация для SPA
  nitro: {
    minify: true,
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    prerender: {
      routes: [
        '/',
        '/apartments',
        '/about',
        '/contacts',
        '/privacy',
        '/terms',
        // Все страницы квартир (0-15)
        ...Array.from({ length: 16 }, (_, i) => `/apartments/${i}`),
      ],
      crawlLinks: false,
    },
    routeRules: {
      // Главная страница - агрессивное кэширование
      '/': {
        prerender: true,
        headers: {
          'cache-control': 'public, max-age=3600, s-maxage=31536000', // 1 час браузер, 1 год CDN
          'x-robots-tag': 'index, follow',
        },
      },

      // Статические изображения - долгосрочное кэширование
      '/img/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable', // 1 год
          vary: 'Accept-Encoding',
        },
      },

      // JavaScript и CSS файлы - иммутабельное кэширование
      '/_nuxt/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
        },
      },

      // Страницы квартир - кэш с revalidation
      '/apartments': {
        headers: {
          'cache-control': 'public, max-age=1800, s-maxage=3600', // 30 мин браузер, 1 час CDN
        },
      },

      '/apartments/**': {
        headers: {
          'cache-control': 'public, max-age=1800, s-maxage=3600',
        },
      },

      // Страница "О нас" - умеренное кэширование
      '/about': {
        headers: {
          'cache-control': 'public, max-age=7200, s-maxage=86400', // 2 часа браузер, 1 день CDN
        },
      },

      // Контакты - кэш с быстрым обновлением
      '/contacts': {
        headers: {
          'cache-control': 'public, max-age=3600, s-maxage=7200', // 1 час браузер, 2 часа CDN
        },
      },

      // Шрифты - долгосрочное кэширование
      '/fonts/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
          'cross-origin-resource-policy': 'cross-origin',
        },
      },

      // Фавиконы и иконки
      '/favicon.ico': {
        headers: {
          'cache-control': 'public, max-age=86400', // 1 день
        },
      },

      // Манифест PWA
      '/manifest.json': {
        headers: {
          'cache-control': 'public, max-age=86400',
        },
      },

      // Sitemap и robots
      '/sitemap.xml': {
        headers: {
          'cache-control': 'public, max-age=86400',
        },
      },

      '/robots.txt': {
        headers: {
          'cache-control': 'public, max-age=86400',
        },
      },
    },
  },

  // Vite оптимизация с исправлением
  vite: {
    define: {
      // Исправляем проблему с @nuxt/kit
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
    optimizeDeps: {
      exclude: ['@nuxt/kit'],
      include: ['swiper', 'web-vitals'],
    },
    build: {
      target: 'esnext',
      cssCodeSplit: true,
      rollupOptions: {
        external: ['@nuxt/kit'],
        output: {
          manualChunks: {
            vendor: ['vue', '@vue/runtime-core'],
            swiper: ['swiper'],
            utils: ['lodash-es'],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/css/variables.scss";`,
        },
      },
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'ru',
        dir: 'ltr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        { name: 'format-detection', content: 'telephone=no' },

        // Основная SEO информация
        { name: 'author', content: 'Городок - аренда квартир в Мирном' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },

        // Локальное SEO для Мирного
        { name: 'geo.region', content: 'RU-ARK' },
        { name: 'geo.placename', content: 'Мирный, Архангельская область, Россия' },

        // Производительность
        { name: 'theme-color', content: '#0ea5e9' },
        { name: 'mobile-web-app-capable', content: 'yes' },

        // Верификация поисковых систем
        { name: 'yandex-verification', content: '54a58e117daa0e88' },
        { name: 'google-site-verification', content: '8qZ6fFeBhLWiIgvWMjH2QRxCLkDYQsyH1Q8aU4b-6Zo' },
      ],
      link: [
        // Основной favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

        // PNG версии для лучшего качества
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },

        // Apple Touch Icon для iOS
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },

        // Веб-манифест для PWA
        { rel: 'manifest', href: '/site.webmanifest' },

        // Preconnect для критических ресурсов
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://mc.yandex.ru' },
      ],
      script: [
        // Структурированные данные
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            name: 'Городок',
            description: 'Аренда квартир посуточно в городе Мирный Архангельской области',
            url: 'https://gorodook.ru',
            telephone: '+7-921-479-47-91',
            email: '9214794791@mail.ru',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'ул. Ленина, д.65, офис 20',
              addressLocality: 'Мирный',
              addressRegion: 'Архангельская область',
              postalCode: '164170',
              addressCountry: 'RU',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 62.7676,
              longitude: 40.3348,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '150',
            },
          }),
        },
      ],
    },
  },

  components: ['~/components'],

  typescript: {
    shim: false,
    strict: true,
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://gorodook.ru',
      siteName: 'Городок - Аренда квартир посуточно в Мирном Архангельской области',
      contactPhone: '+79214794791',
      contactEmail: '9214794791@mail.ru',
      yandexMetricaId: '96122697',
    },
  },

  // Исправляем проблему с импортом @nuxt/kit
  build: {
    transpile: ['@nuxt/ui'],
  },
});
