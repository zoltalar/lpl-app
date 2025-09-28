import { defineStore } from 'pinia'
import type { ICountry } from '@/types'

export const useCountryStore = defineStore({
  id: 'country',
  state: () => {
    return {
      collection: [] as ICountry[],
      collectionFetched: false
    }
  },
  actions: {
    async fetchCollection(): Promise<ICountry[]> {
      const response = await useApi<{ data: ICountry[] }>('/admin/countries/index', {
        params: {
          all: true,
          has: true
        }
      })
      return response.data
    },
    setCollection(collection: ICountry[]) {
      this.collection = collection
    },
    setCollectionFetched(fetched: boolean): void {
      this.collectionFetched = fetched
    }
  },
  getters: {
    getCollection(state): ICountry[] {
      return state.collection
    },
    getCollectionFetched(state): boolean {
      return state.collectionFetched
    }
  }
})