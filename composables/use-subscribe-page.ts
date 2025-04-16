import { useSubscribePageStore } from '@/store/subscribe-page'
import type { TSubscribePageMeta } from '@/types'

export default function useSubscribePage() {
  // Composables
  const subscribePageStore = useSubscribePageStore()
  // Computed
  const emailFormats = computed<Record<string,string>>(() => {
    return subscribePageStore.getMeta.email_formats
  })
  // Functions
  const emailFormat = (format: string): string => {
    return emailFormats.value[format] ?? ''
  }
  return {
    emailFormats,
    emailFormat
  }
}