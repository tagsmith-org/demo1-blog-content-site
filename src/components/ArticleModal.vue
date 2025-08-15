<template>
  <Transition name="modal" appear>
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

      <!-- Modal Container -->
      <div class="relative min-h-screen flex items-center justify-center p-4">
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
          <!-- Close Button -->
          <button @click="closeModal"
            class="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-lg">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Article Content -->
          <div v-if="article" class="relative">
            <!-- Hero Image -->
            <div class="relative h-64 md:h-80 lg:h-96 rounded-t-2xl overflow-hidden">
              <img :src="article.image" :alt="article.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              <!-- Category Badge -->
              <div class="absolute top-6 left-6">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-primary text-sm font-medium backdrop-blur-sm">
                  {{ article.category }}
                </span>
              </div>
            </div>

            <!-- Article Body -->
            <div class="p-8">
              <!-- Header -->
              <div class="mb-8">
                <h1 class="text-3xl lg:text-4xl font-bold text-primary mb-4 leading-tight">
                  {{ article.title }}
                </h1>

                <div class="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                      <span class="text-secondary text-sm font-medium">
                        {{ getInitials(article.author) }}
                      </span>
                    </div>
                    <span>{{ article.author }}</span>
                  </div>
                  <span>•</span>
                  <span>{{ formatDate(article.date) }}</span>
                  <span>•</span>
                  <span>{{ article.readTime }}</span>
                </div>

                <p class="text-lg text-gray-600 leading-relaxed">
                  {{ article.excerpt }}
                </p>
              </div>

              <!-- Article Content -->
              <div class="prose prose-lg max-w-none">
                <div class="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>

                  <h2 class="text-2xl font-bold text-primary mt-8 mb-4">
                    Understanding the Basics
                  </h2>

                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                  </p>

                  <blockquote
                    class="border-l-4 border-secondary pl-6 italic text-gray-600 bg-gray-50 py-4 rounded-r-lg">
                    "The best way to predict the future is to invent it." - Alan Kay
                  </blockquote>

                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>

                  <h2 class="text-2xl font-bold text-primary mt-8 mb-4">
                    Key Takeaways
                  </h2>

                  <ul class="list-disc list-inside space-y-2 text-gray-700">
                    <li>First important point about the topic</li>
                    <li>Second key insight that readers should remember</li>
                    <li>Third actionable takeaway for implementation</li>
                    <li>Fourth consideration for future planning</li>
                  </ul>

                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                    magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                </div>
              </div>

              <!-- Article Footer -->
              <div class="border-t border-gray-200 mt-12 pt-8">
                <div
                  class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-500">Share this article:</span>
                    <div class="flex space-x-2">
                      <button
                        class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-colors duration-200">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </button>
                      <button
                        class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-colors duration-200">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </button>
                      <button
                        class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-colors duration-200">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <button @click="closeModal" class="btn-secondary">
                    Close Article
                  </button>
                </div>
              </div>

              <!-- Comments Section -->
              <CommentsSection :article-id="article.id" :comments="comments" @add-comment="handleAddComment"
                @reply-to-comment="handleReplyToComment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { BlogPost, Comment } from '../types/blog'
import { comments as allComments } from '../data/blog-data'
import CommentsSection from './CommentsSection.vue'

interface Props {
  isOpen: boolean
  article: BlogPost | null
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

// Comments state
const comments = ref<Comment[]>(allComments)

function closeModal(): void {
  emit('close')
}

function handleAddComment(newComment: Comment): void {
  comments.value.push(newComment)
}

function handleReplyToComment(replyData: { commentId: string; reply: Comment }): void {
  const comment = comments.value.find(c => c.id === replyData.commentId)
  if (comment) {
    if (!comment.replies) {
      comment.replies = []
    }
    comment.replies.push(replyData.reply)
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
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
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

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
