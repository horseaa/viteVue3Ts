import * as PIXI from 'pixi.js';
import myStore from '@/store/YMIRGYG.ts';
const store = myStore();
const data = {
  lineTextOption: {
    fontSize: 6,
    fill: 'black',
    wordWrap: true
  }
};
let EventOption; // 库区绑定的事件
// 创建文字
const createText = (text = '1', x = 0, y = 0, options = false) => {
  const lineText = new PIXI.Text(text, options || data.lineTextOption);
  lineText.x = x;
  lineText.y = y;
  lineText.anchor.set(0.5);
  return lineText;
};
// 创建刻度尺
const createRuler = (width, rulerUnit, showUnitNum) => {
  const rulerContainer = new PIXI.Container();
  const rulerX = new PIXI.Graphics();
  const rulerY = new PIXI.Graphics();
  // 设置线条样式
  rulerX.lineStyle(0.5, 'red');
  // 绘制竖线
  for (let i = 0; i <= width / rulerUnit; i++) {
    const x = i * 10;
    const y1 = 20;
    const y2 = i % showUnitNum === 0 ? 10 : 15;
    rulerX.moveTo(x, y1);
    rulerX.lineTo(x, y2);
  }
  // 绘制横线
  rulerY.lineStyle(0.5, 'red');
  rulerY.moveTo(0, 20);
  rulerY.lineTo(width, 20);
  // 添加刻度文本
  for (let i = 0; i <= width / rulerUnit; i++) {
    const x = i * 10;
    const y = 0;
    const text = i % showUnitNum === 0 ? (i * rulerUnit).toString() : '';
    const rulerText = new PIXI.Text(text, { fontSize: 6, fill: 'red' });
    rulerText.anchor.set(0.5, 0);
    rulerText.position.set(x, y);
    rulerContainer.addChild(rulerText);
  }
  rulerContainer.addChild(rulerX);
  rulerContainer.addChild(rulerY);
  return rulerContainer;
};
// pixijs对象没有双击事件，需要根据单击事件自定义
let clickCount = 0;
const DOUBLE_CLICK_DELAY = 300; // 双击的时间间隔（单位：毫秒）
let clickTimeout;
function onClick(event) {
  clickCount++;
  const data = event.target.data;
  if (clickCount === 1) {
    clickTimeout = setTimeout(function () {
      clickCount = 0;
    }, DOUBLE_CLICK_DELAY);
  } else if (clickCount === 2) {
    if (data) store.setBlockInfo(data);
    console.log('e', event);
    clearTimeout(clickTimeout);
    clickCount = 0;
    if (!store.firstDblclick) {
      store.setFirstDblclick(true);
      store.setSecondDblclick(false);
    } else {
      store.setFirstDblclick(false);
      store.setSecondDblclick(true);
    }
  }
}
// 创建小方块
const createBlock = (options = false, matHeight) => {
  const blockContainer = new PIXI.Container();
  const block = new PIXI.Graphics();
  let color = (options && options.FILL_COLOR) || '255, 0, 211, 211';
  if (options && options.FILL_COLOR) {
    color = options.FILL_COLOR.split(',');
    color.shift();
  }
  const bgColor = `rgb(${color})`;
  const x = (options && options.STORERM_ADDR_MIN) || 0;
  const firstText = (options && options.STOCK_PLACE_CODE) || '';
  const secondText = (options && options.MAT_CNAME) || '';
  const thirdText = (options && options.STOCK_WGT) || '0';
  let width = 10;
  if (options && options.STORERM_ADDR_MAX) {
    const start = options.STORERM_ADDR_MIN || 0;
    width = options.STORERM_ADDR_MAX - start;
  }
  const height = matHeight - 2;
  block.lineStyle(1, 'black', 1); //外边框  宽度  颜色 透明度
  block.beginFill(bgColor); // 内填充颜色
  block.drawRoundedRect(x, 1, width, height, 0); // x,y, 宽 高,圆角
  block.endFill(); //结束绘画
  let textColor = 'black';
  if (options && options.TEXT_COLOR) {
    const color1 = options.TEXT_COLOR.split(',');
    color1.shift();
    textColor = `rgb(${color1})`;
  }
  const textOption = {
    fontSize: 6,
    fill: textColor,
    wordWrap: true, // 开启换行
    wordWrapWidth: block.width
  };
  const blockText1 = createText(`库位：${firstText}`, x + width / 2, height / 2 - 7, textOption);
  const blockText2 = createText(`物料：${secondText}`, x + width / 2, height / 2, textOption);
  const blockText3 = createText(`[${thirdText}]`, x + width / 2, height / 2 + 7, textOption);
  // 文字超出部分变省略号
  const textEllip = (text) => {
    let content = text.text;
    const ellipsisWidth = text.style.fontSize;
    while (content.length > 0 && text.width + ellipsisWidth > block.width) {
      content = content.slice(0, -1);
      text.text = content + '...';
    }
  };
  textEllip(blockText1);
  textEllip(blockText2);
  textEllip(blockText3);
  block.data = options;
  blockContainer.addChild(block);
  blockContainer.addChild(blockText1);
  blockContainer.addChild(blockText2);
  blockContainer.addChild(blockText3);
  block.interactive = true; //重点，设置可交互

  return blockContainer;
};
// 创建库位
const createMatBlock = (options) => {
  const blockContainer = new PIXI.Container();
  const matBlock = new PIXI.Graphics();
  let color = (options && options.STOCK_LOC_BACK_COLOR) || '255, 227, 211, 211';
  color = color.split(',');
  color.shift();
  color.push(0.5);
  const bgColor = `rgba(${color})`;
  const matWidth = options && options.STOCK_LOC_WIDTH;
  const matHeight = (options && options.STOCK_LOC_HEIGHT) - 5;
  const mat_X = ((options && options.STOCK_LOC_X) || 0) - 2;
  const mat_Y = ((options && options.STOCK_LOC_Y) || 0) * 0.85;
  matBlock.beginFill(bgColor);
  matBlock.drawRoundedRect(0, 0, matWidth, matHeight, 0);
  matBlock.x = mat_X;
  matBlock.y = mat_Y;
  blockContainer.addChild(matBlock);
  if( !options || !options.locArr) return alert('没有库位数据')
  options.locArr.forEach((item) => {
    const newBlock = createBlock(item, matHeight, matWidth);
    newBlock.y = mat_Y;
    blockContainer.addChild(newBlock);
    const text = (options && options.STOCK_LOC_INFO) || '';
    const textHeight = (((options && options.STOCK_LOC_Y) || 0) + newBlock.height / 2) * 0.85;
    const matText1 = createText(text);
    matText1.x = -15;
    matText1.y = textHeight;
    blockContainer.addChild(matText1);
  });
  return blockContainer;
};
//   使用createStockBlock创建库区 。库区要有刻度尺，一个库区内有多个料条
//   使用createMatBlock创建料条，   料条最前方有料条代码，料条里有多个库位
//   使用createBlock创建库位
const createStockBlock = (options) => {
  const blockContainer = new PIXI.Container();
  const bigBlock = new PIXI.Graphics();
  const color = (options && options.STOCK_BACK_COLOR) || '255, 227, 211, 211';
  const stockWidth = (options && options.STOCK_WIDTH) + 50;
  const stockHeight = options && options.STOCK_HEIGHT + 15;
  const rulerUnit = options && options.X_MIN_UNIT;
  const showUnitNum = options && options.X_SHOW_UNIT_NUM;
  const bgColor = `rgb(${color})`;
  let STOCK_WIDTH = 0;
  if (options && options.STOCK_WIDTH) {
    STOCK_WIDTH = options.STOCK_WIDTH;
  }
  bigBlock.beginFill(bgColor);
  bigBlock.lineStyle(1, 'black', 1); //外
  bigBlock.drawRoundedRect(0, 0, stockWidth, stockHeight, 0);
  blockContainer.addChild(bigBlock);
  const ruler = createRuler(STOCK_WIDTH, rulerUnit, showUnitNum);
  ruler.x = 25;
  blockContainer.addChild(ruler);
  if(!options || !options.matArr ) return alert('没有物料信息')
  options.matArr.forEach((item) => {
    const newMatBlock = createMatBlock(item);
    newMatBlock.x = 25;
    newMatBlock.y = 20;
    blockContainer.addChild(newMatBlock);
  });
  return blockContainer;
};
let myCanvas;
const createBox = (options, canvas, eventOption) => {
  myCanvas = canvas;
  EventOption = eventOption;
  const container = new PIXI.Container();
  for (let i = 0; i < options.length; i++) {
    const stock = createStockBlock(options[i]);
    if(!stock) return alert('没有库区')
    stock.x = options[i].STOCK_G_X;
    stock.y = options[i].STOCK_G_Y;
    container.addChild(stock);
  } // 解决右键方块外元素 显示菜单的问题
  container.interactive = true;
  if (EventOption && EventOption.rightclick) {
    container.on('rightclick', (e) => {
      e.preventDefault();
      store.setShowMenu(false);
      console.log('e.target', e.target);
    });
  }
  // const EventOption = { rightclick: true, dblclick: true, mousemove: true };
  if (EventOption && EventOption.dblclick) {
    container.addListener('pointerdown', onClick);
  }

  if (EventOption && EventOption.mousemove) {
    let timer;
    if (myCanvas) {
      container.addListener('mousemove', (e) => {
        const data = e.target.data;
        clearTimeout(timer);
        //  有data说明是block块
        if (data) {
          timer = setTimeout(() => {
            store.setBlockInfo(data);
            myCanvas.style.left = e.clientX + 5 + 'px';
            myCanvas.style.top = e.clientY + 5 + 'px';
            store.showDetail = true;
          }, 300);
        }
      });
      container.addListener('mouseleave', () => {
        clearTimeout(timer);
        store.showDetail = false;
      });
    }
  }

  return container;
};

export { createRuler, createBlock, createText, createMatBlock, createStockBlock, createBox };
