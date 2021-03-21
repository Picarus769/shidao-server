const mongoose = require('mongoose')
const Schema = require('../index')

let messageSchema = new Schema({
    buyerId: {
        type: String,
        required: true
    },
    goodId: {
        type: String,
        required:true
    },
    sellerId: {
        type: String,
        required: true
    },
    message: {
        type: Array
    },
    buyerpeek: {
        type: String
    },
    sellerpeek: {
        type: String
    },
    buyerName: {
        type: String,
        required: true
    },
    goodPic: {
        type: String,
        required: true
    },
    buyerPortrait: {
        type: String,
        required: true
    },
    sellerPortrait: {
        type: String,
        required: true
    },
    sellerName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

});//实例化对象
let messageModel = mongoose.model('message', messageSchema);//新建数据库

module.exports = messageModel