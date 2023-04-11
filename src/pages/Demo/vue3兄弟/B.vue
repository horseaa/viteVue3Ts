<template>
    <div>
        <p>这是B组件</p>
        <br>
        {{ msg }}
    </div>
</template>

<script setup>
import mitter from '../../../common/mitt.js'
const msg = ref('B的信息')
mitter.on('toB', e => {
    console.log('e', e)
    msg.value = e
})
</script>

<style lang="less" scoped>

</style>