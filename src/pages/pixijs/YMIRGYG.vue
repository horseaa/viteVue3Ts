<template>
    <p>YMIRGYG</p>
    <canvas ref="myCanvas" class="myCanvas" id="myCanvas"></canvas>
</template>
<script setup>
import * as PIXI from "pixi.js";
import { DropShadowFilter } from 'pixi-filters';
// import { createBox } from '@/pages/pixijs/pixiGYG.js'
import {
    ref,
    watch,
    computed,
    onMounted,
    reactive,
    nextTick,
    getCurrentInstance,
} from "vue";
import myStore from "@/store/YMIRGYG.ts";
// import { DropShadowFilter } from 'pixi.js';
const proxy = getCurrentInstance();
const store = myStore();
const canvasData = ref([[[{}]]]);
let app;
let myBox;
const data = reactive({
    app_width: 800, //舞台宽度
    app_height: 500, //舞台高度
    firstLoad: true,
});
const queryData = () => { };
let isDrawing = false; // 判断是否正在绘制线段
const startPoint = {}; // 线段的起点
const endPoint = {}
const arrBox = new PIXI.Container()    //箭头容器  包含箭头和线段
const arrow = new PIXI.Graphics();   //线段
let arrowHead = new PIXI.Graphics()
arrBox.addChild(arrow)
arrBox.addChild(arrowHead)
const canvasInit = () => {
    console.log("图形初始化");
    app = new PIXI.Application({
        width: 800,
        height: 500,
        // antialias: true,
        antialias: true, // default: false 反锯齿
        resolution: 2, // 1太小了会模糊
        backgroundColor: "#66FFFF",
        view: proxy.refs.myCanvas,
        forceCanvas: false
    });
    const test = createtest()
    test.x = 200
    test.y = 200
    myBox = createNewBox(4);
    myBox.addChild(test)
    // 图形加到舞台
    app.stage.addChild(myBox);
    myBox.addChild(arrBox)
    // myBox.interactive = true
    myBox.renderable = true;
    // // 监听鼠标事件
    // myBox.on('pointerdown', onMouseDown);
    // myBox.on('pointermove', onMouseMove);
    // myBox.on('pointermove', onMouseMove);

};
// 绘制箭头
const drawArrowHead = (point) => {
    const dx = point.x - startPoint.x;
    const dy = point.y - startPoint.y;
    const angle = Math.atan2(dy, dx); //旋转角度
    arrowHead.lineStyle(1, 'yellow')
    arrowHead.beginFill('yellow');
    arrowHead.moveTo(0, -5);
    arrowHead.lineTo(10, 0);
    arrowHead.lineTo(0, 5);
    arrowHead.lineTo(0, -5);
    arrowHead.endFill();
    arrowHead.position.set(point.x, point.y);
    arrowHead.rotation = angle;
}
const drawArrowLine = (point) => {
    arrow.lineStyle(2, 'yellow')
    arrow.moveTo(startPoint.x, startPoint.y); // 设置线段样式
    arrow.lineTo(point.x, point.y)
}
const drawArrow = (currentPoint) => {
    arrowHead.clear()
    arrow.clear();
    const point = currentPoint ? currentPoint : endPoint
    drawArrowLine(point)
    drawArrowHead(point)
}
// 鼠标点击事件处理函数
function onMouseDown(event) {
    console.log('event.target', event.target);
    if (!isDrawing) {
        // 第一次单击，设置起点
        arrowHead.clear()
        arrow.clear();
        startPoint.x = event.target.x + event.target.width / 2
        startPoint.y = event.target.y + event.target.height / 2
        isDrawing = true;
    } else {
        // 第二次单击，绘制线段
        endPoint.x = event.target.x + event.target.width / 2
        endPoint.y = event.target.y + event.target.height / 2
        drawArrow()
        isDrawing = false;
    }
}

// 鼠标移动事件处理函数
function onMouseMove(event) {
    if (isDrawing) {
        // 更新线段终点
        const currentPoint = event.data.global;
        drawArrow(currentPoint)
    }
}
const createBlock = () => {
    const container = new PIXI.Container()
    const buttonBlock = new PIXI.Graphics()
    const topBlock = new PIXI.Graphics()
    buttonBlock.lineStyle(1, "yellow");
    buttonBlock.beginFill("#66CCCC");
    buttonBlock.drawRoundedRect(0, 0, 100, 100, 0);
    topBlock.lineStyle(1, "yellow");
    topBlock.beginFill("blue");
    topBlock.drawRoundedRect(10, 10, 80, 80, 0);
    container.addChild(buttonBlock)
    container.addChild(topBlock)
    container.interactive = true
    container.on('pointerdown', onMouseDown);
    container.on('pointermove', onMouseMove);
    return container
}
const createNewBox = (num) => {
    const blockContainer = new PIXI.Container();
    for (let i = 0; i < num; i++) {
        const block = createBlock()
        block.x = i * 150
        blockContainer.addChild(block);
    }
    return blockContainer;
};
const bili = 0.6
const createtest = () => {
    const container = new PIXI.Container()
    const block = new PIXI.Graphics()
    const sanjiao1 = new PIXI.Graphics()
    const water = new PIXI.Graphics()
    sanjiao1.beginFill('#66FFFF')
    block.beginFill("white");
    block.drawRoundedRect(0, 0, 100, 200, 0);
    sanjiao1.moveTo(0, 150)
    sanjiao1.lineTo(0, 200)
    sanjiao1.lineTo(50, 200)
    const sanjiao2 = sanjiao1.clone()
    sanjiao2.x = 100
    sanjiao2.scale.x = -1
    water.beginFill('green')
    const width = block.width
    const height = block.height * bili
    const y = block.height - height
    water.drawRoundedRect(0, y, width, height, 0);
    container.addChild(block)
    container.addChild(water)
    container.addChild(sanjiao1)
    container.addChild(sanjiao2)
    return container

}
onMounted(() => {
    nextTick(() => {
        canvasInit();
    });
});
watch(
    () => store.firstDblclick,
    (newValue) => {
        //  首次双击
        if (newValue) {
            console.log("第一次");
        }
        // 第二次双击
        else {
            console.log("第二次");
        }
    }
);
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.myCanvas {
    margin-bottom: 70px;
}

.detail {
    min-height: 50px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #ffffcc;
    border-radius: 5px;
    color: black;
    padding: 10px;
}

.dialogBtnBox {
    padding: 10px 20px;
    display: flex;
    justify-content: space-around;
    align-items: end;
}

.dialogBtn {
    width: 60px;
    height: 40px;
}
</style>