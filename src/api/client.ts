/**
 * HTTP客户端配置 - API预埋
 *
 * 当前使用 LocalStorage 实现本地数据持久化
 * 后续后端开发完成后，替换此处的 fetch/axios 实现即可
 */

// @ts-expect-error Vite env
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/**
 * 模拟延迟，用于模拟网络请求
 */
const simulateDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * HTTP客户端
 */
export const httpClient = {
  /**
   * GET 请求
   */
  async get<T>(_url: string): Promise<T> {
    // TODO: 替换为实际的 HTTP 请求
    // const response = await fetch(`${BASE_URL}${_url}`)
    // return response.json()
    await simulateDelay()
    throw new Error('HTTP Client not implemented yet. Use localStorage API instead.')
  },

  /**
   * POST 请求
   */
  async post<T>(_url: string, _data: unknown): Promise<T> {
    // TODO: 替换为实际的 HTTP 请求
    await simulateDelay()
    throw new Error('HTTP Client not implemented yet. Use localStorage API instead.')
  },

  /**
   * PUT 请求
   */
  async put<T>(_url: string, _data: unknown): Promise<T> {
    // TODO: 替换为实际的 HTTP 请求
    await simulateDelay()
    throw new Error('HTTP Client not implemented yet. Use localStorage API instead.')
  },

  /**
   * PATCH 请求
   */
  async patch<T>(_url: string, _data: unknown): Promise<T> {
    // TODO: 替换为实际的 HTTP 请求
    await simulateDelay()
    throw new Error('HTTP Client not implemented yet. Use localStorage API instead.')
  },

  /**
   * DELETE 请求
   */
  async delete<T>(_url: string): Promise<T> {
    // TODO: 替换为实际的 HTTP 请求
    await simulateDelay()
    throw new Error('HTTP Client not implemented yet. Use localStorage API instead.')
  },
}
