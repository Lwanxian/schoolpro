'use strict';
const Controller = require('egg').Controller;
class userController extends Controller {
  async reg() {
    const { ctx } = this;
    let userinfo = ctx.request.body;
    let result = await ctx.service.user.reg(userinfo)

    ctx.body = result
  }
  async login() {
    const { ctx } = this;
    let userinfo = ctx.request.body;
    let result = await ctx.service.user.login(userinfo)
    ctx.body = result
  }
  async captcha() {
    const { ctx } = this;
    let captcha = await this.service.user.captcha(); // Service里面的方法
    ctx.body = captcha.data; // 返回一张svg图片
  }
  async protect() {
    const { ctx } = this;
    let userinfo = ctx.request.body;
    let result = await ctx.service.user.protect(userinfo)
    ctx.body = result
  }
  async modify() {
    const { ctx } = this;
    let userinfo = ctx.request.body;
    let result = await ctx.service.user.modify(userinfo)
    ctx.body = result
  }
  async gettel() {
    const { ctx } = this;
    let userinfo = ctx.request.query;
    let result = await ctx.service.user.gettel(userinfo)
    ctx.body = result
  }
}
module.exports = userController;