<template>
    <header
        class="bg-white w-full h-[60px] flex items-center justify-center shadow-sm transition-all duration-300 fixed z-50">
        <div class="container-custom py-4 flex  items-center justify-between z-50 top-0 ">
            <!-- Logo -->
            <div class="flex items-center">
                <NuxtLink to="/"
                    class="flex items-center space-x-2 text-xl text-cyan-600 transition-all duration-300 hover:scale-105">
                    <Icon name="i-heroicons-home" class="h-8 w-8 text-cyan-600" />
                    <span>Городок</span>
                </NuxtLink>
            </div>

            <!-- Navigation -->
            <nav class="hidden md:flex space-x-8 text-cyan-600 hover:text-cyan-700">
                <NuxtLink to="/" class="nav-link-class">
                    Главная
                </NuxtLink>
                <NuxtLink to="/apartments" class="nav-link-class">
                    Квартиры
                </NuxtLink>
                <NuxtLink to="/about" class="nav-link-class">
                    О нас
                </NuxtLink>
                <NuxtLink to="/contacts" class="nav-link-class">
                    Контакты
                </NuxtLink>
            </nav>

            <!-- Contact -->
            <div class="hidden md:flex items-center">
                <a href="tel:+79214794791"
                    class="flex items-center text-cyan-600 hover:text-cyan-700 transition-colors duration-200">
                    <Icon name="i-heroicons-phone" class="mr-2 h-5 w-5" />
                    <span>+7 (921) 479-47-91</span>
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button
                class="md:hidden text-gray-500 hover:text-cyan-600 focus:outline-none transition-transform duration-300 relative z-[60]"
                aria-label="Toggle menu" @click="toggleMenu">
                <Icon v-if="!isMenuOpen" name="i-heroicons-bars-3" class="h-6 w-6" />
                <Icon v-else name="i-heroicons-x-mark" class="h-6 w-6" />
            </button>
        </div>
        <Transition name="slide-down">
            <div v-if="isMenuOpen" class="fixed bg-white shadow-lg md:hidden z-[55]" :style="{
                top: headerHeight + 'px',
                left: '0',
                right: '0'
            }">
                <div class="container-custom py-4">
                    <nav class="flex flex-col space-y-4">
                        <NuxtLink to="/" class="nav-link-mobile-class" @click="closeMenu">
                            Главная
                        </NuxtLink>
                        <NuxtLink to="/apartments" class="nav-link-mobile-class" @click="closeMenu">
                            Квартиры
                        </NuxtLink>
                        <NuxtLink to="/about" class="nav-link-mobile-class" @click="closeMenu">
                            О нас
                        </NuxtLink>
                        <NuxtLink to="/contacts" class="nav-link-mobile-class" @click="closeMenu">
                            Контакты
                        </NuxtLink>
                        <a href="tel:+79214794791" class="nav-link-mobile-class flex items-center">
                            <Icon name="i-heroicons-phone" class="mr-2 h-5 w-5 text-cyan-600" />
                            <span>+7 (921) 479-47-91</span>
                        </a>
                    </nav>
                </div>
            </div>
        </Transition>
    </header>

    <!-- Mobile Menu - вынесен за пределы header -->





</template>

<script setup lang="ts">
const isMenuOpen = ref(false)
const scrolled = ref(false)
const headerHeight = ref(60)
const menuHeight = ref(240) // Примерная высота меню

// Toggle mobile menu
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

// Close mobile menu
const closeMenu = () => {
    if (!isMenuOpen.value) return

    isMenuOpen.value = false
}

// Close mobile menu when route changes
const route = useRoute()
watch(
    () => route.path,
    () => {
        closeMenu()
    }
)




</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>