<template>
    <div>
        <p>vue3Test</p>
        <el-input v-model = 'number' min="5" max="20"></el-input>
        <br>
        <input type="text" v-model="msg">
        {{ comNum }}
        <button @click="changeString"> 改变msg </button>
        <father></father>
        <p v-ellipsis @click="getInfo">获取用户信息xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        <download></download>
        <upload></upload>
        <input type="text" value="1234" v-copy>
        <A></A>
        <B></B>
        <mySlot>
            <template v-slot:first>
                这是第一行
            </template>
            <!-- <template #second>
                这是第二行
            </template> -->
            <!-- 作用域插槽  v-slot可替换为#default -->
            <template v-slot = {data}>
                {{ data }}
            </template>
        </mySlot>
    </div>
</template>

<script setup>
import father from './vue3父子/father.vue'
import A from './vue3兄弟/A.vue'
import B from './vue3兄弟/B.vue'
import mySlot from './slot/mySlot.vue'
import download from './download/download.vue'
import upload from './upload/原生.vue'
import { getUserInfo } from '@/http/api.js'
// import { onMounted } from 'vue'
let person = reactive({
    name: '王一',
    age: 22
})
let number = ref("6")
let msg = ref('snsslmm')
// 解构成响应式用toRefs（注意不要用ref）
let { name, age } = toRefs(person)
console.log('age', age)
const comNum = computed(()=>{
    return person.age + 1
})
const changeString = ()=> {  msg.value = msg.value + 'a' }
watch(msg, (newVal, oldVal)=>{
    console.log('new',newVal,'old',oldVal)
})
const { proxy } = getCurrentInstance()
const getInfo = () =>{
    let params = { uID: '11'}
    proxy.$Http.run(getUserInfo, params,{ method: 'get' })
    .then(res=>{
        console.log('res', res)
    })
    .catch(err=>{
        console.log('err', err)
    })
}
onMounted(() => {
    getInfo()
})
</script>

<style lang="less" scoped>

</style>