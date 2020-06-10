const express = require('express')
const router = express.Router()      //可使用 express.Router 类创建模块化可挂载的路由句柄

//后台的路由 所有的后台处理都要经过这里

const login = require('./admin/login.js')
const product = require('./admin/product.js')
const user = require('./admin/user.js')

//权限判断
router.use((req, res, next) => {
  if (req.url == '/login' || req.url == '/login/doLogin') {
    next()

  } else {
    if (req.session.userinfo && req.session.userinfo.username != '') {   //判断有没有登录
      // app.locals   全局
      // req.app.locals   请求的全局
      req.app.locals['userinfo'] = req.session.userinfo
      next()
    } else {
      res.redirect('/admin/login')
    }
  }
})

//配置路由
router.use('/login', login);
router.use('/product', product);
router.use('/user', user);

module.exports = router    /* 暴露这个router模块  */
