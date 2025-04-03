import { defineStore } from 'pinia'
import type { IRole } from '@/types'

export const useRoleStore = defineStore({
  id: 'role',
  state: () => ({
    collection: [] as IRole[]
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
    }
  },
  getters: {
    getCollection(state): IRole[] {
      return state.collection
    }
  }
})