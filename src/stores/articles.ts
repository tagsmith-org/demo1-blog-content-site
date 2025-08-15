import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { blogPosts } from '../data/blog-data'
import type { BlogPost } from '../types/blog'

export const useArticlesStore = defineStore('articles', () => {
  // State - объединяем исходные статьи с новыми
  const originalPosts = ref<BlogPost[]>(blogPosts)
  const userArticles = ref<BlogPost[]>([])

  // Computed - все статьи
  const allArticles = computed(() => [...originalPosts.value, ...userArticles.value])

  // Получить статьи пользователя
  function getUserArticles(userId: string): BlogPost[] {
    return userArticles.value.filter(article => article.authorId === userId)
  }

  // Создать новую статью
  function createArticle(articleData: Omit<BlogPost, 'id' | 'date'>, userId: string): BlogPost {
    const newArticle: BlogPost = {
      ...articleData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      authorId: userId,
      isPublished: true // По умолчанию публикуем, но можно изменить на false для черновиков
    }

    console.log('Creating article:', newArticle)
    userArticles.value.push(newArticle)
    
    // Сохранить в localStorage для демонстрации
    localStorage.setItem('userArticles', JSON.stringify(userArticles.value))
    
    console.log('All user articles after creation:', userArticles.value)
    return newArticle
  }

  // Обновить статью
  function updateArticle(articleId: string, updates: Partial<BlogPost>): boolean {
    const articleIndex = userArticles.value.findIndex(article => article.id === articleId)
    
    if (articleIndex !== -1) {
      userArticles.value[articleIndex] = { ...userArticles.value[articleIndex], ...updates }
      localStorage.setItem('userArticles', JSON.stringify(userArticles.value))
      return true
    }
    
    return false
  }

  // Удалить статью
  function deleteArticle(articleId: string): boolean {
    const articleIndex = userArticles.value.findIndex(article => article.id === articleId)
    
    if (articleIndex !== -1) {
      userArticles.value.splice(articleIndex, 1)
      localStorage.setItem('userArticles', JSON.stringify(userArticles.value))
      return true
    }
    
    return false
  }

  // Загрузить статьи из localStorage
  function loadUserArticles(): void {
    const saved = localStorage.getItem('userArticles')
    if (saved) {
      try {
        userArticles.value = JSON.parse(saved)
      } catch (error) {
        console.error('Failed to load user articles:', error)
        userArticles.value = []
      }
    }
  }

  // Очистить все пользовательские статьи (для демо)
  function clearUserArticles(): void {
    userArticles.value = []
    localStorage.removeItem('userArticles')
  }

  return {
    allArticles,
    getUserArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    loadUserArticles,
    clearUserArticles
  }
})
