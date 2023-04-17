<template>
    <div class="container">
        <!-- <div class="showFileList">文件区域</div> -->
        <!-- <button class="select">选择文件</button> -->
        <input type="file" class="submit" @click="submit" placeholder="选择文件" @change="getFile">
        <button @click="upload">上传</button>
    </div>
</template>

<script setup>
import { uploadImgUrl } from '@/http/api.js'
import { ElMessage } from 'element-plus'
const { proxy } = getCurrentInstance()
const file_base64 =  ref('')
const fileName = ref('')
const suffix = ref('')
//图片转base64
const getBase64 = (file) => {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        let imgResult = '';
        reader.readAsDataURL(file);
        reader.onload = function () {
            imgResult = reader.result.replace(/^data:image\/\w+;base64,/, "");
        }
        reader.onerror = function (error) {
            reject(error);
        }
        reader.onloadend = function () {
            resolve(imgResult);
        }
    })
}
// 获取图片信息，图片名，后缀，base64
const getFile = (e) => {
    fileName.value = e.target.files[0].name.split('.')[0]
    suffix.value = e.target.files[0].name.split('.')[1]
    getBase64(e.target.files[0])
    .then(res=>{
        file_base64.value = res
    })
}
// 上传操作
const upload = () => {
    const params = {
        fileName: fileName.value,
        suffix: suffix.value,
        base64: file_base64.value
    }
    console.log('params',params)
    proxy.$Http.run(uploadImgUrl,params)
    .then(res=>{
        ElMessage.success(res.result.message)        
    })
    .catch(err=>{
        ElMessage.error(res.result.message) 
    })
}

</script>

<style lang="less" scoped>

</style>