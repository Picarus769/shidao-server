const express = require('express');
const router = express.Router();
const productModel = require('../model/product/product')
const userModel = require('../model/user/login')
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const { resolve } = require('path');

router.get('/list', function(req,res) {
    // console.log(typeof req.query.pageSize);
    // console.log(req.query.pageSize*req.query.pageIndex);
    // console.log(typeof req.query.pageSize*(req.query.pageIndex-1));
    productModel.find({}, '',{ skip:parseInt(req.query.pageSize*(req.query.pageIndex-1))  }, function(err, data) {
      if(err) {
        console.log(err);
        // res.sendStatus(500)
        return
      }else if(data === null) {
        // res.sendStatus(401)
        return
      }
      // console.log(data);
      res.send(data)
    }).limit(parseInt(req.query.pageSize))
    // res.send('1')
  })
  
  router.post('/upload', function(req,res) {

    let form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {  //fields是附加信息
      // console.log(files);
      console.log(fields);
      if(fields.masterId[0] == 'undefined') {
        res.send(401)
        return 
      }
      let arr = []
      let imgArr= ''
      let homePic = ''
        for(let key in files) {
          // console.log(files);
          
          files[key].forEach(element => {
            let t = element.originalFilename.split('.')
            let ext = t[(t.length-1)]
            if(homePic.length==0) {
              homePic += 'images/product/'+element.fieldName+'.'+ext
            }
            if(imgArr.length==0) {
              imgArr += 'images/product/'+element.fieldName+'.'+ext
            } else {
              imgArr += ','+ 'images/product/'+element.fieldName+'.'+ext
            }
            
            arr.push(new Promise((resolve, reject )=> {
              saveFile(element, (err) => {
                if(err) {
                  console.log('失败',err);
                  reject(err)
                }
                resolve()
              })
            }).then(()=> {
              console.log('完成');
              // res.send('1')
            }).catch(err => {
              res.send(err)
            }))
            
          })
          // console.log(arr);
          Promise.all(arr).then(()=> {
            userModel.findOne({_id: fields.masterId}, function(err, data) {
                if(err) {
                    console.log(err);
                    res.send('401')
                    return
                }
                let p = new productModel({
                  images: imgArr,
                  homePic,
                  message: fields.message[0],
                  price: fields.price[0],
                  master:data.userName,
                  masterId: data._id,
                  school: data.school,
                  portrait: data.portrait,
                  createTime: new Date(),
                  good: 0,
                  cate: fields.cate[0]
                })
                p.save(function(err) {
                  if(err) {
                    res.send(500)
                    console.log(err);
                    return
                  }
                  console.log('添加产品成功');
                })
            })
            
            // console.log(1,imgArr,2,homePic);
            console.log('全部成功');
            res.send(200)
          })
        }
    });
    // console.log(JSON.parse( req.body));
    // console.log(req.query.pageSize*req.query.pageIndex);
    // productModel.find({},'message images homePic master school portrait price comment',{ skip: req.query.pageSize*(req.query.pageIndex-1) }, function(err, data) {
    //   if(err) {
    //     console.log(err);
    //     // res.sendStatus(500)
    //     return
    //   }else if(data === null) {
    //     // res.sendStatus(401)
    //     return
    //   }
    //   console.log(data);
    //   res.send(data)
    // })
   
  })
  router.get('/detail', function(req, res) {
    // if(req.query.masterId === req.query.myId || req.query.myId === '') {

    //   res.send(200)
    //   return
    // }
    let arr = []
    let t = {}

    //找到商品
    arr.push(new Promise((resolve, reject) => {
      productModel.findById(req.query.id, function(err, data) {
        if(err) {
          console.log(err);
          res.sendStatus(500)
          return
        }else if(data === null) {
          res.sendStatus(401)
          return
        }
        // console.log(data);
        //更新访问数量
        if (req.query.masterId === req.query.myId || !req.query.myId) {
          t.pageViews = data.pageViews
              resolve()
              return
          
        } else {
          productModel.findOneAndUpdate(req.query.id, {pageViews:data.pageViews+1}, function(err, d) {
          
            if(err) {
              console.log(err);
              res.sendStatus(500)
              return
            }else if(d === null) {
              res.sendStatus(401)
              return
            }
            t.pageViews = d.pageViews+1
            resolve()
          })
        }

        
      })
    }).then(()=> {
      console.log('1成功');
    }))

    //查询用户离开时间
    arr.push(new Promise((resolve, reject) => {
      userModel.findOneAndUpdate(req.query.masterId, 'userName leaveTime', function(err, data) {
        if(err) {
          console.log(err);
          res.sendStatus(500)
          return
        }else if(data === null) {
          res.sendStatus(401)
          return
        }
        // console.log('用户:' + data);
        t.leaveTime = data.leaveTime
        // res.send(data)
        resolve()
      })
    }).then(()=> {
      console.log('2成功');
    }))

    //更新我的history
    arr.push(new Promise((resolve, reject) => {
      if(!req.query.myId) {
        resolve()
        return
      }
      userModel.findById(req.query.myId, function(err, data) {
        if(err) {
          console.log(err);
          res.sendStatus(500)
          return
        }else if(data === null) {
          res.sendStatus(401)
          return
        }
        let arr = new Array().concat(data.history)
        let temp = arr.find(q=>q.productId === req.query.id)
        if(temp>=0) {
          arr[temp].time=new Date()
          console.log('更新访问时间');
        } else {
          arr.push({productId: req.query.id, time: new Date(), message: req.query.message, image: req.query.image})
        }
        userModel.findOneAndUpdate(req.query.myId, {history: arr}, function(err, d) {
          if(err) {
            console.log(err);
            res.sendStatus(500)
            return
          }else if(d === null) {
            res.sendStatus(401)
            return
          }
          console.log('a');
          resolve()
        })
        // console.log(data);
        // res.send(data)
      })
    }).then(()=> {
      console.log('3成功');
    }))
    Promise.all(arr).then(() => {
      console.log(123);
      res.send(t)
    })
  })

  router.post('/comment', function(req, res) {
    console.log(req.body);
    productModel.findById(req.body.productId, function(err, data) {
      if(err) {
        console.log(err);
        res.sendStatus(500)
        return
      }else if(data === null) {
        res.sendStatus(401)
        return
      }
      let arr = new Array().concat(data.comment)
      arr.push({
        id: arr.length,
        time: new Date(),
        message: req.body.message, 
        portrait: req.body.portrait,
        good: 0,
        bad: 0,
        isGood: [],
        isBad: [],
        subComment: [],
        
      })
      productModel.findOneAndUpdate(req.body.myId, {comment: arr }, function(err, d) {
        if(err) {
          console.log(err);
          res.sendStatus(500)
          return
        }else if(d === null) {
          res.sendStatus(401)
          return
        }
        console.log('评论成功');
        res.send(arr)
      })
      // console.log(data);
      
      // res.send(data)
     
    })
   
  })

  
  function saveFile(file, callback){
    // 定义存储文件地址
    let savePath = path.resolve(__dirname, `../public/images/product/${file.fieldName}.jpg`)
    let sourcePath = file.path;
    
    // 创建读写流
    let readStream = fs.createReadStream(sourcePath);
    let writeStream = fs.createWriteStream(savePath);
    
    // 读写进程开始
    readStream.pipe(writeStream);
    
    // 监听读取完成事件
    readStream.on('end', (err) => {
      // 读取完成后，释放读取源文件链接
      fs.unlinkSync(sourcePath);
      callback(err);
    });
  }
module.exports = router;
