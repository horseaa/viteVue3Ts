import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from "pinia"
import router from './router'
import directives from '@/pages/Demo/directives'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
const pinia = createPinia();
const app = createApp(App);
app.use(pinia)
app.use(router)
app.use(directives)
app.use(ElementPlus)
// 自定义指令，简写形式
app.directive('color', (el, binding) => {
    // 这会在 `mounted` 和 `updated` 时都调用
    el.style.color = binding.value
})
app.mount('#app')
