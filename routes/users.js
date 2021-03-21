const express = require('express');
const router = express.Router();
const NodeRSA = require('node-rsa');
const sendMail = require('../common/mailer')
const userSchema = require('../model/user/login')
const Jwt = require('../common/jwt')

const key = new NodeRSA({b: 512});

// var publicDer = key.exportKey("pkcs1-public-pem"); //公钥
// var privateDer = key.exportKey("pkcs1-private-pem");//私钥
// console.log("公钥:", publicDer);
// console.log("私钥:", privateDer);

//发送验证邮件
router.post('/register', function(req, res) {
  console.log(req.body)
  const mail = req.body.userName
  let f ='0'
  new Promise((res,rej)=> {
    try {
      const secret =key.encrypt(req.body.userName, 'base64').replace(/\+/g, '%2B');
      userSchema.findOne({email: req.body.userName}, function(err, data) {
        if(err) {
          // res.sendStatus(500)
          rej(500)
          console.log(err);
          return
        }
        console.log(data);
        if(data && data.isReged === true) {
          console.log('有了');
          rej('1')
        } else {
          sendMail.send(mail, secret, (err) => {
            if(err) {
              console.log('bb');
              rej('2')
            }
            console.log('发送成功');
            let user = new userSchema({
              email: req.body.userName,
              password: req.body.password,
              leaveTime: new Date(),
              userName: req.body.userName
            })
            user.save(function(err) {
              if(err) {
                rej(500)
                console.log(err);
                return
              }
              console.log('添加用户成功');
            })
          });
        }
        res()
      })
    } catch (e){
      console.log(e);
    }
  }).then(() => {
    res.send(f);
  }).catch((err) => {
    console.log(err);
    if(err === 500) {
      res.sendStatus(500)
    }else {
      res.send(err)
    }
  })
});

//邮件确认
router.get('/check', function(req, res) {
  console.log(req.query)
  console.log(req.query.secret)
  let flag = false
  try {
    let _email = key.decrypt(req.query.secret, 'utf8')
    console.log(_email)
    userSchema.findOne({email: _email}, function(err, data) {
      if(err) {
        console.log(err);
        return
      }
      if(data.isReged === true) {
        console.log('有了');
        flag = true
      } else {
        userSchema.findOneAndUpdate({email: _email}, {isReged: 'true'} , function(err, data) {
          if(err) {
            console.log(err);
            return
          }
          console.log(data);
        })
      }
    })
  } catch(e) {
    console.log(e);
  }
  if(flag) {
    res.send('请不要反复注册');
  }
  res.send('注册成功');
});

//登录
router.post('/login', function(req,res) {
  console.log(req.body)
  userSchema.findOne({email: req.body.userName, password: req.body.password, isReged: true}, function(err, data) {
    if(err) {
      console.log(err);
      res.sendStatus(500)
      return
    }else if(data === null) {
      res.sendStatus(401)
      return
    }
    let token=Jwt.setJwt({userName:data.userName});
    console.log(data);
    res.send({data,token})
  })
})

router.post('/autoLogin', function(req, res) {
  // console.log(req.body.token)
  Jwt.getJwt(req.body.token, (err,decode) => {
    if (err) {
      //时间失效的时候 || 伪造的token
        res.send('NotOK');
    } else {
      userSchema.findOne({userName: decode.userName, isReged: true}, function(err, data) {
        if(err) {
          console.log(err);
          res.sendStatus(401)
          return
        }else if(data === null) {
          res.sendStatus(401)
          return
        }
        res.sendStatus(200)
      })
    }
  })
})

module.exports = router;
