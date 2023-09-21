import { defineStore } from 'pinia'

export const useSortableColumnStore = defineStore({
    id: 'sortable-column-store',
    state: () => {
        return {
            current: ''
        }
    },
    actions: {
        setColumn(column) {
            this.current = column
        }
    },
    getters: {
        currentColumn: state => state.current
    }
})