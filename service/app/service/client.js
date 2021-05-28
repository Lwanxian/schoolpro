const Service = require('egg').Service;

class ClientService extends Service {

    async search(data) {
        const { ctx } = this;
        const results = await this.app.mysql.query(`SELECT * FROM paper   WHERE ptitle like '%${data.keywd}%' `);
        return results;
    }
    async searchpaper(data) {
        const { ctx } = this;
        let start = data.total * 20 - 20;
        let end = 20 * data.total;
        const results = await this.app.mysql.query(`SELECT  user.username,p.ptitle,p.createtime,p.uid , p.pid FROM user JOIN paper AS p  WHERE  user.uid =p.uid  AND  p.status=1   order by p.createtime  desc limit ${start},${end}`);

        return results;
    }
    async info(data) {
        const { ctx } = this;
        let time = new Date(data.form.date1).toLocaleDateString();
        const results = await this.app.mysql.query(`update user set username='${data.form.name}',userimg='${data.circleUrl}',psex='${data.form.sex}',hobby='${data.form.type}',birthday='${time}',sign='${data.form.desc}' where uid=${data.uid} `);
        return results;
    }
    async getinfo(data) {
        const { ctx } = this;
        const results = await this.app.mysql.query(`SELECT * FROM user  WHERE uid=${data.uid} `);
        return results;
    }
    async searchauthor(data) {
        const { ctx } = this;
        let start = data.total * 20 - 20;
        let end = 20 * data.total;
        const results = await this.app.mysql.query(`SELECT  user.username,p.ptitle,p.createtime,p.uid FROM user JOIN paper AS p  WHERE  user.uid =p.uid  AND  p.status=1  and p.uid=${data.uid}    order by p.createtime  limit ${start},${end}`);
        return results;
    }
    async clickadd(id) {
        const { ctx } = this;
        const clickadd = await this.app.mysql.query(`update paper set clickpaper=clickpaper+1 where pid=${id.pid} `);
        return clickadd;
    }
}

module.exports = ClientService;