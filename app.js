var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
const userSchema = require('./model/user/login')

const server = require('./service/sokect')


const Jwt = require('./common/jwt.js')

var app = express();
app.all("*",function(request,response,next){ 
  response.header("Access-Control-Allow-Origin", "*");//访问控制允许来源：所有             
  response.header("Access-Control-Allow-Headers", "*");//访问控制允许报头X-Requested-With: xhr请求 
  response.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//访问控制允许方法 
  response.header("X-Powered-By",' 3.2.1');//自定义头信息，表示服务端用3.2.1 
  response.header("Content-Type", "application/json;charset=utf-8"); 
  next(); 
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//更新离开时间的防抖
let timeList = []
app.use(function (request,response,next) {
  if(
    request.url=='/users/register'||request.url=='/users/check'||request.url=='/users/login'
    ||request.url=='/swiper'
  ){//可以更多。不列举
    next();
  }else{
    var token=request.headers.token;
    // console.log(1);
    // console.log(request.url);
    // console.log(token);
    // console.log(2);
    if(token&&token!=''){
      console.log(token);
      //验证token
        Jwt.getJwt(token,function (err,decode) {
            if (err) {
              //时间失效的时候 || 伪造的token
                  if(err.name == 'TokenExpiredError'){//token过期
                    response.setHeader("tokenStatus", "0"); 
                    // response.tokenStatus=0
                  }else if(err.name == 'JsonWebTokenError'){//无效的token
                    response.setHeader("tokenStatus", "-1");
                    // response.tokenStatus=-1
                  }
                  
              console.log(err.name);
              next();
              // response.send({'msgCode':-1});
            } else {
              let temp = timeList.find(item => item.userName === decode.userName)
              let time = new Date()
              console.log(time.getTime());
              console.log(new Date(time).getTime());
              if(temp) {
                console.log(time - temp.leaveTime);
              }
              
              //防抖
              if(temp === undefined || (time - temp.leaveTime)>60000) {
                //更新离开时间
                userSchema.findOneAndUpdate({userName: decode.userName, isReged: true}, {leaveTime: time}, function(err, data) {
                  if(err) {
                    console.log(err);
                    response.sendStatus(401)
                    return
                  }else if(data === null) {
                    response.sendStatus(401)
                    return
                  }
                  timeList.push({userName: decode.userName,leaveTime: time})
                  // response.send(200)
                })
              } else {

                console.log((time - temp.leaveTime));
              }
              response.setHeader("tokenStatus", "1");
              //获取通行权限
              next();
            }
        })
    }else{
      //token不存在
      response.setHeader("tokenStatus", "-1");
      // response.send({"msgCode":-1});
      next();
    }
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
