import { defineStore, createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import YMIRGYG from '@/store/YMIRGYG.ts'
console.log('YMIRGYG',YMIRGYG)
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