<template>
    <div>
        <p>vue3Test</p>
        <br>
        <input type="text" v-model="msg">
        {{ comNum }}
        <button @click="changeString"> 改变msg </button>
        <father></father>
        <p v-copy>一些内容</p>
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
let person = reactive({
    name: '王一',
    age: 22
})
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
</script>

<style lang="less" scoped>

</style>