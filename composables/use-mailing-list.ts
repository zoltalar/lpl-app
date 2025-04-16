import { useMailingListStore } from '@/store/mailing-list'

export default function useMailingList() {
  // Composables
  const mailingListStore = useMailingListStore()
  // Computed
  const types = computed<Record<string,string>>(() => {
    return mailingListStore.getMeta.types
  })
  // Functions
  const type = (type: string): string => {
    return types.value[type] ?? ''
  }
  return {
    types,
    type
  }
}