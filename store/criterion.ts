import { defineStore } from 'pinia'
import type { TCriterionMeta } from '@/types'

export const useCriterionStore = defineStore({
  id: 'criterion',
  state: () => ({
    meta: {} as TCriterionMeta
  }),
  actions: {
    async fetchMeta(): Promise<TCriterionMeta> {
      return await useApi('/admin/criteria/meta')
    },
    setMeta(meta: TCriterionMeta) {
      this.meta = meta
    }
  },
  getters: {
    getMeta(state): TCriterionMeta {
      return state.meta
    }
  }
})