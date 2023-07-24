import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from 'path'
import http from 'http'
const require = createRequire(import.meta.url)
const fs = require('fs')
const server = http.createServer()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
server.on('request',(req,res)=>{
    // 防止中文乱码
    const url = decodeURI(req.url)
    const fpath = path.join(__dirname, `../../assets/${url}`)
    fs.readFile(fpath,'utf8',(err,data)=>{
        if(err) { console.log('读取文件错误：',err.message);
        return res.end('404 not found')}
         console.log('读取文件成功');
         res.end(data)         
    })
})
server.listen(80,()=>{
    console.log('server running at http://127.0.0.1:80');
})