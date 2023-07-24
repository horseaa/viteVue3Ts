<template>
    <div ref="block" id="block">方块</div>
    <p>这是一段话</p>
    <canvas ref="myCanvas" style="{width:500px; height: 500px; background: blue;}">
    </canvas>
    <div class="menuBox" ref="menuBox" v-show="showMenu">
        <ul class="menu">
            <li class="menuItem" @click="copy">复制</li>
            <li class="menuItem">粘贴</li>
            <li class="menuItem">撤回</li>
        </ul>
    </div>
</template>

<script setup>
import * as PIXI from 'pixi.js';
import { onMounted, reactive, ref, nextTick, getCurrentInstance, onBeforeUnmount } from 'vue';
const proxy = getCurrentInstance();
const myCanvas = ref(null)
const showMenu = ref(false)
let menuBox
const createBox = (num) => {
    const container = new PIXI.Container();
    for (let i = 0; i < num; i++) {
        const block = new PIXI.Graphics();
        block.lineStyle(1, 'black', 1);
        block.beginFill('red'); // 内填充颜色
        block.drawRoundedRect(0, i * 50, 50, 50, 10); // x,y, 宽 高,圆角
        block.endFill(); //结束绘画
        block.interactive = true   //重点，设置可交互
        container.addChild(block)
    }
    container.interactive = true
    container.on('rightclick', (e) => {
        console.log('e', e);
        console.log('e.target', e.target);
        e.target.scale.set(0.5)
        showMenu.value = true
    })
    container.on('click', (e) => {
        console.log('e.target', e.target);
        e.target.scale.set(1)
    })

    return container
}
const copy = () => {
    var selectedText = window.getSelection().toString();
    // 使用 Clipboard API 复制文本到剪贴板
    navigator.clipboard.writeText(selectedText)
        .then(function () {
            console.log('文本已复制到剪贴板');
        })
        .catch(function (err) {
            console.error('复制文本失败:', err);
        });
}
const canvasInit = () => {
    let app = new PIXI.Application({
        width: 800,
        height: 500,
        antialias: true, // default: false 反锯齿
        // resolution: window.devicePixelRatio || 1, // default: 1 分辨率
        resolution: 2, // 1太小了会模糊
        backgroundColor: 'white',
        view: proxy.refs.myCanvas
    });
    // 创建图形
    let myBox = createBox(5);
    // 图形加到舞台
    app.stage.addChild(myBox);
    app.stage.interactive = true;
    proxy.refs.myCanvas.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        menuBox.style.top = e.clientY + 'px';
        menuBox.style.left = e.clientX + 'px';
    })

};
document.body.addEventListener('mousedown', (e) => {
    showMenu.value = false
})



// --------------------------------------
onMounted(() => {
    nextTick(() => {
        menuBox = proxy.refs.menuBox
        canvasInit()

    })
})


</script>

<style scoped >
* {
    margin: 0;
    padding: 0;
}

.menuBox {
    position: absolute;
    top: 0;
    left: 0;
    background: yellow;
}

.menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
}

.menuItem {
    width: 80px;
    height: 20px;
    background-color: gray;
    margin: 5px;
}
</style>
