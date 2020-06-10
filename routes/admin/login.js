const express = require('express')
//md5加密
const md5 = require('md5-node');  
const bodyParser = require('body-parser');
//数据库操作
const DB = require('../../modules/db.js');

const router = express.Router()      //可使用 express.Router 类创建模块化可挂载的路由句柄

//设置body-parser中间件
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/', (req, res) => {
  //res.send('登录页面')
  res.render('admin/login')
})

//处理登录的业务逻辑
router.post('/doLogin', (req, res) => {


  const password = md5(req.body.password)
  console.log(password)
  req.body.password = password

  DB.find('user', req.body, (err, data) => {
    if (data.length > 0) {
      console.log('登录成功');

      //保存登录信息
      req.session.userinfo = data[0]

      res.redirect('/admin/product')   //登录成功跳转到商品列表
    } else {
      // console.log('登录失败');
      res.send("<script>alert('登录失败');location.href='/admin/login'</script>")
    }
  })
})

router.get('/loginOut', (req, res) => {
  //销毁session
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/admin/login')
    }
  })
})

module.exports = router    /* 暴露这个router模块  */