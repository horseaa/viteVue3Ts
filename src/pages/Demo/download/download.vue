<template>
    <div>
        <button @click="downloadFile(url,'雪地')">点击下载图片</button>
    </div>
</template>

<script setup>
const url = 'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
// const downLoad = () => {
//     var a = document.createElement("a"), //创建a标签
//     e = document.createEvent("MouseEvents"); //创建鼠标事件对象
//     e.initEvent("click", false, false); //初始化事件对象
//     a.href = url //设置下载地址
//     a.dispatchEvent(e); //给指定的元素，执行事件click事件
// }
const downloadFile = (fileRealPath, fileName) => {
    let link = document.createElement("a");
    fetch(fileRealPath)
    .then(res => res.blob())
    .then((blob) => {
        // 将链接地址字符内容转变成blob地址
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
    })
    .catch((err)=>{
        console.log('err', err)
    })
}
</script>

<style lang="less" scoped>

</style>