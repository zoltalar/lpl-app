import { defineStore } from 'pinia'
import type { IConfiguration, TConfigurationMeta } from '@/types'

export const useConfigurationStore = defineStore({
  id: 'configuration',
  state: () => ({
    collection: [] as IConfiguration[],
    collectionFetched: false,
    meta: {} as TConfigurationMeta
  }),
  actions: {
    async fetchCollection(): Promise<IConfiguration[]> {
      const response = await useApi<{ data: IConfiguration[] }>('/admin/configurations/index', {
        params: {
          all: true
        }
      })
      return response.data
    },
    async fetchMeta(): Promise<TConfigurationMeta> {
      return await useApi('/admin/configurations/meta')
    },
    async refreshCollection(): Promise<void> {
      this.setCollection(await this.fetchCollection())
    },
    setCollection(collection: IConfiguration[]): void {
      this.collection = collection
    },
    setCollectionFetched(fetched: boolean): void {
      this.collectionFetched = fetched
    },
    setMeta(meta: TConfigurationMeta): void {
      this.meta = meta
    }
  },
  getters: {
    getCollection(state): IConfiguration[] {
      return state.collection
    },
    getCollectionFetched(state): boolean {
      return state.collectionFetched
    },
    getMeta(state): TConfigurationMeta {
      return state.meta
    }
  }
})