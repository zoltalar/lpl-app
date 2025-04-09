import { useRoleStore } from '@/store/role'
import type { IRole, IUser } from '@/types'

export default function useRole() {
  // Composables
  const roleStore = useRoleStore()
  const { data: currentUser } = useAuth()
  // Computed
  const roles = computed<IRole[]>(() => {
    return roleStore.getCollection
  })
  // Functions
  const has = (name: string): boolean => {
    const user = toRaw(currentUser.value) as IUser
    if (user && user.roles) {
      return user.roles.find((role: IRole): boolean => {
        return role.name === name
      }) !== undefined
    }
    return false
  }
  return {
    roles,
    has
  }
}