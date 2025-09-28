import { useAppStore } from '@/store/app'
import { useAttachmentStore } from '@/store/attachment'
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
  const attachmentStore = useAttachmentStore()
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
    const increment = 6.667
    appStore.reset()
    if ( ! attachmentStore.getCollectionFetched) {
      const attachments = await attachmentStore.fetchCollection()
      attachmentStore.setCollection(attachments)
      attachmentStore.setCollectionFetched(true)
      responses.push(attachments)
      appStore.increment(increment)
    }
    if ($_.isEmpty(attributeStore.getMeta)) {
      const meta = await attributeStore.fetchMeta()
      attributeStore.setMeta(meta)
      responses.push(meta)
      appStore.increment(increment)
    }
    if ( ! attributeStore.getCollectionFetched) {
      const attributes = await attributeStore.fetchCollection()
      attributeStore.setCollection(attributes)
      attributeStore.setCollectionFetched(true)
      responses.push(attributes)
      appStore.increment(increment)
    }
    if ( ! configurationStore.getCollectionFetched) {
      const configurations = await configurationStore.fetchCollection()
      configurationStore.setCollection(configurations)
      configurationStore.setCollectionFetched(true)
      responses.push(configurations)
      appStore.increment(increment)
    }
    if ($_.isEmpty(configurationStore.getMeta)) {
      const meta = await configurationStore.fetchMeta()
      configurationStore.setMeta(meta)
      responses.push(meta)
      appStore.increment(increment)
    }
    if ( ! countryStore.getCollectionFetched) {
      const countries = await countryStore.fetchCollection()
      countryStore.setCollection(countries)
      countryStore.setCollectionFetched(true)
      responses.push(countries)
      appStore.increment(increment)
    }
    if ( ! languageStore.getCollectionFetched) {
      const languages = await languageStore.fetchCollection()
      languageStore.setCollection(languages)
      languageStore.setCollectionFetched(true)
      responses.push(languages)
      appStore.increment(increment)
    }
    if ( ! mailinglistStore.getCollectionFetched) {
      const lists = await mailinglistStore.fetchCollection()
      mailinglistStore.setCollection(lists)
      mailinglistStore.setCollectionFetched(true)
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
    if ( ! permissionStore.getCollectionFetched) {
      const permissions = await permissionStore.fetchCollection()
      permissionStore.setCollection(permissions)
      permissionStore.setCollectionFetched(true)
      responses.push(permissions)
      appStore.increment(increment)
    }
    if ( ! roleStore.getCollectionFetched) {
      const roles = await roleStore.fetchCollection()
      roleStore.setCollection(roles)
      roleStore.setCollectionFetched(true)
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
    if ( ! templateStore.getCollectionFetched) {
      const templates = await templateStore.fetchCollection()
      templateStore.setCollection(templates)
      templateStore.setCollectionFetched(true)
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