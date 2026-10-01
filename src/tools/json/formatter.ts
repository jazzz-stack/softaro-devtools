import type { ValidationResult } from '../../types/common'

/**
 * Validate JSON string
 */
export const validateJSON = (input: string): ValidationResult => {
  if (!input.trim()) {
    return {
      isValid: false,
      error: 'JSON input is empty',
    }
  }

  try {
    JSON.parse(input)
    return { isValid: true }
  } catch (error) {
    const err = error as SyntaxError
    let errorMessage = 'Invalid JSON'
    
    if (err.message) {
      const match = err.message.match(/position (\d+)/)
      if (match) {
        const position = parseInt(match[1], 10)
        const lines = input.substring(0, position).split('\n')
        const line = lines.length
        const column = lines[lines.length - 1].length + 1
        errorMessage = `Invalid JSON at line ${line}, column ${column}: ${err.message}`
      } else {
        errorMessage = `Invalid JSON: ${err.message}`
      }
    }

    return {
      isValid: false,
      error: errorMessage,
    }
  }
}

/**
 * Parse JSON safely
 */
export const parseJSON = (input: string): { success: boolean; data?: unknown; error?: string } => {
  try {
    const data = JSON.parse(input)
    return { success: true, data }
  } catch (error) {
    const err = error as Error
    return {
      success: false,
      error: err.message || 'Failed to parse JSON',
    }
  }
}

/**
 * Format JSON with indentation
 */
export const formatJSON = (
  input: string,
  indentation: 2 | 4 | 'tab' = 2
): { success: boolean; output?: string; error?: string } => {
  const validation = validateJSON(input)
  if (!validation.isValid) {
    return { success: false, error: validation.error }
  }

  try {
    const parsed = JSON.parse(input)
    const indent = indentation === 'tab' ? '\t' : ' '.repeat(indentation)
    const output = JSON.stringify(parsed, null, indent)
    return { success: true, output }
  } catch (error) {
    const err = error as Error
    return {
      success: false,
      error: err.message || 'Failed to format JSON',
    }
  }
}

/**
 * Minify JSON (remove whitespace)
 */
export const minifyJSON = (input: string): { success: boolean; output?: string; error?: string } => {
  const validation = validateJSON(input)
  if (!validation.isValid) {
    return { success: false, error: validation.error }
  }

  try {
    const parsed = JSON.parse(input)
    const output = JSON.stringify(parsed)
    return { success: true, output }
  } catch (error) {
    const err = error as Error
    return {
      success: false,
      error: err.message || 'Failed to minify JSON',
    }
  }
}

/**
 * Calculate JSON compression statistics
 */
export const getCompressionStats = (
  original: string,
  minified: string
): {
  originalSize: number
  minifiedSize: number
  saved: number
  percentage: number
} => {
  const originalSize = new Blob([original]).size
  const minifiedSize = new Blob([minified]).size
  const saved = originalSize - minifiedSize
  const percentage = originalSize > 0 ? Math.round((saved / originalSize) * 100) : 0

  return {
    originalSize,
    minifiedSize,
    saved,
    percentage,
  }
}
