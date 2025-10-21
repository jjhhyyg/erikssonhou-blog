export const useTestStore = defineStore("test", {
    state: () => ({
        count: 0 as number
    }),
    getters: {
        getCount: (state) => state.count * 2
    },
    actions: {
        increment() {
            this.count++
        }
    }
})