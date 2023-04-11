import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
const routes = [
    {
        path:'/home',
        name:'home',
        component: () => import('../pages/home/home.vue')
    },
    {
        path:'/vue2Test',
        name:'vue2Test',
        component: () => import('../pages/Demo/vue2Test.vue')
    },
    {
        path:'/vue3Test',
        name:'vue3Test',
        component: () => import('../pages/Demo/vue3Test.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router