import { defineStore } from 'pinia'
import type { TSubscribePageMeta } from '@/types'

export const useSubscribePageStore = defineStore({
  id: 'subscribe-page',
  state: () => ({
    meta: {} as TSubscribePageMeta
  }),
  actions: {
    async fetchMeta(): Promise<TSubscribePageMeta> {
      return await useApi('/admin/subscribe-pages/meta')
    },
    setMeta(meta: TSubscribePageMeta) {
      this.meta = meta
    }
  },
  getters: {
    getMeta(state): TSubscribePageMeta {
      return state.meta
    }
  }
})