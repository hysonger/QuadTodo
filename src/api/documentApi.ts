import { appDataDir, join } from '@tauri-apps/api/path'
import { exists, mkdir, readTextFile, writeTextFile, remove } from '@tauri-apps/plugin-fs'

const DOCS_FOLDER = 'docs'

async function getDocsPath(): Promise<string> {
  const appData = await appDataDir()
  return await join(appData, DOCS_FOLDER)
}

async function ensureDocsDir(): Promise<string> {
  const docsPath = await getDocsPath()
  const dirExists = await exists(docsPath)
  if (!dirExists) {
    await mkdir(docsPath, { recursive: true })
  }
  return docsPath
}

async function getDocumentPath(todoId: string): Promise<string> {
  const docsPath = await ensureDocsDir()
  return await join(docsPath, `${todoId}.md`)
}

export const documentApi = {
  async createDocument(todoId: string, content: string = ''): Promise<string> {
    const filePath = await getDocumentPath(todoId)
    await writeTextFile(filePath, content)
    return content
  },

  async getDocument(todoId: string): Promise<string> {
    const filePath = await getDocumentPath(todoId)
    const fileExists = await exists(filePath)
    if (!fileExists) {
      return ''
    }
    return await readTextFile(filePath)
  },

  async updateDocument(todoId: string, content: string): Promise<void> {
    const filePath = await getDocumentPath(todoId)
    await writeTextFile(filePath, content)
  },

  async deleteDocument(todoId: string): Promise<void> {
    const filePath = await getDocumentPath(todoId)
    const fileExists = await exists(filePath)
    if (fileExists) {
      await remove(filePath)
    }
  },

  async documentExists(todoId: string): Promise<boolean> {
    const filePath = await getDocumentPath(todoId)
    return await exists(filePath)
  },
}
