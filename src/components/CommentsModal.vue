<template>
    <Transition name="modal" appear>
        <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

            <!-- Modal Container -->
            <div class="relative min-h-screen flex items-center justify-center p-4">
                <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                        <div class="mb-8">
                            <h2 class="text-3xl font-bold text-primary mb-2">Comments</h2>
                            <p class="text-gray-600">{{ article?.title }}</p>
                        </div>

                        <!-- Comments List -->
                        <div class="space-y-6 mb-8">
                            <!-- Comment Item -->
                            <div v-for="comment in comments" :key="comment.id" class="bg-gray-50 rounded-lg p-4 mb-4">
                                <div class="flex items-start space-x-3">
                                    <!-- Avatar -->
                                    <div class="flex-shrink-0">
                                        <div v-if="comment.avatar" class="w-10 h-10 rounded-full overflow-hidden">
                                            <img :src="comment.avatar" :alt="comment.author"
                                                class="w-full h-full object-cover" />
                                        </div>
                                        <div v-else
                                            class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>

                                    <!-- Comment Content -->
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center space-x-2 mb-2">
                                            <span class="font-medium text-gray-900">{{ comment.author }}</span>

                                            <!-- Author Badge (if comment author is article author) -->
                                            <span v-if="comment.author === props.article?.author"
                                                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                                    </path>
                                                </svg>
                                                Author
                                            </span>

                                            <!-- Guest Badge -->
                                            <span v-if="comment.isGuest"
                                                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                Guest
                                            </span>
                                        </div>

                                        <p class="text-gray-700 text-sm mb-2">{{ comment.content }}</p>
                                        <span class="text-xs text-gray-500">{{ formatDate(comment.date) }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Empty State -->
                            <div v-if="comments.length === 0" class="text-center py-12">
                                <div
                                    class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                                        </path>
                                    </svg>
                                </div>
                                <h3 class="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
                                <p class="text-gray-600">Be the first to comment on this article!</p>
                            </div>
                        </div>

                        <!-- Add Comment Form -->
                        <div class="border-t border-gray-200 pt-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Add a Comment</h3>
                            <form @submit.prevent="submitComment" class="space-y-4">
                                <textarea v-model="newComment" rows="4" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                                    placeholder="Write your comment..."></textarea>
                                <div class="flex justify-end">
                                    <button type="submit" :disabled="!newComment.trim()"
                                        class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                                        Post Comment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCommentsStore } from '../stores/comments'
import { useAuthStore } from '../stores/auth'
import type { BlogPost } from '../types/blog'

interface Props {
    isOpen: boolean
    article: BlogPost | null
}

interface Emits {
    (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const commentsStore = useCommentsStore()
const authStore = useAuthStore()

// State
const newComment = ref('')

// Computed
const comments = computed(() => {
    if (!props.article) return []
    return commentsStore.getArticleComments(props.article.id)
})

// Methods
function closeModal(): void {
    emit('close')
    resetForm()
}

function resetForm(): void {
    newComment.value = ''
}

function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

async function submitComment(): Promise<void> {
    if (!newComment.value.trim() || !props.article) return

    const currentUser = authStore.currentUser
    const commentData = {
        articleId: props.article.id,
        author: currentUser?.fullName || 'Guest',
        authorId: currentUser?.id,
        content: newComment.value.trim(),
        isGuest: !currentUser || currentUser.isGuest
    }

    commentsStore.addComment(commentData)
    newComment.value = ''
}

// Handle escape key
function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
        closeModal()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
    if (props.article) {
        commentsStore.markCommentsAsRead(props.article.id)
    }
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
