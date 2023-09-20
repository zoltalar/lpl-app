export default function useDataTable() {
    const resource = ref({})
    const search = ref('')
    const page = ref(1)
    const limit = ref(10)
    const filters = ref({})

    async function fetchResource(endpoint) {
        const config = useRuntimeConfig()
        console.log(buildQuery())
        return await $fetch(endpoint, {
            baseURL: config.public.baseURL
        })
    }

    function buildQuery() {
        const params = {
            search: search.value,
            page: page.value,
            limit: limit.value
        }
        return (new URLSearchParams(params)).toString()
    }

    return {
        resource,
        search,
        page,
        limit,
        filters,
        fetchResource
    }
}