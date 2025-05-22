// pages/terms.vue
<template>
    <div class="terms-page">
        <section class="bg-cyan-800 text-white pt-6 pb-16 relative">
            <div class="absolute inset-0 opacity-30 bg-[url('/img/hero-bg.jpg')] bg-cover bg-center" />
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-cyan-800/50" />

            <div class="container-custom relative z-10">
                <h1 class="text-3xl md:text-4xl font-bold mb-4 text-white">Условия использования</h1>
                <p class="text-lg text-gray-200 max-w-3xl">
                    Правила пользования сайтом и условия аренды квартир
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
                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">1. Общие условия</h2>
                        <p class="mb-6 text-gray-700">
                            Настоящие условия регулируют использование сайта gorodok-mirny.ru и услуг по аренде квартир,
                            предоставляемых компанией "Городок".
                        </p>

                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">2. Условия аренды</h2>
                        <p class="mb-4 text-gray-700">При аренде квартиры действуют следующие условия:</p>
                        <ul class="list-disc list-inside mb-6 text-gray-700 space-y-2">
                            <li>Минимальный срок аренды - 1 сутки</li>
                            <li>Заселение с 14:00, выселение до 12:00</li>
                            <li>Требуется предоплата 50% от стоимости аренды</li>
                            <li>При длительной аренде (от 7 дней) предоставляются скидки</li>
                            <li>Необходим документ, удостоверяющий личность</li>
                        </ul>

                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">3. Правила проживания</h2>
                        <p class="mb-4 text-gray-700">В квартире запрещается:</p>
                        <ul class="list-disc list-inside mb-6 text-gray-700 space-y-2">
                            <li>Курение в помещении</li>
                            <li>Проживание животных без согласования</li>
                            <li>Превышение заявленного количества гостей</li>
                            <li>Нарушение тишины в ночное время (с 22:00 до 8:00)</li>
                            <li>Порча имущества</li>
                        </ul>

                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">4. Отмена бронирования</h2>
                        <p class="mb-4 text-gray-700">Условия отмены:</p>
                        <ul class="list-disc list-inside mb-6 text-gray-700 space-y-2">
                            <li>При отмене за 48 часов - возврат 100% предоплаты</li>
                            <li>При отмене за 24 часа - возврат 50% предоплаты</li>
                            <li>При отмене менее чем за 24 часа - предоплата не возвращается</li>
                        </ul>

                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">5. Ответственность</h2>
                        <p class="mb-6 text-gray-700">
                            Гость несет полную ответственность за сохранность имущества и возмещает ущерб в случае его
                            причинения.
                        </p>

                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">6. Контакты</h2>
                        <p class="mb-2 text-gray-700">По всем вопросам обращайтесь:</p>
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
    title: 'Условия использования | Городок',
    meta: [
        { name: 'description', content: 'Условия использования сайта и правила аренды квартир компании Городок в Мирном. Правила проживания, условия бронирования и отмены.' },
        { name: 'robots', content: 'noindex, follow' }
    ]
})
</script>