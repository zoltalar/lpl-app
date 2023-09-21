import { defineStore } from 'pinia'

export const useSortableColumnStore = defineStore({
    id: 'sortable-column-store',
    state: () => {
        return {
            column: ''
        }
    },
    actions: {
        setColumn(column) {
            this.column = column
        }
    },
    getters: {
        currentColumn: state => state.column
    }
})