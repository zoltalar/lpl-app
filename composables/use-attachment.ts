import { useAttachmentStore } from '@/store/attachment'
import type { IAttachment } from '@/types'

export default function useAttachment() {
  // Vars
  const busy = ref<boolean>(false)
  // Composables
  const attachmentStore = useAttachmentStore()
  // Computed
  const attachments = computed<IAttachment[]>(() => {
    return attachmentStore.getCollection
  })
  // Functions
  const refresh = async (): Promise<void> => {
    busy.value = true
    await attachmentStore.refreshCollection()
    setTimeout(() => {
      busy.value = false
    }, 1000)
  }
  return {
    // Vars
    busy,
    // Computed
    attachments,
    // Functions
    refresh
  }
}