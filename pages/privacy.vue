// pages/privacy.vue
<template>
    <div class="privacy-page">
        <section class="bg-cyan-800 text-white pt-6 pb-16 relative">
            <div class="absolute inset-0 opacity-30 bg-[url('/img/hero-bg.webp')] bg-cover bg-center" />
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-cyan-800/50" />

            <div class="container-custom relative z-10">
                <h1 class="text-3xl md:text-4xl font-bold mb-4 text-white">Политика конфиденциальности</h1>
                <p class="text-lg text-gray-200 max-w-3xl">
                    Информация о том, как мы собираем, используем и защищаем ваши персональные данные
                </p>
            </div>

            <div class="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"
                    class="fill-white w-full h-[50px] mb-[-1px]">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
                </svg>
            </div>
        </section>

        <section class="py-12">
            <div class="container-custom">
                <div class="max-w-4xl mx-auto">
                    <div class="bg-white rounded-lg shadow-sm p-8">
                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">1. Общие положения</h2>
                        <p class="mb-6 text-gray-700">
                            Настоящая Политика конфиденциальности определяет порядок обработки персональных данных
                            пользователей сайта gorodok-mirny.ru (далее - "Сайт"), принадлежащего компании "Городок"
                            (далее - "Компания").
                        </p>

                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">2. Сбор персональных данных</h2>
                        <p class="mb-4 text-gray-700">Мы собираем следующие персональные данные:</p>
                        <ul class="list-disc list-inside mb-6 text-gray-700 space-y-2">
                            <li>Имя и фамилия</li>
                            <li>Номер телефона</li>
                            <li>Адрес электронной почты</li>
                            <li>Сообщения, отправленные через форму обратной связи</li>
                        </ul>

                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">3. Цели обработки данных</h2>
                        <p class="mb-4 text-gray-700">Персональные данные используются для:</p>
                        <ul class="list-disc list-inside mb-6 text-gray-700 space-y-2">
                            <li>Связи с клиентами по вопросам аренды квартир</li>
                            <li>Оформления бронирования</li>
                            <li>Предоставления информации о наших услугах</li>
                            <li>Улучшения качества обслуживания</li>
                        </ul>

                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">4. Защита данных</h2>
                        <p class="mb-6 text-gray-700">
                            Мы применяем технические и организационные меры для защиты персональных данных от
                            неправомерного доступа, изменения, раскрытия или уничтожения.
                        </p>

                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">5. Права субъектов данных</h2>
                        <p class="mb-4 text-gray-700">Вы имеете право:</p>
                        <ul class="list-disc list-inside mb-6 text-gray-700 space-y-2">
                            <li>Получать информацию об обработке ваших данных</li>
                            <li>Требовать исправления неточных данных</li>
                            <li>Требовать удаления ваших данных</li>
                            <li>Отозвать согласие на обработку данных</li>
                        </ul>

                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">6. Контактная информация</h2>
                        <p class="mb-2 text-gray-700">Для вопросов по обработке персональных данных обращайтесь:</p>
                        <p class="text-gray-700">Email: 9214794791@mail.ru</p>
                        <p class="text-gray-700">Телефон: +7 (921) 479-47-91</p>
                        <p class="text-gray-700">Адрес: г. Мирный, ул. Ленина, д.65, офис 20</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
useHead({
    title: 'Политика конфиденциальности | Городок',
    meta: [
        { name: 'description', content: 'Политика конфиденциальности компании Городок. Информация о сборе, использовании и защите персональных данных при аренде квартир в Мирном.' },
        { name: 'robots', content: 'noindex, follow' }
    ]
})
</script>
