import type { TUtm } from '@/types'

export default function useUtm() {
  const fields: TUtm = {
    utm_id: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: ''
  }
  return {
    fields
  }
}