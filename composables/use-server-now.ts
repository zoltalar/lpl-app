import { DateTime } from 'luxon'
export default function useServerNow(format: string = DateTime.DATETIME_SHORT_WITH_SECONDS) {
  // Vars
  const now = ref<string>('')
  // Composables
  const { app: appConfig } = useConfiguration()
  // Functions
  const update = () => {
    const timezone = appConfig.value.timezone
    setInterval(() => {
      now.value = DateTime.now().setZone(timezone).toLocaleString(format)
    }, 1000)
  }
  // Hooks
  onMounted(() => {
    update()
  })
  // Return
  return {
    now
  }
}