import http, { request } from 'http'

const server = http.createServer()
// 监听请求事件
server.on('request', (req,res)=>{
    console.log('有人请求服务拉')
    const url = req.url
    const str = `请求地址:${req.url}请求方法：${req.method}`
    let content = '404 not found'
    if (url === '/') content= '<h1>首页</h1>'
    // 向客户端发送内容并结束本次请求的处理。
    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.end(content)
})
// 启动服务
server.listen(80,()=>{
    console.log('server running at http://127.0.0.1:80');
    
})