export default function useString() {
  // Composables
  const { $_ } = useNuxtApp()
  // Functions
  const phrases = (string: string): any[] => {
    let phrases: any[] = []
    if (string) {
      string.split(/\r?\n/).forEach((row: string) => {
        row.split(/;|,/).forEach((word: string) => {
          word = $_.trim(word)
          if (word) {
            phrases.push(word)
          }
        })
      })
      phrases = $_.uniq(phrases)
    }
    return phrases
  }
  const truncate = (string: string|null, length: number): string => {
    if (! string) {
      return ''
    }
    if (string.length <= length) {
      return string
    }
    return string.substring(0, length) + '...'
  }
  return {
    phrases,
    truncate
  }
}