import { createRequire } from "module";
const require = createRequire(import.meta.url)
const fs = require('fs');
import path from "path"
const __dirname = path.resolve();
// 1 ·�� 2 ����  3��ѡ�ı���  4 �ص�
fs.writeFile(__dirname+'text2.txt','���','utf8',(err)=>{
console.error('err:',err);
})