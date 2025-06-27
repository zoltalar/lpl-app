import { useCriterionStore } from '@/store/criterion'

export default function useCriterion() {
  // Composables
  const criterionStore = useCriterionStore()
  // Computed
  const operators = computed<Record<string,string>>(() => {
    return criterionStore.getMeta.operators
  })
  return {
    operators
  }
}