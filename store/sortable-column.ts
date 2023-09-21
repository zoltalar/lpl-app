import { defineStore } from 'pinia'

export const useSortableColumnStore = defineStore({
    id: 'sortable-column-store',
    state: () => {
        return {
            collection: '',
            column: '',
            direction: ''
        }
    },
    actions: {
        setCollection(collection) {
            this.collection = collection
        },
        setColumn(column) {
            this.column = column
        },
        setDirection(direction) {
            this.direction = direction
        }
    },
    getters: {
        currentCollection: state => state.collection,
        currentColumn: state => state.column,
        currentDirection: state => state.direction
    }
})