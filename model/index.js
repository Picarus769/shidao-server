// const MongoClient = require('mongodb').MongoClient
// const url = 'mongodb://pcs:111112@123.207.179.138:27017'
// const dbName = 'project'
// function connect (cb) {
//     MongoClient.connect(url,function(err, client){
//         if(err) {
//             console.log(err);
//             return
//         } else {
//             console.log('连接成功！');
//             const db = client.db(dbName)
//             cb && cb(db)
//             client.close()
//         }
//     })
// }
// module.exports = {
//     connect
// }
const mongoose = require('mongoose');//引入main模块

mongoose.connect('mongodb://project:111112@123.207.179.138:27017/project', { useFindAndModify:false, useNewUrlParser: true ,useUnifiedTopology: true})

const Schema = mongoose.Schema;//新建schema对象


module.exports = Schema;//抛出模块