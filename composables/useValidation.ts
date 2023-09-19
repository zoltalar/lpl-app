import { reactive } from 'vue'

export function useValidation() {
    const errors = ref({})
    return errors
}