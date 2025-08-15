<template>
    <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div class="flex space-x-4">
            <!-- Avatar -->
            <div class="flex-shrink-0">
                <img v-if="comment.avatar" :src="comment.avatar" :alt="comment.author"
                    class="w-12 h-12 rounded-full object-cover" />
                <div v-else class="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <span class="text-secondary font-medium text-lg">
                        {{ getInitials(comment.author) }}
                    </span>
                </div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-2">
                    <h4 class="text-sm font-semibold text-primary">
                        {{ comment.author }}
                    </h4>
                    <span v-if="comment.isGuest"
                        class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Guest</span>
                    <span class="text-xs text-gray-500">
                        {{ formatDate(comment.date) }}
                    </span>
                </div>

                <p class="text-gray-700 leading-relaxed mb-4">
                    {{ comment.content }}
                </p>

                <!-- Actions -->
                <div class="flex items-center space-x-4">
                    <button @click="toggleReply"
                        class="flex items-center space-x-1 text-sm text-gray-500 hover:text-secondary transition-colors duration-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                        </svg>
                        <span>{{ showReplyForm ? 'Cancel' : 'Reply' }}</span>
                    </button>

                    <button @click="toggleLike"
                        class="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-500 transition-colors duration-200"
                        :class="{ 'text-red-500': isLiked }">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                            </path>
                        </svg>
                        <span>{{ likeCount }}</span>
                    </button>
                </div>

                <!-- Reply Form -->
                <div v-if="showReplyForm" class="mt-4 animate-fade-in-up">
                    <form @submit.prevent="submitReply" class="bg-gray-50 rounded-lg p-4">
                        <div class="mb-3">
                            <label for="replyAuthor" class="block text-sm font-medium text-gray-700 mb-1">
                                Your Name
                            </label>
                            <input id="replyAuthor" v-model="replyForm.author" type="text" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm"
                                placeholder="Enter your name" />
                        </div>

                        <div class="mb-3">
                            <label for="replyContent" class="block text-sm font-medium text-gray-700 mb-1">
                                Reply
                            </label>
                            <textarea id="replyContent" v-model="replyForm.content" required rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none text-sm"
                                placeholder="Write your reply..."></textarea>
                        </div>

                        <div class="flex justify-end space-x-2">
                            <button type="button" @click="showReplyForm = false"
                                class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isSubmittingReply"
                                class="px-4 py-2 text-sm bg-secondary text-white rounded-md hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                <span v-if="!isSubmittingReply">Reply</span>
                                <span v-else>Posting...</span>
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Replies -->
                <div v-if="comment.replies && comment.replies.length > 0" class="mt-6 space-y-4">
                    <div v-for="reply in comment.replies" :key="reply.id" class="bg-gray-50 rounded-lg p-4 ml-8">
                        <div class="flex space-x-3">
                            <div class="flex-shrink-0">
                                <img v-if="reply.avatar" :src="reply.avatar" :alt="reply.author"
                                    class="w-8 h-8 rounded-full object-cover" />
                                <div v-else
                                    class="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                                    <span class="text-secondary font-medium text-sm">
                                        {{ getInitials(reply.author) }}
                                    </span>
                                </div>
                            </div>

                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <h5 class="text-sm font-semibold text-primary">
                                        {{ reply.author }}
                                    </h5>
                                    <span class="text-xs text-gray-500">
                                        {{ formatDate(reply.date) }}
                                    </span>
                                </div>

                                <p class="text-gray-700 text-sm leading-relaxed">
                                    {{ reply.content }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Comment, CommentForm } from '../types/blog'

interface Props {
    comment: Comment
}

interface Emits {
    (e: 'reply', data: { commentId: string; reply: Comment }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// State
const showReplyForm = ref(false)
const isSubmittingReply = ref(false)
const isLiked = ref(false)
const likeCount = ref(0)
const replyForm = ref<CommentForm>({
    author: '',
    content: ''
})

// Methods
function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
        return 'Just now'
    } else if (diffInHours < 24) {
        return `${diffInHours}h ago`
    } else {
        const diffInDays = Math.floor(diffInHours / 24)
        return `${diffInDays}d ago`
    }
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

function toggleReply(): void {
    showReplyForm.value = !showReplyForm.value
    if (!showReplyForm.value) {
        replyForm.value = { author: '', content: '' }
    }
}

function toggleLike(): void {
    isLiked.value = !isLiked.value
    likeCount.value += isLiked.value ? 1 : -1
}

async function submitReply(): Promise<void> {
    if (!replyForm.value.author.trim() || !replyForm.value.content.trim()) {
        return
    }

    isSubmittingReply.value = true

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    // Create reply object
    const reply: Comment = {
        id: Date.now().toString(),
        articleId: props.comment.articleId,
        author: replyForm.value.author,
        content: replyForm.value.content,
        date: new Date().toISOString()
        // No avatar - will use initials instead
    }

    // Emit reply event
    emit('reply', { commentId: props.comment.id, reply })

    // Reset form
    replyForm.value = { author: '', content: '' }
    showReplyForm.value = false
    isSubmittingReply.value = false
}
</script>
