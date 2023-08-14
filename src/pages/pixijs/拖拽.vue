<template>
    <div class="dragBox" ref="dragBox"
        style="width: 100px; height: 100px; background-color: green; position: absolute; left: 0; top: 0;"></div>
    <div class="dragBox1" ref="dragBox1"
        style="width: 100px; height: 100px; background-color: red; position: absolute; left: 0; top: 100px;"></div>
    <div class="receiveBox" ref="receiveBox" style="width: 300px; height: 300px; background-color: yellow;">
    </div>
    <button v-show="isShowClear" @click="clear">清空</button> <br>
    <!-- <button @click="getAllElemnet">获取所有元素</button> -->
</template>

<script setup>
import * as PIXI from 'pixi.js';
import { onMounted, reactive, ref, nextTick, getCurrentInstance, onBeforeUnmount } from 'vue';
const proxy = getCurrentInstance();
let dragBox
let dragBox1
let dropZone
let currentDom
let newElement
let isShowClear = ref(false)
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    // 可以根据需要设置其他数据
    console.log('start', event);

}
const getAllElemnet = () => {
    // console.log('proxy', proxy);
    // // const templateContent = proxy.$options.template
    // // const templateElement = document.querySelector('template');
    // // const templateContent = templateElement.innerHTML;
    // const code = `<template>${templateContent}</template>`
    // console.log('elements', code);

}
function dragEnd(event) {
    // 拖拽结束后的处理
    let topMin = currentDom.offsetTop
    let leftMin = currentDom.offsetLeft
    let topMax = currentDom.offsetTop + currentDom.offsetHeight
    let leftMax = currentDom.offsetLeft + currentDom.offsetWidth
    if ((leftMin <= event.clientX && event.clientX <= leftMax) && (topMin <= event.clientY && event.clientY <= topMax)) {
        newElement = document.createElement('div');
        newElement.classList.add('newBox')
        currentDom.appendChild(newElement)
        newElement.style.position = 'absolute'
        newElement.style.width = '100px'
        newElement.style.height = '100px'
        newElement.style.backgroundColor = 'green'
        newElement.style.left = event.clientX - 100 / 2 + 'px';
        newElement.style.top = event.clientY - 100 / 2 + 'px'
    }
    isShowClear.value = currentDom.childNodes.length
}
function dragEnd1(event) {
    // 拖拽结束后的处理
    let topMin = currentDom.offsetTop
    let leftMin = currentDom.offsetLeft
    let topMax = currentDom.offsetTop + currentDom.offsetHeight
    let leftMax = currentDom.offsetLeft + currentDom.offsetWidth
    if ((leftMin <= event.clientX && event.clientX <= leftMax) && (topMin <= event.clientY && event.clientY <= topMax)) {
        newElement = document.createElement('div');
        newElement.classList.add('newBox')
        currentDom.appendChild(newElement)
        newElement.style.position = 'absolute'
        newElement.style.width = '100px'
        newElement.style.height = '100px'
        newElement.style.backgroundColor = 'red'
        newElement.style.left = event.clientX - 100 / 2 + 'px';
        newElement.style.top = event.clientY - 100 / 2 + 'px'
    }
}
const clear = () => {
    const elementsToRemove = currentDom.querySelectorAll('.newBox');
    elementsToRemove.forEach(element => {
        currentDom.removeChild(element);
    });
    isShowClear.value = false

}
function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
}

function dragLeave(event) {
    // 拖拽元素离开目标区域后的样式变化等处理
}

function drop(event) {
    event.preventDefault();
    const draggedElementId = event.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedElementId);


    // 对于被拖拽的元素进行相应处理，如移动到目标区域等
}

const createDiv = () => {
    const newElement = document.createElement('div');
    newElement.className = 'newBox';
    return newElement
}
// --------------------------------------
onMounted(() => {
    nextTick(() => {
        dragBox = proxy.refs.dragBox
        dragBox1 = proxy.refs.dragBox1
        dragBox.addEventListener('dragstart', dragStart);
        dragBox1.addEventListener('dragstart', dragStart);
        dragBox.addEventListener('dragend', dragEnd);
        dragBox1.addEventListener('dragend', dragEnd1);

        dropZone = proxy.refs.receiveBox
        currentDom = dropZone
        dropZone.addEventListener('dragover', dragOver);
        dropZone.addEventListener('dragenter', dragEnter);
        dropZone.addEventListener('dragleave', dragLeave);
        dropZone.addEventListener('drop', drop)

    })
})


</script>

<style scoped >
* {
    margin: 0;
    padding: 0;
}

.newBox {
    width: 100px;
    height: 100px;
    background-color: green;
    position: absolute;
    left: 0;
    top: 0;
}
</style>
