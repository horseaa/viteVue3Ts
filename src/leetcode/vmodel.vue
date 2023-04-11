<template>
    <div>
        <div class="container" ref="aRef">
            aaaaa
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue" 

// 页面数据更新到data
const Vue = function() {
    observe(this.data, this)
}
const observe = function(obj, vm) {
    for(let key of Object.keys(obj)) {
        defineReactive(vm, key, obj[key])
    }
}
const defineReactive = function(obj, key, val) {
    Object.defineProperty(obj, key, {
        get(){
            return val
        },
        set(newVal) {
            val = newVal
            console.log(val);
        }
    } )
}

// 拿到data后将数据重新渲染到页面
const Dep = function() {
    this.subs = [];
}
Dep.propotype = {
    addSub(sub) {
        this.subs.push(sub)
    },
    notify() {
        this.subs.forEach(sub => {
            updata(sub)
        })
    }
}
const reactive = function(obj, key, val) {
    let dep = new Dep();
    Object.defineProperty(obj, key, {
        get() {
            if(Dep.target) dep.addSub(Dep.target)
            return val
        },
        set(newVal) {
            if (val === newVal) return
            val = newVal
            dep.notify()
        }
    })
}
const Watcher = function(vm, node, name) {
    Dep.target = this
    this.vm = vm
    this.node = node
    this.name = name
    updata()
    dep.target = null
}
Watcher.propotype = {
    get() {
        this.value = this.vm[this.name]
    },
    updata() {
        this.get()
        this.node.nodeValue = this.value 
    }
} 
</script>

<style lang="less" scoped>

</style>