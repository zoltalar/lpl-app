import { defineStore } from 'pinia'
import type { IAttachment } from '@/types'

export const useAttachmentStore = defineStore({
  id: 'attachment',
  state: () => ({
    collection: [] as IAttachment[],
  }),
  actions: {
    async fetchCollection(): Promise<IAttachment[]> {
      const response = await useApi<{ data: IAttachment[] }>('/admin/attachments/index', {
        params: {
          all: true
        }
      })
      return response.data
    },
    async refreshCollection(): Promise<void> {
      this.setCollection(await this.fetchCollection())
    },
    setCollection(collection: IAttachment[]): void {
      this.collection = collection
    }
  },
  getters: {
    getCollection(state): IAttachment[] {
      return state.collection
    }
  }
})