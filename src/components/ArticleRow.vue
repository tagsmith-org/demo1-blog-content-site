<template>
  <article class="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
    <div class="flex flex-col md:flex-row">
      <!-- Image -->
      <div class="relative md:w-48 lg:w-56 flex-shrink-0">
        <img 
          :src="post.image" 
          :alt="post.title"
          class="w-full h-32 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <!-- Category Badge -->
        <div class="absolute top-3 left-3">
          <span class="inline-flex items-center px-2 py-1 rounded-full bg-white/90 text-primary text-xs font-medium backdrop-blur-sm">
            {{ post.category }}
          </span>
        </div>
      </div>
      
      <!-- Content -->
      <div class="flex-1 p-6">
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-200 line-clamp-2">
                {{ post.title }}
              </h3>
              
              <p class="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                {{ post.excerpt }}
              </p>
            </div>
            
            <!-- Read More Button -->
            <button 
              @click="$emit('openArticle', post)"
              class="ml-4 flex-shrink-0 text-secondary font-medium text-sm hover:text-green-700 transition-colors duration-200 flex items-center space-x-1"
            >
              <span>Read</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          <!-- Footer -->
          <div class="flex items-center justify-between mt-auto">
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <!-- Author -->
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span class="text-secondary text-xs font-medium">
                    {{ getInitials(post.author) }}
                  </span>
                </div>
                <span>{{ post.author }}</span>
              </div>
              
              <!-- Date -->
              <span>•</span>
              <span>{{ formatDate(post.date) }}</span>
              
              <!-- Read Time -->
              <span>•</span>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{{ post.readTime }}</span>
              </div>
            </div>
            
            <!-- Featured Badge -->
            <div v-if="post.featured" class="flex items-center space-x-1 text-secondary text-xs font-medium">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span>Featured</span>
            </div>
          </div>
        </div>
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

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
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
</style>
