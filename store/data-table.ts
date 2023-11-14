import { defineStore } from 'pinia'

export const useDataTableStore = defineStore({
  id: 'data-table',
  state: () => {
    return {
      column: '',
      direction: '',
      perPage: 10
    }
  },
  actions: {
    setColumn(column: string): void {
      this.column = column
    },
    setDirection(direction: string): void {
      this.direction = direction
    },
    setPerPage(perPage: number): void {
      this.perPage = perPage
    }
  },
  getters: {
    getColumn(state): string {
      return state.column
    },
    getDirection(state): string {
      return state.direction
    },
    getPerPage(state): number {
      return state.perPage
    }
  }
})