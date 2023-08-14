<template>
    你好
</template>
<script setup>
import { ref, watch, computed, onMounted, reactive, toRefs } from 'vue'
const arr = reactive({})
const arr1 = [1, 2, 3]
Object.assign(arr, arr1)
console.log('arr', arr);

const arr2 = reactive([])
const arr3 = [4, 5, 6]
Object.assign(arr2, arr3)
console.log('arr2', arr2)
onMounted(() => { console.log('vue3.2: mounted') })
</script>

<style lang='stylus' module>
</style>