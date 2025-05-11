<template>
    <div class="error-page py-20 text-center">
        <div class="container-custom">
            <div class="max-w-lg mx-auto">
                <!-- Error Icon with animation -->
                <div class="mb-6 text-center bounce-in">
                    <UIcon
                        :name="error.statusCode === 404 ? 'i-heroicons-face-frown' : 'i-heroicons-exclamation-triangle'"
                        class="h-24 w-24 mx-auto"
                        :class="error.statusCode === 404 ? 'text-cyan-400' : 'text-red-500'" />
                </div>

                <!-- Error Content -->
                <h1 class="text-4xl font-bold mb-4 text-cyan-800 fade-in">
                    {{ error.statusCode === 404 ? 'Страница не найдена' : 'Произошла ошибка' }}
                </h1>
                <p class="text-lg text-gray-600 mb-6 fade-in" style="animation-delay: 0.1s;">
                    {{ error.statusCode === 404
                        ? 'Запрашиваемая страница не существует или была удалена.'
                        : 'Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова позже.'
                    }}
                </p>

                <!-- Error Details (only in development) -->
                <div v-if="error.statusMessage"
                    class="mb-6 p-4 bg-gray-100 rounded-lg text-left text-sm overflow-auto fade-in"
                    style="animation-delay: 0.2s;">
                    <p class="font-mono">{{ error.statusMessage }}</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-4 justify-center fade-in" style="animation-delay: 0.3s;">
                    <button
                        class="btn bg-cyan-600 text-white hover:bg-cyan-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                        @click="handleError">
                        {{ error.statusCode === 404 ? 'Вернуться на главную' : 'Попробовать снова' }}
                    </button>
                    <a v-if="error.statusCode !== 404" href="mailto:support@gorodok.ru"
                        class="btn bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700 transition-all duration-300 transform hover:-translate-y-1">
                        Связаться с поддержкой
                    </a>
                </div>
            </div>
        </div>

        <!-- Background Decoration -->
        <div class="absolute inset-0 -z-10 opacity-30 overflow-hidden">
            <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-200 rounded-full blur-3xl" />
            <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-200 rounded-full blur-3xl" />
        </div>
    </div>
</template>

<script setup lang="ts">
// Get the error from Nuxt
const props = defineProps({
    error: Object
})

// Clear the error and navigate
const handleError = () => {
    // Clear the error
    clearError()

    // Navigate to the home page if it's a 404, otherwise refresh the current page
    if (props.error?.statusCode === 404) {
        navigateTo('/')
    } else {
        window.location.reload()
    }
}
</script>

<style scoped>
.error-page {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.bounce-in {
    animation: bounceIn 0.6s cubic-bezier(0.215, 0.610, 0.355, 1.000);
}

.fade-in {
    animation: fadeIn 0.6s ease-out forwards;
}

.fade-in:nth-child(2) {
    animation-delay: 0.1s;
}

.fade-in:nth-child(3) {
    animation-delay: 0.2s;
}

.fade-in:nth-child(4) {
    animation-delay: 0.3s;
}

@keyframes bounceIn {
    0% {
        opacity: 0;
        transform: scale(0.3);
    }

    50% {
        opacity: 1;
        transform: scale(1.05);
    }

    70% {
        transform: scale(0.9);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>