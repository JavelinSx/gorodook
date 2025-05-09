<template>
    <div class="home-page">
        <!-- Hero Section -->
        <section class="relative bg-cyan-800 text-white overflow-hidden">
            <div class="absolute inset-0 opacity-40 bg-[url('/img/hero-bg.jpg')] bg-cover bg-center" />
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-cyan-800/50" />
            <div class="container-custom relative z-10 py-20 md:py-28">
                <div class="max-w-2xl">
                    <h1 class="text-4xl md:text-5xl font-bold mb-6 text-white fade-in">
                        Уютные квартиры <span class="text-accent-300">в городе Мирный</span>
                    </h1>
                    <p class="text-lg md:text-xl mb-8 text-gray-100 fade-in" style="animation-delay: 0.2s;">
                        Предлагаем комфортабельные квартиры для аренды на короткий и длительный срок. Чистые, уютные с
                        полной комплектацией всем необходимым для проживания.
                    </p>
                    <div class="flex flex-wrap gap-4 fade-in" style="animation-delay: 0.4s;">
                        <NuxtLink to="/apartments"
                            class="btn bg-accent-500 text-white hover:bg-accent-600 py-3 px-8 text-lg transition-all duration-300 hover:shadow-lg transform hover:translate-y-[-2px]">
                            Смотреть квартиры
                        </NuxtLink>
                        <NuxtLink to="/contacts"
                            class="btn py-3 px-8 text-lg bg-transparent border-2 border-white hover:bg-white hover:text-cyan-900 transition-all duration-300">
                            Связаться с нами
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Wave Separator -->
            <div class="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"
                    class="fill-gray-50 w-full h-[50px]">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
                </svg>
            </div>
        </section>

        <!-- Advantages Section -->
        <section class="py-16 bg-gray-50 relative">
            <div class="container-custom">
                <h2 class="text-center text-3xl md:text-4xl font-bold mb-12 text-cyan-800 fade-down">Почему выбирают
                    нас</h2>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Advantage 1 -->
                    <div class="bg-white p-6 rounded-lg shadow-sm text-center fade-up" style="animation-delay: 0.1s;">
                        <div
                            class="inline-block p-4 rounded-full bg-cyan-100 mb-4 transform transition-transform duration-300 hover:scale-110">
                            <Icon name="i-heroicons-home-modern" class="h-8 w-8 text-cyan-600" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-cyan-800">Удобное расположение</h3>
                        <p class="text-gray-600">
                            Все наши квартиры расположены в центральной части города, в шаговой доступности от
                            магазинов, кафе и общественного транспорта.
                        </p>
                    </div>

                    <!-- Advantage 2 -->
                    <div class="bg-white p-6 rounded-lg shadow-sm text-center fade-up" style="animation-delay: 0.2s;">
                        <div
                            class="inline-block p-4 rounded-full bg-cyan-100 mb-4 transform transition-transform duration-300 hover:scale-110">
                            <Icon name="i-heroicons-star" class="h-8 w-8 text-cyan-600" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-cyan-800">Комфорт и удобство</h3>
                        <p class="text-gray-600">
                            Квартиры полностью укомплектованы всем необходимым для комфортного проживания: мебель,
                            бытовая техника, посуда, постельные принадлежности.
                        </p>
                    </div>

                    <!-- Advantage 3 -->
                    <div class="bg-white p-6 rounded-lg shadow-sm text-center fade-up" style="animation-delay: 0.3s;">
                        <div
                            class="inline-block p-4 rounded-full bg-cyan-100 mb-4 transform transition-transform duration-300 hover:scale-110">
                            <Icon name="i-heroicons-document-text" class="h-8 w-8 text-cyan-600" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-cyan-800">Официальные документы</h3>
                        <p class="text-gray-600">
                            Предоставляем все необходимые документы о проживании для отчетности, что особенно важно для
                            командировочных.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Background Decorations -->
            <div class="absolute top-10 right-10 w-40 h-40 bg-cyan-100 rounded-full opacity-50 blur-3xl" />
            <div class="absolute bottom-10 left-10 w-60 h-60 bg-accent-100 rounded-full opacity-40 blur-3xl" />
        </section>

        <!-- Featured Apartments -->
        <section class="py-16 relative">
            <div class="container-custom">
                <div class="flex flex-col md:flex-row justify-between items-center mb-10">
                    <h2 class="text-3xl md:text-4xl font-bold text-cyan-800 fade-in">Наши квартиры</h2>
                    <NuxtLink to="/apartments"
                        class="mt-4 md:mt-0 btn btn-cyan transition-all duration-300 hover:shadow-md transform hover:translate-y-[-2px] fade-in">
                        Смотреть все
                    </NuxtLink>
                </div>

                <div v-if="isLoading" class="text-center py-10">
                    <Icon name="i-heroicons-arrow-path" class="h-10 w-10 mx-auto animate-spin text-cyan-500" />
                    <p class="mt-4 text-lg text-gray-600">Загрузка квартир...</p>
                </div>

                <div v-else-if="error" class="text-center py-10">
                    <Icon name="i-heroicons-exclamation-triangle" class="h-10 w-10 mx-auto text-red-500" />
                    <p class="mt-4 text-lg text-red-600">{{ error }}</p>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ApartmentCard v-for="(apartment, index) in featuredApartments" :key="apartment.id"
                        :apartment="apartment" :index="index" animation="fade-up" />
                </div>
            </div>

            <!-- Background pattern
            <div class="absolute inset-0 opacity-5" /> -->
        </section>

        <!-- Testimonials -->
        <section class="py-16 bg-gray-50 relative overflow-hidden">
            <div class="container-custom">
                <h2 class="text-center text-3xl md:text-4xl font-bold mb-12 text-cyan-800 fade-down">Отзывы наших
                    клиентов</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="(review, index) in reviews" :key="index"
                        class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 fade-up"
                        :style="{ 'animation-delay': `${0.1 + index * 0.1}s` }">
                        <div class="flex items-center mb-4">
                            <div
                                class="bg-cyan-100 text-cyan-600 rounded-full p-3 flex-shrink-0 transform transition-transform duration-300 hover:scale-110">
                                <Icon name="i-heroicons-user-circle" class="h-8 w-8" />
                            </div>
                            <div class="ml-4">
                                <h4 class="font-bold text-lg text-cyan-700">{{ review.name }}</h4>
                                <p class="text-gray-500">{{ review.age }} лет</p>
                            </div>
                            <div class="ml-auto flex">
                                <Icon v-for="star in 5" :key="star" name="i-heroicons-star"
                                    class="h-4 w-4 text-yellow-400" />
                            </div>
                        </div>
                        <p class="text-gray-700">{{ review.textReview }}</p>
                    </div>
                </div>
            </div>

            <!-- Wave Background at top -->
            <div class="absolute top-0 left-0 right-0 transform rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"
                    class="fill-white w-full h-[50px]">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
                </svg>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-700 to-cyan-800" />
            <div class="absolute inset-x-0 top-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"
                    class="fill-gray-50 w-full h-[50px]">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
                </svg>
            </div>

            <div class="container-custom text-center relative z-10">
                <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white fade-in">Нужна квартира в Мирном?</h2>
                <p class="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/90 fade-in"
                    style="animation-delay: 0.1s;">
                    Свяжитесь с нами прямо сейчас, и мы поможем подобрать для вас идеальный вариант!
                </p>
                <NuxtLink to="/contacts"
                    class="btn bg-accent-500 text-white hover:bg-accent-600 py-3 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 fade-in"
                    style="animation-delay: 0.2s;">
                    Связаться с нами
                </NuxtLink>
            </div>

            <!-- Dynamic animated circles -->
            <div class="absolute top-10 left-1/4 w-32 h-32 bg-cyan-400 rounded-full opacity-20 animate-pulse"
                style="animation-duration: 6s;" />
            <div class="absolute bottom-10 right-1/4 w-40 h-40 bg-accent-400 rounded-full opacity-20 animate-pulse"
                style="animation-duration: 8s;" />
        </section>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from '#imports'
