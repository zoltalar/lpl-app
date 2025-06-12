import { defineStore } from 'pinia'
import type { TMessageMeta } from '@/types'

export const useMessageStore = defineStore({
  id: 'message',
  state: () => ({
    meta: {} as TMessageMeta
  }),
  actions: {
    async fetchMeta(): Promise<TMessageMeta> {
      return await useApi('/admin/messages/meta')
    },
    setMeta(meta: TMessageMeta) {
      this.meta = meta
    }
  },
  getters: {
    getMeta(state): TMessageMeta {
      return state.meta
    }
  }
})