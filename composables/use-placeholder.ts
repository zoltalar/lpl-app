export default function usePlaceholder() {
  // Functions
  const format = (placeholder: string): string => {
    return ['[', placeholder.toUpperCase(), ']'].join('')
  }
  return {
    format
  }
}