const nodemailer = require("nodemailer");
let obj = {
  transporter: nodemailer.createTransport({
    service: "qq", // 运营商  qq邮箱 网易//
    port: 465,
    secure: true,
    auth: {
      user: "1027497226@qq.com", //发送方的邮箱
      pass: "bpgqblzuvlsibdeh" // pop3 授权码
    }
  }),
  send: function(mail, content,callback) {
    mailOptions = {
      from: '"shidao注册邮件~" <1027497226@qq.com>',
      to: mail,
      subject: "注册",
      text: "注册",
      html: "<h1><a href=\"http://127.0.0.1:3000/users/check?secret="+ content +"\">点击链接完成注册</a></h1>"
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('aa');
        callback(error);
        return;
      }
      console.log("Message sent: %s", info.messageId);
      callback();
    });
  }
};
module.exports = obj;