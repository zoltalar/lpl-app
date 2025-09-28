import { defineStore } from 'pinia'
import type { IMailingList, TMailingListMeta } from '@/types'

export const useMailingListStore = defineStore({
  id: 'mailing-list',
  state: () => ({
    collection: [] as IMailingList[],
    collectionFetched: false,
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
    async refreshCollection(): Promise<void> {
      this.setCollection(await this.fetchCollection())
    },
    setCollection(collection: IMailingList[]) {
      this.collection = collection
    },
    setCollectionFetched(fetched: boolean): void {
      this.collectionFetched = fetched
    },
    setMeta(meta: TMailingListMeta) {
      this.meta = meta
    }
  },
  getters: {
    getCollection(state): IMailingList[] {
      return state.collection
    },
    getCollectionFetched(state): boolean {
      return state.collectionFetched
    },
    getMeta(state): TMailingListMeta {
      return state.meta
    }
  }
})