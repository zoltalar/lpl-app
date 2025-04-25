import { defineStore } from 'pinia'
import type { IConfiguration } from '@/types'

export const useConfigurationStore = defineStore({
  id: 'configuration',
  state: () => ({
    collection: [] as IConfiguration[]
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
    async refreshCollection(): Promise<void> {
      this.setCollection(await this.fetchCollection())
    },
    setCollection(collection: IConfiguration[]): void {
      this.collection = collection
    }
  },
  getters: {
    getCollection(state): IConfiguration[] {
      return state.collection
    }
  }
})