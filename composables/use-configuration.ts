import { useConfigurationStore } from '@/store/configuration'
import type { IConfiguration } from '@/types'

export default function useConfiguration() {
  // Vars
  const busy = ref<boolean>(false)
  // Composables
  const configurationStore = useConfigurationStore()
  // Computed
  const configurations = computed<IConfiguration[]>(() => {
    return configurationStore.getCollection
  })
  // Functions
  const findBySlug = (slug: string): IConfiguration | undefined => {
    return configurations.value.find((configuration: IConfiguration) => {
      return configuration.slug === slug
    })
  }
  return {
    // Vars
    busy,
    // Computed
    configurations,
    // Functions
    findBySlug
  }
}