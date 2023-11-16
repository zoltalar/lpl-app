import { defineStore } from 'pinia'
import type { IApiResource, ICategory } from '~/types'

export const useCategoryStore = defineStore({
  id: 'category',
  state: () => {
    return {
      collection: [] as ICategory[]
    }
  },
  actions: {
    async fetchCollection(): Promise<IApiResource> {
      return await useApi('/admin/categories/index', {
        params: { all: true }
      })
    },
    setCollection(collection: ICategory[]) {
      this.collection = collection
    }
  },
  getters: {
    getCollection(state): ICategory[] {
      return state.collection
    }
  }
})