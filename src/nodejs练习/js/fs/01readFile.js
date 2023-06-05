import { createRequire } from 'module';
const require = createRequire(import.meta.url);
 const fs  = require("fs");
 const iconv = require('iconv-lite');  //用来处理编码
 import path from "path"
const __dirname = path.resolve();
 fs.readFile(__dirname + 'text2.txt','utf8',(err,data)=>{
    if(err) return  console.error('错误信息:',err.message);
    console.log('data:',data);
 })

console.log('__dirname',__dirname);
