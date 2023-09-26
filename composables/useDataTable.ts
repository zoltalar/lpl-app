
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

    const fetchResource = async () => {
        const config = useRuntimeConfig()
        return await $fetch(props.endpoint, {
            params: query(),
            baseURL: config.public.baseURL
        })
    }

    const query = () => {
        return { 
            search: search.value,
            sort: sort.value,
            page: page.value
        }
    }

    const refresh = () => {
        fetchResource().then((data) => {
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