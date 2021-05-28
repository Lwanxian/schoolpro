const Service = require('egg').Service;
class PublishService extends Service {
    async add(obj) {
        const sql = "INSERT INTO paper (uid, ptitle, pcontent)  VALUES (?, ?, ?)";
        const data = await this.app.mysql.query(sql, [obj.uid, obj.ptitle, obj.pcontent]);
        const result = { "code": 1, "Msg": "添加成功" };
        if (data.length == 0) {
            result = { "code": -1, "Msg": "添加失败" };
        }
        return result;
    }
    async getusermessage(uid) {
        let sql = "select username,usertel,userimg,sign from user where uid=?"
        const userdata = await this.app.mysql.query(sql, [uid]);
        if (userdata.length == 0) {
            result = { "code": -1, "Msg": "查询失败" };
        }
        const result = { "code": 1, "Msg": "查询成功", "userdata": userdata };
        return result;
    }

}
module.exports = PublishService;