<template>
    <section class="py-16 bg-white">
        <div class="container-custom">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-800 fade-down">
                Почему выбирают наши квартиры в Мирном?
            </h2>
            <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto fade-down" style="animation-delay: 0.1s;">
                Мы предлагаем лучшие условия проживания в Мирном Архангельской области для командировочных,
                туристов и всех, кому нужно комфортное жилье на короткий срок.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div v-for="(advantage, index) in advantages" :key="index" class="text-center group fade-up"
                    :style="{ 'animation-delay': `${0.1 + index * 0.1}s` }">
                    <div
                        class="w-20 h-20 mx-auto mb-4 bg-cyan-100 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Icon :name="advantage.icon" class="h-8! w-8! text-cyan-600" />
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-cyan-700">{{ advantage.title }}</h3>
                    <p class="text-gray-600">{{ advantage.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// Преимущества наших квартир
const advantages = [
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
        description: 'Заселение с 14:00, встреча гостей, помощь с размещением и оформлением документов.'
    }
]
</script>