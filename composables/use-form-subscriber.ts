import type { IMailingList } from '@/types'

export default function useFormSubscriber() {
  // Vars
  const subscriberAttributes = ref<Record<string,any>>({})
  const subscriberLists = ref<number[]>([])
  // Composables
  const {
    attributes,
    busy: busyRefreshAttributes,
    normalizeValue: normalizeAttributeValue,
    refresh: refreshAttributes
  } = useAttribute()
  const {
    busy: busyRefreshLists,
    lists: unfilteredLists,
    refresh: refreshLists,
    type: listType
  } = useMailingList()
  const { inputType, inputIcon, toggleInput } = usePassword()
  // Computed
  const lists = computed<IMailingList[]>(() => {
    return unfilteredLists.value.filter((list: IMailingList) => {
      return list.type === 'public'
    })
  })
  return {
    // Vars
    attributes,
    subscriberAttributes,
    subscriberLists,
    busyRefreshAttributes,
    busyRefreshLists,
    lists,
    inputType,
    inputIcon,
    // Functions
    normalizeAttributeValue,
    refreshAttributes,
    refreshLists,
    toggleInput,
    listType
  }
}