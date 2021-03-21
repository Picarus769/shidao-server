const mongoose = require('mongoose')
const Schema = require('../index')

let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    isReged: {
        type: Boolean,
        default: false
    },
    portrait: {
        type: String,
        default: 'images/portrait/touxiang1.jpg'
    },
    leaveTime: {
        type: String
    },
    school: {
        type:String,
        default: '哈尔滨商业大学'
    },
    history: {
        type:Array
    },
    message:{
        type: Array
    }

});//实例化对象
let userModel = mongoose.model('User', userSchema);//新建数据库

// userModel.find({}, function(err, data) {
//     if(err) {
//         console.log(err);
//         return
//     }
//     console.log('aa',data);
// })

module.exports = userModel