import { useI18n } from 'vue-i18n'
import type { IApiResource, IApiResourceMeta } from '~/types'

export default function useDataTable(props) {
  const { t } = useI18n()
  const resource = ref<IApiResource>({
    data: [],
    meta: {} as IApiResourceMeta
  })
  const search = ref<string>('')
  const sort = ref<string>('')
  const page = ref<number>(1)
  const limit = ref<number>(10)
  const filters = ref({})
  // Computed
  const meta = computed<IApiResourceMeta>(() => {
    return resource.value.meta
  })
  const info = computed<string>(() => {
    let text = ''
    if (meta.value && meta.value.total > 0) {
      text = t('messages.pagination_meta_info', {
        from: meta.value.from,
        to: meta.value.to,
        total: meta.value.total
      })
    }
    return text
  })
  // Functions
  const query = () => {
    return { 
      search: search.value,
      sort: sort.value,
      page: page.value,
      limit: limit.value
    }
  }
  const refresh = async () => {
    const { data, meta } = await useApi(props.endpoint, {
      params: query()
    })
    resource.value.data = data
    resource.value.meta = meta
  }
  // Watch
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