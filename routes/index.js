const express = require('express');
const router = express.Router();
const model = require('../model/index')
// const swiperModel = require('../model/swiper/swiper')
const fs = require('fs');
const image = require('imageinfo')

router.get('/', function(req, res) {
  res.sendFile( 'index.html', {root: 'D:\\workplace\\shidao\\views\\views'});
  // res.sendStatus(200)
  // try {
  //   res.sendFile("D:\\workplace\\shidao\\public\\images\\swiper\\sipwer1.jpg");
  // }
  //   catch(e) {

  //     console.log(e);
  //   }

})
router.get('/swiper', function(req, res) {

  // let imgList = []
  // fs.readdirSync( __dirname + "\\public\\images\\swiper").forEach((item) => {
  //   var ms = image(fs.readFileSync(item.path + item.filename));

  //   ms.mimeType && (imageList.push(item.path +item.filename))
  // console.log(imgList);
  // try {
  //   console.log("aa");
  //   res.sendFile("D:\\workplace\\shidao\\public\\images\\swiper\\swiper1.jpg");
  // }
  //   catch(e) {

  //     console.log(e);
  //   }

  // swiperModel.find({}, function(err, data) {
  //   if(err) {
  //     console.log(err);
  //     res.sendStatus(500)
  //     return
  //   }
  //   console.log(data);
  //   res.send(data)
  // })

  function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
        //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {

            var obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path;//路径
            obj.filename = itm//名字
            filesList.push(obj);
        }

    })

}
var getFiles = {
  getFileList: function (path) {
      var filesList = [];
      readFileList(path, filesList);
      return filesList;
  },
  getImageFiles: function (path) {
      var imageList = [];

      this.getFileList(path).forEach((item) => {
          var ms = image(fs.readFileSync(item.path + item.filename));

          ms.mimeType && (imageList.push('images/swiper/'+item.filename))
      });
      res.send(imageList);
      return imageList;

  }
};
 getFiles.getImageFiles("D:\\workplace\\shidao\\public\\images\\swiper\\");

})
module.exports = router;
