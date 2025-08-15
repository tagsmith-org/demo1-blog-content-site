import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ModalType = 'auth' | 'profile' | 'myArticles' | 'writeArticle' | 'editArticle' | 'comments' | 'article'

export const useModalStore = defineStore('modal', () => {
  // Стек открытых модальных окон
  const modalStack = ref<ModalType[]>([])

  // Открыть модальное окно
  function openModal(modalType: ModalType): void {
    modalStack.value.push(modalType)
    document.body.style.overflow = 'hidden'
  }

  // Закрыть последнее модальное окно
  function closeTopModal(): void {
    if (modalStack.value.length > 0) {
      modalStack.value.pop()
    }
    
    // Если стек пуст, восстановить скролл
    if (modalStack.value.length === 0) {
      document.body.style.overflow = 'auto'
    }
  }

  // Закрыть конкретное модальное окно и все выше него
  function closeModal(modalType: ModalType): void {
    const index = modalStack.value.indexOf(modalType)
    if (index !== -1) {
      modalStack.value = modalStack.value.slice(0, index)
    }
    
    if (modalStack.value.length === 0) {
      document.body.style.overflow = 'auto'
    }
  }

  // Проверить, открыто ли модальное окно
  function isModalOpen(modalType: ModalType): boolean {
    return modalStack.value.includes(modalType)
  }

  // Получить верхнее модальное окно
  function getTopModal(): ModalType | null {
    return modalStack.value.length > 0 ? modalStack.value[modalStack.value.length - 1] : null
  }

  return {
    modalStack,
    openModal,
    closeTopModal,
    closeModal,
    isModalOpen,
    getTopModal
  }
})
