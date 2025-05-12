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
  const refresh = async (): Promise<void> => {
    busy.value = true
    await configurationStore.refreshCollection()
    setTimeout(() => {
      busy.value = false
    }, 1000)
  }
  const value = (configuration: IConfiguration | undefined): string => {
    if (configuration) {
      return configuration.value as string
    }
    return ''
  }
  return {
    // Vars
    busy,
    // Computed
    configurations,
    // Functions
    findBySlug,
    refresh,
    value
  }
}