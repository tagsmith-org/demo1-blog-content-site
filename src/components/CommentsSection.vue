<template>
    <section class="mt-12 border-t border-gray-200 pt-8">
        <div class="max-w-4xl mx-auto">
            <!-- Comments Header -->
            <div class="flex items-center justify-between mb-8">
                <h3 class="text-2xl font-bold text-primary">
                    Comments ({{ articleComments.length }})
                </h3>
                <button @click="showCommentForm = !showCommentForm" class="btn-primary">
                    {{ showCommentForm ? 'Cancel' : 'Add Comment' }}
                </button>
            </div>

            <!-- Comment Form -->
            <div v-if="showCommentForm" class="mb-8 animate-fade-in-up">
                <form @submit.prevent="submitComment" class="bg-gray-50 rounded-xl p-6">
                    <div class="mb-4">
                        <label for="author" class="block text-sm font-medium text-gray-700 mb-2">
                            Your Name
                        </label>
                        <input id="author" v-model="commentForm.author" type="text" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                            placeholder="Enter your name" />
                    </div>

                    <div class="mb-4">
                        <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
                            Comment
                        </label>
                        <textarea id="content" v-model="commentForm.content" required rows="4"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
                            placeholder="Share your thoughts..."></textarea>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button type="button" @click="showCommentForm = false"
                            class="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                            Cancel
                        </button>
                        <button type="submit" :disabled="isSubmitting"
                            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="!isSubmitting">Post Comment</span>
                            <span v-else class="flex items-center space-x-2">
                                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <span>Posting...</span>
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Comments List -->
            <div class="space-y-6">
                <CommentItem v-for="comment in articleComments" :key="comment.id" :comment="comment"
                    @reply="handleReply" />
            </div>

            <!-- Empty State -->
            <div v-if="articleComments.length === 0" class="text-center py-12">
                <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                        </path>
                    </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">No comments yet</h4>
                <p class="text-gray-600 mb-4">Be the first to share your thoughts!</p>
                <button @click="showCommentForm = true" class="btn-primary">
                    Add Comment
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import type { Comment, CommentForm } from '../types/blog'
import CommentItem from './CommentItem.vue'

const authStore = useAuthStore()

interface Props {
    articleId: string
    comments: Comment[]
}

interface Emits {
    (e: 'addComment', comment: Comment): void
    (e: 'replyToComment', data: { commentId: string; reply: Comment }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// State
const showCommentForm = ref(false)
const isSubmitting = ref(false)
const commentForm = ref<CommentForm>({
    author: authStore.currentUser?.fullName || 'Guest',
    content: ''
})

// Computed
const articleComments = computed(() =>
    props.comments.filter(comment => comment.articleId === props.articleId)
)

// Methods
async function submitComment(): Promise<void> {
    if (!commentForm.value.author.trim() || !commentForm.value.content.trim()) {
        return
    }

    isSubmitting.value = true

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newComment: Comment = {
        id: Date.now().toString(),
        articleId: props.articleId,
        author: commentForm.value.author,
        content: commentForm.value.content,
        date: new Date().toISOString(),
        isGuest: authStore.isGuest,
        userId: authStore.currentUser?.id
        // No avatar - will use initials instead
    }

    emit('addComment', newComment)

    // Reset form
    commentForm.value = {
        author: authStore.currentUser?.fullName || 'Guest',
        content: ''
    }
    showCommentForm.value = false
    isSubmitting.value = false
}

function handleReply(replyData: { commentId: string; reply: Comment }): void {
    emit('replyToComment', replyData)
}
</script>
