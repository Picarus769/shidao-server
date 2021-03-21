const mongoose = require('mongoose')
const Schema = require('../index')

let swiperSchema = new Schema({
    image: {
        type: String,
        required: true
    }

});//实例化对象
let swiperModel = mongoose.model('Swiper', swiperSchema);//新建数据库

// swiperModel.find({}, 'image', function(err, data) {
//     if(err) {
//         console.log(err);
//         return
//     }
//     console.log('swiper',data.map(q=> q.image));
// })

module.exports = swiperModel