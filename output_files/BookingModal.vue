<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div class="bg-white rounded-lg shadow-xl max-w-md mx-auto w-full max-h-[90vh] overflow-auto">
                    <!-- Modal Header -->
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-medium text-gray-900">Забронировать квартиру</h3>
                    </div>

                    <!-- Modal Body -->
                    <div class="px-6 py-4">
                        <BookingForm :apartment="apartment" @success="handleSuccess" @close="close" />
                    </div>

                    <!-- Close Button -->
                    <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                        @click="close">
                        <Icon name="i-heroicons-x-mark" class="h-6 w-6" />
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import type { Apartment } from '~/store/apartmentStore'
import BookingForm from '~/components/BookingForm.vue'

const props = defineProps<{
    isOpen: boolean
    apartment: Apartment | null
}>()

const emit = defineEmits(['close'])

const close = () => {
    emit('close')
}

const handleSuccess = () => {
    // Close modal after successful submission
    setTimeout(() => {
        close()
    }, 2000) // Give time to see success message
}

// Close modal on ESC key
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.isOpen) {
        close()
    }
}

// Block scrolling when modal is open
watchEffect(() => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = props.isOpen ? 'hidden' : ''
    }
})

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
    }
})
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active .bg-white,
.modal-fade-leave-active .bg-white {
    transition: transform 0.3s ease;
}

.modal-fade-enter-from .bg-white {
    transform: scale(0.95);
}

.modal-fade-leave-to .bg-white {
    transform: scale(0.95);
}
</style>