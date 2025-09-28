import { defineStore } from 'pinia'
import type { IRole } from '@/types'

export const useRoleStore = defineStore({
  id: 'role',
  state: () => ({
    collection: [] as IRole[],
    collectionFetched: false
  }),
  actions: {
    async fetchCollection(): Promise<IRole[]> {
      const response = await useApi<{ data: IRole[] }>('/admin/roles/index', {
        params: { all: true }
      })
      return response.data
    },
    setCollection(collection: IRole[]) {
      this.collection = collection
    },
    setCollectionFetched(fetched: boolean): void {
      this.collectionFetched = fetched
    }
  },
  getters: {
    getCollection(state): IRole[] {
      return state.collection
    },
    getCollectionFetched(state): boolean {
      return state.collectionFetched
    }
  }
})