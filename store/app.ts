import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      progress: 0
    }
  },
  actions: {
    finish() {
      this.progress = 100
    },
    increment(value: number) {
      this.progress += value
    },
    reset() {
      this.progress = 0
    }
  },
  getters: {
    getProgress(state): number {
      return state.progress
    }
  }
})