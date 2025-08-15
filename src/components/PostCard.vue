<template>
  <article class="group bg-white rounded-xl shadow-md overflow-hidden card-hover animate-fade-in-up">
    <!-- Image Container -->
    <div class="relative overflow-hidden">
      <img 
        :src="post.image" 
        :alt="post.title"
        class="w-full h-48 object-cover image-hover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Category Badge -->
      <div class="absolute top-4 left-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-primary text-xs font-medium backdrop-blur-sm">
          {{ post.category }}
        </span>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-6">
      <div class="flex items-center space-x-2 text-sm text-gray-500 mb-3">
        <span>{{ formatDate(post.date) }}</span>
        <span>•</span>
        <span>{{ post.readTime }}</span>
      </div>
      
      <h3 class="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors duration-200">
        {{ post.title }}
      </h3>
      
      <p class="text-gray-600 mb-4 line-clamp-3">
        {{ post.excerpt }}
      </p>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
            <span class="text-secondary text-sm font-medium">
              {{ getInitials(post.author) }}
            </span>
          </div>
          <span class="text-sm text-gray-600">{{ post.author }}</span>
        </div>
        
        <button 
          @click="$emit('openArticle', post)"
          class="text-secondary font-medium text-sm hover:text-green-700 transition-colors duration-200 flex items-center space-x-1"
        >
          <span>Read more</span>
          <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { BlogPost } from '../types/blog'

interface Props {
  post: BlogPost
}

interface Emits {
  (e: 'openArticle', post: BlogPost): void
}

defineProps<Props>()
defineEmits<Emits>()

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
