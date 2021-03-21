const messageModel = require('../model/message/message')

let save = (data) => {
    // console.log('保存:',data);
    // console.log(typeof data.type);
    let saveMsg = () => {
        let msg = new messageModel({
            buyerId: data.id,
            sellerId: data.for,
            goodId: data.goodId,
            message: [data],
            buyerName: data.userName,
            goodPic: data.goodPic,
            buyerPortrait: data.portrait,
            sellerPortrait: data.masterPortrait,
            sellerName: data.masterName,
            price: data.price
        })
        msg.save(function(err) {
            if(err) {
                console.log(err);
                return
            }
            console.log('添加消息表成功');
        })
    }

    if(data.type===1) {
        messageModel.findOne({buyerId: data.id, sellerId: data.for}, function(err,message) {
            // console.log(message)
            if(err) {
                console.log(err);
                return
            }
            if(message) {
                let arr = [...message.message, data]
                messageModel.findOneAndUpdate({buyerId: data.id, sellerId: data.for}, {message: arr}, function(err, data) {
                    if(err) {
                        console.log(err);
                        return
                    }
                })
            }else {
                saveMsg()
            }
        })
    } else if(data.type===2) {
        // console.log(data)
        messageModel.findOne({buyerId: data.for, sellerId: data.id}, function(err,message) {
            // console.log(message)
            if(err) {
                console.log(err);
                return
            }
            let arr = [...message.message, data]
            console.log(arr)
            // if(data.buyerId) {
                messageModel.findOneAndUpdate({buyerId: data.for, sellerId: data.id}, {message: arr}, function(err, m) {
                    console.log(data)
                    console.log('更新：'+ m )
                    console.log(err)
                    if(err) {
                        console.log(err);
                        return
                    }
                })
            // }else {
                // console.log('没找到')
                // saveMsg()
            // }
        })
    }
    
    // callback()
}

module.exports = save