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
        setColumn(column) {
            this.column = column
        },
        setDirection(direction) {
            this.direction = direction
        }
    },
    getters: {
        currentColumn: state => state.column,
        currentDirection: state => state.direction
    }
})