export default function useToasts() {
  const messages = ref<string[]>([])
  const addToast = (message: string) => {
    messages.value.push(message)
  }
  return {
    messages,
    addToast
  }
}