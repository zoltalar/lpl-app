import { storeToRefs } from 'pinia'
import { useSortableColumnStore } from '~/store/sortable-column'

export default function useDataTable(props) {
    const resource = ref({})
    const search = ref('')
    const page = ref(1)
    const limit = ref(10)
    const filters = ref({})

    const store = useSortableColumnStore()
    const { currentColumn, currentDirection } = storeToRefs(store)

    const sort = computed(() => {
        return (currentDirection.value === 'desc' ? '-' : '') + currentColumn.value
    })

    const fetchResource = async () => {
        const config = useRuntimeConfig()
        return await $fetch(props.endpoint, {
            params: query(),
            baseURL: config.public.baseURL
        })
    }

    const query = () => {
        return { sort: sort.value }
    }

    const refresh = () => {
        fetchResource().then((data) => {
            resource.value = data
        })
    }

    watch(sort, () => {
        refresh()
    })

    return {
        resource,
        search,
        sort,
        page,
        limit,
        filters,
        refresh
    }
}