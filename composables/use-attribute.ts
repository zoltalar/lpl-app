import { useAttributeStore } from '@/store/attribute'
export default function useAttribute() {
  // Composables
  const attributeStore = useAttributeStore()
  // Computed
  const inputTypes = computed<Record<number,string>>(() => {
    return attributeStore.getMeta.input_types
  })
  return {
    inputTypes
  }
}