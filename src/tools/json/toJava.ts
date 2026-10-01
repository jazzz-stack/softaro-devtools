import { parseJSON } from './formatter'

type JavaType = 'String' | 'int' | 'long' | 'double' | 'boolean' | 'Object'

/**
 * Infer Java type from JSON value
 */
const inferJavaType = (value: unknown): JavaType => {
  if (value === null) return 'Object'
  if (Array.isArray(value)) return 'Object'
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'long' : 'double'
  }
  if (typeof value === 'string') return 'String'
  if (typeof value === 'object') return 'Object'
  return 'Object'
}

/**
 * Convert property name to camelCase
 */
const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase())
}

/**
 * Generate Java POJO from JSON
 */
export const jsonToJava = (
  jsonString: string,
  className = 'Model',
  options: {
    useLombok?: boolean
    useJackson?: boolean
  } = {}
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
    const lines: string[] = []

    // Add imports
    if (options.useLombok) {
      lines.push('import lombok.Data;')
      lines.push('')
    }
    if (options.useJackson) {
      lines.push('import com.fasterxml.jackson.annotation.JsonProperty;')
      lines.push('')
    }

    // Add class annotation
    if (options.useLombok) {
      lines.push('@Data')
    }
    lines.push(`public class ${className} {`)
    lines.push('')

    // Add fields
    for (const [key, value] of Object.entries(obj)) {
      const fieldType = inferJavaType(value)
      const fieldName = toCamelCase(key)

      // Add Jackson annotation if needed and key differs from camelCase
      if (options.useJackson && key !== fieldName) {
        lines.push(`  @JsonProperty("${key}")`)
      }

      lines.push(`  private ${fieldType} ${fieldName};`)
      lines.push('')
    }

    // Add getters and setters if not using Lombok
    if (!options.useLombok) {
      for (const [key, value] of Object.entries(obj)) {
        const fieldType = inferJavaType(value)
        const fieldName = toCamelCase(key)
        const methodName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)

        lines.push(`  public ${fieldType} get${methodName}() {`)
        lines.push(`    return this.${fieldName};`)
        lines.push(`  }`)
        lines.push('')

        lines.push(`  public void set${methodName}(${fieldType} ${fieldName}) {`)
        lines.push(`    this.${fieldName} = ${fieldName};`)
        lines.push(`  }`)
        lines.push('')
      }
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
      error: err.message || 'Failed to generate Java class',
    }
  }
}
