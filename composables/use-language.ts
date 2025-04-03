import { useLanguageStore } from '@/store/language'
import type { ILanguage } from '@/types'

export default function useLanguage() {
  // Composables
  const languageStore = useLanguageStore()
  // Computed
  const languages = computed<ILanguage[]>(() => {
    return languageStore.getCollection
  })
  return {
    languages
  }
}