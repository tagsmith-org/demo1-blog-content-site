<template>
  <Transition name="modal" appear>
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

      <!-- Modal Container -->
      <div class="relative min-h-screen flex items-center justify-center p-4">
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full" @click.stop>
          <!-- Close Button -->
          <button @click="closeModal"
            class="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Content -->
          <div class="p-8">
            <!-- Header -->
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-primary mb-2">
                Welcome Back
              </h2>
              <p class="text-gray-600">
                Sign in to your account
              </p>
            </div>

            <!-- Demo Users Info -->
            <div class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 class="text-sm font-semibold text-blue-800 mb-2">Demo Users:</h3>
              <div class="space-y-2 text-sm text-blue-700">
                <div>
                  <strong>Writer:</strong> writer@demo.com / password123
                </div>
                <div>
                  <strong>Editor:</strong> editor@demo.com / password123
                </div>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input id="email" v-model="form.email" type="email" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Enter your email" />
              </div>

              <!-- Password -->
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input id="password" v-model="form.password" type="password" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Enter your password" />
              </div>

              <!-- Submit Button -->
              <button type="submit" :disabled="isLoading"
                class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="!isLoading">
                  Sign In
                </span>
                <span v-else class="flex items-center justify-center space-x-2">
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  <span>Signing In...</span>
                </span>
              </button>
            </form>

            <!-- Error Message -->
            <div v-if="errorMessage" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-600">{{ errorMessage }}</p>
            </div>


          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import type { LoginForm } from '../types/blog'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'success'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const authStore = useAuthStore()

// State
const isLoading = ref(false)
const errorMessage = ref('')

// Form data
const form = ref<LoginForm>({
  email: '',
  password: ''
})



// Methods
function closeModal(): void {
  emit('close')
  resetForm()
}

function resetForm(): void {
  form.value = {
    email: '',
    password: ''
  }
  errorMessage.value = ''
}



async function handleSubmit(): Promise<void> {
  if (!form.value.email || !form.value.password) {
    errorMessage.value = 'Please fill in all fields'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await authStore.login(form.value)

    if (result.success) {
      emit('success')
      closeModal()
    } else {
      errorMessage.value = result.error || 'Login failed. Please try again.'
    }
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}
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
