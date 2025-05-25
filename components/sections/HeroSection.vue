<template>
    <section class="relative bg-cyan-800 text-white pt-20 pb-32 overflow-hidden">
        <img src="/img/bg-home.png"
            class="absolute top-1/5 right-[-50px] md:top-0 md:right-[-50px] md:inset-y-1/3 md:w-3/4 md:right-0 lg:top-0 lg:w-3/5 2xl:w-1/2 2xl:top-0">

        <div class="container-custom relative z-10">
            <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight fade-in">
                    Аренда квартир посуточно<br>
                    <span class="text-cyan-200">в Мирном</span>
                </h1>
                <p class="text-xl md:text-2xl mb-8 text-cyan-100 fade-in" style="animation-delay: 0.2s;">
                    Комфортабельные 1-2 комнатные квартиры в центре города Мирный, Архангельская область.
                    Идеально для командировочных, туристов и гостей города.
                </p>
                <div class="flex flex-wrap justify-center gap-4 fade-in" style="animation-delay: 0.4s;">
                    <NuxtLink to="/apartments"
                        class="btn bg-accent-500 text-white hover:bg-accent-600 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        Выбрать квартиру
                    </NuxtLink>
                    <a href="tel:+79214794791"
                        class="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-cyan-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                        Позвонить сейчас
                    </a>
                </div>

                <!-- Дополнительная SEO информация -->
                <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 fade-up" style="animation-delay: 0.6s;">
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <h3 class="font-bold text-lg mb-2">От 2500₽ за сутки</h3>
                        <p class="text-cyan-100 text-sm">Скидки при длительном проживании</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <h3 class="font-bold text-lg mb-2">Центр Мирного</h3>
                        <p class="text-cyan-100 text-sm">Рядом с магазинами и остановками</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <h3 class="font-bold text-lg mb-2">Все включено</h3>
                        <p class="text-cyan-100 text-sm">Wi-Fi, техника, постельное белье</p>
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
// Hero section component - главная секция с заголовком и CTA
</script>