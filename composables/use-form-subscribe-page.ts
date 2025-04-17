import type { IMailingList } from '@/types'

export default function useFormSubscribePage() {
  // Vars
  const pageLists = ref<number[]>([])
  // Composables
  const { languages } = useLanguage()
  const { busy: busyRefreshLists, lists: unfilteredLists, refresh: refreshLists } = useMailingList()
  const { emailFormats } = useSubscribePage()
  // Computed
  const lists = computed<IMailingList[]>(() => {
    return unfilteredLists.value.filter((list: IMailingList) => {
      return list.type === 'public' && list.active === 1
    })
  })
  return {
    pageLists,
    languages,
    emailFormats,
    busyRefreshLists,
    lists,
    refreshLists
  }
}