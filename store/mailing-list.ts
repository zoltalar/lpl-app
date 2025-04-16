import { defineStore } from 'pinia'
import type { TMailingListMeta } from '@/types'

export const useMailingListStore = defineStore({
  id: 'mailing-list',
  state: () => ({
    meta: {} as TMailingListMeta
  }),
  actions: {
    async fetchMeta(): Promise<TMailingListMeta> {
      return await useApi('/admin/mailing-lists/meta')
    },
    setMeta(meta: TMailingListMeta) {
      this.meta = meta
    }
  },
  getters: {
    getMeta(state): TMailingListMeta {
      return state.meta
    }
  }
})