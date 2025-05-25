<template>
    <component :is="tag" :class="[
        animationClass,
        customClasses
    ]" :style="animationStyle" v-bind="$attrs">
        <slot />
    </component>
</template>

<script setup lang="ts">
interface Props {
    animation?: 'fade-in' | 'fade-up' | 'fade-down' | 'slide-in-left' | 'slide-in-right' | 'bounce-in' | 'scale-in'
    delay?: number
    tag?: string
    class?: string | string[] | Record<string, boolean>
}

const props = withDefaults(defineProps<Props>(), {
    animation: 'fade-in',
    delay: 0,
    tag: 'div',
    class: ''
})

const animationClass = computed(() => props.animation)

const animationStyle = computed(() => {
    if (props.delay > 0) {
        return {
            'animation-delay': `${props.delay}s`
        }
    }
    return {}
})

const customClasses = computed(() => {
    if (typeof props.class === 'string') {
        return props.class
    }
    if (Array.isArray(props.class)) {
        return props.class.join(' ')
    }
    if (typeof props.class === 'object') {
        return Object.entries(props.class)
            .filter(([, value]) => value)
            .map(([key]) => key)
            .join(' ')
    }
    return ''
})
</script>