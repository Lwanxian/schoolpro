'use strict';
const Controller = require('egg').Controller;
class CommentController extends Controller {
    // 作者信息
    async authorinfo() {
        const { ctx } = this;
        let r = { code: 1, Msg: '获取信息成功' };
        const pid = this.ctx.query.pid;
        console.log(pid);
        const result = await ctx.service.comment.checkauthorid(pid);
        console.log(result);
        ctx.body = {r,result};
    }
    // 文章标题
    async papertitle() {
        const { ctx } = this;
        let r = { code: 1, Msg: '获取信息成功' };
        const paperid = this.ctx.query.paperid;
        // console.log(paperid);
        const result = await ctx.service.comment.checkpaperid(paperid);
        // console.log(result);
        ctx.body = {r,result};
    }
    // 评论区
    async commentarea() {
        const { ctx } = this;
        let r = { code: 1, Msg: '获取信息成功' };
        const commentid = this.ctx.query.commentid;
        console.log(commentid);
        const result = await ctx.service.comment.checkcommentid(commentid);
        // console.log(result);
        ctx.body = {r,result};
    }
    // 向数据库插入input评论信息
    async sendcontent() {
        const { ctx } = this;
        let r = { code: 1, Msg: '获取信息成功' };
        const getcontent = this.ctx.query;
        // console.log(getcontent);
        const result = await ctx.service.comment.insertinfo(getcontent);
        // console.log(result);
        ctx.body = {r,result};
    }
    // 获取评论数量
    async commentcount() {
        const { ctx } = this;
        let r = { code: 1, Msg: '获取评论数量成功' };
        const getcommentcount = this.ctx.query;
        console.log(getcommentcount);
        const result = await ctx.service.comment.insercommentcount(getcommentcount);
        console.log(result);
        ctx.body = {r,result};
    }
   
    
}
module.exports = CommentController;