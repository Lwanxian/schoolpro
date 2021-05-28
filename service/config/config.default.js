/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};


    exports.session = {
        key: 'EGG_SESS11111', //eggjs默认session的key
        maxAge: 24 * 3600 * 1000, // 1 day
        httpOnly: true,
        encrypt: true,
        renew: true //每次访问页面都会给session会话延长时间
    };
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1610509184305_105';

    // add your middleware config here
    config.middleware = [];

    // 配置服务器基本信息
    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };
    // 配置服务器基本信息
    userConfig.cluster = {
        listen: {
            path: '',
            port: 8081,
            hostname: '', //默认localhost和ip地址,上线时用0.0.0.0
        }
    };


    // 跨域处理配置
    userConfig.cors = {
        origin: 'http://localhost:8080', //不能是*
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTION',
        // // 允许携带凭证
        credentials: true
    };

    // 跨域处理配置


    // 数据库的配置
    userConfig.mysql = {
        // 单数据库信息配置
        client: {
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'root',
            database: 'c1024',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };

    // 配置安全验证
    userConfig.security = {
        csrf: {
            enable: false,
            ignoreJSON: true,
        }
    }

    //     // 图片采用文件模式上传
    // userConfig.multipart = {
    //     mode: 'file',
    // };
    userConfig.multipart = { //文件模式
        mode: 'file',
        fileSize: '100mb',
        whitelist: [".mp4", ".webm", ".png", ".jpg"]
    };
    userConfig.bodyParser = {
        jsonLimit: '50mb',
        formLimit: '50mb',
    };
    userConfig.uploadDir = 'app/public/publishimg';



    return {
        ...config,
        ...userConfig,
    };
};