<template>
    <div class="apartment-detail-page">
        <!-- Loading State -->
        <div v-if="isLoading" class="py-20 text-center">
            <Icon name="i-heroicons-arrow-path" class="h-10 w-10 mx-auto animate-spin text-cyan-500" />
            <p class="mt-4 text-lg text-gray-600">Загрузка информации о квартире...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="py-20 text-center">
            <Icon name="i-heroicons-exclamation-triangle" class="h-10 w-10 mx-auto text-red-500" />
            <p class="mt-4 text-lg text-red-600">{{ error }}</p>
        </div>

        <!-- Not Found State -->
        <div v-else-if="!apartment" class="py-20 text-center">
            <Icon name="i-heroicons-face-frown" class="h-10 w-10 mx-auto text-gray-400" />
            <p class="mt-4 text-lg text-gray-600">Квартира не найдена</p>
            <NuxtLink to="/apartments"
                class="mt-6 inline-flex items-center text-cyan-600 hover:text-cyan-700 transition-colors duration-200">
                <Icon name="i-heroicons-arrow-left" class="h-5 w-5 mr-1" />
                Вернуться к списку квартир
            </NuxtLink>
        </div>

        <!-- Apartment Detail -->
        <ApartmentDetail v-else :apartment="apartment" />
    </div>
</template>

<script setup lang="ts">
import { useApartmentStore } from '~/store/apartmentStore'

// Установка метаданных для страницы
useHead({
    title: 'Просмотр квартиры | Городок',
    meta: [
        { name: 'description', content: 'Подробная информация о квартире в аренду в городе Мирный. Ознакомьтесь с условиями и характеристиками данной квартиры.' }
    ],
})

// Получаем ID квартиры из параметров маршрута
const route = useRoute()
const apartmentId = route.params.id as string

// Получаем доступ к хранилищу и данным о квартирах
const apartmentStore = useApartmentStore()
const { isLoading, error } = storeToRefs(apartmentStore)

// Получаем квартиру по ID
const apartment = computed(() => {
    return apartmentStore.getApartmentById(apartmentId)
})

// Если квартиры еще не загружены, загружаем их
onMounted(async () => {
    if (apartmentStore.apartments.length === 0) {
        await apartmentStore.fetchApartments()
    }

    // После загрузки, если квартира не найдена, перенаправляем на список
    if (!apartment.value && !isLoading.value) {
        navigateTo('/apartments')
    }
})
</script>