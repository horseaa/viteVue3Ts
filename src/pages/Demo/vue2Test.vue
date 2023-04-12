<template>
    <div>
        <div class="box" v-color="'red'">
            俺是test页
        </div>
        <input type="text" placeholder="请输入" v-focus>
    </div>
</template>
<script>
export default {
    name: 'test',
    data() {
        return {
            num: 1,
            color: 'red'
        }
    },
    methods: {
        getNum() {
            return num + 1
        }
    },
    // created() {
    //     console.log('refs1', this.$refs.testRef)
    //     this.$nextTick(()=>{
    //         console.log('refs2', this.$refs.testRef)
    //     })
    // },
    directives: {
        // 在模板中启用 v-focus
        focus: {
            mounted(el,bind) {
                console.log('el',el,'bind',bind)
                el.focus()
            }
        }
    },
}

</script>

<style lang="less" scoped></style>