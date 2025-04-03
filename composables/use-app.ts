import { usePermissionStore } from '@/store/permission'
import { useRoleStore } from '@/store/role'

export default function useApp() {
  // Vars
  const progress = ref<number>(0)
  // Composables
  const permissionStore = usePermissionStore()
  const roleStore = useRoleStore()
  // Functions
  const fetchData = async (): Promise<Array<any>> => {
    const responses: any[] = []
    const increment = 50
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
    return responses
  }
  return {
    progress,
    fetchData
  }
}