import { defineStore } from 'pinia'
import type { IAttribute, TAttributeMeta } from '@/types'

export const useAttributeStore = defineStore({
  id: 'attribute',
  state: () => ({
    collection: [] as IAttribute[],
    meta: {} as TAttributeMeta
  }),
  actions: {
    async fetchCollection(): Promise<IAttribute[]> {
      const response = await useApi<{ data: IAttribute[] }>('/admin/attributes/index', {
        params: {
          active: true,
          all: true
        }
      })
      return response.data
    },
    async fetchMeta(): Promise<TAttributeMeta> {
      return await useApi('/admin/attributes/meta')
    },
    async refreshCollection(): Promise<void> {
      this.setCollection(await this.fetchCollection())
    },
    setCollection(collection: IAttribute[]): void {
      this.collection = collection
    },
    setMeta(meta: TAttributeMeta): void {
      this.meta = meta
    }
  },
  getters: {
    getCollection(state): IAttribute[] {
      return state.collection
    },
    getMeta(state): TAttributeMeta {
      return state.meta
    }
  }
})