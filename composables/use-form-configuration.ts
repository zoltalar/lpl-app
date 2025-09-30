import type { IConfiguration } from '@/types'

export default function useFormConfiguration() {
  // Vars
  const fields = {
    value: ''
  }
  const form = reactive<Partial<IConfiguration>>({...fields})
  // Return
  return {
    fields,
    form
  }
}