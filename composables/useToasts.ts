export default function useToasts() {
    const messages = ref([])
    const addToast = (message) => {
        messages.value.push(message)
    }
    return {
        messages,
        addToast
    }
}