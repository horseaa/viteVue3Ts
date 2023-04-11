<template>
    <div>
        <div class="box" ref="testRef" style="{color: red}">
            俺是test页
        </div>
    </div>
</template>
<script>
export default {
    name: 'test',
    data() {
        return {
            num: 1
        }
    },
    methods: {
        getNum() {
            return num + 1
        }
    },
    created() {
        console.log('refs1', this.$refs.testRef)
        this.$nextTick(()=>{
            console.log('refs2', this.$refs.testRef)
        })
    },
}

</script>

<style lang="less" scoped>

</style>