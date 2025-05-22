<template>
    <div class="contacts-page">
        <!-- Page Header -->
        <section class="bg-cyan-800 text-white pt-6 pb-16 relative">
            <div class="absolute inset-0 opacity-30 bg-[url('/img/hero-bg.jpg')] bg-cover bg-center" />
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-cyan-800/50" />

            <div class="container-custom relative z-10">
                <h1 class="text-3xl md:text-4xl font-bold mb-4 text-white fade-in">Контакты</h1>
                <p class="text-lg text-gray-200 max-w-3xl fade-in" style="animation-delay: 0.1s;">
                    Свяжитесь с нами, чтобы забронировать квартиру или получить дополнительную информацию.
                </p>
            </div>

            <!-- Wave bottom - Fixed to match the next section background -->
            <div
                class="absolute bottom-0 left-0 right-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"
                    class="fill-gray-50 w-full h-[50px] mb-[-1px]">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
                </svg>
            </div>
        </section>

        <!-- Contact Information - Ensure background matches SVG fill -->
        <section class="py-12 relative bg-gray-50">
            <div class="container-custom">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Contact Info -->
                    <div class="slide-in-left">

                        <!-- Social Media -->
                        <h3 class="text-xl font-bold mb-4 text-cyan-800">Мы в социальных сетях</h3>
                        <div class="flex space-x-4 mb-8">
                            <a href="https://wa.me/79214794791?text=Здравствуйте!%20Интересует%20аренда%20квартиры%20в%20Мирном"
                                target="_blank" rel="noopener noreferrer" aria-label="Написать в WhatsApp"
                                class="bg-cyan-100 w-12 h-12 flex items-center justify-center rounded-full hover:bg-cyan-200 transition-all duration-300 hover:shadow-md transform hover:scale-110">
                                <Icon name="i-mdi-whatsapp" class="h-8 w-8 text-cyan-600" />
                            </a>
                            <a href="https://t.me/ArendaGorodOK" target="_blank" rel="noopener noreferrer"
                                aria-label="Написать в Telegram"
                                class="bg-cyan-100 w-12 h-12 flex items-center justify-center rounded-full hover:bg-cyan-200 transition-all duration-300 hover:shadow-md transform hover:scale-110">
                                <Icon name="i-mdi-telegram" class="h-6 w-6 text-cyan-600" />
                            </a>
                            <a href="https://vk.com/id226682363" target="_blank" rel="noopener noreferrer"
                                aria-label="Перейти в VK"
                                class="bg-cyan-100 w-12 h-12 flex items-center justify-center rounded-full hover:bg-cyan-200 transition-all duration-300 hover:shadow-md transform hover:scale-110">
                                <Icon name="i-mdi-vk" class="h-6 w-6 text-cyan-600" />
                            </a>
                        </div>

                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">Наши контакты</h2>

                        <div class="space-y-6 mb-8">
                            <div
                                class="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                <div
                                    class="bg-cyan-100 p-3 rounded-lg mr-4 transition-transform duration-300 hover:scale-110">
                                    <Icon name="i-heroicons-map-pin" class="h-6 w-6 text-cyan-600" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-cyan-700">Адрес</h3>
                                    <p class="text-gray-700">г. Мирный, ул. Ленина, д.65, офис 20</p>
                                    <p class="text-gray-600 text-sm mt-1">Офис работает ежедневно с 9:00 до 20:00</p>
                                </div>
                            </div>

                            <div
                                class="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                <div
                                    class="bg-cyan-100 p-3 rounded-lg mr-4 transition-transform duration-300 hover:scale-110">
                                    <Icon name="i-heroicons-phone" class="h-6 w-6 text-cyan-600" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-cyan-700">Телефон</h3>
                                    <p><a href="tel:+79214794791"
                                            class="text-gray-700 hover:text-cyan-600 transition-colors duration-200">+7
                                            (921) 479-47-91</a></p>
                                    <p class="text-gray-600 text-sm mt-1">Звонки принимаются ежедневно с 8:00 до 22:00
                                    </p>
                                </div>
                            </div>

                            <div
                                class="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                <div
                                    class="bg-cyan-100 p-3 rounded-lg mr-4 transition-transform duration-300 hover:scale-110">
                                    <Icon name="i-heroicons-envelope" class="h-6 w-6 text-cyan-600" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-cyan-700">Email</h3>
                                    <p><a href="mailto:9214794791@mail.ru"
                                            class="text-gray-700 hover:text-cyan-600 transition-colors duration-200">9214794791@mail.ru</a>
                                    </p>
                                    <p class="text-gray-600 text-sm mt-1">Мы отвечаем на письма в течение 24 часов</p>
                                </div>
                            </div>
                        </div>


                    </div>

                    <!-- Contact Form -->
                    <div class="bg-white rounded-lg shadow-md p-6 slide-in-right">
                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">Оставьте заявку</h2>
                        <BookingForm :apartment="selectedApartment" />
                    </div>
                </div>
            </div>

        </section>

        <!-- Map -->
        <section class="py-8 relative overflow-hidden">


            <!-- Wave top -->
            <div class="absolute top-0 left-0 right-0 transform rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"
                    class="fill-white w-full h-[50px]">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
                </svg>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useApartmentStore } from '~/store/apartmentStore'
import BookingForm from '~/components/BookingForm.vue'

// Set metadata for this page
useHead({
    title: 'Контакты | Городок',
    meta: [
        { name: 'description', content: 'Свяжитесь с нами, чтобы забронировать квартиру или получить дополнительную информацию об аренде квартир в городе Мирный.' }
    ],
})

// Get route query parameters
const route = useRoute()
const apartmentId = route.query.apartmentId as string | undefined

// Get store and apartment details if ID provided
const apartmentStore = useApartmentStore()
const selectedApartment = computed(() => {
    if (apartmentId) {
        return apartmentStore.getApartmentById(apartmentId)
    }
    return null
})

// Use IntersectionObserver for scroll animations
onMounted(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .slide-in-left, .slide-in-right');

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
.slide-in-left,
.slide-in-right {
    opacity: 0;
    visibility: hidden;
}

.fade-in.visible,
.fade-up.visible,
.slide-in-left.visible,
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

.slide-in-left {
    transform: translateX(-20px);
}

.slide-in-left.visible {
    transform: translateX(0);
}

.slide-in-right {
    transform: translateX(20px);
}

.slide-in-right.visible {
    transform: translateX(0);
}

/* Transition properties */
.fade-in,
.fade-up,
.slide-in-left,
.slide-in-right {
    transition: opacity 0.8s ease-out, transform 0.8s ease-out, visibility 0.8s ease-out;
}
</style>