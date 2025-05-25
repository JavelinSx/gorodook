<template>
    <div class="booking-form">
        <!-- Selected apartment preview -->
        <div v-if="formData.apartmentDetails" class="mb-6 p-4 bg-cyan-50 rounded-lg">
            <h3 class="font-bold text-cyan-700 mb-2">Выбранная квартира:</h3>
            <p class="text-gray-700">{{ formData.apartmentDetails.address }}</p>
            <p class="text-gray-600 text-sm">{{ formData.apartmentDetails.rooms }}-комнатная, {{
                formData.apartmentDetails.options[0].scale }} м²</p>
        </div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="transition-all duration-300 hover:translate-x-2">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Имя*</label>
                <input id="name" v-model="formData.name" type="text" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 focus:outline-none transition-all duration-200"
                    placeholder="Ваше имя">
            </div>

            <div class="transition-all duration-300 hover:translate-x-2">
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Телефон*</label>
                <input id="phone" v-model="formData.phone" type="tel" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 focus:outline-none transition-all duration-200"
                    placeholder="+7 (___) ___-__-__">
            </div>

            <div class="transition-all duration-300 hover:translate-x-2">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input id="email" v-model="formData.email" type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 focus:outline-none transition-all duration-200"
                    placeholder="Ваш email">
            </div>

            <div v-if="!formData.apartmentDetails" class="transition-all duration-300 hover:translate-x-2">
                <label for="roomCount" class="block text-sm font-medium text-gray-700 mb-1">Предпочтительное количество
                    комнат</label>
                <select id="roomCount" v-model="formData.roomCount"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 focus:outline-none transition-all duration-200">
                    <option value="">Выберите</option>
                    <option value="1">1-комнатная</option>
                    <option value="2">2-комнатная</option>
                </select>
            </div>

            <div class="transition-all duration-300 hover:translate-x-2">
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                <textarea id="message" v-model="formData.message" rows="4"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 focus:outline-none transition-all duration-200"
                    placeholder="Ваше сообщение" />
            </div>

            <div class="mb-6 transition-all duration-300 hover:translate-x-2">
                <label class="flex items-start">
                    <input v-model="formData.agreement" type="checkbox" required class="mt-1 mr-2">
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

        <!-- Success Message -->
        <Transition name="fade">
            <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div class="bg-white p-6 rounded-lg max-w-md mx-auto">
                    <div class="text-center">
                        <div class="bg-green-100 p-4 rounded-full inline-block mx-auto mb-4">
                            <Icon name="i-heroicons-check-circle" class="h-10 w-10 text-green-500" />
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-cyan-800">Спасибо за вашу заявку!</h3>
                        <p class="text-gray-600 mb-6">
                            Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                        </p>
                        <button class="btn bg-cyan-600 text-white hover:bg-cyan-700 transition-colors duration-200"
                            @click="closeModal">
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '~/store/bookingStore'
import type { Apartment } from '~/store/apartmentStore'

const props = defineProps<{
    apartment?: Apartment | null
}>()

const emit = defineEmits(['success', 'close'])

// Get store
const bookingStore = useBookingStore()
const { formData, isSubmitting, showSuccessModal } = storeToRefs(bookingStore)

// Set apartment details if provided
if (props.apartment) {
    bookingStore.setApartmentDetails(props.apartment)
}

// Handle form submission
const handleSubmit = async () => {
    try {
        await bookingStore.submitForm()
        emit('success')
    } catch (error) {
        // Handle error (show toast, etc.)
        console.error('Form submission failed:', error)
    }
}

// Close success modal
const closeModal = () => {
    bookingStore.closeSuccessModal()
    emit('close')
}

// Close modal on ESC key
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && showSuccessModal.value) {
        closeModal()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
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