export default function useUserForm() {
    const errors = useForm()

    function clearErrors() {
        errors.value = {}
    }

    function transformErrors(errors) {
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