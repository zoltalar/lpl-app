export default function useUserForm() {
    const errors = useForm()

    const clearErrors = () => {
        errors.value = {}
    }

    const transformErrors = () => {
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