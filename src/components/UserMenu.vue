<template>
    <div class="relative">
        <!-- User Button -->
        <button @click="toggleMenu"
            class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <!-- Avatar -->
            <div class="relative">
                <img v-if="user?.avatar && !isGuest" :src="user.avatar" :alt="user.fullName"
                    class="w-10 h-10 rounded-full object-cover" />
                <div v-else class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
            </div>

            <!-- Dropdown Arrow -->
            <svg class="w-4 h-4 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': isMenuOpen }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>

        <!-- Dropdown Menu -->
        <Transition name="dropdown" appear>
            <div v-if="isMenuOpen"
                class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">

                <!-- Menu Items -->
                <div class="py-1">
                    <!-- Guest Menu -->
                    <div v-if="isGuest">
                        <button @click="openAuth"
                            class="w-full px-4 py-2 text-left text-sm text-secondary hover:bg-green-50 transition-colors duration-200 flex items-center space-x-3">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                                </path>
                            </svg>
                            <span>Login</span>
                        </button>
                    </div>

                    <!-- Authenticated User Menu -->
                    <div v-else>
                        <!-- Profile -->
                        <button @click="openProfile"
                            class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span>Profile</span>
                        </button>

                        <!-- My Articles -->
                        <button @click="openMyArticles"
                            class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                                </path>
                            </svg>
                            <span>My Articles</span>
                        </button>

                        <!-- Write Article -->
                        <button @click="openWriteArticle"
                            class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4"></path>
                            </svg>
                            <span>Write Article</span>
                        </button>

                        <!-- Divider -->
                        <div class="border-t border-gray-200 my-2"></div>

                        <!-- Logout -->
                        <button @click="logout"
                            class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                </path>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'

interface Emits {
    (e: 'open-auth'): void
    (e: 'open-profile'): void
    (e: 'open-my-articles'): void
    (e: 'open-write-article'): void
}

const emit = defineEmits<Emits>()

const authStore = useAuthStore()

// State
const isMenuOpen = ref(false)

// Computed
const user = computed(() => authStore.currentUser)
const isGuest = computed(() => authStore.isGuest)

// Methods
function toggleMenu(): void {
    isMenuOpen.value = !isMenuOpen.value
}

function closeMenu(): void {
    isMenuOpen.value = false
}

function openAuth(): void {
    closeMenu()
    emit('open-auth')
}

function openProfile(): void {
    closeMenu()
    emit('open-profile')
}

function openMyArticles(): void {
    closeMenu()
    emit('open-my-articles')
}

function openWriteArticle(): void {
    closeMenu()
    emit('open-write-article')
}

function logout(): void {
    authStore.logout()
    closeMenu()
}

// Close menu when clicking outside
function handleClickOutside(event: Event): void {
    const target = event.target as Element
    if (!target.closest('.relative')) {
        closeMenu()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease;
}

.dropdown-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
