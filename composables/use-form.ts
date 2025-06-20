export default function useForm(prefix?: string) {
  // Vars
  const errors = ref<Record<string, string>>({})
  // Functions
  const clearErrors = (): void => {
    errors.value = {}
  }
  const error = (key: string): string | null => {
    return errors.value[key] || null
  }
  const getErrors = (errors: Record<string, string[]>): Record<string, string> => {
    clearErrors()
    const matrix: Record<string, string> = {}
    for (const property in errors) {
      if (errors[property].length > 0) {
        const error = errors[property][0]
        matrix[property] = error
      }
    }
    return matrix
  }
  const inputId = (field: string): string => {
    const elements: string[] = ['input']
    if (prefix) {
      elements.push(prefix)
    }
    elements.push(field)
    return elements.join('-')
  }
  return {
    errors,
    error,
    clearErrors,
    getErrors,
    inputId
  }
}