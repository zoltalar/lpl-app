import { useCategoryStore } from '~/store/category'
import type { ICategory, IList } from '~/types'
export default function useListForm() {
  const fields = {
    name: '',
    description: '',
    list_order: 0,
    active: 0,
    category_id: null
  }
  const form: Partial<IList> = reactive({...fields})
  const categoryStore = useCategoryStore()
  // Computed
  const categories = computed<ICategory[]>(() => {
    return categoryStore.getCollection
  })
  // Functions
  const fetchCategories = async () => {
    const response = await categoryStore.fetchCollection()
    categoryStore.setCollection(response.data)
  }
  return {
    form,
    categories,
    fetchCategories
  }
}