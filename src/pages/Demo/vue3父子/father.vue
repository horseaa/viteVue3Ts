<template>
    <div>
        <p>父文件</p>
        <!-- <son1 :fmsg="fmsg" @toFu = getSon></son1> -->
        <son2 v-model:fmsg = "fmsg"></son2>
    </div>
</template>

<script setup>
import son1 from './son1.vue'
import son2 from './son2.vue'
const fmsg = ref('父文件的信息')
const obj_f = {
    name: '王一',
    age: 40
}
const getSon = (params)=>{
    console.log('拿到了',params)
}
</script>

<style lang="less" scoped>

</style>