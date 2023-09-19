export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            transformErrors: (errors) => {
                const transformed = {}
                for (const property in errors) {
                    if (errors[property][0]) {
                        transformed[property] = errors[property][0]
                    }
                }
                return transformed
            }
        }
    }
})