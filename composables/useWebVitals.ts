// composables/useWebVitals.ts
export const useWebVitals = () => {
  const { $config } = useNuxtApp();

  const initWebVitals = async () => {
    if (!import.meta.client) return;

    try {
      // Динамический импорт web-vitals только когда нужно
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

      const sendToAnalytics = (metric: any) => {
        // Логируем для разработки
        if (import.meta.dev) {
          console.log(`📊 ${metric.name}:`, metric.value, 'ms');
        }

        // Отправляем в Yandex Metrica в продакшене
        if (import.meta.env.MODE === 'production' && (window as any).ym) {
          (window as any).ym($config.public.yandexMetricaId, 'reachGoal', 'web_vital', {
            metric: metric.name,
            value: Math.round(metric.value),
            rating: metric.rating || 'unknown',
          });
        }

        // Можно добавить отправку в другие системы аналитики
        // sendToGTM(metric)
        // sendToCustomAnalytics(metric)
      };

      // Инициализируем мониторинг Web Vitals
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);

      console.log('🚀 Web Vitals monitoring initialized');
    } catch (error) {
      console.warn('⚠️ Web Vitals library not available:', error);
    }
  };

  const trackCustomMetric = (name: string, value: number, unit: string = 'ms') => {
    if (import.meta.dev) {
      console.log(`📈 Custom metric - ${name}:`, value, unit);
    }

    if (import.meta.env.MODE === 'production' && (window as any).ym) {
      (window as any).ym($config.public.yandexMetricaId, 'reachGoal', 'custom_metric', {
        metric: name,
        value: Math.round(value),
        unit,
      });
    }
  };

  const trackResourceTiming = () => {
    if (!import.meta.client) return;

    // Отслеживаем загрузку критических ресурсов
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      // Анализируем время загрузки критических изображений
      const criticalImages = resources.filter(
        (resource) => resource.name.includes('bg-home') || resource.name.includes('hero')
      );

      criticalImages.forEach((img) => {
        const filename = img.name.split('/').pop() || 'unknown';
        trackCustomMetric(`image_load_${filename}`, img.loadEventEnd - img.startTime);
      });

      // Анализируем время загрузки шрифтов
      const fonts = resources.filter((resource) => resource.name.includes('font'));
      fonts.forEach((font) => {
        const filename = font.name.split('/').pop() || 'unknown';
        trackCustomMetric(`font_load_${filename}`, font.loadEventEnd - font.startTime);
      });

      // DOM Content Loaded
      trackCustomMetric('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.startTime);
    });
  };

  return {
    initWebVitals,
    trackCustomMetric,
    trackResourceTiming,
  };
};
