import { useMailingListStore } from '@/store/mailing-list'
import type { IMailingList } from '@/types'

export default function useMailingList() {
  // Vars
  const busy = ref<boolean>(false)
  // Composables
  const mailingListStore = useMailingListStore()
  // Computed
  const lists = computed<IMailingList[]>(() => {
    return mailingListStore.getCollection
  })
  const types = computed<Record<string,string>>(() => {
    return mailingListStore.getMeta.types
  })
  // Functions
  const refresh = async (): Promise<void> => {
    busy.value = true
    await mailingListStore.refreshCollection()
    setTimeout(() => {
      busy.value = false
    }, 1000)
  }
  const type = (type: string): string => {
    return types.value[type] ?? ''
  }
  return {
    busy,
    lists,
    types,
    refresh,
    type
  }
}