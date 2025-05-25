// plugins/performance.client.ts
export default defineNuxtPlugin(() => {
  if (!import.meta.client) return;

  const { initWebVitals, trackResourceTiming } = useWebVitals();

  // 1. Умный preload критических ресурсов
  const preloadCriticalResources = () => {
    // Проверяем поддержку форматов
    const canvas = document.createElement('canvas');
    const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

    const criticalResources: Array<{
      href: string;
      as: string;
      type?: string;
      priority: string;
    }> = [];

    // Добавляем изображения в зависимости от поддержки
    if (webpSupported) {
      criticalResources.push({
        href: '/img/bg-home.webp',
        as: 'image',
        type: 'image/webp',
        priority: 'high',
      });
    } else {
      criticalResources.push({
        href: '/img/bg-home.png',
        as: 'image',
        type: 'image/png',
        priority: 'high',
      });
    }

    criticalResources.forEach((resource) => {
      // Проверяем, не preload ли уже
      const existing = document.querySelector(`link[href="${resource.href}"][rel="preload"]`);
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.setAttribute('as', resource.as);
        if (resource.type) link.type = resource.type;
        link.setAttribute('fetchpriority', resource.priority);

        // Удаляем preload после использования
        link.onload = () => {
          setTimeout(() => {
            if (link.parentNode) {
              link.remove();
            }
          }, 2000);
        };

        link.onerror = () => {
          if (link.parentNode) {
            link.remove();
          }
        };

        document.head.appendChild(link);
      }
    });
  };

  // 2. Отложенная загрузка Yandex Metrica
  const loadYandexMetrica = () => {
    if (import.meta.env.MODE !== 'production') return;

    // Загружаем только после взаимодействия пользователя или через 3 секунды
    const loadMetrica = () => {
      if (!(window as any).ym) {
        const script = document.createElement('script');
        script.innerHTML = `
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(96122697, "init", { 
            clickmap:true, 
            trackLinks:true, 
            accurateTrackBounce:true, 
            webvisor:true
          });
        `;
        document.head.appendChild(script);
      }
    };

    // Загружаем при первом взаимодействии
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    const loadOnce = () => {
      loadMetrica();
      events.forEach((event) => {
        document.removeEventListener(event, loadOnce);
      });
    };

    events.forEach((event) => {
      document.addEventListener(event, loadOnce, { passive: true });
    });

    // Или через 3 секунды если нет взаимодействия
    setTimeout(loadMetrica, 3000);
  };

  // 3. Оптимизация рендеринга
  const optimizeRendering = () => {
    // Intersection Observer для ленивого рендеринга
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.style.willChange = 'auto'; // Убираем will-change после появления
              observer.unobserve(target);
            }
          });
        },
        { threshold: 0.1 }
      );

      // Наблюдаем за анимированными элементами
      document.querySelectorAll('.fade-in, .fade-up, .fade-down').forEach((el) => {
        observer.observe(el);
      });
    };

    // Оптимизируем скролл с throttling
    let ticking = false;
    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizeScroll, { passive: true });

    // Отложенная инициализация наблюдателей
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeElements);
    } else {
      observeElements();
    }
  };

  // 4. Проверка поддержки современных форматов
  const checkImageSupport = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    // Проверяем поддержку WebP
    const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    document.documentElement.classList.toggle('webp', webpSupported);

    return { webpSupported };
  };

  // 5. Adaptive Loading на основе connection
  const adaptiveLoading = () => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const slowConnection =
        connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g' || connection?.saveData;

      if (slowConnection) {
        document.documentElement.classList.add('slow-connection');

        // Отключаем некритические анимации для медленного соединения
        const style = document.createElement('style');
        style.textContent = `
          .slow-connection .fade-in,
          .slow-connection .fade-up,
          .slow-connection .fade-down {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .slow-connection [loading="lazy"] {
            loading: eager;
          }
        `;
        document.head.appendChild(style);
      }
    }
  };

  // 6. Очистка неиспользуемых preload
  const cleanupPreloads = () => {
    setTimeout(() => {
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href) {
          // Проверяем, используется ли ресурс
          const isUsed = document.querySelector(`img[src="${href}"], img[srcset*="${href}"]`);
          if (!isUsed) {
            console.log('Removing unused preload:', href);
            link.remove();
          }
        }
      });
    }, 5000); // Через 5 секунд после загрузки
  };

  // Запускаем оптимизации в правильном порядке
  checkImageSupport();
  adaptiveLoading();

  // После загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      optimizeRendering();
    });
  } else {
    preloadCriticalResources();
    optimizeRendering();
  }

  // После полной загрузки страницы
  window.addEventListener('load', () => {
    loadYandexMetrica();
    initWebVitals();
    trackResourceTiming();
    cleanupPreloads();
  });

  return {
    provide: {
      imageSupport: checkImageSupport(),
    },
  };
});
