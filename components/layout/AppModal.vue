<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div class="bg-white rounded-lg shadow-xl max-w-md mx-auto w-full max-h-[90vh] overflow-auto"
                    :class="[widthClass]">
                    <!-- Header -->
                    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-gray-200">
                        <slot name="header">
                            <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
                        </slot>
                    </div>

                    <!-- Body -->
                    <div class="px-6 py-4">
                        <slot />
                    </div>

                    <!-- Footer -->
                    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200 flex justify-end">
                        <slot name="footer" />
                    </div>

                    <!-- Close Button -->
                    <button v-if="showClose"
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                        @click="close">
                        <span class="sr-only">Закрыть</span>
                        <Icon name="i-heroicons-x-mark" class="h-6 w-6" />
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: 'md', // sm, md, lg, xl, 2xl, full
        validator: (value: string) => ['sm', 'md', 'lg', 'xl', '2xl', 'full'].includes(value)
    },
    showClose: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['update:modelValue', 'close'])

const widthClass = computed(() => {
    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        'full': 'max-w-full'
    }
    return sizes[props.width] || 'max-w-md'
})

const close = () => {
    emit('update:modelValue', false)
    emit('close')
}

// Close modal on ESC key
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.modelValue) {
        close()
    }
}

// Block scrolling when modal is open
watchEffect(() => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = props.modelValue ? 'hidden' : ''
    }
})

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    // Reset overflow in case component is destroyed while modal is open
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