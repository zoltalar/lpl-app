import { useTemplateStore } from '@/store/template'
import type { ITemplate } from '@/types'

export default function useTemplate() {
  // Vars
  const busy = ref<boolean>(false)
  // Composables
  const templateStore = useTemplateStore()
  // Computed
  const templates = computed<ITemplate[]>(() => {
    return templateStore.getCollection
  })
  // Functions
  const refresh = async (): Promise<void> => {
    busy.value = true
    await templateStore.refreshCollection()
    setTimeout(() => {
      busy.value = false
    }, 1000)
  }
  return {
    busy,
    templates,
    // Functions
    refresh
  }
}