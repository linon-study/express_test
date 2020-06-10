const express = require('express')
const router = express.Router()      //可使用 express.Router 类创建模块化可挂载的路由句柄
//数据库操作
const DB = require('../../modules/db.js');

router.get('/', (req, res) => {
  // res.send('显示用户首页')
  DB.find('user', {}, (err, data) => {
    res.render('admin/user/index', {
      list: data,
    })
  })
})

router.get('/add', (req, res) => {
  res.send('显示增加用户')
})

module.exports = router    /* 暴露这个router模块  */