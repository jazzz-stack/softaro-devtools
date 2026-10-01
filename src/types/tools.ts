export interface Tool {
  id: string
  name: string
  description: string
  path: string
  category: ToolCategory
  icon?: string
}

export type ToolCategory = 
  | 'JSON'
  | 'Encoding & Security'
  | 'Testing & Utilities'
  | 'Image Tools'

export interface ToolContextType {
  tools: Tool[]
  getTool: (id: string) => Tool | undefined
  getToolsByCategory: (category: ToolCategory) => Tool[]
}
