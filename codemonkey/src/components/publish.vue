<template>
  <div class="main">
    <el-page-header class="ziti headercss" @back="goBack" content="帖子发表">
    </el-page-header>
    <div class="gerenmessage ziti">
      <div class="mainmessage">
        <el-avatar class="headimg" :size="60" :src="userimg"></el-avatar>
        <span class="usernamecss" v-html="username"></span>
        <div class="messagelist">
          <ul>
            <li>LV：<span>5</span></li>
            <li>发帖数：<span>38</span></li>
            <li>粉丝：<span>600</span></li>
            <li>邮箱/手机号：<span v-html="usertel">1769122103@qq.com</span></li>
            <li>个性签名：<span v-html="usersign">撸码时长两小时半的个人撸码生</span></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <el-avatar :size="50" :src="headimgUrl"></el-avatar> -->
    <!-- 富文本编辑器 -->
    <el-card class="bigwenben">
      <!-- 帖子标题 -->
      <el-input
        class="title"
        prefix-icon="el-icon-edit"
        clearable
        type="text"
        :autosize="{ maxRows: 2 }"
        placeholder="请输入标题(不能超过40个汉字或字符)"
        v-model="title"
      >
      </el-input>
      <!-- 帖子内容 -->
      <quill-editor
        class="littlewenben"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
      >
        <div id="toolbar" slot="toolbar">
          <!-- Add a bold button -->
          <button class="ql-bold" title="加粗">Bold</button>
          <button class="ql-italic" title="斜体">Italic</button>
          <button class="ql-underline" title="下划线">underline</button>
          <button class="ql-strike" title="删除线">strike</button>
          <button class="ql-blockquote" title="引用"></button>
          <button class="ql-code-block" title="代码"></button>
          <button class="ql-header" value="1" title="标题1"></button>
          <button class="ql-header" value="2" title="标题2"></button>
          <!--Add list -->
          <button class="ql-list" value="ordered" title="有序列表"></button>
          <button class="ql-list" value="bullet" title="无序列表"></button>
          <!-- Add font size dropdown -->
          <select class="ql-header" title="段落格式">
            <option selected>段落</option>
            <option value="1">标题1</option>
            <option value="2">标题2</option>
            <option value="3">标题3</option>
            <option value="4">标题4</option>
            <option value="5">标题5</option>
            <option value="6">标题6</option>
          </select>
          <select class="ql-size" title="字体大小">
            <option value="10px">10px</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px" selected>16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
          <select class="ql-font" title="字体">
            <option value="SimSun">宋体</option>
            <option value="SimHei">黑体</option>
            <option value="Microsoft-YaHei">微软雅黑</option>
            <option value="KaiTi">楷体</option>
            <option value="FangSong">仿宋</option>
            <option value="Arial">Arial</option>
          </select>
          <!-- Add subscript and superscript buttons -->
          <select class="ql-color" value="color" title="字体颜色"></select>
          <select class="ql-background" value="background" title="背景颜色"></select>
          <select class="ql-align" value="align" title="对齐"></select>
          <button class="ql-clean" title="还原"></button>
          <!-- You can also add your own -->
          <el-button disabled class="ql-link" title="超链接"></el-button>
          <button class="ql-image" title="照片"></button>
          <!-- <button class="ql-video" title="视频"></button> -->
        </div>
      </quill-editor>
    </el-card>
    <!-- 风车 -->
    <div class="fengche">
      <div class="zhijia"></div>
      <div class="zhijia"></div>
      <div class="shan"></div>
      <div class="shan"></div>
      <div class="shan"></div>
      <div class="shan"></div>
    </div>
    <!-- 帖子的发表编辑清空按钮组 -->
    <div class="btn">
      <el-row>
        <el-tooltip class="item" effect="dark" content="搜索" placement="top-start">
          <el-button v-model="keyong" disabled icon="el-icon-search" circle></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
          <el-button
            @click="focusclick()"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="发表" placement="top-start">
          <el-button
            @click="addtiezi()"
            :disabled="addtiezikeyong"
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="邮箱" placement="top-start">
          <el-button
            v-model="keyong"
            disabled
            type="info"
            icon="el-icon-message"
            circle
          ></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="分享" placement="top-start">
          <el-button
            @click="drawer = true"
            type="warning"
            icon="el-icon-share"
            circle
          ></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="清空" placement="top-start">
          <el-button
            @click="deleteall()"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </el-tooltip>
      </el-row>
    </div>
    <el-drawer
      class="chouti"
      title="分享至"
      :visible.sync="drawer"
      :before-close="handleClose"
    >
      <el-row>
        <el-tooltip
          class="item"
          effect="dark"
          content="分享到QQ空间"
          placement="top-start"
        >
          <el-button @click="share('qzone')" circle
            ><img src="http://qzonestyle.gtimg.cn/aoi/img/logo/favicon.ico" alt=""
          /></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="分享到新浪微博"
          placement="top-start"
        >
          <el-button @click="share('sina')" type="primary" circle
            ><img src="https://weibo.com/favicon.ico" alt=""
          /></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="分享给QQ好友"
          placement="top-start"
        >
          <el-button @click="share('qq')" type="success" circle
            ><img src="https://connect.qq.com/favicon.ico" alt=""
          /></el-button>
        </el-tooltip>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import { Quill, quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import quillConfig from "../config/vue-quill-editor-config";

//引入font.css
import "../assets/css/font.css";

// 自定义字体大小
let Size = Quill.import("attributors/style/size");
Size.whitelist = ["10px", "12px", "14px", "16px", "18px", "20px"];
Quill.register(Size, true);

// 自定义字体类型
var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif",
  "宋体",
  "黑体",
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts;
Quill.register(Font, true);

export default {
  name: "FuncFormsEdit",
  components: {
    quillEditor,
  },
  data() {
    return {
      keyong: false,
      addtiezikeyong: false,
      title: "",
      content: "",
      editorOption: quillConfig,
      jishiqitime: 60,
      jishiqi: "",
      drawer: false,
      username: "",
      userimg: "",
      usertel: "",
      usersign: "",
    };
  },
  methods: {
    share(type) {
      //qq空间分享接口
      if (type == "qzone") {
        window.open(
          "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?				url=" +
            document.location.href +
            "?sharesource=qzone&title=标题&pics=图片地址&summary= 描述"
        );
      }
      //新浪微博接口的传参
      if (type == "sina") {
        window.open(
          "http://service.weibo.com/share/share.php?url=" +
            document.location.href +
            "?sharesource=weibo&title=标题&pic=图片&appkey=微博平台申请的key"
        );
      }
      //qq好友接口的传参
      if (type == "qq") {
        window.open(
          "http://connect.qq.com/widget/shareqq/index.html?url=" +
            document.location.href +
            "?sharesource=qzone&title=标题&pics=图片地址&summary= 描述"
        );
      }
      //    			//微信分享
      //          if(type == 'weixin'){
      // var url = window.location.href,
      //                 encodePath = encodeURIComponent(url),
      //                 targetUrl = 'http://qr.liantu.com/api.php?text=' + encodePath;
      //              window.open(url,'weixin', 'height=320, width=320')
      //          }
    },
    goBack() {
      this.$router.push("/");
    },
    handleClose(done) {
      this.$confirm("确认取消分享？")
        .then((_) => {
          done();
          this.$message.error("取消了分享！");
        })
        .catch((_) => {});
    },
    daojishi() {
      this.jishiqi = setInterval(() => {
        this.timereduce();
        console.log("执行");
      }, 1000);
    },
    timereduce() {
      this.jishiqitime--;
      if (this.jishiqitime <= 0) {
        clearInterval(this.jishiqi);
        this.jishiqitime = this.$options.data().jishiqitime;
        this.addtiezikeyong = false;
        console.log(this.jishiqitime);
      }
    },
    focusclick() {
      //点击编辑聚焦到帖子内容
      this.$refs.myQuillEditor.quill.focus();
    },
    contentortitleerr() {
      this.$message.error("标题或者内容不符合规范！");
    },
    addsuccess() {
      //帖子成功存到数据库
      this.$message({
        message: "恭喜你，帖子成功发布啦！发布功能将冷却60秒",
        type: "success",
      });
    },
    addfailed() {
      //帖子存到数据库失败
      this.$message.error("帖子不知道为什么发布失败了！");
    },
    addtiezi() {
      //发表帖子
      // this.content = this.content.replace(<img[\s]+src[\s]*=[\s]*((['"](?<src>[^'"]*)[\'"])|(?<src>[^\s]*)));//去除标签

      if (
        !this.title ||
        !this.content ||
        this.title.length > 40 ||
        this.content.length > 10000
      ) {
        //帖子内容验证
        console.log(this.title.length, this.content.length);
        this.contentortitleerr();
        return;
      }
      const content = this.content;
      console.log(content);

      this.$confirm("写好帖子了吗？不要发表违规内容哦, 是否发表?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.addtiezikeyong = true;
          this.daojishi();
          this.axios
            .post("/publish", {
              uid: sessionStorage.getItem("login"),
              ptitle: this.title,
              pcontent: this.content,
            })
            .then((res) => {
              const result = res.data;
              if (result.code == 1) {
                this.addsuccess();
                this.$router.push("/");
              } else {
                this.addfailed();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发表",
          });
        });
    },
    getusermessage() {
      //获取当前已登录用户的一系列信息
      this.axios
        .get("/getusermessage", {
          params: {
            uid: sessionStorage.getItem("login"),
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            const usermessage = res.data.userdata[0];
            this.$message({
              message: `用户${usermessage.username}又来发帖啦！`,
              type: "success",
            });
            // console.log(usermessage.userimg);
            this.username = usermessage.username;
            this.usertel = usermessage.usertel;
            this.userimg = usermessage.userimg;
            this.usersign = usermessage.sign;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteall() {
      //清空帖子
      this.$confirm("此操作将清空你的贴子标题和内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.title = "";
          this.content = "";
          this.$message({
            type: "success",
            message: "清除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清除",
          });
        });
    },
  },
  mounted() {
    this.getusermessage();
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.main {
  height: 100vh;
  width: 100vw;
  background: url("../assets/publish/background.jpg");
  background-size: cover;
  position: relative;
}
.headercss {
  position: absolute;
  top: 2vh;
  color: #409eff;
}
.ziti {
  font-family: "KaiTi";
}
.gerenmessage {
  height: 85vh;
  width: 12vw;
  position: absolute;
  top: 8vh;
  left: 2vw;
  border-radius: 5px;
  background-color: rgba(251, 189, 128, 0.5);
  .mainmessage {
    position: relative;
    .headimg {
      position: absolute;
      left: 0.5vw;
      top: 3vh;
    }
    .usernamecss {
      position: absolute;
      width: 120px;
      left: 4.5vw;
      top: 9vh;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 18px;
      // &::after{
      //   content: "...";
      // }
    }
    .messagelist {
      position: absolute;
      top: 15vh;
      left: 0.5vw;
    }
    .messagelist ul li {
      width: 170px;
      margin-bottom: 10px;
      text-align: left;
      list-style: none;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .messagelist li:nth-child(5) {
      white-space: unset;
    }
    .messagelist li:nth-child(5) span {
      white-space: unset;
      width: 10px;
    }
    .messagelist span {
      color: #f3a801;
    }
  }
}
*::-webkit-scrollbar {
  display: none !important;
}
.bigwenben {
  height: 80vh;
  width: 55vw;
  position: absolute;
  left: 15vw;
  top: 10vh;
  box-shadow: none !important;
  overflow: scroll;
  .title {
    margin-bottom: 10vh;
  }
  .littlewenben {
    height: 50vh;
  }
}
.fengche {
  width: 300px;
  height: 300px;
  position: absolute;
  animation: rotate 10s linear infinite;
  top: 10vh;
  right: 5vw;
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    50% {
      transform: rotate(-200deg);
    }

    100% {
      transform: rotate(-360deg);
    }
  }

  .zhijia {
    width: 300px;
    height: 2px;
    background-color: #f9c27f;
  }

  .zhijia:first-child {
    position: relative;
    top: 50%;
  }

  .zhijia:nth-child(2) {
    position: relative;
    top: 50%;
    transform: rotate(90deg);
    top: 147px;
  }

  .shan {
    position: absolute;
    width: 50px;
    height: 80px;
    background-color: #f9c27f;
  }

  .shan:nth-child(4) {
    position: absolute;
    top: 0px;
    left: 150px;
  }

  .shan:nth-child(3) {
    position: absolute;
    top: 220px;
    left: 99px;
  }

  .shan:nth-child(6) {
    position: absolute;
    right: 15px;
    top: 137px;
    transform: rotate(90deg);
  }

  .shan:nth-child(5) {
    position: absolute;
    left: 15px;
    top: 86px;
    transform: rotate(90deg);
  }
}
.btn {
  position: absolute;
  bottom: 15vh;
  right: 5vw;
}
.bigwenben:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
}
</style>
