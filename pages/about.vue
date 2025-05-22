<template>
    <div class="about-page">
        <!-- Page Header -->
        <section class="bg-cyan-800 text-white pt-6 pb-16 relative overflow-hidden">
            <div class="absolute inset-0 opacity-30 bg-[url('/img/hero-bg.jpg')] bg-cover bg-center" />
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-cyan-800/50" />

            <div class="container-custom relative z-10">
                <h1 class="text-3xl md:text-4xl font-bold mb-4 text-white fade-in">О нас</h1>
                <p class="text-lg text-gray-200 max-w-3xl fade-in pb-[20px]" style="animation-delay: 0.1s;">
                    Узнайте больше о нашей компании и почему наши клиенты выбирают именно нас.
                </p>
            </div>

            <!-- Wave bottom -->
            <div
                class="absolute bottom-0 left-0 right-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"
                    class="fill-gray-50 w-full h-[50px] mb-[-1px]">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
                </svg>
            </div>
        </section>

        <!-- Main Content -->
        <section class="py-12">
            <div class="container-custom">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Text Content -->
                    <div>
                        <h2 class="text-2xl md:text-3xl font-bold mb-6 text-cyan-800 fade-in">Мы создаем комфорт</h2>
                        <p class="text-gray-700 mb-4 fade-in" style="animation-delay: 0.1s;">
                            Компания "Городок" специализируется на предоставлении в аренду комфортабельных квартир в
                            городе Мирный. Мы начали свою деятельность в 2015 году и за это время заработали репутацию
                            надежного партнера как среди местных жителей, так и среди гостей города.
                        </p>
                        <p class="text-gray-700 mb-4 fade-in" style="animation-delay: 0.2s;">
                            Наша миссия — обеспечить гостей города комфортным временным жильем, которое по уровню
                            удобств не уступает родному дому. Мы тщательно подбираем и обустраиваем каждую квартиру,
                            уделяя внимание каждой детали.
                        </p>
                        <p class="text-gray-700 mb-8 fade-in" style="animation-delay: 0.3s;">
                            Команда "Городка" состоит из профессионалов, которые знают, как сделать ваше пребывание в
                            Мирном максимально комфортным. Мы всегда на связи и готовы помочь с любыми вопросами по
                            проживанию.
                        </p>

                        <!-- Stats -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div class="text-center p-4 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-300 transform fade-up"
                                style="animation-delay: 0.4s;">
                                <div class="text-3xl font-bold text-cyan-600 mb-1">8+</div>
                                <div class="text-sm text-gray-600">лет на рынке</div>
                            </div>
                            <div class="text-center p-4 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-300 transform fade-up"
                                style="animation-delay: 0.5s;">
                                <div class="text-3xl font-bold text-cyan-600 mb-1">15+</div>
                                <div class="text-sm text-gray-600">квартир в управлении</div>
                            </div>
                            <div class="text-center p-4 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-300 transform fade-up"
                                style="animation-delay: 0.6s;">
                                <div class="text-3xl font-bold text-cyan-600 mb-1">1000+</div>
                                <div class="text-sm text-gray-600">довольных клиентов</div>
                            </div>
                            <div class="text-center p-4 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-300 transform fade-up"
                                style="animation-delay: 0.7s;">
                                <div class="text-3xl font-bold text-cyan-600 mb-1">4.9</div>
                                <div class="text-sm text-gray-600">средний рейтинг</div>
                            </div>
                        </div>
                    </div>

                    <!-- Image -->
                    <div class="relative slide-in-right">
                        <div class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg">
                            <img src="/img/about-us.png" alt="About Us"
                                class="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110">
                        </div>

                        <!-- Decoration Elements -->
                        <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-cyan-100 rounded-lg -z-10" />
                        <div class="absolute -top-6 -right-6 w-32 h-32 bg-cyan-100 rounded-lg -z-10" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Our Values -->
        <section class="py-12 bg-gray-50 relative overflow-hidden">
            <div class="container-custom z-10">
                <h2 class="text-2xl md:text-3xl font-bold mb-10 text-center text-cyan-800 fade-down">Наши ценности
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Value 1 -->
                    <div class=" z-20 relative flex flex-col items-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center transform fade-up"
                        style="animation-delay: 0.1s;">
                        <div
                            class=" w-10 h-10 flex items-center justify-center rounded-full bg-cyan-100 mb-4 transition-transform duration-300 hover:scale-110">
                            <Icon name="i-heroicons-heart" class="h-8 w-8 text-cyan-600" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-cyan-700">Комфорт</h3>
                        <p class="text-gray-600">
                            Мы уделяем особое внимание комфорту наших гостей, обеспечивая квартиры всем необходимым для
                            приятного проживания.
                        </p>
                        <div class="absolute -bottom-3 -left-3 w-8 h-8 bg-cyan-100 rounded-lg -z-10 anim"
                            style="--delay: 0s;" />
                    </div>

                    <!-- Value 2 -->
                    <div class="flex flex-col items-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center transform fade-up"
                        style="animation-delay: 0.2s;">
                        <div
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-100 mb-4 transition-transform duration-300 hover:scale-110">
                            <Icon name="i-heroicons-shield-check" class="h-8 w-8 text-cyan-600" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-cyan-700">Надежность</h3>
                        <p class="text-gray-600">
                            Мы ценим доверие наших клиентов и всегда выполняем свои обязательства, обеспечивая надежный
                            сервис.
                        </p>
                        <div class="absolute -bottom-3 -left-3 w-8 h-8 bg-cyan-100 rounded-lg -z-10 anim"
                            style="--delay: 1s;" />
                    </div>

                    <!-- Value 3 -->
                    <div class="flex flex-col items-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center transform fade-up"
                        style="animation-delay: 0.3s;">
                        <div
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-100 mb-4 transition-transform duration-300 hover:scale-110">
                            <Icon name="i-heroicons-star" class="h-8 w-8 text-cyan-600" />
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-cyan-700">Качество</h3>
                        <p class="text-gray-600">
                            Мы постоянно работаем над повышением качества наших услуг, чтобы предоставлять сервис
                            высокого уровня.
                        </p>
                        <div class="absolute -bottom-3 -left-3 w-8 h-8 bg-cyan-100 rounded-lg -z-10 anim"
                            style="--delay: 1.5s;" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <section class="py-12">
            <div class="container-custom">
                <h2 class="text-2xl md:text-3xl font-bold mb-10 text-center text-cyan-800 fade-down">Отзывы наших
                    клиентов</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div v-for="(review, index) in reviews" :key="index"
                        class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform fade-up"
                        :style="{ 'animation-delay': `${0.1 + index * 0.1}s` }">
                        <div class="flex items-center mb-6">
                            <div
                                class="w-10 h-10 flex items-center justify-center bg-cyan-100 text-cyan-600 rounded-full p-3 flex-shrink-0 transition-transform duration-300 hover:scale-110">
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
                        <p class="text-gray-700">{{ review.textReview }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-cyan-600 text-white relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-700 to-cyan-600" />
            <div class="container-custom text-center relative z-10">
                <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white fade-in">Готовы забронировать квартиру?</h2>
                <p class="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/90 fade-in"
                    style="animation-delay: 0.1s;">
                    Вы можете выбрать квартиру из нашего каталога или связаться с нами, и мы поможем подобрать идеальный
                    вариант для вас.
                </p>
                <div class="flex flex-wrap justify-center gap-4 fade-in" style="animation-delay: 0.2s;">
                    <NuxtLink to="/apartments"
                        class="btn bg-accent-500 text-white hover:bg-accent-600 py-3 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform">
                        Смотреть квартиры
                    </NuxtLink>
                    <NuxtLink to="/contacts"
                        class="btn py-3 px-8 text-lg bg-transparent border-2 border-white hover:bg-white hover:text-cyan-900 transition-all duration-300">
                        Связаться с нами
                    </NuxtLink>
                </div>
            </div>

            <!-- Dynamic animated circles -->
            <div class="absolute top-10 left-1/4 w-32 h-32 bg-cyan-400 rounded-full opacity-20 animate-pulse"
                style="animation-duration: 6s;" />
            <div class="absolute bottom-10 right-1/4 w-40 h-40 bg-cyan-400 rounded-full opacity-20 animate-pulse"
                style="animation-duration: 8s;" />
        </section>
    </div>
</template>

<script setup lang="ts">
import { useApartmentStore } from '~/store/apartmentStore'

// Set metadata for this page
useHead({
    title: 'О нас | Городок',
    meta: [
        { name: 'description', content: 'Компания "Городок" предоставляет в аренду комфортабельные квартиры в городе Мирный. Узнайте больше о нашей компании и почему клиенты выбирают именно нас.' }
    ],
})

// Get reviews from the store
const apartmentStore = useApartmentStore()
const { reviews } = storeToRefs(apartmentStore)

// Use IntersectionObserver for scroll animations
onMounted(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .fade-down, .slide-in-right');

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
.fade-down,
.slide-in-right {
    opacity: 0;
    visibility: hidden;
}

.fade-in.visible,
.fade-up.visible,
.fade-down.visible,
.slide-in-right.visible {
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

.slide-in-right {
    transform: translateX(30px);
}

.slide-in-right.visible {
    transform: translateX(0);
}

/* Transition properties */
.fade-in,
.fade-up,
.fade-down,
.slide-in-right {
    transition: opacity 0.8s ease-out, transform 0.8s ease-out, visibility 0.8s ease-out;
}
</style>