import { defineStore, createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPluginPersist)
export const  userStore = defineStore('user', { 
    state: () => {
        return {
            name: '霍尔斯',
            age: 10,
            sex: 'man'
        }
    }
})
export default store