import { defineStore } from 'pinia'
import type { TUserMeta } from '@/types'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    meta: {} as TUserMeta
  }),
  actions: {
    async fetchMeta(): Promise<TUserMeta> {
      return await useApi('/admin/users/meta')
    },
    setMeta(meta: TUserMeta) {
      this.meta = meta
    }
  },
  getters: {
    getMeta(state): TUserMeta {
      return state.meta
    }
  }
})