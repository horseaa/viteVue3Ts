<template>
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      auto-upload='false'
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
    <input type="file" @click="submit">
    <button @click="selectFile">选择文件</button>

</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'

const selectFile = () => {

}
const submit = () => {


}
//获取图片
const getFile = (file, fileList) => {
    this.uploadImgParams.fileName = file.name;
    this.uploadImgParams.suffix = file.name.split('.')[1];
    this.getBase64(file.raw).then(res => {
        console.log('res-Base64', res);
        this.uploadImgParams.base64 = res;
        
        this.$Http.run(uploadImg,
            { ...this.uploadImgParams, path: "/main/qianDaoLaConfig/procurementMall/order/orderList" }, {
            autoLogin: true,
            isEncrypt: true,
            showLoading: true,
            isMock: false,
            agreeId: "saasBusiness",
        }).then(res => {
            console.log('uploadImg', res);
            if (res.success) {
                this.showFile = true;
                if (fileList.length >= 1) {
                    this.uploadDisabled = true;
                }
                this.singleProductInfo.productImg = res.result.imgUrl;
                console.log('this.uploadImgParams', this.uploadImgParams);
            } else {
                file = null;
                fileList = [];
                this.singleProductInfo.productImg = null;
                return Promise.reject(res);
            }
        }).catch(res => this.$message.error(res && res.errorMsg || ''));
    })
},
//图片转base64
getBase64(file) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        let imgResult = '';
        reader.readAsDataURL(file);
        reader.onload = function () {
            imgResult = reader.result.replace(/^data:image\/\w+;base64,/, "");
            console.log('imgResult', imgResult);
            // imgResult = reader.result
        }
        reader.onerror = function (error) {
            reject(error);
        }
        reader.onloadend = function () {
            resolve(imgResult);
        }
    })
},
</script>

<style lang="less" scoped>

</style>