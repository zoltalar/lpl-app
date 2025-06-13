import type { IAttribute, IMailingList } from '@/types'

export default function useFormSubscribePage() {
  // Vars
  const pageAttributes = ref<number[]>([])
  const pageLists = ref<number[]>([])
  // Composables
  const {
    attributes: unsortedAttributes,
    busy: busyRefreshAttributes,
    label: attributeLabel,
    refresh: refreshAttributes
  } = useAttribute()
  const { languages } = useLanguage()
  const {
    busy: busyRefreshLists,
    lists: unalteredLists,
    refresh: refreshLists,
    type: listType
  } = useMailingList()
  const { emailFormats } = useSubscribePage()
  const { $_ } = useNuxtApp()
  // Computed
  const attributes = computed<IAttribute[]>(() => {
    return $_.sortBy(unsortedAttributes.value, 'list_order')
  })
  const lists = computed<IMailingList[]>(() => {
    const lists = unalteredLists.value.filter((list: IMailingList) => {
      return list.type === 'public' && list.active === 1
    })
    return $_.sortBy(lists, ['list_order', 'name'])
  })
  return {
    // Vars
    pageAttributes,
    pageLists,
    // Computed
    attributes,
    languages,
    emailFormats,
    busyRefreshAttributes,
    busyRefreshLists,
    lists,
    // Functions
    attributeLabel,
    listType,
    refreshAttributes,
    refreshLists
  }
}