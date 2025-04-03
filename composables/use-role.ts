import { useRoleStore } from '@/store/role'
import type { IRole } from '@/types'

export default function useRole() {
  // Composables
  const roleStore = useRoleStore()
  // Computed
  const roles = computed<IRole[]>(() => {
    return roleStore.getCollection
  })
  return {
    roles
  }
}