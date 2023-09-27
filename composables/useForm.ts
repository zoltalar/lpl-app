export default function useForm() {
    const errors = ref({})

    const clearErrors = () => {
        errors.value = {}
    }

    const transformErrors = (errors) => {
        const transformed = {}
        for (const property in errors) {
            if (errors[property][0]) {
                transformed[property] = errors[property][0]
            }
        }
        return transformed
    }

    return {
        errors,
        clearErrors,
        transformErrors
    }
}