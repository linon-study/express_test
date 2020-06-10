/*
1.安装express

2.安装ejs

*/

//图片上传插件的使用

/*
  1、npm install multiparty

  2、var multiparty = require('multiparty');

  3、上传图片的地方

  var form = new multiparty.Form();

  form.uploadDir = 'upload'   //上传图片保存的地址
  form.parse(req, function(err, fields, files) {

    //获取提交的数据以及图片上传成功返回的图片数据
    
  });

  4、html页面form表单要加入  enctype='multipart/form-data'

*/

const express = require('express')
const md5 = require('md5-node');  //md5加密
const app = express()


const fs = require('fs');

// const bodyParser = require('body-parser');
// //设置body-parser中间件
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

//数据库操作
const DB = require('./modules/db.js');





//自定义中间件    判断登录状态

//ejs中 设置全局数据  所有的页面都可以使用




app.get('/', (req, res) => {
  res.send('index')
})

//登录
app.get('/login', (req, res) => {
  res.render('login')
})

//获取登录提交的数据
app.post('/doLogin', (req, res) => {

})

app.get('/product', (req, res) => {

 
})

//显示增加商品的页面  
app.get('/productadd', (req, res) => {
  res.render('productadd')

})

//获取表单提交的数据以及post过来的图片
app.post('/doProductAdd', (req, res) => {
  
})

app.get('/productedit', (req, res) => {
  
})

//执行修改的路由
app.post('/doProductEdit', (req, res) => {
  
})

//删除商品
app.get('/productdelete', (req, res) => {

})



//删除数据
app.get('/delete', (req, res) => {
  DB.deleteOne('product', { "title": "iphone6" }, (err, data) => {
    if (!err) {
      res.send('删除数据成功')
    }
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
