import { defineStore } from 'pinia'
import type { ILanguage } from '@/types'

export const useLanguageStore = defineStore({
  id: 'language',
  state: () => ({
    collection: [] as ILanguage[]
  }),
  actions: {
    async fetchCollection(): Promise<ILanguage[]> {
      const response = await useApi<{ data: ILanguage[] }>('/admin/languages/index', {
        params: { all: true }
      })
      return response.data
    },
    setCollection(collection: ILanguage[]) {
      this.collection = collection
    }
  },
  getters: {
    getCollection(state): ILanguage[] {
      return state.collection
    }
  }
})