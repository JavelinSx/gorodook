<template>
    <section class="py-16 bg-white">
        <div class="container-custom">
            <!-- Заголовок секции -->
            <div class="text-center mb-12">
                <AnimatedSection animation="fade-down" tag="h2"
                    class="text-3xl md:text-4xl font-bold mb-4 text-cyan-800">
                    {{ title }}
                </AnimatedSection>
                <AnimatedSection animation="fade-down" :delay="0.1" tag="p"
                    class="text-center text-gray-600 max-w-3xl mx-auto">
                    {{ description }}
                </AnimatedSection>
            </div>

            <!-- Grid преимуществ -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <ValueCard v-for="(advantage, index) in advantages" :key="index" :icon="advantage.icon"
                    :title="advantage.title" :description="advantage.description" size="md" variant="advantage"
                    animation="fade-up" :delay="0.1 + index * 0.1" :decoration-delay="index * 0.3" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import AnimatedSection from '~/components/core/AnimatedSection.vue'
import ValueCard from '~/components/ui/ValueCard.vue'

interface Advantage {
    icon: string
    title: string
    description: string
}

interface Props {
    title?: string
    description?: string
    advantages?: Advantage[]
}

withDefaults(defineProps<Props>(), {
    title: 'Почему выбирают наши квартиры в Мирном?',
    description: 'Мы предлагаем лучшие условия проживания в Мирном Архангельской области для командировочных, туристов и всех, кому нужно комфортное жилье на короткий срок.',
    advantages: () => [
        {
            icon: 'i-heroicons-map-pin',
            title: 'Центр Мирного',
            description: 'Все квартиры расположены в центральной части города рядом с магазинами, остановками и основными объектами.'
        },
        {
            icon: 'i-heroicons-home-modern',
            title: 'Современный ремонт',
            description: 'Свежий ремонт, качественная мебель и ортопедические матрасы для максимального комфорта проживания.'
        },
        {
            icon: 'i-heroicons-wifi',
            title: 'Все включено',
            description: 'Wi-Fi, бытовая техника, посуда, постельное белье, полотенца - все необходимое для проживания.'
        },
        {
            icon: 'i-heroicons-clock',
            title: 'Быстрое заселение',
            description: 'Заселение в удобное для вас время, встреча гостей, помощь с размещением и оформлением документов.'
        }
    ]
})
</script>