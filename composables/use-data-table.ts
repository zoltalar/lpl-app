import { useI18n } from 'vue-i18n'
import { useDataTableStore } from '~/store/data-table'
import type { IApiResource, IApiResourceMeta } from '~/types'

export default function useDataTable(props: any) {
  // Composables
  const dataTableStore = useDataTableStore()
  const { t } = useI18n()
  const { $_ } = useNuxtApp()
  // Vars
  const busy = ref<boolean>(false)
  const resource = ref<IApiResource>({
    data: [],
    meta: {} as IApiResourceMeta
  })
  const search = ref<string>('')
  const filters = ref<Record<string, any>>({})
  const sort = ref<string>('')
  const page = ref<number>(1)
  const limit = ref<number>(dataTableStore.getPerPage)
  // Computed
  const meta = computed<IApiResourceMeta>(() => {
    return resource.value.meta as IApiResourceMeta
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
  const query = (): Record<string, any> => {
    const query: Record<string, any> = {}
    if (filters.value) {
      $_.forOwn(filters.value, (value: any, key: string): void => {
        query['filter[' + key + ']'] = value
      })
    }
    if (search.value) {
      query['search'] = search.value
    }
    if (sort.value) {
      query['sort'] = sort.value
    }
    if (page.value) {
      query['page'] = page.value
    }
    if (limit.value) {
      query['limit'] = limit.value
    }
    return query
  }
  const refresh = async () => {
    busy.value = true
    const { data, meta } = await useApi(props.endpoint, {
      params: query()
    })
    busy.value = false
    resource.value.data = data
    resource.value.meta = meta
  }
  // Watch
  watch([search, limit], () => {
    page.value = 1
    refresh()
  })
  watch(filters, () => {
    page.value = 1
    refresh()
  }, { deep: true })
  watch([sort, page], () => {
    refresh()
  })
  return {
    busy,
    resource,
    search,
    filters,
    sort,
    meta,
    page,
    limit,
    info,
    refresh
  }
}