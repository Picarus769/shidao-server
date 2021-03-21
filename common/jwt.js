const jwt = require('jsonwebtoken');

let jwtSecret="jwtSecret",duringTime={expiresIn:60*60*24}
const  Jwt={
  setJwt:function (content) {
      var token=jwt.sign(content, jwtSecret,duringTime);
      return token
  },
  getJwt:function (token,callback) {
      jwt.verify(token,jwtSecret, function(err, decode){
          callback(err,decode);
      });
  }
};

module.exports = Jwt;