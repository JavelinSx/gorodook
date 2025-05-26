<template>
    <section class="relative bg-cyan-800 text-white pt-20 pb-32 overflow-hidden">
        <!-- Оптимизированное фоновое изображение -->
        <OptimizedImage src="/img/bg-home.webp" alt="Фон главной страницы" :priority="true" loading="eager"
            :use-web-p="true"
            class="absolute top-2/5 right-[-50px] md:top-0 md:right-[-50px] md:top-3/5 md:w-4/5 lg:right-[-100px] lg:top-[245px] lg:w-3/5 2xl:w-1/2 2xl:top-[225px] object-cover"
            :style="{
                aspectRatio: '16/9',
                willChange: 'transform',
                backfaceVisibility: 'hidden'
            }" />

        <div class="container-custom relative z-10">
            <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight fade-in">
                    Снять квартиру в Мирном<br>
                    <span class="text-cyan-200">посуточно без посредников</span>
                </h1>
                <p class="text-xl md:text-2xl mb-8 text-gray-100 fade-in" style="animation-delay: 0.2s;">
                    Квартиры посуточно в Мирном Архангельской области недорого.
                    Однокомнатные и двухкомнатные квартиры на сутки в центре города.
                </p>
                <div class="flex flex-wrap justify-center gap-4 fade-in" style="animation-delay: 0.4s;">
                    <NuxtLink to="/apartments"
                        class="btn bg-accent-500 text-white hover:bg-accent-600 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        Снять квартиру
                    </NuxtLink>
                    <a href="tel:+79214794791"
                        class="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-cyan-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                        Позвонить сейчас
                    </a>
                </div>

                <!-- Дополнительная SEO информация -->
                <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 fade-up" style="animation-delay: 0.6s;">
                    <div class="bg-cyan-700/70  rounded-lg p-4">
                        <h3 class="font-bold text-lg mb-2">От 2500₽ за сутки</h3>
                        <p class="text-gray-100 text-sm">Квартиры посуточно недорого без посредников</p>
                    </div>
                    <div class="bg-cyan-700/70  backdrop-blur-sm rounded-lg p-4">
                        <h3 class="font-bold text-lg mb-2">Центр Мирного</h3>
                        <p class="text-gray-100 text-sm">Жилье рядом с магазинами и остановками</p>
                    </div>
                    <div class="bg-cyan-700/70  backdrop-blur-sm rounded-lg p-4">
                        <h3 class="font-bold text-lg mb-2">Все включено</h3>
                        <p class="text-gray-100 text-sm">Wi-Fi, техника, постельное белье</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Wave bottom -->
        <div class="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"
                class="fill-white w-full h-[80px] mb-[-1px]">
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
            </svg>
        </div>
    </section>
</template>

<script setup lang="ts">
import OptimizedImage from '../ui/OptimizedImage.vue'
// Preload критических ресурсов
useSeoMeta({
    title: 'Аренда квартир посуточно в Мирном | Городок',
    description: 'Комфортабельные 1-2 комнатные квартиры в центре Мирного, Архангельская область. Идеально для командировочных и туристов. От 2500₽ за сутки.',
})

// Preload критических изображений только если они существуют
useHead(() => {
    if (!import.meta.client) return {}

    // Проверяем поддержку WebP
    const canvas = document.createElement('canvas')
    const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0

    const links: Array<{
        rel: 'preload'
        href: string
        as: 'image'
        type?: string
        fetchpriority: 'high' | 'low'
    }> = []

    if (webpSupported) {
        links.push({
            rel: 'preload',
            href: '/img/bg-home.webp',
            as: 'image',
            type: 'image/webp',
            fetchpriority: 'high'
        })
    } else {
        links.push({
            rel: 'preload',
            href: '/img/bg-home.png',
            as: 'image',
            fetchpriority: 'high'
        })
    }

    return { link: links }
})

// Hero section component - главная секция с заголовком и CTA
onMounted(() => {
    // Принудительная оптимизация рендеринга
    if (import.meta.client) {
        requestAnimationFrame(() => {
            // Добавляем contain для оптимизации layout
            const heroSection = document.querySelector('section')
            if (heroSection) {
                heroSection.style.contain = 'layout style paint'
            }
        })
    }
})
</script>

<style scoped>
/* Оптимизация производительности */
section {
    will-change: auto;
    contain: layout style paint;
}

/* Оптимизированные анимации */
.fade-in,
.fade-up {
    opacity: 0;
    visibility: hidden;
    transform: translateY(0);
    animation: fadeInOptimized 0.6s ease-out forwards;
}

.fade-up {
    transform: translateY(20px);
    animation: fadeUpOptimized 0.8s ease-out forwards;
}

@keyframes fadeInOptimized {
    to {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
}

@keyframes fadeUpOptimized {
    to {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
}

/* Респект к предпочтениям пользователя */
@media (prefers-reduced-motion: reduce) {

    .fade-in,
    .fade-up {
        animation: none;
        opacity: 1;
        visibility: visible;
        transform: none;
    }
}

/* Оптимизация для больших экранов */
@media (min-width: 1920px) {
    .container-custom {
        contain: layout;
    }
}
</style>