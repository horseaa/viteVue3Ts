import { createRequire } from "module";
const require = createRequire(import.meta.url)
const fs = require('fs');
import path from "path"
const __dirname = path.resolve();
// 1 路径 2 内容  3可选的编码  4 回调
// writeFile只能创建文件，不能创建路径（文件夹）  新内容会覆盖旧内容
fs.writeFile(__dirname+'text2.txt','你好','utf8',(err)=>{
console.error('err:',err);
})