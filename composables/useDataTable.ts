import { useI18n } from 'vue-i18n'

export default function useDataTable(props) {
  const { t } = useI18n()

  const resource = ref({})
  const search = ref('')
  const sort = ref('')
  const page = ref(1)
  const limit = ref(10)
  const filters = ref({})

  const meta = computed(() => {
    return resource.value.meta || {}
  })

  const info = computed(() => {
    let text = ''
    if (meta.value.total > 0) {
      text = t('messages.pagination_meta_info', {
        from: meta.value.from,
        to: meta.value.to,
        total: meta.value.total
      })
    }
    return text
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
      page: page.value,
      limit: limit.value
    }
  }

  const refresh = () => {
    fetchResource().then((data) => {
      resource.value = data
    })
  }

  watch(search, () => {
    page.value = 1
    refresh()
  })

  watch(sort, () => {
    refresh()
  })

  watch(page, () => {
    refresh()
  })

  watch(limit, () => {
    page.value = 1
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
    info,
    refresh
  }
}