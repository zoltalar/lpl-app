export default function useFormSubscriber() {
  // Vars
  const subscriberLists = ref<number[]>([])
  // Composables
  const { busy: busyRefreshLists, lists, refresh: refreshLists } = useMailingList()
  const { inputType, inputIcon, toggleInput } = usePassword()
  return {
    // Vars
    subscriberLists,
    busyRefreshLists,
    lists,
    inputType,
    inputIcon,
    // Functions
    refreshLists,
    toggleInput
  }
}