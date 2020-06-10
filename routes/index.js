const express = require('express')
const router = express.Router()      //可使用 express.Router 类创建模块化可挂载的路由句柄

router.get('/', (req, res) => {
  res.send('index')
})

router.get('/product', (req, res) => {
  res.send('product页面')
})

module.exports = router    /* 暴露这个router模块  */