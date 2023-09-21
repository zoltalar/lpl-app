export default function useDataTable() {
    const resource = ref({})
    const search = ref('')
    const sort = ref('')
    const page = ref(1)
    const limit = ref(10)
    const filters = ref({})

    const fetchResource = async (endpoint) => {
        const config = useRuntimeConfig()
        return await $fetch(endpoint, {
            baseURL: config.public.baseURL
        })
    }

    return {
        resource,
        search,
        sort,
        page,
        limit,
        filters,
        fetchResource
    }
}