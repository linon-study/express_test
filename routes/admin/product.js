const express = require('express')
const router = express.Router()      //可使用 express.Router 类创建模块化可挂载的路由句柄
//数据库操作
const DB = require('../../modules/db.js');
const multiparty = require('multiparty');    /* 图片上传模块   既可以获取form表单的数据  也可以实现上传图片 */

const fs = require('fs');

router.get('/', (req, res) => {
  DB.find('product', {}, (err, data) => {
    res.render('admin/product/index', {
      list: data,
    })
  })
})

router.get('/add', (req, res) => {
  res.render('admin/product/add')
})

//doAdd
router.post('/doAdd', (req, res) => {
  var form = new multiparty.Form();

  form.uploadDir = 'upload'   //上传图片保存的地址
  form.parse(req, function (err, fields, files) {

    //获取提交的数据以及图片上传成功返回的图片数据

    console.log(fields);  //获取表单的数据
    console.log(files);  //图片上传成功返回的信息

    const title = fields.title[0]
    const price = fields.price[0]
    const fee = fields.fee[0]
    const description = fields.description[0]

    const pic = files.pic[0].path

    DB.insert('product', {
      title,
      price,
      fee,
      description,
      pic,
    }, function (err, data) {
      if (!err) {
        res.redirect('/admin/product'); //上传成功跳转到首页
      }
    })
  });
})

router.get('/edit', (req, res) => {
  //获取get传值 id
  const id = req.query.id;

  console.log(id)

  //去数据库查询这个id对应的数据  自增长的id 要用  {"_id": DB.ObjectID(id)}
  DB.find('product', { "_id": DB.ObjectID(id) }, function (err, data) {
    // console.log(data)

    res.render('admin/product/edit', {
      list: data[0]
    })
  })
})


//doEdit
router.post('/doEdit', (req, res) => {
  var form = new multiparty.Form();

  form.uploadDir = 'upload'   //上传图片保存的地址
  form.parse(req, function (err, fields, files) {

    //获取提交的数据以及图片上传成功返回的图片数据
    console.log(fields);  //获取表单的数据
    console.log(files);  //图片上传成功返回的信息

    const _id = fields._id[0]        //修改的条件
    const title = fields.title[0]
    const price = fields.price[0]
    const fee = fields.fee[0]
    const description = fields.description[0]

    const originalFilename = files.pic[0].originalFilename
    const pic = files.pic[0].path

    let params = {
      title,
      price,
      fee,
      description,
    }

    if (originalFilename) {
      params.pic = pic

    } else {
      //删除生成的临时文件
      fs.unlink(pic, (err, written, buffer)=> {

      })
    }

    console.log(params)

    DB.update('product', { "_id": DB.ObjectID(_id) }, params, function (err, data) {
      if (!err) {
        res.redirect('/admin/product'); //上传成功跳转到首页
      }
    })
  });
})

router.get('/delete', (req, res) => {
  //获取id
  const id = req.query.id

  DB.deleteOne('product', { "_id": DB.ObjectID(id) }, (err) => {
    if (!err) {
      res.redirect('/product'); //上传成功跳转到首页
    }
  })

})

module.exports = router    /* 暴露这个router模块  */