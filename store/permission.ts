import { defineStore } from 'pinia'
import type { IPermission } from '@/types'

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    collection: [] as IPermission[],
    collectionFetched: false
  }),
  actions: {
    async fetchCollection(): Promise<IPermission[]> {
      const response = await useApi<{ data: IPermission[] }>('/admin/permissions/index', {
        params: { all: true }
      })
      return response.data
    },
    setCollection(collection: IPermission[]) {
      this.collection = collection
    },
    setCollectionFetched(fetched: boolean): void {
      this.collectionFetched = fetched
    }
  },
  getters: {
    getCollection(state): IPermission[] {
      return state.collection
    },
    getCollectionFetched(state): boolean {
      return state.collectionFetched
    }
  }
})