const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const md5 = require("md5");
class userService extends Service {

    async reg(userinfo) {
        let mpass = md5(userinfo.password);
        let sql1 = `select * from user where usertel='${userinfo.tel}'`;
        const result1 = await this.app.mysql.query(sql1);
        if (result1.length == 0) {
            const sql = `INSERT INTO user(username,passwd,usertel,sign,protect1,protect2,protect3) VALUES ("${userinfo.username}", "${mpass}",${userinfo.tel},"${userinfo.sign}","${userinfo.protect1}","${userinfo.protect2}","${userinfo.protect3}")`
            const result = await this.app.mysql.query(sql);
            if (result.affectedRows == 1) {
                return {
                    msg: "注册成功"
                }
            } else {
                return {
                    msg: "注册失败"
                }
            }
        } else {
            return {
                msg: "该账号已经注册过，请前往登录"
            }

        }

    }
    async login(userinfo) {

        const sql = `select * from user where username='${userinfo.username}'`
        const result = await this.app.mysql.query(sql);
        if (this.ctx.session.code.toLowerCase() == userinfo.svgcode) {
            if (result.length !== 0) {
                if (result[0].passwd == md5(userinfo.password)) {
                    return {
                        code: 0,
                        uid: result[0].uid,
                        msg: "登录成功"
                    }
                } else {
                    return {
                        code: 1,
                        msg: "登录失败，密码错误"
                    }
                }
            } else {
                const sql1 = `select * from user where usertel='${userinfo.username}'`
                const result1 = await this.app.mysql.query(sql1);
                if (result1.length !== 0) {
                    if (result1[0].passwd == md5(userinfo.password)) {
                        return {
                            code: 0,
                            msg: "登录成功"
                        }
                    } else {
                        return {
                            code: 1,
                            msg: "登录失败，密码错误"
                        }
                    }
                } else {
                    return {
                        code: 2,
                        msg: "登录失败，用户名不存在"
                    }
                }
            }
        } else {
            return {
                code: 3,
                msg: "验证码错误"
            }
        }

    }
    async captcha() {
        const captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 40,
            bacground: '#cc9966'
        });
        this.ctx.session.code = captcha.text; //缓存验证码中的文字
        return captcha; //返回验证码


    }
    async protect(userinfo) {
        const sql = `select * from user where usertel='${userinfo.tel}'`
        const result = await this.app.mysql.query(sql);
        if (result.length !== 0) {
            if (result[0].protect1 == userinfo.fname && result[0].protect2 == userinfo.mname && result[0].protect3 == userinfo.sname) {
                return {
                    msg: "验证成功"
                }
            } else if (result[0].protect1 !== userinfo.fname) {
                return {
                    msg: "您父亲的名字验证错误"
                }
            } else if (result[0].protect2 !== userinfo.mname) {
                return {
                    msg: "您母亲的名字验证错误"
                }
            } else if (result[0].protect3 !== userinfo.sname) {
                return {
                    msg: "您小学母校的名字验证错误"
                }
            }
        } else {
            return {
                msg: "此电话号码暂未注册"
            }

        }
    }
    async protect(userinfo) {
        const sql = `select * from user where usertel='${userinfo.tel}'`
        const result = await this.app.mysql.query(sql);
        if (result.length !== 0) {
            if (result[0].protect1 == userinfo.fname && result[0].protect2 == userinfo.mname && result[0].protect3 == userinfo.sname) {
                return {
                    uid: result[0].uid,
                    msg: "验证成功"
                }
            } else if (result[0].protect1 !== userinfo.fname) {
                return {
                    msg: "您父亲的名字验证错误"
                }
            } else if (result[0].protect2 !== userinfo.mname) {
                return {
                    msg: "您母亲的名字验证错误"
                }
            } else if (result[0].protect3 !== userinfo.sname) {
                return {
                    msg: "您小学母校的名字验证错误"
                }
            }
        }
    }

    async modify(userinfo) {
        const sql = `update user set passwd=${userinfo.pass} where usertel=${userinfo.tel}`
        const result = await this.app.mysql.query(sql);
        if (result.affectedRows == 1) {
            return {
                msg: "修改成功"
            }
        }
    }


    async modify(userinfo) {
        let mpass = md5(userinfo.pass);
        const sql = `update user set passwd="${mpass}" where usertel=${userinfo.tel}`
        const result = await this.app.mysql.query(sql);
        if (result.affectedRows == 1) {
            return {
                msg: "修改成功"
            }
        }
    }
    async gettel(userinfo) {
        const sql = `select * from user where uid='${userinfo.uid}'`
        const result = await this.app.mysql.query(sql);
        return result
    }


}
module.exports = userService;