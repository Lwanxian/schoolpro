'use strict';
const Controller = require('egg').Controller;
let wenjian = require("fs");
let path = require("path");
class PublishController extends Controller {
    async add() {
        const { ctx } = this;
        const obj = ctx.request.body
        const result = await ctx.service.publish.add(obj);
        ctx.body = result;
    }
    async imgurl() {
        const { ctx } = this;
        let file = ctx.request.files[0];
        // let obj = ctx.request.body;
        // console.log(obj);
        wenjian.renameSync(file.filepath, path.join(__dirname, "../public/publishimg/" + `${path.basename(file.filepath)}`));
        let httpurl = `http://localhost:8081/public/publishimg/${path.basename(file.filepath)}`;
        ctx.body = httpurl;
    }
    async getusermessage() {
        const { ctx } = this;
        const uid = ctx.request.query.uid;
        const result = await ctx.service.publish.getusermessage(uid);
        ctx.body = result;
    }

}
module.exports = PublishController;