'use strict';
const path = require('path');
const fs = require('fs');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async uploads() {
    const { ctx } = this;
    const jsonData = {
      "errno": 0,
      "data": []
    };
    // 接收上传上来的文件，并把图片地址放到data里面
    const filesArr = ctx.request.files;
    console.log(filesArr);
    const to = path.dirname(__dirname) +  '/public/uploads/';
    filesArr.forEach((file)=>{
      // 把临时目录里面的文件copy到项目里面去
      fs.copyFileSync(file.filepath, to + path.basename(file.filepath));
      const imgurl = `http://192.168.5.100:81/public/uploads/${path.basename(file.filepath)}`;
      jsonData.data.push(imgurl);
    });

    ctx.body = jsonData;
  }

}

module.exports = HomeController;
