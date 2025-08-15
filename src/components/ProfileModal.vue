<template>
    <Transition name="modal" appear>
        <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

            <!-- Modal Container -->
            <div class="relative min-h-screen flex items-center justify-center p-4">
                <div class="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    @click.stop>
                    <!-- Close Button -->
                    <button @click="closeModal"
                        class="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <!-- Content -->
                    <div class="p-8">
                        <!-- Header -->
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-primary mb-2">Profile</h2>
                            <p class="text-gray-600">Manage your account information</p>
                        </div>

                        <!-- Profile Form -->
                        <form @submit.prevent="handleSubmit" class="space-y-6">
                            <!-- Avatar Section -->
                            <div class="text-center">
                                <div class="relative inline-block">
                                    <div
                                        class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                            </path>
                                        </svg>
                                    </div>
                                    <button type="button"
                                        class="absolute bottom-0 right-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center hover:bg-secondary/80 transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z">
                                            </path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Username -->
                            <div>
                                <label for="username"
                                    class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input id="username" v-model="form.username" type="text" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                                    placeholder="Enter username" />
                            </div>

                            <!-- Full Name -->
                            <div>
                                <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Full
                                    Name</label>
                                <input id="fullName" v-model="form.fullName" type="text" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                                    placeholder="Enter full name" />
                            </div>

                            <!-- Bio -->
                            <div>
                                <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea id="bio" v-model="form.bio" rows="4"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                                    placeholder="Tell us about yourself..."></textarea>
                            </div>

                            <!-- Email (Read-only) -->
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input id="email" :value="user?.email" type="email" disabled
                                    class="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
                                <p class="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" :disabled="isLoading"
                                class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                                <span v-if="!isLoading">Update Profile</span>
                                <span v-else class="flex items-center justify-center space-x-2">
                                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    <span>Updating...</span>
                                </span>
                            </button>
                        </form>

                        <!-- Success Message -->
                        <div v-if="successMessage" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p class="text-sm text-green-600">{{ successMessage }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import type { ProfileForm } from '../types/blog'

interface Props {
    isOpen: boolean
}

interface Emits {
    (e: 'close'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const authStore = useAuthStore()

// State
const isLoading = ref(false)
const successMessage = ref('')

// Form data
const form = ref<ProfileForm>({
    username: '',
    fullName: '',
    bio: ''
})

// Computed
const user = computed(() => authStore.currentUser)

// Methods
function closeModal(): void {
    emit('close')
    resetForm()
}

function resetForm(): void {
    if (user.value) {
        form.value = {
            username: user.value.username,
            fullName: user.value.fullName,
            bio: user.value.bio || ''
        }
    }
    successMessage.value = ''
}

async function handleSubmit(): Promise<void> {
    if (!form.value.username || !form.value.fullName) {
        return
    }

    isLoading.value = true
    successMessage.value = ''

    try {
        const success = await authStore.updateProfile(form.value)

        if (success) {
            successMessage.value = 'Profile updated successfully!'
            setTimeout(() => {
                closeModal()
            }, 1500)
        }
    } catch (error) {
        console.error('Profile update failed:', error)
    } finally {
        isLoading.value = false
    }
}

// Handle escape key
function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
        closeModal()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
    resetForm()
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}

.modal-enter-from {
    opacity: 0;
    transform: scale(0.9);
}

.modal-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>
