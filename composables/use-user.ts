import { useUserStore } from '@/store/user'
import type { IUser } from '@/types'
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
  return {
    dateFormats,
    timeFormats,
    dateTimeFormat
  }
}