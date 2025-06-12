import { useAppStore } from '@/store/app'
import { useAttributeStore } from '@/store/attribute'
import { useConfigurationStore } from '@/store/configuration'
import { useCountryStore } from '@/store/country'
import { useLanguageStore } from '@/store/language'
import { useMailingListStore } from '@/store/mailing-list'
import { useMessageStore } from '@/store/message'
import { usePermissionStore } from '@/store/permission'
import { useRoleStore } from '@/store/role'
import { useSubscribePageStore } from '@/store/subscribe-page'
import { useTemplateStore } from '@/store/template'
import { useUserStore } from '@/store/user'

export default function useApp() {
  // Composables
  const { $_ } = useNuxtApp()
  const appStore = useAppStore()
  const attributeStore = useAttributeStore()
  const configurationStore = useConfigurationStore()
  const countryStore = useCountryStore()
  const languageStore = useLanguageStore()
  const mailinglistStore = useMailingListStore()
  const messageStore = useMessageStore()
  const permissionStore = usePermissionStore()
  const roleStore = useRoleStore()
  const subscribePageStore = useSubscribePageStore()
  const templateStore = useTemplateStore()
  const userStore = useUserStore()
  // Functions
  const fetchData = async (): Promise<Array<any>> => {
    const responses: any[] = []
    const increment = 7.69
    appStore.reset()
    if ($_.isEmpty(attributeStore.getMeta)) {
      const meta = await attributeStore.fetchMeta()
      attributeStore.setMeta(meta)
      responses.push(meta)
      appStore.increment(increment)
    }
    if (attributeStore.getCollection.length === 0) {
      const attributes = await attributeStore.fetchCollection()
      attributeStore.setCollection(attributes)
      responses.push(attributes)
      appStore.increment(increment)
    }
    if (configurationStore.getCollection.length === 0) {
      const configurations = await configurationStore.fetchCollection()
      configurationStore.setCollection(configurations)
      responses.push(configurations)
      appStore.increment(increment)
    }
    if (countryStore.getCollection.length === 0) {
      const countries = await countryStore.fetchCollection()
      countryStore.setCollection(countries)
      responses.push(countries)
      appStore.increment(increment)
    }
    if (languageStore.getCollection.length === 0) {
      const languages = await languageStore.fetchCollection()
      languageStore.setCollection(languages)
      responses.push(languages)
      appStore.increment(increment)
    }
    if (mailinglistStore.getCollection.length === 0) {
      const lists = await mailinglistStore.fetchCollection()
      mailinglistStore.setCollection(lists)
      responses.push(lists)
      appStore.increment(increment)
    }
    if ($_.isEmpty(mailinglistStore.getMeta)) {
      const meta = await mailinglistStore.fetchMeta()
      mailinglistStore.setMeta(meta)
      responses.push(meta)
      appStore.increment(increment)
    }
    if ($_.isEmpty(messageStore.getMeta)) {
      const meta = await messageStore.fetchMeta()
      messageStore.setMeta(meta)
      responses.push(meta)
      appStore.increment(increment)
    }
    if (permissionStore.getCollection.length === 0) {
      const permissions = await permissionStore.fetchCollection()
      permissionStore.setCollection(permissions)
      responses.push(permissions)
      appStore.increment(increment)
    }
    if (roleStore.getCollection.length === 0) {
      const roles = await roleStore.fetchCollection()
      roleStore.setCollection(roles)
      responses.push(roles)
      appStore.increment(increment)
    }
    if ($_.isEmpty(subscribePageStore.getMeta)) {
      const meta = await subscribePageStore.fetchMeta()
      subscribePageStore.setMeta(meta)
      responses.push(meta)
      appStore.increment(increment)
    }
    if ($_.isEmpty(userStore.getMeta)) {
      const meta = await userStore.fetchMeta()
      userStore.setMeta(meta)
      responses.push(meta)
      appStore.increment(increment)
    }
    if (templateStore.getCollection.length === 0) {
      const templates = await templateStore.fetchCollection()
      templateStore.setCollection(templates)
      responses.push(templates)
      appStore.increment(increment)
    }
    appStore.finish()
    return responses
  }
  return {
    fetchData
  }
}