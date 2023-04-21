import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
const routes = [
    {
        path:'/',
        redirect: { name: 'vue3Test' }
    },
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
    },
    {
        path: '/form',
        name: 'form',
        component: () => import('../pages/Demo/form/form.vue')
    },
    {
        path: '/echart',
        name: 'echart',
        component: () => import('../pages/Demo/echarts/index.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router