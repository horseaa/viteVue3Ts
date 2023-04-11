<template>
    <div>
        <p>这是A组件</p>
        <button @click="changeMsg">改变b信息</button>
    </div>
</template>

<script setup>
import mitter from '../../../common/mitt.js'

const changeMsg = () => {
    mitter.emit('toB', 'A的信息')
}
</script>

<style lang="less" scoped>

</style>