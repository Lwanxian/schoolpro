const Service = require('egg').Service;

class CommentService extends Service {

  async checkauthorid(id) {
    const { ctx} = this;
    const authorname = await this.app.mysql.query(`SELECT user.username,user.userimg,user.sign,p.createtime FROM user JOIN paper AS p WHERE user.uid=p.uid AND p.pid=${id}`);
    return authorname;
  }

  async checkpaperid(id) {
    const { ctx} = this;
    const authorname = await this.app.mysql.query(`SELECT ptitle,pcontent,clickpaper FROM paper WHERE pid=${id}`);
    return authorname;
  }
  async checkcommentid(id) {
    // 评论列表渲染
    const { ctx} = this;
    const commentinfo = await this.app.mysql.query(`SELECT user.username,user.userimg,p.createtime,p.content FROM user JOIN pinglun AS p  WHERE user.uid=p.uid  and  p.pid=${id} ORDER BY p.createtime DESC`);
    return commentinfo;
  }
  
  async insertinfo(getcontent) {
    // 向数据库插入评论
    const { ctx } = this;
    const commentinfo = await this.app.mysql.query(`INSERT INTO pinglun (uid,pid,content) VALUES ('${getcontent.uid}','${getcontent.pid}','${getcontent.content}')`)
    return commentinfo;
  }

  async insercommentcount(id) {
    const { ctx} = this;
    const commentcount = await this.app.mysql.query(`SELECT COUNT(*) AS c FROM pinglun WHERE pid=${id.pid}`);
    return commentcount;
  }
 
}

module.exports = CommentService;

