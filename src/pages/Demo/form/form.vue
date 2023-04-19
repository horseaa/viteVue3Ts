<template>
    <el-form :model="formData">
        <input type="text" v-model="formData.number" @input="debounce(testDebounce,1000)()">
      <!-- <el-form-item label="Number">
        <el-input v-model="formData.number" @input="handleInput"></el-input>
      </el-form-item> -->
    </el-form>
  </template>
  
  <script>
//   var lodash = require('lodash')
  import lodash from 'lodash'
  export default {
    data() {
      return {
        formData: {
          number: ''
        }
      }
    },
    mounted() {
        // console.log(lodash.chunk(['a', 'b', 'c', 'd'], 2))
        
    },
    methods: {
        debounce(func, delay){
            let timer = null
            return function(...args){
                if(timer) clearTimeout(timer)
                timer = setTimeout(() => {
                    func.call(this,...args)
                }, delay);
            }
        },
        testDebounce(){
            console.log(111)
        },
        handleInput(value) {
        // lodash.debounce(function(){
        //      // 使用正则表达式匹配输入内容
        //      let input = value.replace(/[^\d.]/g, '');
        //     // 将非法字符替换为空字符串
        //     input = input.replace(/^\./g, "");
        //     input = input.replace(/\.{2,}/g, ".");
        //     input = input.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        //     // 判断输入是否在5-20之间
        //     if (input >= 5 && input <= 100) {
        //         that.formData.number = input;
        //     } else {
        //         that.formData.number = '';
        //         that.$Message.warning('请输入5-100内的数字')
        //     }
        // },1000)()
      }
    }
  }
  </script>
  