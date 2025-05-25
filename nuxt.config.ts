// Обновленный nuxt.config.ts с улучшенным SEO для г.Мирный, Архангельская область
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
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  // Конфигурация сайта для sitemap с улучшенным SEO
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://gorodook.ru',
    name: 'Городок - Аренда квартир посуточно в Мирном Архангельской области',
    description:
      'Снять квартиру посуточно в городе Мирный Архангельской области. Комфортные 1-2 комнатные квартиры с современным ремонтом для командировочных и туристов.',
    defaultLocale: 'ru',
  },

  // Расширенная настройка robots.txt
  robots: {
    UserAgent: '*',
    Allow: '/',
    Disallow: ['/admin/', '/api/', '/_nuxt/', '/_ipx/'],
    Sitemap: (process.env.NUXT_PUBLIC_SITE_URL || 'https://gorodook.ru') + '/sitemap.xml',
    BlankLine: true,
    Comment: 'Аренда квартир в Мирном Архангельской области',
  },

  // Оптимизированная настройка sitemap
  sitemap: {
    discoverImages: false,
    exclude: ['/admin/**', '/api/**', '/_nuxt/**', '/_ipx/**', '/preview/**'],

    defaults: {
      changefreq: 'weekly' as const,
      priority: 0.5,
      lastmod: new Date().toISOString(),
    },

    urls: async () => {
      const routes: Array<{
        loc: string;
        changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
        priority: number;
        lastmod: string;
        alternates?: Array<{ href: string; hreflang: string }>;
      }> = [];

      // Главная страница с максимальным приоритетом
      routes.push({
        loc: '/',
        changefreq: 'daily' as const,
        priority: 1.0,
        lastmod: new Date().toISOString(),
      });

      // Каталог квартир - высокий приоритет
      routes.push({
        loc: '/apartments',
        changefreq: 'daily' as const,
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });

      // Контакты - важная страница для местного SEO
      routes.push({
        loc: '/contacts',
        changefreq: 'weekly' as const,
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });

      // О нас
      routes.push({
        loc: '/about',
        changefreq: 'monthly' as const,
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });

      // Служебные страницы
      routes.push(
        {
          loc: '/privacy',
          changefreq: 'yearly' as const,
          priority: 0.2,
          lastmod: new Date().toISOString(),
        },
        {
          loc: '/terms',
          changefreq: 'yearly' as const,
          priority: 0.2,
          lastmod: new Date().toISOString(),
        }
      );

      // Страницы отдельных квартир
      for (let i = 0; i < 16; i++) {
        routes.push({
          loc: `/apartments/${i}`,
          changefreq: 'weekly' as const,
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      }

      return routes;
    },

    autoLastmod: true,
    credits: false,
  },

  // Prerendering с оптимизацией
  nitro: {
    prerender: {
      routes: [
        '/',
        '/apartments',
        '/about',
        '/contacts',
        '/privacy',
        '/terms',
        '/sitemap.xml',
        '/robots.txt',
        ...Array.from({ length: 16 }, (_, i) => `/apartments/${i}`),
      ],
      crawlLinks: false,
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
        dir: 'ltr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        { name: 'format-detection', content: 'telephone=no' },

        // Основная SEO информация
        { name: 'author', content: 'Городок - аренда квартир в Мирном' },
        { name: 'publisher', content: 'Городок' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'bingbot', content: 'index, follow' },
        { name: 'yandexbot', content: 'index, follow' },

        // Локальное SEO для Мирного
        { name: 'geo.region', content: 'RU-ARK' },
        { name: 'geo.placename', content: 'Мирный, Архангельская область, Россия' },
        { name: 'geo.position', content: '62.7676;40.3348' },
        { name: 'ICBM', content: '62.7676, 40.3348' },
        { name: 'location', content: 'Мирный, Архангельская область' },

        // Бизнес информация
        { name: 'contact', content: '9214794791@mail.ru' },
        { name: 'organization', content: 'Городок' },
        { name: 'locality', content: 'Мирный' },
        { name: 'region', content: 'Архангельская область' },
        { name: 'country', content: 'Россия' },

        // Ключевые слова для лучшего понимания контента
        {
          name: 'keywords',
          content:
            'аренда квартир Мирный, снять квартиру Мирный Архангельская область, квартиры посуточно Мирный, жилье командировочным Мирный, гостиница Мирный, апартаменты Мирный, краткосрочная аренда Мирный',
        },

        // Тематические категории
        { name: 'category', content: 'Недвижимость, Аренда жилья, Туризм' },
        { name: 'coverage', content: 'Мирный, Архангельская область' },
        { name: 'distribution', content: 'Global' },
        { name: 'rating', content: 'General' },

        // Технические мета-теги
        { name: 'theme-color', content: '#0ea5e9' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'msapplication-TileColor', content: '#0ea5e9' },
        { name: 'application-name', content: 'Городок - Аренда квартир Мирный' },
        { name: 'apple-mobile-web-app-title', content: 'Городок Мирный' },

        // Верификация поисковых систем
        { name: 'yandex-verification', content: '54a58e117daa0e88' },
        { name: 'google-site-verification', content: '8qZ6fFeBhLWiIgvWMjH2QRxCLkDYQsyH1Q8aU4b-6Zo' },

        // Open Graph расширенная разметка
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Городок - Аренда квартир в Мирном Архангельской области' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/jpeg' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@gorodok_mirny' },
        { name: 'twitter:creator', content: '@gorodok_mirny' },

        // Дополнительные микроданные
        { name: 'business:contact_data:street_address', content: 'ул. Ленина, д.65, офис 20' },
        { name: 'business:contact_data:locality', content: 'Мирный' },
        { name: 'business:contact_data:region', content: 'Архангельская область' },
        { name: 'business:contact_data:postal_code', content: '164170' },
        { name: 'business:contact_data:country_name', content: 'Россия' },
        { name: 'business:contact_data:phone_number', content: '+7-921-479-47-91' },
        { name: 'business:contact_data:email', content: '9214794791@mail.ru' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },

        // Стили
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css' },

        // Шрифты с оптимизацией
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },

        // DNS предзагрузка для важных сервисов
        { rel: 'dns-prefetch', href: 'https://yandex.ru' },
        { rel: 'dns-prefetch', href: 'https://maps.yandex.ru' },
        { rel: 'dns-prefetch', href: 'https://mc.yandex.ru' },
        { rel: 'dns-prefetch', href: 'https://google.com' },
        { rel: 'dns-prefetch', href: 'https://maps.google.com' },

        // Canonical URL будет добавлен динамически на каждой странице

        // Альтернативные версии (если планируется)
        // { rel: 'alternate', hreflang: 'ru', href: 'https://gorodook.ru' },
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js', defer: true },

        // Расширенные структурированные данные JSON-LD
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            '@id': 'https://gorodook.ru/#organization',
            name: 'Городок',
            alternateName: 'Городок Мирный',
            description:
              'Аренда квартир посуточно в городе Мирный Архангельской области. Комфортабельные 1-2 комнатные квартиры для командировочных и туристов.',
            url: 'https://gorodook.ru',
            telephone: '+7-921-479-47-91',
            email: '9214794791@mail.ru',
            faxNumber: '+7-921-479-47-91',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'ул. Ленина, д.65, офис 20',
              addressLocality: 'Мирный',
              addressRegion: 'Архангельская область',
              postalCode: '164170',
              addressCountry: {
                '@type': 'Country',
                name: 'Россия',
              },
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 62.7676,
              longitude: 40.3348,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '08:00',
              closes: '22:00',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+7-921-479-47-91',
              contactType: 'customer service',
              areaServed: 'RU-ARK',
              availableLanguage: 'Russian',
            },
            sameAs: ['https://t.me/ArendaGorodOK', 'https://vk.com/id226682363', 'https://wa.me/79214794791'],
            areaServed: {
              '@type': 'City',
              name: 'Мирный',
              containedInPlace: {
                '@type': 'AdministrativeArea',
                name: 'Архангельская область',
                containedInPlace: {
                  '@type': 'Country',
                  name: 'Россия',
                },
              },
            },
            serviceType: ['Аренда квартир посуточно', 'Краткосрочная аренда жилья', 'Жилье для командировочных'],
            priceRange: '$$',
            paymentAccepted: ['Cash', 'Credit Card'],
            currenciesAccepted: 'RUB',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '150',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        },

        // Дополнительная схема для локального бизнеса
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://gorodook.ru/#localbusiness',
            name: 'Городок - Аренда квартир в Мирном',
            image: 'https://gorodook.ru/img/about-us.png',
            description:
              'Снять квартиру посуточно в Мирном Архангельской области. Комфортные апартаменты с современным ремонтом.',
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
            telephone: '+7-921-479-47-91',
            url: 'https://gorodook.ru',
            openingHours: 'Mo-Su 08:00-22:00',
            priceRange: '2000-3000 RUB',
            servesCuisine: 'Accommodation',
            acceptsReservations: true,
          }),
        },

        // Яндекс.Метрика
        {
          innerHTML: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(96122697, "init", { 
              clickmap:true, 
              trackLinks:true, 
              accurateTrackBounce:true, 
              webvisor:true,
              ecommerce:"dataLayer"
            });
          `,
          type: 'text/javascript',
        },
      ],
      noscript: [
        {
          innerHTML:
            '<div><img src="https://mc.yandex.ru/watch/96122697" style="position:absolute; left:-9999px;" alt="" /></div>',
        },
      ],
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

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://gorodook.ru',
      siteName: 'Городок - Аренда квартир посуточно в Мирном Архангельской области',
      siteDescription:
        'Снять квартиру посуточно в городе Мирный Архангельской области. Комфортабельные 1-2 комнатные квартиры с современным ремонтом для командировочных, туристов и гостей города.',
      contactPhone: '+79214794791',
      contactPhoneFormatted: '+7 (921) 479-47-91',
      contactEmail: '9214794791@mail.ru',
      contactAddress: 'г. Мирный, ул. Ленина, д.65, офис 20',
      contactAddressFull: 'г. Мирный, Архангельская область, ул. Ленина, д.65, офис 20, 164170',
      region: 'Архангельская область',
      city: 'Мирный',
      businessHours: 'Ежедневно с 8:00 до 22:00',
      serviceArea: 'г. Мирный и окрестности',

      // SEO ключевые фразы для разных страниц
      seoKeywords: {
        main: 'аренда квартир Мирный, снять квартиру Мирный Архангельская область, квартиры посуточно Мирный',
        apartments:
          'каталог квартир Мирный, выбрать квартиру Мирный, 1 комнатная квартира Мирный, 2 комнатная квартира Мирный',
        contacts: 'забронировать квартиру Мирный, контакты аренда Мирный, телефон бронирование Мирный',
        about: 'агентство недвижимости Мирный, услуги аренды Мирный, компания Городок Мирный',
      },
    },
  },
});
