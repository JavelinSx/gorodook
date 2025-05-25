<template>
    <section class="py-16 bg-gray-50">
        <div class="container-custom">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-800 fade-down">
                Отзывы гостей о проживании в Мирном
            </h2>
            <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto fade-down" style="animation-delay: 0.1s;">
                Более 1000 довольных клиентов выбрали наши квартиры для проживания в Мирном.
                Средняя оценка 4.9 из 5 звезд.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div v-for="(review, index) in displayedReviews" :key="index"
                    class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform fade-up"
                    :style="{ 'animation-delay': `${0.1 + index * 0.1}s` }">
                    <div class="flex items-center mb-4">
                        <div
                            class="w-12 h-12 flex items-center justify-center bg-cyan-100 text-cyan-600 rounded-full flex-shrink-0">
                            <Icon name="i-heroicons-user-circle" class="h-8 w-8" />
                        </div>
                        <div class="ml-4">
                            <h4 class="font-bold text-lg text-cyan-700">{{ review.name }}</h4>
                            <p class="text-gray-500">{{ review.age }} лет</p>
                        </div>
                        <div class="ml-auto flex">
                            <Icon v-for="star in 5" :key="star" name="i-heroicons-star"
                                class="h-5 w-5 text-yellow-400" />
                        </div>
                    </div>
                    <p class="text-gray-700">"{{ review.textReview }}"</p>
                </div>
            </div>

            <div class="text-center mt-10 fade-up" style="animation-delay: 0.6s;">
                <NuxtLink to="/about"
                    class="btn bg-transparent border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white px-6 py-3 rounded-lg transition-all duration-300">
                    Читать все отзывы
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { CardReview } from '~/utils/utils'

interface Props {
    reviews: CardReview[]
    maxReviews?: number
}

const props = withDefaults(defineProps<Props>(), {
    maxReviews: 4
})

// Показываем только указанное количество отзывов
const displayedReviews = computed(() => {
    return props.reviews.slice(0, props.maxReviews)
})
</script>