import { createRequire } from "module"
const require = createRequire(import.meta.url);
const fs = require('fs')
import { fileURLToPath } from "url";
import path, { resolve } from 'path'
//    /s ƥ    ַ   /Sƥ  ǿ  ַ   *ǰ      ƥ    
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
fs.readFile(path.join(__dirname,'../../assets/素材1.html'),'utf8',(err,data)=>{
if(err) return console.log('读取错误',err.message);
resolveCSS(data)
resolveJS(data)
resolveHTML(data)
})

const resolveCSS = (htmlStr )=>{
    const regResult = regStyle.exec(htmlStr)
    console.log('regResult', regResult);
    if(!regResult) return console.log('css内容为空');
    const newCSS = regResult[0].replace('<style>','').replace('</style>','');
    fs.writeFile( path.join(__dirname,'../../assets/素材1.css') , newCSS,(err)=>{
        if(err) return console.error('写入css错误');
        console.log('写入css成功');
    })    
}
const resolveJS = (htmlStr )=>{
    const regResult = regScript.exec(htmlStr)
    console.log('regResult', regResult);
    if(!regResult) return console.log('JS内容为空');
    const newJS = regResult[0].replace('<script>','').replace('</script>','');
    fs.writeFile( path.join(__dirname,'../../assets/素材1.js') , newJS,(err)=>{
        if(err) return console.error('写入js错误');
        console.log('写入js成功');
    }) 
}
const resolveHTML = (htmlStr)=>{
    const newHTML = htmlStr.replace(regStyle,'<link rel="stylesheet" href="./素材1.css">').replace(regScript,'<script src="./素材1.js"></script>');
    fs.writeFile( path.join(__dirname,'../../assets/素材1副本.html') , newHTML,(err)=>{
        if(err) return console.error('写入HTML错误');
        console.log('写入HTML成功');
    })    
}