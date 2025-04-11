import { useLanguageStore } from '@/store/language'
import type { ILanguage } from '@/types'

export default function useLanguage() {
  // Composables
  const languageStore = useLanguageStore()
  // Computed
  const languages = computed<ILanguage[]>(() => {
    return languageStore.getCollection
  })
  // Functions
  const name = (code: string): string => {
    const language = languages.value.find((language: ILanguage) => {
      return language.code === code
    })
    if (language) {
      return language.name
    }
    return ''
  }
  return {
    languages,
    name
  }
}