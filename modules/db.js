//数据库操作
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const DBurl = 'mongodb://admin:123456@47.98.123.242:27017';
const dbName = 'product_manage';

const ObjectID = require('mongodb').ObjectID;

function _connectDb(callback) {

  const client = new MongoClient(DBurl, { useNewUrlParser: true, useUnifiedTopology: true });
  // Use connect method to connect to the Server
  client.connect(function (err) {

    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    // client.close();

    callback(client, db)
  });
}

//暴露  ObjectID

exports.ObjectID = ObjectID


//数据库查找
/**
 Db.find('user', {}, function(err, data){
   data数据
 })
 */

exports.find = function (collectionName, json, callback) {

  _connectDb((client, db) => {

    const collection = db.collection(collectionName);
    collection.find(json, function (err, result) {

      assert.equal(err, null);
      console.log("Find 1 documents into the collection");

      result.toArray((error, data) => {

        client.close();
        callback(error, data);  //拿到数据执行回调
      })
    });
  })
}

//增加数据
exports.insert = function (collectionName, json, callback) {

  _connectDb((client, db) => {

    const collection = db.collection(collectionName);
    collection.insertOne(json, function (err, data) {

      assert.equal(err, null);
      console.log("insert 1 documents into the collection");

      callback(err, data);
    });
  })
}

//修改数据
exports.update = function (collectionName, json1, json2, callback) {

  _connectDb((client, db) => {

    const collection = db.collection(collectionName);
    collection.updateOne(json1, {$set: json2}, function (err, data) {

      assert.equal(err, null);
      console.log("update 1 documents into the collection");

      callback(err, data);
    });
  })
}

//删除数据
exports.deleteOne = function (collectionName, json, callback) {

  _connectDb((client, db) => {

    const collection = db.collection(collectionName);
    collection.deleteOne(json, function (err, data) {

      assert.equal(err, null);
      console.log("delete 1 documents into the collection");

      callback(err, data);
    });
  })
}