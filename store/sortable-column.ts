import { defineStore } from 'pinia'

export const useSortableColumnStore = defineStore({
  id: 'sortable-column-store',
  state: () => {
    return {
      column: '',
      direction: ''
    }
  },
  actions: {
    setColumn(column: string): void {
      this.column = column
    },
    setDirection(direction: string): void {
      this.direction = direction
    }
  },
  getters: {
    currentColumn(state): string {
      return state.column
    },
    currentDirection(state): string {
      return state.direction
    }
  }
})