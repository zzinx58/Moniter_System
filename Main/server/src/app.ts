// src/app.ts

// 引入koa
import Koa from 'koa'
import http from 'http'
// 创建koa实例
const app = new Koa()
// 创建服务器
const server: http.Server = new http.Server(app.callback())
// 中间件
app.use(async (ctx) => {
    ctx.body = 'Hello World'
})
// 监听端口
app.listen(9000, () => {
    console.log('run success')
    console.log('app started at port 9000...')
})