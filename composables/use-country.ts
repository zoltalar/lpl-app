import { useCountryStore } from '@/store/country'
import type { ICountry } from '@/types'

export default function useCountry() {
  // Composables
  const countryStore = useCountryStore()
  // Computed
  const countries = computed<ICountry[]>(() => {
    return countryStore.getCollection
  })
  return {
    countries
  }
}