<template>
    <div :class="containerClass">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" :class="svgClass">
            <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
    </div>
</template>

<script setup lang="ts">
// Определяем допустимые цвета как тип
type FillColor = 'white' | 'gray-50' | 'gray-100' | 'cyan-50' | 'cyan-100'

interface Props {
    position?: 'top' | 'bottom'
    fillColor?: FillColor
    height?: string
    flip?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    position: 'bottom',
    fillColor: 'white' as FillColor,
    height: '50px',
    flip: false
})

const containerClass = computed(() => {
    const baseClasses = 'absolute left-0 right-0'
    const positionClass = props.position === 'top' ? 'top-0' : 'bottom-0'
    const flipClass = props.flip ? 'transform rotate-180' : ''

    return `${baseClasses} ${positionClass} ${flipClass}`.trim()
})

const svgClass = computed(() => {
    const fillColorMap: Record<FillColor, string> = {
        'white': 'fill-white',
        'gray-50': 'fill-gray-50',
        'gray-100': 'fill-gray-100',
        'cyan-50': 'fill-cyan-50',
        'cyan-100': 'fill-cyan-100'
    }

    const fillClass = fillColorMap[props.fillColor]
    const sizeClasses = `w-full h-[${props.height}]`
    const marginClass = props.position === 'bottom' ? '' : 'mt-[-1px]' // убрал mb-[-1px]
    const displayFix = 'block'

    return `${fillClass} ${sizeClasses} ${marginClass} ${displayFix}`.trim()
})

</script>