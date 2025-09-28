import { defineStore } from 'pinia'
import type { ITemplate } from '@/types'

export const useTemplateStore = defineStore({
  id: 'template',
  state: () => ({
    collection: [] as ITemplate[],
    collectionFetched: false
  }),
  actions: {
    async fetchCollection(): Promise<ITemplate[]> {
      const response = await useApi<{ data: ITemplate[] }>('/admin/templates/index', {
        params: { all: true }
      })
      return response.data
    },
    async refreshCollection(): Promise<void> {
      this.setCollection(await this.fetchCollection())
    },
    setCollection(collection: ITemplate[]) {
      this.collection = collection
    },
    setCollectionFetched(fetched: boolean): void {
      this.collectionFetched = fetched
    }
  },
  getters: {
    getCollection(state): ITemplate[] {
      return state.collection
    },
    getCollectionFetched(state): boolean {
      return state.collectionFetched
    }
  }
})