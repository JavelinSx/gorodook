<template>
    <div class="contacts-page">
        <!-- Page Header -->
        <section class="bg-cyan-800 text-white py-12 relative overflow-hidden">
            <div class="absolute inset-0 opacity-30 bg-[url('/img/hero-bg.jpg')] bg-cover bg-center" />
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-cyan-800/50" />

            <div class="container-custom relative z-10">
                <h1 class="text-3xl md:text-4xl font-bold mb-4 text-white fade-in">Контакты</h1>
                <p class="text-lg text-gray-200 max-w-3xl fade-in" style="animation-delay: 0.1s;">
                    Свяжитесь с нами, чтобы забронировать квартиру или получить дополнительную информацию.
                </p>
            </div>

            <!-- Wave bottom -->
            <div class="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"
                    class="fill-white w-full h-[50px]">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
                </svg>
            </div>
        </section>

        <!-- Contact Information -->
        <section class="py-12 relative">
            <div class="container-custom">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Contact Info -->
                    <div class="slide-in-left">
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
                                    <p class="text-gray-700">г. Мирный, ул. Ленина, д.1, офис 100</p>
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
                                    <p><a href="tel:+79000000000"
                                            class="text-gray-700 hover:text-cyan-600 transition-colors duration-200">+7
                                            (900)
                                            000-00-00</a></p>
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
                                    <p><a href="mailto:info@gorodok.ru"
                                            class="text-gray-700 hover:text-cyan-600 transition-colors duration-200">info@gorodok.ru</a>
                                    </p>
                                    <p class="text-gray-600 text-sm mt-1">Мы отвечаем на письма в течение 24 часов</p>
                                </div>
                            </div>
                        </div>

                        <!-- Social Media -->
                        <h3 class="text-xl font-bold mb-4 text-cyan-800">Мы в социальных сетях</h3>
                        <div class="flex space-x-4">
                            <a href="#"
                                class="bg-cyan-100 p-3 rounded-full hover:bg-cyan-200 transition-all duration-300 hover:shadow-md transform hover:scale-110">
                                <Icon name="i-mdi-telegram" class="h-6 w-6 text-cyan-600" />
                            </a>
                            <a href="#"
                                class="bg-cyan-100 p-3 rounded-full hover:bg-cyan-200 transition-all duration-300 hover:shadow-md transform hover:scale-110">
                                <Icon name="i-mdi-vk" class="h-6 w-6 text-cyan-600" />
                            </a>
                            <a href="#"
                                class="bg-cyan-100 p-3 rounded-full hover:bg-cyan-200 transition-all duration-300 hover:shadow-md transform hover:scale-110">
                                <Icon name="i-mdi-whatsapp" class="h-6 w-6 text-cyan-600" />
                            </a>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div class="bg-white rounded-lg shadow-md p-6 slide-in-right">
                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">Оставьте заявку</h2>

                        <form class="space-y-4" @submit.prevent="submitForm">
                            <div class="transition-all duration-300 hover:translate-x-2">
                                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Имя*</label>
                                <input id="name" v-model="form.name" type="text" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 focus:outline-none transition-all duration-200"
                                    placeholder="Ваше имя">
                            </div>

                            <div class="transition-all duration-300 hover:translate-x-2">
                                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Телефон*</label>
                                <input id="phone" v-model="form.phone" type="tel" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 focus:outline-none transition-all duration-200"
                                    placeholder="+7 (___) ___-__-__">
                            </div>

                            <div class="transition-all duration-300 hover:translate-x-2">
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input id="email" v-model="form.email" type="email"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 focus:outline-none transition-all duration-200"
                                    placeholder="Ваш email">
                            </div>

                            <div class="transition-all duration-300 hover:translate-x-2">
                                <label for="roomCount"
                                    class="block text-sm font-medium text-gray-700 mb-1">Предпочтительное количество
                                    комнат</label>
                                <select id="roomCount" v-model="form.roomCount"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 focus:outline-none transition-all duration-200">
                                    <option value="">Выберите</option>
                                    <option value="1">1-комнатная</option>
                                    <option value="2">2-комнатная</option>
                                </select>
                            </div>

                            <div class="transition-all duration-300 hover:translate-x-2">
                                <label for="message"
                                    class="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                                <textarea id="message" v-model="form.message" rows="4"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 focus:outline-none transition-all duration-200"
                                    placeholder="Ваше сообщение" />
                            </div>

                            <div class="mb-6 transition-all duration-300 hover:translate-x-2">
                                <label class="flex items-start">
                                    <input v-model="form.agreement" type="checkbox" required class="mt-1 mr-2">
                                    <span class="text-sm text-gray-600">
                                        Я согласен на обработку персональных данных согласно
                                        <NuxtLink to="/privacy"
                                            class="text-cyan-600 hover:text-cyan-700 transition-colors duration-200">
                                            политике конфиденциальности
                                        </NuxtLink>
                                    </span>
                                </label>
                            </div>

                            <button type="submit"
                                class="btn bg-cyan-600 text-white hover:bg-cyan-700 w-full py-3 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                                :disabled="isSubmitting">
                                <span v-if="isSubmitting" class="flex items-center justify-center">
                                    <Icon name="i-heroicons-arrow-path" class="h-5 w-5 mr-2 animate-spin" />
                                    Отправка...
                                </span>
                                <span v-else>
                                    Отправить заявку
                                </span>
                            </button>
                        </form>

                        <!-- Success Message - заменяем UModal на простой div с transition -->
                        <Transition name="fade">
                            <div v-if="showSuccessModal"
                                class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                                <div class="bg-white p-6 rounded-lg max-w-md mx-auto">
                                    <div class="text-center">
                                        <div class="bg-green-100 p-4 rounded-full inline-block mx-auto mb-4">
                                            <Icon name="i-heroicons-check-circle" class="h-10 w-10 text-green-500" />
                                        </div>
                                        <h3 class="text-xl font-bold mb-2 text-cyan-800">Спасибо за вашу заявку!</h3>
                                        <p class="text-gray-600 mb-6">
                                            Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                                        </p>
                                        <button
                                            class="btn bg-cyan-600 text-white hover:bg-cyan-700 transition-colors duration-200"
                                            @click="showSuccessModal = false">
                                            Закрыть
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>

            <!-- Background decorations -->
            <div class="absolute top-20 right-10 w-40 h-40 bg-cyan-100 rounded-full opacity-50 blur-3xl" />
            <div class="absolute bottom-20 left-10 w-60 h-60 bg-accent-100 rounded-full opacity-30 blur-3xl" />
        </section>

        <!-- Map -->
        <section class="py-8 relative overflow-hidden">
            <div class="container-custom">
                <h2 class="text-2xl font-bold mb-6 text-cyan-800 fade-up">Как нас найти</h2>
                <div class="h-96 bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] fade-up"
                    style="animation-delay: 0.1s;">
                    <!-- Replace with your actual office location map -->
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3Aedc190666d747ba9ccdfbb3793b0cd65c38a5164411f9eeb29bd4b10bd7d96f6&amp;source=constructor"
                        width="100%" height="100%" frameborder="0" allowfullscreen />
                </div>
            </div>

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
// Set metadata for this page
useHead({
    title: 'Контакты | Городок',
    meta: [
        { name: 'description', content: 'Свяжитесь с нами, чтобы забронировать квартиру или получить дополнительную информацию об аренде квартир в городе Мирный.' }
    ],
})

// Form state
const form = reactive({
    name: '',
    phone: '',
    email: '',
    roomCount: '',
    message: '',
    agreement: false
})

const isSubmitting = ref(false)
const showSuccessModal = ref(false)

// Form submission
const submitForm = async () => {
    isSubmitting.value = true

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Show success message
        showSuccessModal.value = true

        // Reset form
        Object.keys(form).forEach(key => {
            if (key !== 'agreement') {
                form[key] = ''
            }
        })
        form.agreement = false
    } catch (error) {
        console.error('Form submission error:', error)
        // Handle error case (maybe show an error toast/modal)
    } finally {
        isSubmitting.value = false
    }
}

// Close modal on ESC key
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && showSuccessModal.value) {
        showSuccessModal.value = false
    }
}

// Use IntersectionObserver for scroll animations
onMounted(() => {
    window.addEventListener('keydown', handleKeydown)

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

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
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

/* Анимация для модального окна */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>