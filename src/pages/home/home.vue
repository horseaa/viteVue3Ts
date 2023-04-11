<template>
    <div>
        {{ name }}
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { userStore } from "../..//store/user";

const store = userStore()
const name = ref(store.name)
const list: number[] = [1, 2, 3]
let list1: Array<string> = ['']
type numOrStr = (number | string)
const num2: numOrStr = '1'
const f1 = (a: number): number => {
    return 1
}
function f2(a: number): number {
    return 2
}
const f3 = (a: number): void => { }
interface animal {
    name: string
}

// 泛型
function identity<T>(arg: T): T {
    return arg
}
</script>

<style lang="less" scoped></style>