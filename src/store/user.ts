import { defineStore } from 'pinia'
export const  userStore = defineStore('user', { 
    state: () => {
        return {
            name: '霍尔斯',
            age: 10,
            sex: 'man'
        }
    }
})