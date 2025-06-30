import { useMessageStore } from '@/store/message'

export default function useMessage() {
  // Composables
  const messageStore = useMessageStore()
  // Computed
  const formats = computed<Record<string,string>>(() => {
    return messageStore.getMeta.formats
  })
  const operators = computed<Record<string,string>>(() => {
    return messageStore.getMeta.operators
  })
  const statuses = computed<Record<number,string>>(() => {
    return messageStore.getMeta.statuses
  })
  // Functions
  const format = (format: string): string => {
    return formats.value[format] ?? ''
  }
  const status = (status: number): string => {
    return statuses.value[status] ?? ''
  }
  return {
    // Computed
    formats,
    operators,
    statuses,
    // Functions
    format,
    status
  }
}