<template>
    <footer class="bg-gray-800 text-white">
        <div class="container-custom py-10">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Company Info -->
                <div class="fade-in">
                    <h3 class="text-xl font-bold mb-4 text-white">Городок</h3>
                    <p class="mb-4 text-gray-300">
                        Аренда комфортабельных квартир в городе Мирный. Чистые и уютные квартиры со всем необходимым для
                        проживания.
                    </p>
                    <div class="flex items-center mt-4">
                        <a href="https://t.me/ArendaGorodOK" target="_blank" rel="noopener noreferrer"
                            aria-label="Написать в Telegram"
                            class="text-gray-300 hover:text-white mr-4 transition-colors duration-200 hover:scale-110 transform">
                            <Icon name="i-mdi-telegram" class="h-6 w-6" />
                        </a>
                        <a href="https://vk.com/id226682363" target="_blank" rel="noopener noreferrer"
                            aria-label="Перейти в VK"
                            class="text-gray-300 hover:text-white mr-4 transition-colors duration-200 hover:scale-110 transform">
                            <Icon name="i-mdi-vk" class="h-6 w-6" />
                        </a>
                        <a href="https://wa.me/79214794791?text=Здравствуйте!%20Интересует%20аренда%20квартиры%20в%20Мирном"
                            target="_blank" rel="noopener noreferrer" aria-label="Написать в WhatsApp"
                            class="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-110 transform">
                            <Icon name="i-mdi-whatsapp" class="h-6 w-6" />
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="fade-in" style="animation-delay: 0.1s;">
                    <h3 class="text-xl font-bold mb-4 text-white">Навигация</h3>
                    <ul class="space-y-2">
                        <li class="transform hover:translate-x-2 transition-transform duration-200">
                            <NuxtLink to="/" class="text-gray-300 hover:text-white">
                                Главная
                            </NuxtLink>
                        </li>
                        <li class="transform hover:translate-x-2 transition-transform duration-200">
                            <NuxtLink to="/apartments" class="text-gray-300 hover:text-white">
                                Квартиры
                            </NuxtLink>
                        </li>
                        <li class="transform hover:translate-x-2 transition-transform duration-200">
                            <NuxtLink to="/about" class="text-gray-300 hover:text-white">
                                О нас
                            </NuxtLink>
                        </li>
                        <li class="transform hover:translate-x-2 transition-transform duration-200">
                            <NuxtLink to="/contacts" class="text-gray-300 hover:text-white">
                                Контакты
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div class="fade-in" style="animation-delay: 0.2s;">
                    <h3 class="text-xl font-bold mb-4 text-white">Контакты</h3>
                    <div class="space-y-3">
                        <div class="flex items-start hover:translate-x-1 transition-transform duration-200">
                            <Icon name="i-heroicons-map-pin" class="h-5 w-5 mr-3 mt-1 text-cyan-300" />
                            <span>г. Мирный, ул. Ленина, д.65, офис 20</span>
                        </div>
                        <div class="flex items-center hover:translate-x-1 transition-transform duration-200">
                            <Icon name="i-heroicons-phone" class="h-5 w-5 mr-3 text-cyan-300" />
                            <a href="tel:+79214794791" class="hover:text-cyan-300 transition-colors duration-200">+7
                                (921) 479-47-91</a>
                        </div>
                        <div class="flex items-center hover:translate-x-1 transition-transform duration-200">
                            <Icon name="i-heroicons-envelope" class="h-5 w-5 mr-3 text-cyan-300" />
                            <a href="mailto:9214794791@mail.ru"
                                class="hover:text-cyan-300 transition-colors duration-200">9214794791@mail.ru</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
                <p class="text-sm text-gray-400">
                    &copy; {{ new Date().getFullYear() }} Городок. Все права защищены.
                </p>
                <div class="mt-4 md:mt-0">
                    <NuxtLink to="/privacy"
                        class="text-sm text-gray-400 hover:text-white mr-4 transition-colors duration-200">
                        Политика конфиденциальности
                    </NuxtLink>
                    <NuxtLink to="/terms" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                        Условия использования
                    </NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
// Footer component logic
</script>