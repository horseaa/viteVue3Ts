<template>
    <div>
        <p>子文件1</p>
        <div>父传到信息：{{ fmsg }}</div>
        <button @click="toFu"> 点击传给父 </button>
    </div>
</template>

<script setup>
// const smsg = ref('son')
const props = defineProps({
    fmsg: {
        type: String,
        default: '默认'
    },
    toFu: {
        type: Function,
        default: '默认'
    }
})
const emit = defineEmits(['toFu'])
// const toFu = () => {
//     emit('toFu', 33)
// }
console.log('props', props);
props.toFu(1)

</script>

<style lang="less" scoped></style>