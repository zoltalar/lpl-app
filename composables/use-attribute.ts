import { useAttributeStore } from '@/store/attribute'

export default function useAttribute() {
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
  return {
    inputTypes,
    inputTypeName
  }
}