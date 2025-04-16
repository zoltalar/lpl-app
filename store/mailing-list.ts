import { defineStore } from 'pinia'
import type { IMailingList, TMailingListMeta } from '@/types'

export const useMailingListStore = defineStore({
  id: 'mailing-list',
  state: () => ({
    collection: [] as IMailingList[],
    meta: {} as TMailingListMeta
  }),
  actions: {
    async fetchCollection(): Promise<IMailingList[]> {
      const response = await useApi<{ data: IMailingList[] }>('/admin/mailing-lists/index', {
        params: { all: true }
      })
      return response.data
    },
    async fetchMeta(): Promise<TMailingListMeta> {
      return await useApi('/admin/mailing-lists/meta')
    },
    setCollection(collection: IMailingList[]) {
      this.collection = collection
    },
    setMeta(meta: TMailingListMeta) {
      this.meta = meta
    }
  },
  getters: {
    getCollection(state): IMailingList[] {
      return state.collection
    },
    getMeta(state): TMailingListMeta {
      return state.meta
    }
  }
})