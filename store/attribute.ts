import { defineStore } from 'pinia'
import type { TAttributeMeta } from '@/types'

export const useAttributeStore = defineStore({
  id: 'attribute',
  state: () => ({
    meta: {} as TAttributeMeta
  }),
  actions: {
    async fetchMeta(): Promise<TAttributeMeta> {
      return await useApi('/admin/attributes/meta')
    },
    setMeta(meta: TAttributeMeta) {
      this.meta = meta
    }
  },
  getters: {
    getMeta(state): TAttributeMeta {
      return state.meta
    }
  }
})