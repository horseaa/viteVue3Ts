<template>
    <el-form :model="formData" :rules="formRules" ref="ruleFormRef">
      <el-form-item label="Number">
        <div>需求：输入5-100内的数字</div>
        <el-input v-model="formData.number" @input.native="handleInput"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">提交</el-button> 
      </el-form-item>
    </el-form>
   
  </template>
  
  <script>
//   var lodash = require('lodash')
import { getUserInfo } from '@/http/api.js'
  import lodash from 'lodash'
  let timer = null
  const checkName = (rule, value, callback) => {
    if(!/[\u4e00-\u9fa5]/.test(value)){
      callback(new Error('只允许输入中文字符'))
    }else {
      callback()
    }
  }
  export default {
    data() {
      return {
        formData: {
          number: '',
          name:''
        },
        formRules: {
          name: [
            { require:true, message: '请输入姓名', trigger:'blur' },
            { validator:checkName, trigger:'blur' }
          ],
          number: [
            { require: true, message: '请输入数字', tirriger:'blur'}
          ]
        }
      }
    },
    methods: {
      // 防抖
        debounce(func, delay){
            return function(...args){
                if(timer) clearTimeout(timer)
                timer = setTimeout(() => {
                    func.call(this,...args)
                }, delay);
            }
        },
        // 输入5-100内的数字
        handleInput(value) {
          let that = this
          this.debounce(function(){
            // 使用正则表达式匹配输入内容
            let input = value.replace(/[^\d.]/g, '');
              // 将非法字符替换为空字符串
              input = input.replace(/^\./g, "");
              input = input.replace(/\.{2,}/g, ".");
              input = input.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
              // 判断输入是否在5-20之间
              if (input >= 5 && input <= 100) {
                that.formData.number = input;
              } else {
                that.formData.number = '';
                that.$Message.warning('请输入5-100内的数字')
              }
          },500)()    
      },
      submit() {
        this.$refs.ruleFormRef.validate(valid=>{
          if(valid) alert('submit')
          else alert('error')
        })
      }
    }
  }
  </script>
  