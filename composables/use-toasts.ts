import type { TToastMessage } from '@/types'

export default function useToasts() {
  const messages = ref<TToastMessage[]>([])
  const addToast = (message: TToastMessage) => {
    messages.value.push(message)
  }
  return {
    messages,
    addToast
  }
}