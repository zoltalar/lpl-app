import { useLanguageStore } from '@/store/language'
import { usePermissionStore } from '@/store/permission'
import { useRoleStore } from '@/store/role'
import { useUserStore } from '@/store/user'

export default function useApp() {
  // Vars
  const progress = ref<number>(0)
  // Composables
  const { $_ } = useNuxtApp()
  const languageStore = useLanguageStore()
  const permissionStore = usePermissionStore()
  const roleStore = useRoleStore()
  const userStore = useUserStore()
  // Functions
  const fetchData = async (): Promise<Array<any>> => {
    const responses: any[] = []
    const increment = 25
    if (languageStore.getCollection.length === 0) {
      const languages = await languageStore.fetchCollection()
      languageStore.setCollection(languages)
      responses.push(languages)
      progress.value += increment
    }
    if (permissionStore.getCollection.length === 0) {
      const permissions = await permissionStore.fetchCollection()
      permissionStore.setCollection(permissions)
      responses.push(permissions)
      progress.value += increment
    }
    if (roleStore.getCollection.length === 0) {
      const roles = await roleStore.fetchCollection()
      roleStore.setCollection(roles)
      responses.push(roles)
      progress.value += increment
    }
    if ($_.isEmpty(userStore.getMeta)) {
      const meta = await userStore.fetchMeta()
      userStore.setMeta(meta)
      responses.push(meta)
      progress.value += increment
    }
    return responses
  }
  return {
    progress,
    fetchData
  }
}