import JSZip from 'jszip'
import { save } from '@tauri-apps/plugin-dialog'
import { writeFile, readDir, readTextFile, exists, mkdir } from '@tauri-apps/plugin-fs'
import { appDataDir, join } from '@tauri-apps/api/path'
import type { Todo } from '@/types'

const STORAGE_KEY = 'quad-todo-items'
const DOCS_FOLDER = 'docs'

/**
 * 从 LocalStorage 获取所有待办项
 */
const getAllTodos = (): Todo[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
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
 * 收集所有待办数据
 */
function collectTodos(): Todo[] {
  return getAllTodos()
}

/**
 * 收集所有文档
 */
async function collectDocuments(): Promise<Record<string, string>> {
  const documents: Record<string, string> = {}
  const docsPath = await ensureDocsDir()

  try {
    const entries = await readDir(docsPath)
    for (const entry of entries) {
      if (entry.name && entry.name.endsWith('.md')) {
        const todoId = entry.name.replace('.md', '')
        const filePath = await join(docsPath, entry.name)
        const content = await readTextFile(filePath)
        documents[todoId] = content
      }
    }
  } catch (error) {
    console.warn('Failed to read documents directory:', error)
  }

  return documents
}

/**
 * 创建 ZIP 包
 */
async function createZipBundle(todos: Todo[], documents: Record<string, string>): Promise<Blob> {
  const zip = new JSZip()

  // 添加 todos.json
  zip.file('todos.json', JSON.stringify(todos, null, 2))

  // 添加文档目录
  const docsFolder = zip.folder('docs')
  if (docsFolder) {
    for (const [todoId, content] of Object.entries(documents)) {
      docsFolder.file(`${todoId}.md`, content)
    }
  }

  return await zip.generateAsync({ type: 'blob' })
}

/**
 * 下载 ZIP 文件
 */
async function downloadZip(blob: Blob, filename: string): Promise<void> {
  // 转换为 ArrayBuffer
  const arrayBuffer = await blob.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)

  // 使用 Tauri 保存对话框
  const filePath = await save({
    defaultPath: filename,
    filters: [{ name: 'ZIP Archive', extensions: ['zip'] }],
  })

  if (filePath) {
    await writeFile(filePath, uint8Array)
  }
}

/**
 * 导出全部待办和文档
 */
export const exportApi = {
  /**
   * 导出所有待办数据为 ZIP 文件
   */
  async exportAll(): Promise<void> {
    try {
      // 收集数据
      const todos = collectTodos()
      const documents = await collectDocuments()

      // 生成文件名（包含时间戳）
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const filename = `quadtodo-export-${year}-${month}-${day}.zip`

      // 创建 ZIP
      const zipBlob = await createZipBundle(todos, documents)

      // 下载
      await downloadZip(zipBlob, filename)
    } catch (error) {
      console.error('Export error:', error)
      const message = error instanceof Error ? error.message : String(error)
      throw new Error(`导出失败: ${message}`)
    }
  },
}
