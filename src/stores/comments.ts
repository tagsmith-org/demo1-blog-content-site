import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Comment } from '../types/blog'

export const useCommentsStore = defineStore('comments', () => {
  // State
  const comments = ref<Comment[]>([])

  // Получить комментарии для статьи
  function getArticleComments(articleId: string): Comment[] {
    return comments.value.filter(comment => comment.articleId === articleId)
  }

  // Получить количество новых комментариев
  function getNewCommentsCount(articleId: string): number {
    return comments.value.filter(comment => 
      comment.articleId === articleId && comment.isNew
    ).length
  }

  // Добавить комментарий
  function addComment(comment: Omit<Comment, 'id' | 'date'>): Comment {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      isNew: false
    }

    comments.value.push(newComment)
    localStorage.setItem('comments', JSON.stringify(comments.value))
    return newComment
  }

  // Отметить комментарии как прочитанные
  function markCommentsAsRead(articleId: string): void {
    comments.value.forEach(comment => {
      if (comment.articleId === articleId) {
        comment.isNew = false
      }
    })
    localStorage.setItem('comments', JSON.stringify(comments.value))
  }

  // Загрузить комментарии из localStorage
  function loadComments(): void {
    const saved = localStorage.getItem('comments')
    if (saved) {
      try {
        comments.value = JSON.parse(saved)
      } catch (error) {
        console.error('Failed to load comments:', error)
        comments.value = []
      }
    }
  }

  return {
    comments,
    getArticleComments,
    getNewCommentsCount,
    addComment,
    markCommentsAsRead,
    loadComments
  }
})
