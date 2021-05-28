'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/search', controller.client.search);
    router.get('/searchpaper', controller.client.searchpaper);
    router.get('/searchauthor', controller.client.searchauthor);
    router.post('/clickadd', controller.client.clickadd);
    
    router.get('/', controller.home.index);
    // 评论相关
    router.get('/authorinfo', controller.comment.authorinfo);
    router.get('/papertitle', controller.comment.papertitle);
    router.get('/commentarea', controller.comment.commentarea);
    router.get('/sendcontent', controller.comment.sendcontent);
    router.get('/commentcount', controller.comment.commentcount);

    // 用户登录
    // router.post('/login1', controller.client.login1);
    router.post('/reg', controller.user.reg);
    router.post('/login', controller.user.login);
    router.get('/captcha', controller.user.captcha)
    router.post('/protect', controller.user.protect)
    router.post('/modify', controller.user.modify)
        //帖子的增加
    router.post('/publish', controller.publish.add);
    router.post('/publishimg', controller.publish.imgurl);
    router.get('/gettel', controller.user.gettel);
    router.post('/info', controller.client.info);
    router.get('/getinfo', controller.client.getinfo);
    //获取已登录用户的信息
    router.get('/getusermessage', controller.publish.getusermessage);



};