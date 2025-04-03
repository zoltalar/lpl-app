import { usePermissionStore } from '@/store/permission'
import type { IPermission } from '@/types'

export default function usePermission() {
  // Composables
  const permissionStore = usePermissionStore()
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
  const section = (name: string): string => {
    const elements = name.split('-')
    elements.pop()
    return elements.join('_')
  }
  return {
    grouped,
    permissions,
    action,
    section
  }
}