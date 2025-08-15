<template>
  <section class="py-20 bg-secondary">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="animate-fade-in-up">
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p class="text-lg lg:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Get the latest articles, tips, and insights delivered straight to your inbox. 
            No spam, just valuable content.
          </p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="max-w-md mx-auto animate-fade-in-up">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email address"
                required
                class="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                :class="{ 'ring-2 ring-red-300': showError }"
              />
              <p v-if="showError" class="text-red-200 text-sm mt-2 text-left">
                Please enter a valid email address
              </p>
            </div>
            
            <button 
              type="submit"
              :disabled="isSubmitting"
              class="bg-white text-secondary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <span v-if="!isSubmitting">Subscribe</span>
              <span v-else class="flex items-center space-x-2">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Subscribing...</span>
              </span>
            </button>
          </div>
        </form>
        
        <div class="mt-8 animate-fade-in-up">
          <p class="text-green-100 text-sm">
            Join {{ subscriberCount.toLocaleString() }}+ subscribers who get our weekly updates
          </p>
          <div class="flex items-center justify-center space-x-6 mt-4 text-green-100">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-sm">No spam</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-sm">Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const isSubmitting = ref(false)
const showError = ref(false)
const subscriberCount = ref(15420)

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

async function handleSubmit(): Promise<void> {
  if (!validateEmail(email.value)) {
    showError.value = true
    return
  }
  
  showError.value = false
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Reset form
  email.value = ''
  isSubmitting.value = false
  
  // Show success message (you could add a toast notification here)
  alert('Thank you for subscribing!')
}
</script>
