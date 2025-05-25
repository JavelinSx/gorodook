<!-- components/OptimizedImage.vue -->
<template>
    <picture v-if="useWebP" :class="containerClass">
        <!-- WebP источник -->
        <source :srcset="webpSrc" type="image/webp">
        <!-- Fallback -->
        <img :src="src" :alt="alt" :class="imageClass" :loading="loading" :fetchpriority="priority ? 'high' : 'auto'"
            :style="style" @load="$emit('load', $event)" @error="$emit('error', $event)">
    </picture>

    <!-- Обычное изображение если WebP не нужен -->
    <img v-else :src="src" :alt="alt" :class="imageClass" :loading="loading" :fetchpriority="priority ? 'high' : 'auto'"
        :style="style" @load="$emit('load', $event)" @error="$emit('error', $event)">
</template>

<script setup lang="ts">
interface Props {
    src: string
    alt: string
    priority?: boolean
    loading?: 'lazy' | 'eager'
    class?: string
    containerClass?: string
    style?: Record<string, any>
    useWebP?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    priority: false,
    loading: 'lazy',
    class: '',
    useWebP: true
})

const emit = defineEmits(['load', 'error'])

// Генерируем WebP версию пути
const webpSrc = computed(() => {
    if (!props.useWebP) return props.src
    return props.src.replace(/\.(jpg|jpeg|png|bmp|tiff)$/i, '.webp')
})

const imageClass = computed(() => props.class)

// Preload для критических изображений
onMounted(() => {
    if (props.priority && import.meta.client) {
        // Убираем существующие preload для этого изображения
        const baseName = props.src.split('/').pop()?.split('.')[0]
        if (baseName) {
            const existingLinks = document.querySelectorAll(`link[href*="${baseName}"]`)
            existingLinks.forEach(link => {
                if (link.getAttribute('rel') === 'preload') {
                    link.remove()
                }
            })
        }

        // Добавляем новый preload только если изображение видимо
        const link = document.createElement('link')
        link.rel = 'preload'
        link.setAttribute('as', 'image')
        link.setAttribute('fetchpriority', 'high')

        // Используем WebP если поддерживается и включен
        if (props.useWebP && supportsWebP()) {
            link.href = webpSrc.value
            link.type = 'image/webp'
        } else {
            link.href = props.src
        }

        // Добавляем обработчик загрузки для удаления preload
        link.onload = () => {
            setTimeout(() => {
                if (link.parentNode) {
                    link.remove()
                }
            }, 1000)
        }

        link.onerror = () => {
            if (link.parentNode) {
                link.remove()
            }
        }

        document.head.appendChild(link)
    }
})

// Простая проверка поддержки WebP
function supportsWebP(): boolean {
    if (!import.meta.client) return false

    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1

    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
}
</script>