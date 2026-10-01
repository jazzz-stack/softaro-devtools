export interface ValidationResult {
  isValid: boolean
  error?: string
  message?: string
}

export interface TransformResult<T = string> {
  success: boolean
  data?: T
  error?: string
}
