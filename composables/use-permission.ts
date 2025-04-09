import { usePermissionStore } from '@/store/permission'
import type { IPermission, IUser } from '@/types'

export default function usePermission() {
  // Composables
  const permissionStore = usePermissionStore()
  const { data: currentUser } = useAuth()
  const { $_ } = useNuxtApp()
  // Computed
  const grouped = computed(() => {
    return $_.groupBy(permissions.value, (permission: IPermission) => {
      return section(permission.name)
    })
  })
  const permissions = computed<IPermission[]>(() => {
    return permissionStore.getCollection
  })
  // Functions
  const action = (permission: IPermission): string => {
    const elements = permission.name.split('-')
    if (elements.length > 0) {
      const element = elements.pop()
      if (element) {
        return element
      }      
    }
    return ''
  }
  const can = (name: string): boolean => {
    const user = toRaw(currentUser.value) as IUser
    if (user && user.permissions) {
      return user.permissions.find((permission: IPermission): boolean => {
        return permission.name === name
      }) !== undefined
    }
    return false
  }
  const section = (name: string): string => {
    const elements = name.split('-')
    elements.pop()
    return elements.join('_')
  }
  return {
    grouped,
    permissions,
    action,
    can,
    section
  }
}