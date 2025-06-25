import type { TUtmItems } from '@/types'

export default function useUtm() {
  // Vars
  const fields: TUtmItems = {
    utm_id: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: ''
  }
  const required: string[] = ['utm_source', 'utm_medium']
  return {
    fields,
    required
  }
}