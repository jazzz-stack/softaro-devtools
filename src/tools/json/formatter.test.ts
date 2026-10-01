import { describe, it, expect } from 'vitest'
import {
  validateJSON,
  parseJSON,
  formatJSON,
  minifyJSON,
  getCompressionStats,
} from '../src/tools/json/formatter'

describe('JSON Formatter Utilities', () => {
  describe('validateJSON', () => {
    it('should validate valid JSON', () => {
      const result = validateJSON('{"name": "John", "age": 30}')
      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should reject invalid JSON', () => {
      const result = validateJSON('{invalid json}')
      expect(result.isValid).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should reject empty input', () => {
      const result = validateJSON('')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('empty')
    })

    it('should handle arrays', () => {
      const result = validateJSON('[1, 2, 3]')
      expect(result.isValid).toBe(true)
    })

    it('should handle nested objects', () => {
      const result = validateJSON('{"user": {"name": "John", "details": {"age": 30}}}')
      expect(result.isValid).toBe(true)
    })
  })

  describe('parseJSON', () => {
    it('should parse valid JSON', () => {
      const result = parseJSON('{"name": "John", "age": 30}')
      expect(result.success).toBe(true)
      expect(result.data).toEqual({ name: 'John', age: 30 })
    })

    it('should return error for invalid JSON', () => {
      const result = parseJSON('{invalid}')
      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })
  })

  describe('formatJSON', () => {
    const json = '{"name":"John","age":30,"city":"New York"}'

    it('should format JSON with 2 spaces', () => {
      const result = formatJSON(json, 2)
      expect(result.success).toBe(true)
      expect(result.output).toContain('\n  "name"')
    })

    it('should format JSON with 4 spaces', () => {
      const result = formatJSON(json, 4)
      expect(result.success).toBe(true)
      expect(result.output).toContain('\n    "name"')
    })

    it('should format JSON with tabs', () => {
      const result = formatJSON(json, 'tab')
      expect(result.success).toBe(true)
      expect(result.output).toContain('\t"name"')
    })

    it('should return error for invalid JSON', () => {
      const result = formatJSON('{invalid}', 2)
      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })
  })

  describe('minifyJSON', () => {
    const json = '{\n  "name": "John",\n  "age": 30\n}'

    it('should minify JSON', () => {
      const result = minifyJSON(json)
      expect(result.success).toBe(true)
      expect(result.output).not.toContain('\n')
      expect(result.output).toBe('{"name":"John","age":30}')
    })

    it('should return error for invalid JSON', () => {
      const result = minifyJSON('{invalid}')
      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })
  })

  describe('getCompressionStats', () => {
    const original = '{\n  "name": "John",\n  "age": 30\n}'
    const minified = '{"name":"John","age":30}'

    it('should calculate compression statistics', () => {
      const stats = getCompressionStats(original, minified)
      expect(stats.originalSize).toBeGreaterThan(0)
      expect(stats.minifiedSize).toBeGreaterThan(0)
      expect(stats.originalSize).toBeGreaterThan(stats.minifiedSize)
      expect(stats.saved).toBeGreaterThan(0)
      expect(stats.percentage).toBeGreaterThan(0)
    })

    it('should have zero savings for identical strings', () => {
      const same = '{"test":"value"}'
      const stats = getCompressionStats(same, same)
      expect(stats.saved).toBe(0)
      expect(stats.percentage).toBe(0)
    })
  })
})
