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
    setColumn(column: string) {
      this.column = column
    },
    setDirection(direction: string) {
      this.direction = direction
    }
  },
  getters: {
    currentColumn: state => state.column,
    currentDirection: state => state.direction
  }
})