import { useApartmentStore } from '~/store/apartmentStore'

// Set metadata for this page
useHead({
    title: 'Городок | Аренда квартир в Мирном',
    meta: [
        { name: 'description', content: 'Аренда комфортабельных квартир в городе Мирный. Чистые уютные квартиры со всем необходимым для проживания.' }
    ],
})

// Get store data
const apartmentStore = useApartmentStore()
const { apartments, reviews, isLoading, error } = storeToRefs(apartmentStore)

// Get 3 featured apartments
const featuredApartments = computed(() => {
    // Get a mix of 1-room and 2-room apartments, limited to 3
    return apartments.value.slice(0, 3)
})

// Use IntersectionObserver for scroll animations
onMounted(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .fade-down');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    }
})
</script>

<style scoped>
/* Add visible class to control animations */
.fade-in,
.fade-up,
.fade-down {
    opacity: 0;
    visibility: hidden;
}

.fade-in.visible,
.fade-up.visible,
.fade-down.visible {
    opacity: 1;
    visibility: visible;
}

.fade-up {
    transform: translateY(20px);
}

.fade-up.visible {
    transform: translateY(0);
}

.fade-down {
    transform: translateY(-20px);
}

.fade-down.visible {
    transform: translateY(0);
}

/* Transition properties */
.fade-in,
.fade-up,
.fade-down {
    transition: opacity 0.8s ease-out, transform 0.8s ease-out, visibility 0.8s ease-out;
}
</style>