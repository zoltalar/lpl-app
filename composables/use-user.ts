import { useUserStore } from '@/store/user'
import type { INamable, IUser } from '@/types'

export default function useUser() {
  // Composables
  const userStore = useUserStore()
  // Computed
  const dateFormats = computed<string[]>(() => {
    return userStore.getMeta.date_formats
  })
  const timeFormats = computed<string[]>(() => {
    return userStore.getMeta.time_formats
  })
  // Functions
  const dateTimeFormat = (user: IUser): string => {
    return [user.date_format, user.time_format].join(', ')
  }
  const fullName = (model: INamable, standard = false): string => {
    let name = ''
    const firstName = model.first_name
    const lastName = model.last_name
    const elements: string[] = []
    if (firstName) {
      elements.push(firstName)
    }
    if (lastName) {
      elements.push(lastName)
    }
    if (standard) {
      name = elements.join(' ')
    } else {
      name = elements.reverse().join(', ')
    }
    return name
  }
  // Return
  return {
    dateFormats,
    timeFormats,
    dateTimeFormat,
    fullName
  }
}