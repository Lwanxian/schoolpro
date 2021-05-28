'use strict';
const path = require('path');
const fs = require('fs');
const Controller = require('egg').Controller;

class ClientController extends Controller {
  async search() {
    const { ctx } = this;
    let data=this.ctx.query
    let result=await ctx.service.client.search(data);
    ctx.body =result;
  }
  async searchpaper() {
    const { ctx } = this;
    let data=this.ctx.query
    let result=await ctx.service.client.searchpaper(data);
    ctx.body =result;
  }
  async info() {
    const { ctx } = this;
    let data=ctx.request.body
    let r={code:0,msg:"保存成功"}
    let result=await ctx.service.client.info(data);
    ctx.body =r;
  }
  async getinfo() {
    const { ctx } = this;
    let data=this.ctx.query
    let r={code:0,msg:"获取成功"}
    let result=await ctx.service.client.getinfo(data);
    ctx.body =result;
  }
  async searchauthor() {
    const { ctx } = this;
    let data=this.ctx.query
    let r={code:0,msg:"获取成功"}
    let result=await ctx.service.client.searchauthor(data);
    ctx.body =result;
  }
  async clickadd() {
    const { ctx } = this;
    let r = { code: 1, Msg: '数量添加成功' };
    const pid = ctx.request.body;
    console.log(pid);
    const result = await ctx.service.client.clickadd(pid);
    console.log(result);
    ctx.body = {r,result};
}
}

module.exports = ClientController;
