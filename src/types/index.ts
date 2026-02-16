/**
 * 待办项优先级/象限类型
 */
export type QuadrantType = 'q1' | 'q2' | 'q3' | 'q4'

/**
 * 待办项数据模型
 */
export interface Todo {
  /** 唯一标识 */
  id: string
  /** 内容 */
  content: string
  /** 是否紧急 */
  isUrgent: boolean
  /** 是否重要 */
  isImportant: boolean
  /** 是否完成 */
  isCompleted: boolean
  /** 排序权重 */
  order: number
  /** 创建时间 */
  createdAt: number
  /** 更新时间 */
  updatedAt: number
}

/**
 * 创建待办项的请求数据
 */
export interface CreateTodoRequest {
  content: string
  isUrgent: boolean
  isImportant: boolean
}

/**
 * 更新待办项的请求数据
 */
export interface UpdateTodoRequest {
  content?: string
  isUrgent?: boolean
  isImportant?: boolean
  isCompleted?: boolean
  order?: number
}

/**
 * 象限配置
 */
export interface QuadrantConfig {
  type: QuadrantType
  title: string
  subtitle: string
  isUrgent: boolean
  isImportant: boolean
  bgColor: string
  borderColor: string
  textColor: string
}

/**
 * API响应格式
 */
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

/**
 * 拖拽排序更新项
 */
export interface ReorderUpdate {
  id: string
  order: number
  isUrgent?: boolean
  isImportant?: boolean
}
