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
  const mailSender = computed<Record<string, any>>(() => {
    return configurationStore.getMeta.mailsender
  })
  const types = computed<Record<string, string>>(() => {
    return configurationStore.getMeta.types
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
    mailSender,
    types,
    // Functions
    findBySlug,
    refresh,
    value
  }
}