const mongoose = require('mongoose')
const Schema = require('../index')

let productSchema = new Schema({
    images: {
        type: String,
        required: true
    },
    homePic: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    master: {
        type: String,
        required: true
    },
    masterId: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    portrait: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    comment: {
        type: Array
    },
    createTime: {
        type: String,
        required: true
    },
    good: {
        type: Number,
        default: 0
    },
    cate: {
        type: String
    },
    pageViews: {
        type: Number,
        default: 0
    }


});//实例化对象
let productModel = mongoose.model('product', productSchema);//新建数据库

// let product = new productModel({
//     message: '测试商品1',
//     homePic: 'images/product/product3.jpg',
//     images: 'images/product/product3.jpg,images/swiper/product3.jpg',
//     master: '潘',
//     school: '哈尔滨商业大学',
//     portrait: 'images/portrait/touxiang2.jpg',
//     price: 20
// })
// product.save(function(err, docs) {
//     if(err) return console.log(err);
//     console.log(docs);
// })
// productModel.find({}, function(err,data) {
//     console.log(data);
// })
module.exports = productModel