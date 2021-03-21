const messageModel = require('../model/message/message')

let find = async (obj) => {
    // console.log('找：'+obj);
    let arr = []
    let msg = []
    arr.push(new Promise((reslove, reject) => {
        messageModel.find({buyerId: obj.id}, function(err, message) {
            if(err) {
                console.log(err);
                return
            }
            // console.log(message)
            if(message) {
                msg = [...msg, ...message]
            }
            reslove() 
        })
    })) 
    arr.push(new Promise((reslove, reject) => {
        messageModel.find({sellerId: obj.id}, function(err, message) {
            if(err) {
                console.log(err);
                return
            }
            // console.log(message)
            if(message) {
                msg = [...msg, ...message]
            }
            reslove() 
        })
    })) 
    await Promise.all(arr).then(()=> {
    })
    // console.log('msg:'+ msg);
    return msg
}

module.exports = find