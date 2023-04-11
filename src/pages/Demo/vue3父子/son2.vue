<template>
    <div>
        <p>子文件2</p>
        <div>父传的信息：{{ fmsg }}</div>
        <button @click="changeProps"> 点击传给父 </button>
    </div>
</template>

<script setup>
const smsg = ref('son')
defineProps({
    fmsg:{
        type: String,
        default: '默认'
    }
})
const emit = defineEmits(['update:fmsg'])
const changeProps = () => {
    emit('update:fmsg', '改了')
} 
</script>

<style lang="less" scoped>

</style>