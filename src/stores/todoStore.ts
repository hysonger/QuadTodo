import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { todoApi } from '@/api/todoApi'
import { documentApi } from '@/api/documentApi'
import type { Todo, QuadrantType, CreateTodoRequest, UpdateTodoRequest, ReorderUpdate } from '@/types'

export const useTodoStore = defineStore('todos', () => {
  // State
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const q1Todos = computed(() => {
    return todos.value
      .filter(t => t.isUrgent && t.isImportant && !t.isCompleted)
      .sort((a, b) => a.order - b.order)
  })

  const q2Todos = computed(() => {
    return todos.value
      .filter(t => t.isUrgent && !t.isImportant && !t.isCompleted)
      .sort((a, b) => a.order - b.order)
  })

  const q3Todos = computed(() => {
    return todos.value
      .filter(t => !t.isUrgent && t.isImportant && !t.isCompleted)
      .sort((a, b) => a.order - b.order)
  })

  const q4Todos = computed(() => {
    return todos.value
      .filter(t => !t.isUrgent && !t.isImportant && !t.isCompleted)
      .sort((a, b) => a.order - b.order)
  })

  const completedTodos = computed(() => {
    return todos.value
      .filter(t => t.isCompleted)
      .sort((a, b) => b.updatedAt - a.updatedAt)
  })

  const q1CompletedTodos = computed(() => {
    return todos.value
      .filter(t => t.isUrgent && t.isImportant && t.isCompleted)
      .sort((a, b) => b.updatedAt - a.updatedAt)
  })

  const q2CompletedTodos = computed(() => {
    return todos.value
      .filter(t => t.isUrgent && !t.isImportant && t.isCompleted)
      .sort((a, b) => b.updatedAt - a.updatedAt)
  })

  const q3CompletedTodos = computed(() => {
    return todos.value
      .filter(t => !t.isUrgent && t.isImportant && t.isCompleted)
      .sort((a, b) => b.updatedAt - a.updatedAt)
  })

  const q4CompletedTodos = computed(() => {
    return todos.value
      .filter(t => !t.isUrgent && !t.isImportant && t.isCompleted)
      .sort((a, b) => b.updatedAt - a.updatedAt)
  })

  const getCompletedTodosByQuadrant = (type: QuadrantType) => {
    switch (type) {
      case 'q1': return q1CompletedTodos.value
      case 'q2': return q2CompletedTodos.value
      case 'q3': return q3CompletedTodos.value
      case 'q4': return q4CompletedTodos.value
      default: return []
    }
  }

  const getTodosByQuadrant = (type: QuadrantType) => {
    switch (type) {
      case 'q1': return q1Todos.value
      case 'q2': return q2Todos.value
      case 'q3': return q3Todos.value
      case 'q4': return q4Todos.value
      default: return []
    }
  }

  const getQuadrantCounts = computed(() => {
    return {
      q1: q1Todos.value.length,
      q2: q2Todos.value.length,
      q3: q3Todos.value.length,
      q4: q4Todos.value.length,
    }
  })

  // Actions
  const fetchTodos = async () => {
    loading.value = true
    error.value = null
    try {
      todos.value = await todoApi.getAll()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch todos'
      console.error('Failed to fetch todos:', err)
    } finally {
      loading.value = false
    }
  }

  const addTodo = async (request: CreateTodoRequest) => {
    try {
      const todo = await todoApi.create(request)
      todos.value.push(todo)
      return todo
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create todo'
      throw err
    }
  }

  const updateTodo = async (id: string, request: UpdateTodoRequest) => {
    try {
      const updated = await todoApi.update(id, request)
      const index = todos.value.findIndex(t => t.id === id)
      if (index !== -1) {
        todos.value[index] = updated
      }
      return updated
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update todo'
      throw err
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await todoApi.delete(id)
      todos.value = todos.value.filter(t => t.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete todo'
      throw err
    }
  }

  const toggleTodoComplete = async (id: string) => {
    const todo = todos.value.find(t => t.id === id)
    if (!todo) return
    await updateTodo(id, { isCompleted: !todo.isCompleted })
  }

  const updateTodoContent = async (id: string, content: string) => {
    await updateTodo(id, { content })
  }

  const moveTodo = async (id: string, targetQuadrant: QuadrantType) => {
    const updates: Partial<Todo> = {}
    switch (targetQuadrant) {
      case 'q1':
        updates.isUrgent = true
        updates.isImportant = true
        break
      case 'q2':
        updates.isUrgent = true
        updates.isImportant = false
        break
      case 'q3':
        updates.isUrgent = false
        updates.isImportant = true
        break
      case 'q4':
        updates.isUrgent = false
        updates.isImportant = false
        break
    }
    await updateTodo(id, updates)
  }

  const reorderTodos = async (updates: ReorderUpdate[]) => {
    try {
      await todoApi.reorder(updates)
      // Update local state
      updates.forEach(update => {
        const todo = todos.value.find(t => t.id === update.id)
        if (todo) {
          todo.order = update.order
          if (update.isUrgent !== undefined) todo.isUrgent = update.isUrgent
          if (update.isImportant !== undefined) todo.isImportant = update.isImportant
        }
      })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reorder todos'
      throw err
    }
  }

  const getTodoById = (id: string): Todo | undefined => {
    return todos.value.find(t => t.id === id)
  }

  const createDocument = async (todoId: string, content: string = '') => {
    try {
      await documentApi.createDocument(todoId, content)
      await updateTodo(todoId, { hasDocument: true })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create document'
      throw err
    }
  }

  const getDocument = async (todoId: string): Promise<string> => {
    try {
      return await documentApi.getDocument(todoId)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to get document'
      throw err
    }
  }

  const updateDocument = async (todoId: string, content: string) => {
    try {
      await documentApi.updateDocument(todoId, content)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update document'
      throw err
    }
  }

  const deleteDocument = async (todoId: string) => {
    try {
      await documentApi.deleteDocument(todoId)
      await updateTodo(todoId, { hasDocument: false })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete document'
      throw err
    }
  }

  const checkDocumentExists = async (todoId: string): Promise<boolean> => {
    try {
      return await documentApi.documentExists(todoId)
    } catch (err) {
      return false
    }
  }

  // Initialize
  fetchTodos()

  return {
    todos,
    loading,
    error,
    q1Todos,
    q2Todos,
    q3Todos,
    q4Todos,
    completedTodos,
    q1CompletedTodos,
    q2CompletedTodos,
    q3CompletedTodos,
    q4CompletedTodos,
    getQuadrantCounts,
    getTodosByQuadrant,
    getCompletedTodosByQuadrant,
    fetchTodos,
    addTodo,
    updateTodo,
    updateTodoContent,
    deleteTodo,
    toggleTodoComplete,
    moveTodo,
    reorderTodos,
    getTodoById,
    createDocument,
    getDocument,
    updateDocument,
    deleteDocument,
    checkDocumentExists,
  }
})
