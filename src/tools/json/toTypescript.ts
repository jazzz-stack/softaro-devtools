import { parseJSON } from './formatter'

/**
 * Infer TypeScript type from a JSON value
 */
const inferType = (value: unknown): string => {
  if (value === null) return 'null'
  if (Array.isArray(value)) {
    if (value.length === 0) return 'unknown[]'
    const types = new Set<string>()
    for (const item of value) {
      types.add(inferType(item))
    }
    const typeStr = Array.from(types).join(' | ')
    return `(${typeStr})[]`
  }
  switch (typeof value) {
    case 'boolean':
      return 'boolean'
    case 'number':
      return 'number'
    case 'string':
      return 'string'
    case 'object':
      return 'object'
    default:
      return 'unknown'
  }
}

/**
 * Extract properties from JSON object
 */
const extractProperties = (obj: Record<string, unknown>): Record<string, string> => {
  const properties: Record<string, string> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      properties[key] = 'object'
    } else {
      properties[key] = inferType(value)
    }
  }
  return properties
}

/**
 * Generate TypeScript interface from JSON
 */
export const jsonToTypeScript = (
  jsonString: string,
  interfaceName = 'Root'
): { success: boolean; output?: string; error?: string } => {
  const parsed = parseJSON(jsonString)
  if (!parsed.success || !parsed.data) {
    return {
      success: false,
      error: parsed.error || 'Failed to parse JSON',
    }
  }

  if (typeof parsed.data !== 'object' || parsed.data === null || Array.isArray(parsed.data)) {
    return {
      success: false,
      error: 'JSON must be an object',
    }
  }

  try {
    const obj = parsed.data as Record<string, unknown>
    const properties = extractProperties(obj)

    const lines: string[] = []
    lines.push(`interface ${interfaceName} {`)

    for (const [key, type] of Object.entries(properties)) {
      // Escape reserved words and special characters in property names
      const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`
      lines.push(`  ${safeName}: ${type};`)
    }

    lines.push('}')

    return {
      success: true,
      output: lines.join('\n'),
    }
  } catch (error) {
    const err = error as Error
    return {
      success: false,
      error: err.message || 'Failed to generate TypeScript interface',
    }
  }
}
