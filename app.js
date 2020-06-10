
const express = require('express')
const app = express()

//引入模块
const admin = require('./routes/admin.js')
const index = require('./routes/index.js')

//使用ejs模板引擎   默认找views这个目录
app.set('view engine', 'ejs')
//配置public目录为我们的静态资源目录
app.use(express.static('public'))

app.use('/upload', express.static('upload'))

//保存用户信息
var session = require("express-session")
//配置中间件
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  rolling: true,
}))

app.use('/', index);
app.use('/admin', admin);

app.listen(3004, () => console.log('Example app listening on port 3000!'))
