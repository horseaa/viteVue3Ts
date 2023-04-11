<template>
    <div>
        <h1>myslot</h1>
        <slot name="first"></slot>
        <slot name="second"></slot>
        <div v-for="item in list" :key="item.id">
            <slot :data="item"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue" 
const list = ref([
    {id: '1' , name: '王一' },
    {id: '2' , name: '王二' },
    {id: '3' , name: '王三' },
])
</script>

<style lang="less" scoped>

</style>