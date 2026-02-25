import JSZip from 'jszip'
import { open } from '@tauri-apps/plugin-dialog'
import { readFile, writeTextFile, remove, exists, mkdir, readDir } from '@tauri-apps/plugin-fs'
import { appDataDir, join } from '@tauri-apps/api/path'
import type { Todo } from '@/types'

const STORAGE_KEY = 'quad-todo-items'
const DOCS_FOLDER = 'docs'

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
 * 获取文档目录路径
 */
async function getDocsPath(): Promise<string> {
  const appData = await appDataDir()
  return await join(appData, DOCS_FOLDER)
}

/**
 * 确保文档目录存在
 */
async function ensureDocsDir(): Promise<string> {
  const docsPath = await getDocsPath()
  const dirExists = await exists(docsPath)
  if (!dirExists) {
    await mkdir(docsPath, { recursive: true })
  }
  return docsPath
}

/**
 * 导入模式
 */
export type ImportMode = 'merge' | 'replace' | 'incremental'

/**
 * 验证 ZIP 文件结构
 */
async function validateZipFile(filePath: string): Promise<JSZip> {
  try {
    const fileData = await readFile(filePath)
    const zip = await JSZip.loadAsync(fileData)

    if (!zip.file('todos.json')) {
      throw new Error('Invalid export file: missing todos.json')
    }

    return zip
  } catch (error) {
    if (error instanceof Error) {
      // 文件格式错误（非 ZIP 文件）
      if (error.message.includes('End of data') || error.message.includes('Invalid') || error.message.includes('corrupt')) {
        throw new Error('无效的文件格式，请选择 ZIP 文件')
      }
    }
    throw error
  }
}

/**
 * 解析 ZIP 内容
 */
async function parseZipContent(zip: JSZip): Promise<{ todos: Todo[]; documents: Record<string, string> }> {
  // 解析 todos.json
  const todosJson = await zip.file('todos.json')?.async('string')
  if (!todosJson) {
    throw new Error('Invalid export file: corrupted data')
  }

  let todos: Todo[]
  try {
    todos = JSON.parse(todosJson)
  } catch {
    throw new Error('Invalid export file: corrupted JSON')
  }

  // 解析文档
  const documents: Record<string, string> = {}
  const docsFolder = zip.folder('docs')
  if (docsFolder) {
    const files = docsFolder.file(/.*\.md$/)
    for (const file of files) {
      const name = file.name.replace('docs/', '')
      const content = await file.async('string')
      documents[name.replace('.md', '')] = content
    }
  }

  return { todos, documents }
}

/**
 * 合并导入 - 保留本地 + 添加导入的新待办
 */
async function importMerge(importedTodos: Todo[], importedDocuments: Record<string, string>): Promise<number> {
  const localTodos = getFromStorage()
  const existingIds = new Set(localTodos.map(t => t.id))

  // 添加导入的待办（跳过已存在的 ID）
  const newTodos = importedTodos.filter(t => !existingIds.has(t.id))
  const allTodos = [...localTodos, ...newTodos]

  saveToStorage(allTodos)

  // 保存导入的文档
  const docsPath = await ensureDocsDir()
  for (const [todoId, content] of Object.entries(importedDocuments)) {
    if (!existingIds.has(todoId)) {
      const filePath = await join(docsPath, `${todoId}.md`)
      await writeTextFile(filePath, content)
    }
  }

  return newTodos.length
}

/**
 * 替换导入 - 清空本地 + 导入全部
 */
async function importReplace(importedTodos: Todo[], importedDocuments: Record<string, string>): Promise<number> {
  // 清空本地数据
  const docsPath = await ensureDocsDir()

  // 删除所有现有文档
  const entries = await readDir(docsPath)
  for (const entry of entries) {
    if (entry.name) {
      const filePath = await join(docsPath, entry.name)
      await remove(filePath)
    }
  }

  // 保存导入数据
  saveToStorage(importedTodos)

  // 保存导入的文档
  for (const [todoId, content] of Object.entries(importedDocuments)) {
    const filePath = await join(docsPath, `${todoId}.md`)
    await writeTextFile(filePath, content)
  }

  return importedTodos.length
}

/**
 * 增量导入 - 相同 ID 覆盖，不同 ID 保留本地 + 添加新导入
 */
async function importIncremental(importedTodos: Todo[], importedDocuments: Record<string, string>): Promise<number> {
  const localTodos = getFromStorage()
  const todoMap = new Map(localTodos.map(t => [t.id, t]))
  let updatedCount = 0

  // 处理每个导入的待办
  for (const importedTodo of importedTodos) {
    if (todoMap.has(importedTodo.id)) {
      // 覆盖现有待办
      todoMap.set(importedTodo.id, importedTodo)
      updatedCount++
    } else {
      // 添加新待办
      todoMap.set(importedTodo.id, importedTodo)
    }
  }

  // 保存更新后的待办列表
  const allTodos = Array.from(todoMap.values())
  saveToStorage(allTodos)

  // 处理文档
  const docsPath = await ensureDocsDir()
  for (const [todoId, content] of Object.entries(importedDocuments)) {
    const filePath = await join(docsPath, `${todoId}.md`)
    await writeTextFile(filePath, content)
  }

  return updatedCount
}

export const importApi = {
  /**
   * 导入待办数据
   * @param mode 导入模式
   * @returns 导入的待办数量
   */
  async importAll(mode: ImportMode): Promise<number> {
    try {
      // 打开文件选择对话框
      const filePath = await open({
        multiple: false,
        filters: [{ name: 'ZIP Archive', extensions: ['zip'] }],
      })

      if (!filePath || typeof filePath !== 'string') {
        throw new Error('未选择文件')
      }

      // 验证 ZIP 文件
      const zip = await validateZipFile(filePath)

      // 解析内容
      const { todos, documents } = await parseZipContent(zip)

      // 根据模式导入
      switch (mode) {
        case 'merge':
          return await importMerge(todos, documents)
      case 'replace':
        return await importReplace(todos, documents)
      case 'incremental':
        return await importIncremental(todos, documents)
      default:
        throw new Error(`Unknown import mode: ${mode}`)
      }
    } catch (error) {
      console.error('Import error:', error)
      const message = error instanceof Error ? error.message : String(error)
      throw new Error(`导入失败: ${message}`)
    }
  },
}
