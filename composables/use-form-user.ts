import type { IPermission } from '@/types'

export default function useFormUser() {
  // Vars
  const userRoles = ref<string[]>(['user'])
  const userPermissions = ref<string[]>([])
  // Composables
  const { languages } = useLanguage()
  const { permissions, section } = usePermission()
  const { dateFormats, timeFormats } = useUser()
  // Computed
  const requiresPermissions = computed<boolean>(() => {
    return userRoles.value.length === 1 && userRoles.value.includes('user')
  })
  // Functions
  const toggleGroup = (group: string): void => {
    permissions.value.forEach((permission: IPermission) => {
      if (section(permission.name) === group) {
        const index = userPermissions.value.findIndex((name: string) => {
          return permission.name === name
        })
        if (index === -1) {
          userPermissions.value.push(permission.name)
        } else {
          userPermissions.value.splice(index, 1)
        }
      }
    })
  }
  return {
    userRoles,
    userPermissions,
    languages,
    dateFormats,
    timeFormats,
    requiresPermissions,
    toggleGroup
  }
}