
export default function useDataTable(props) {
    const resource = ref({})
    const search = ref('')
    const sort = ref('')
    const page = ref(1)
    const limit = ref(10)
    const filters = ref({})

    const meta = computed(() => {
        return resource.value.meta || {}
    })

    const fetchResource = async (params = {}) => {
        const config = useRuntimeConfig()
        return await $fetch(props.endpoint, {
            params: query(params),
            baseURL: config.public.baseURL
        })
    }

    const query = (params = {}) => {
        let query = { 
            search: search.value,
            sort: sort.value,
            page: page.value,
            limit: limit.value
        }
        if (Object.keys(params).length > 0) {
            for (const [key, value] of Object.entries(params)) {
                query[key] = value
            }
        }
        return query
    }

    const refresh = (params = {}) => {
        fetchResource(params).then((data) => {
            resource.value = data
        })
    }

    watch(search, () => {
        refresh()
    })

    watch(sort, () => {
        refresh()
    })

    watch(page, () => {
        refresh()
    })

    watch(limit, () => {
        refresh({ page: 1 })
    })

    return {
        resource,
        search,
        sort,
        meta,
        page,
        limit,
        filters,
        refresh
    }
}