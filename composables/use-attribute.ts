import { useAttributeStore } from '@/store/attribute'

export default function useAttribute() {
  // Vars
  const busy = ref<boolean>(false)
  // Composables
  const attributeStore = useAttributeStore()
  // Computed
  const inputTypes = computed<Record<number,string>>(() => {
    return attributeStore.getMeta.input_types
  })
  // Function
  const inputTypeName = (inputType: number): string => {
    return inputTypes.value[inputType] ?? ''
  }
  const refresh = async (): Promise<void> => {
    busy.value = true
    await attributeStore.refreshCollection()
    setTimeout(() => {
      busy.value = false
    }, 1000)
  }
  return {
    busy,
    inputTypes,
    inputTypeName,
    refresh
  }
}