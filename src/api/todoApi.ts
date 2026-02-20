import type { Todo, CreateTodoRequest, UpdateTodoRequest, ReorderUpdate } from '@/types'

/**
 * 待办项 API 接口 - 预埋
 *
 * 当前实现使用 LocalStorage
 * 后续后端开发完成后，替换为实际的 HTTP API 调用
 */

const STORAGE_KEY = 'quad-todo-items'

/**
 * 从 LocalStorage 获取所有待办项
 */
const getFromStorage = (): Todo[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

/**
 * 保存待办项到 LocalStorage
 */
const saveToStorage = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

/**
 * 生成唯一ID
 */
const generateId = (): string => {
  return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 获取当前最大排序值
 */
const getMaxOrder = (): number => {
  const todos = getFromStorage()
  if (todos.length === 0) return 0
  return Math.max(...todos.map(t => t.order), 0)
}

export const todoApi = {
  /**
   * 获取所有待办项
   */
  async getAll(): Promise<Todo[]> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 100))
    return getFromStorage()
  },

  /**
   * 创建待办项
   */
  async create(request: CreateTodoRequest): Promise<Todo> {
    await new Promise(resolve => setTimeout(resolve, 100))

    const todo: Todo = {
      id: generateId(),
      content: request.content,
      isUrgent: request.isUrgent,
      isImportant: request.isImportant,
      isCompleted: false,
      hasDocument: false,
      order: getMaxOrder() + 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    const todos = getFromStorage()
    todos.push(todo)
    saveToStorage(todos)

    return todo
  },

  /**
   * 更新待办项
   */
  async update(id: string, request: UpdateTodoRequest): Promise<Todo> {
    await new Promise(resolve => setTimeout(resolve, 100))

    const todos = getFromStorage()
    const index = todos.findIndex(t => t.id === id)

    if (index === -1) {
      throw new Error(`Todo not found: ${id}`)
    }

    const updatedTodo = {
      ...todos[index],
      ...request,
      updatedAt: Date.now(),
    }

    todos[index] = updatedTodo
    saveToStorage(todos)

    return updatedTodo
  },

  /**
   * 删除待办项
   */
  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100))

    const todos = getFromStorage()
    const filtered = todos.filter(t => t.id !== id)
    saveToStorage(filtered)
  },

  /**
   * 批量更新排序
   */
  async reorder(updates: ReorderUpdate[]): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100))

    const todos = getFromStorage()

    updates.forEach(update => {
      const todo = todos.find(t => t.id === update.id)
      if (todo) {
        todo.order = update.order
        if (update.isUrgent !== undefined) todo.isUrgent = update.isUrgent
        if (update.isImportant !== undefined) todo.isImportant = update.isImportant
        todo.updatedAt = Date.now()
      }
    })

    saveToStorage(todos)
  },
}
