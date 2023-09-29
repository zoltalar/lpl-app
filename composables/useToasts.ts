export default function useToasts() {
    const messages = ref([])
    const push = (message) => {
        messages.value.push(message)
    }
    return {
        messages,
        push
    }
}