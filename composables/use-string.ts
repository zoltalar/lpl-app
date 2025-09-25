export default function useString() {
  // Composables
  const { $_ } = useNuxtApp()
  // Functions
  const nl2br = (string: string | null | undefined, xhtml: boolean = true): string => {
    if (typeof string === 'undefined' || string === null) {
      return ''
    }
    const tag = (xhtml || typeof xhtml === 'undefined') ? '<br />' : '<br>'
    return string.toString().replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + tag + '$2')
  }
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
    nl2br,
    phrases,
    truncate
  }
}