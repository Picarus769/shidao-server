var ws = require("nodejs-websocket");
const save = require('./saveMessage')
const find = require('./findMessage')
let arr = []

var server = ws.createServer(function(conn){
  console.log('建立连接');
  conn.on('connect', function(code) {
    console.log('开启连接', code)
  })
  conn.on("text", async function (data) {
    let obj = JSON.parse(data)
    // console.log('收到的obj'+obj)
      if(obj.type===0) {
          arr.push({id: obj.id, conn:conn})
          let resMsg = await find(obj)
        //   console.log('消息：'+resMsg);
          if(resMsg) {
            //   console.log(resMsg);
            resMsg.type = 3 //连接成功后同步聊天记录
            conn.send(JSON.stringify(resMsg))
          }
          
        //   arr[0].conn.sendText('发送成功，服务器接收到了')
      } else if(obj.type===1||obj.type===2){
            console.log(obj)
          arr.forEach(item => {
              if(item.id === obj.for) {
                  console.log('有这人');
                item.conn.send(JSON.stringify(obj))
              }
          })
          //将聊天记录保存到数据库
          save(obj)
          // let resMsg = await save(obj)
          // conn.send(JSON.stringify(resMsg))
      }
      
    // console.log(arr)

  })
  conn.on("close", function (code, reason) {
      let index = arr.findIndex(item => item.conn == conn)
      console.log(index,'离开的人：'+ arr[index].id)
      arr.splice(index,1)
      
      console.log("关闭连接", reason)
  });
  conn.on("error", function (code) {
        // let index = arr.findIndex(item => item.conn == conn)
        // console.log(index,'离开的人：'+ arr[index].id)
        // arr.splice(index,1)
      console.log("异常关闭", code)
  });
}).listen(5000)
module.exports = server