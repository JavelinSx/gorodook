<template>
    <div class="overflow-hidden">
        <!-- Hero Section -->
        <HeroSection />

        <!-- Ключевые преимущества -->
        <AdvantagesSection />

        <!-- Популярные квартиры -->
        <FeaturedApartmentsSection :apartments="featuredApartments" :is-loading="isLoading" />

        <!-- Информация о городе Мирный -->
        <CityInfoSection />

        <!-- Отзывы клиентов -->
        <ReviewsSection :reviews="reviews" :max-reviews="4" />

        <!-- Контакты и бронирование (новый универсальный CTA) -->
        <CTASection variant="home" :contact-methods="contactMethods" show-decorations />
    </div>
</template>

<script setup lang="ts">
import { useApartmentStore } from '~/store/apartmentStore'
import { contactData } from '~/config/contact'

// Components (обновленные импорты)
import HeroSection from '~/components/sections/HeroSection.vue'
import AdvantagesSection from '~/components/sections/AdvantagesSection.vue'
import FeaturedApartmentsSection from '~/components/sections/FeaturedApartmentsSection.vue'
import CityInfoSection from '~/components/sections/CityInfoSection.vue'
import ReviewsSection from '~/components/sections/ReviewsSection.vue'
import CTASection from '~/components/sections/CTASection.vue'

// SEO метаданные с акцентом на Мирный Архангельской области
useHead({
    title: 'Аренда квартир посуточно в Мирном Архангельской области | Городок',
    meta: [
        {
            name: 'description',
            content: 'Снять квартиру посуточно в Мирном Архангельской области. Комфортабельные 1-2 комнатные квартиры в центре города от 2500₽/сутки. Для командировочных и туристов. Встреча, заселение, документы. Телефон: +7(921)479-47-91'
        },
        {
            name: 'keywords',
            content: 'аренда квартир Мирный, снять квартиру Мирный Архангельская область, квартиры посуточно Мирный, жилье командировочным Мирный, апартаменты Мирный, гостиница Мирный, краткосрочная аренда Мирный, центр Мирного'
        },

        // Open Graph
        { property: 'og:title', content: 'Аренда квартир посуточно в Мирном Архангельской области | Городок' },
        { property: 'og:description', content: 'Снять квартиру посуточно в Мирном. Комфортабельные квартиры в центре города от 2500₽/сутки. Для командировочных и туристов.' },
        { property: 'og:image', content: 'https://gorodook.ru/img/about-us.png' },
        { property: 'og:url', content: 'https://gorodook.ru/' },

        // Twitter
        { name: 'twitter:title', content: 'Аренда квартир посуточно в Мирном Архангельской области' },
        { name: 'twitter:description', content: 'Снять квартиру посуточно в Мирном. Комфортабельные квартиры в центре города от 2500₽/сутки.' },
        { name: 'twitter:image', content: 'https://gorodook.ru/img/about-us.png' },

        // Дополнительные локальные SEO теги
        { name: 'geo.region', content: 'RU-ARK' },
        { name: 'geo.placename', content: 'Мирный, Архангельская область' },
        { name: 'business:contact_data:locality', content: 'Мирный' },
        { name: 'business:contact_data:region', content: 'Архангельская область' },
    ],
    link: [
        { rel: 'canonical', href: 'https://gorodook.ru/' }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                '@id': 'https://gorodook.ru/#webpage',
                url: 'https://gorodook.ru/',
                name: 'Аренда квартир посуточно в Мирном Архангельской области',
                description: 'Снять квартиру посуточно в городе Мирный Архангельской области. Комфортабельные квартиры для командировочных и туристов.',
                about: {
                    '@type': 'RealEstateAgent',
                    name: 'Городок',
                    address: {
                        '@type': 'PostalAddress',
                        addressLocality: 'Мирный',
                        addressRegion: 'Архангельская область',
                        addressCountry: 'RU'
                    }
                },
                mainEntity: {
                    '@type': 'Service',
                    name: 'Аренда квартир посуточно в Мирном',
                    provider: {
                        '@type': 'Organization',
                        name: 'Городок'
                    },
                    areaServed: {
                        '@type': 'City',
                        name: 'Мирный',
                        containedInPlace: {
                            '@type': 'AdministrativeArea',
                            name: 'Архангельская область'
                        }
                    },
                    offers: {
                        '@type': 'Offer',
                        priceRange: 'от 2500 RUB',
                        priceCurrency: 'RUB'
                    }
                }
            })
        }
    ]
})

// Получаем данные из store
const apartmentStore = useApartmentStore()
const { apartments, isLoading, reviews } = storeToRefs(apartmentStore)

// Популярные квартиры (первые 3)
const featuredApartments = computed(() => {
    return apartments.value.slice(0, 3)
})

// Контактные методы для CTA секции
const contactMethods = [
    {
        icon: 'i-heroicons-phone',
        title: 'Позвоните нам',
        text: contactData.phone,
        link: `tel:${contactData.phone.replace(/\s|\(|\)|-/g, '')}`,
        external: false
    },
    {
        icon: 'i-mdi-telegram',
        title: 'Напишите в Telegram',
        text: '@ArendaGorodOK',
        link: contactData.social.telegram,
        external: true
    },
    {
        icon: 'i-mdi-whatsapp',
        title: 'WhatsApp',
        text: 'Написать сообщение',
        link: contactData.social.whatsapp,
        external: true
    }
]

// Анимации при прокрутке
const { initializeScrollAnimations } = useScrollAnimations()

onMounted(() => {
    const cleanup = initializeScrollAnimations()

    // Cleanup при размонтировании компонента
    onBeforeUnmount(() => {
        cleanup()
    })
})
</script>

<style scoped>
/* Анимации теперь вынесены в scroll-animations.css */
/* Оставляем только специфичные стили для главной страницы, если нужны */
</style>