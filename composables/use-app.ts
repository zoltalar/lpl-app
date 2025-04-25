import { useAttributeStore } from '@/store/attribute'
import { useConfigurationStore } from '@/store/configuration'
import { useCountryStore } from '@/store/country'
import { useLanguageStore } from '@/store/language'
import { useMailingListStore } from '@/store/mailing-list'
import { usePermissionStore } from '@/store/permission'
import { useRoleStore } from '@/store/role'
import { useSubscribePageStore } from '@/store/subscribe-page' 
import { useUserStore } from '@/store/user'

export default function useApp() {
  // Vars
  const progress = ref<number>(0)
  // Composables
  const { $_ } = useNuxtApp()
  const attributeStore = useAttributeStore()
  const configurationStore = useConfigurationStore()
  const countryStore = useCountryStore()
  const languageStore = useLanguageStore()
  const mailinglistStore = useMailingListStore()
  const permissionStore = usePermissionStore()
  const roleStore = useRoleStore()
  const subscribePageStore = useSubscribePageStore()
  const userStore = useUserStore()
  // Functions
  const fetchData = async (): Promise<Array<any>> => {
    const responses: any[] = []
    if ($_.isEmpty(attributeStore.getMeta)) {
      const meta = await attributeStore.fetchMeta()
      attributeStore.setMeta(meta)
      responses.push(meta)
    }
    if (attributeStore.getCollection.length === 0) {
      const attributes = await attributeStore.fetchCollection()
      attributeStore.setCollection(attributes)
      responses.push(attributes)
    }
    if (configurationStore.getCollection.length === 0) {
      const configurations = await configurationStore.fetchCollection()
    }
    if (countryStore.getCollection.length === 0) {
      const countries = await countryStore.fetchCollection()
      countryStore.setCollection(countries)
      responses.push(countries)
    }
    if (languageStore.getCollection.length === 0) {
      const languages = await languageStore.fetchCollection()
      languageStore.setCollection(languages)
      responses.push(languages)
    }
    if (mailinglistStore.getCollection.length === 0) {
      const lists = await mailinglistStore.fetchCollection()
      mailinglistStore.setCollection(lists)
      responses.push(lists)
    }
    if ($_.isEmpty(mailinglistStore.getMeta)) {
      const meta = await mailinglistStore.fetchMeta()
      mailinglistStore.setMeta(meta)
      responses.push(meta)
    }
    if (permissionStore.getCollection.length === 0) {
      const permissions = await permissionStore.fetchCollection()
      permissionStore.setCollection(permissions)
      responses.push(permissions)
    }
    if (roleStore.getCollection.length === 0) {
      const roles = await roleStore.fetchCollection()
      roleStore.setCollection(roles)
      responses.push(roles)
    }
    if ($_.isEmpty(subscribePageStore.getMeta)) {
      const meta = await subscribePageStore.fetchMeta()
      subscribePageStore.setMeta(meta)
      responses.push(meta)
    }
    if ($_.isEmpty(userStore.getMeta)) {
      const meta = await userStore.fetchMeta()
      userStore.setMeta(meta)
      responses.push(meta)
    }
    return responses
  }
  return {
    progress,
    fetchData
  }
}