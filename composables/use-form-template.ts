import type { ITemplate } from '@/types'

export default function useFormTemplate() {
  // Vars
  const fields = {
    name: '',
    content: ''
  }
  const form: Partial<ITemplate> = reactive({...fields})
  const options: Record<string, number> = reactive({})
  return {
    fields,
    form,
    options
  }
}