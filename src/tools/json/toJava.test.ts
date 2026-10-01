import { describe, it, expect } from 'vitest'
import { jsonToJava } from '../src/tools/json/toJava'

describe('JSON to Java Converter', () => {
  it('should convert simple object to Java class', () => {
    const json = '{"name": "John", "age": 30}'
    const result = jsonToJava(json, 'User')
    expect(result.success).toBe(true)
    expect(result.output).toContain('public class User')
    expect(result.output).toContain('private String name')
    expect(result.output).toContain('private long age')
  })

  it('should include getters and setters by default', () => {
    const json = '{"name": "John"}'
    const result = jsonToJava(json, 'User')
    expect(result.success).toBe(true)
    expect(result.output).toContain('getName()')
    expect(result.output).toContain('setName(')
  })

  it('should use Lombok when enabled', () => {
    const json = '{"name": "John", "age": 30}'
    const result = jsonToJava(json, 'User', { useLombok: true })
    expect(result.success).toBe(true)
    expect(result.output).toContain('@Data')
    expect(result.output).toContain('import lombok.Data')
    // Should not have getters/setters when using Lombok
    expect(result.output).not.toContain('getName()')
  })

  it('should include Jackson annotations when enabled', () => {
    const json = '{"user_name": "John"}'
    const result = jsonToJava(json, 'User', { useJackson: true })
    expect(result.success).toBe(true)
    expect(result.output).toContain('import com.fasterxml.jackson.annotation.JsonProperty')
    expect(result.output).toContain('@JsonProperty("user_name")')
  })

  it('should convert snake_case to camelCase', () => {
    const json = '{"first_name": "John", "last_name": "Doe"}'
    const result = jsonToJava(json, 'User')
    expect(result.success).toBe(true)
    expect(result.output).toContain('private String firstName')
    expect(result.output).toContain('private String lastName')
  })

  it('should infer correct Java types', () => {
    const json = '{"name": "John", "age": 30, "height": 5.9, "active": true}'
    const result = jsonToJava(json, 'Profile')
    expect(result.success).toBe(true)
    expect(result.output).toContain('private String name')
    expect(result.output).toContain('private long age')
    expect(result.output).toContain('private double height')
    expect(result.output).toContain('private boolean active')
  })

  it('should use Object type for null values', () => {
    const json = '{"value": null}'
    const result = jsonToJava(json, 'Test')
    expect(result.success).toBe(true)
    expect(result.output).toContain('private Object value')
  })

  it('should reject non-object JSON', () => {
    const json = '["array"]'
    const result = jsonToJava(json, 'Test')
    expect(result.success).toBe(false)
    expect(result.error).toContain('must be an object')
  })

  it('should reject invalid JSON', () => {
    const json = '{invalid}'
    const result = jsonToJava(json, 'Test')
    expect(result.success).toBe(false)
  })

  it('should combine Lombok and Jackson', () => {
    const json = '{"user_name": "John"}'
    const result = jsonToJava(json, 'User', { useLombok: true, useJackson: true })
    expect(result.success).toBe(true)
    expect(result.output).toContain('@Data')
    expect(result.output).toContain('@JsonProperty')
  })

  it('should handle default class name', () => {
    const json = '{"test": "value"}'
    const result = jsonToJava(json)
    expect(result.success).toBe(true)
    expect(result.output).toContain('public class Model')
  })
})
