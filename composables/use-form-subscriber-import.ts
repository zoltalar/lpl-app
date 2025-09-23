export default function useFormSubscriberImport() {
  // Vars
  const subscriberLists = ref<number[]>([])
  // Composables
  const {
    busy: busyRefreshLists,
    lists,
    refresh: refreshLists,
    type: listType
  } = useMailingList()
  // Return
  return {
    busyRefreshLists,
    lists,
    subscriberLists,
    // Functions
    listType,
    refreshLists
  }
}