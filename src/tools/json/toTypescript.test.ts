import { describe, it, expect } from 'vitest'
import { jsonToTypeScript } from '../src/tools/json/toTypescript'

describe('JSON to TypeScript Converter', () => {
  it('should convert simple object to TypeScript interface', () => {
    const json = '{"name": "John", "age": 30}'
    const result = jsonToTypeScript(json, 'User')
    expect(result.success).toBe(true)
    expect(result.output).toContain('interface User')
    expect(result.output).toContain('name: string')
    expect(result.output).toContain('age: number')
  })

  it('should handle different data types', () => {
    const json = '{"name": "John", "age": 30, "active": true, "score": 95.5}'
    const result = jsonToTypeScript(json, 'Profile')
    expect(result.success).toBe(true)
    expect(result.output).toContain('name: string')
    expect(result.output).toContain('age: number')
    expect(result.output).toContain('active: boolean')
    expect(result.output).toContain('score: number')
  })

  it('should handle null values', () => {
    const json = '{"name": "John", "email": null}'
    const result = jsonToTypeScript(json, 'User')
    expect(result.success).toBe(true)
    expect(result.output).toContain('email: null')
  })

  it('should handle arrays', () => {
    const json = '{"name": "John", "tags": ["developer", "designer"]}'
    const result = jsonToTypeScript(json, 'Profile')
    expect(result.success).toBe(true)
    expect(result.output).toContain('tags:')
  })

  it('should reject non-object JSON', () => {
    const json = '["array"]'
    const result = jsonToTypeScript(json, 'Test')
    expect(result.success).toBe(false)
    expect(result.error).toContain('must be an object')
  })

  it('should reject invalid JSON', () => {
    const json = '{invalid}'
    const result = jsonToTypeScript(json, 'Test')
    expect(result.success).toBe(false)
  })

  it('should use default interface name', () => {
    const json = '{"test": "value"}'
    const result = jsonToTypeScript(json)
    expect(result.success).toBe(true)
    expect(result.output).toContain('interface Root')
  })

  it('should handle special characters in keys', () => {
    const json = '{"user-name": "John", "first_name": "Jane"}'
    const result = jsonToTypeScript(json, 'User')
    expect(result.success).toBe(true)
    expect(result.output).toContain("'user-name'")
  })
})
