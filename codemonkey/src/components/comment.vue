<template>
  <div>
    <indexnav></indexnav>

    <div class="mydiv">
      <el-drawer
        title="评论区"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        class="mycommentson"
      >
        <div style="overflow: scroll; height: 800px; margin-top: 10px">
          <!-- 此处for循环 -->
          <div v-for="item in commentList" class="forlist" :key="item.id">
            <div class="head-time">
              <div class="headdiv">
                <img class="pinglunimg" :src="item.userimg" />
              </div>
              <div>
                <span>{{ item.username }}</span>
                <span class="smalltime">评论时间：{{ item.createtime }}</span>
              </div>
            </div>
            <div class="commentmycontent">{{ decodeURI(item.content) }}</div>
          </div>
        </div>
      </el-drawer>
      <div class="mycontent">
        <div class="mycontentleft">
          <div class="myheadimg">
            <img class="userimg" :src="authorre.userimg" />
          </div>
          <div class="myinfo">作者昵称：{{ authorre.username }}</div>
          <div class="myinfo">发布时间：{{ authorre.createtime }}</div>
          <div class="myinfo">个人签名：{{ authorre.sign }}</div>
          <div class="myarticleinfo">
            <el-badge :value="titlere.clickpaper" class="item">
              <el-button size="small">文章访问量</el-button>
            </el-badge>
            <el-badge :value="commentcount" class="item">
              <el-button
                size="small"
                @click="drawer = true"
                type="primary"
                style="margin-left: 16px"
                >查看评论区</el-button
              >
            </el-badge>
          </div>
        </div>
        <div class="mycontentright">
          <div class="mytitle">{{ titlere.ptitle }}</div>
          <el-page-header @back="goBack"> </el-page-header>
          <el-divider></el-divider>
          <div v-html="titlere.pcontent" class="myarticle"></div>
          <div class="mycomment">
            <comment></comment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "./commentsend/mycomment";
import indexnav from "./commentsend/indexnav";
export default {
  components: {
    comment,
    indexnav
  },
  created() {
    this.getmyauthorid();
    this.getpapertitle();
    this.getmycommentarea();
    this.getcommentcount();
  },

  data() {
    return {
      commentcount: "",
      authorre: {
        username: "",
        createtime: "",
        sign: "",
      },
      titlere: "",
      drawer: false,
      direction: "ltr",
      commentList: [],
      pid: "",
      uid: "",
    };
  },
  methods: {
    getcommentcount() {
      this.pid = sessionStorage.getItem("pid");
      this.axios
        .get("/commentcount", {
          params: {
            pid: this.pid,
          },
        })
        .then((res) => {
          this.commentcount = res.data.result[0].c;
        });
    },
    getmyauthorid() {
      this.pid = sessionStorage.getItem("pid");
      this.axios
        .get("/authorinfo", {
          params: {
            pid: this.pid,
          },
        })
        .then((res) => {
          let results = res.data;
          console.log(results);
          if (results.result != "") {
            this.authorre = results.result[0];
            this.authorre.createtime = new Date(
              this.authorre.createtime
            ).toLocaleString("chinese", { hour12: false });
          }
        });
    },
    getpapertitle() {
      this.pid = sessionStorage.getItem("pid");
      this.axios
        .get("/papertitle", {
          params: {
            paperid: this.pid,
          },
        })
        .then((res) => {
          let titlere = res.data;
          this.titlere = titlere.result[0];
          console.log(titlere.result[0].clickpaper);

          this.titlere.pcontent = this.titlere.pcontent.replace(/<img/g,"<img style='max-width:100%;height:auto;'");

        });
    },
    getmycommentarea() {
      this.pid = sessionStorage.getItem("pid");
      this.axios
        .get("/commentarea", {
          params: {
            commentid: this.pid,
          },
        })
        .then((res) => {
          let results = res.data;
          this.commentList = results.result;
          // console.log(this.commentList);
          for (let i = 0; i < this.commentList.length; i++) {
            let commenttime = this.commentList[i].createtime;
            commenttime = new Date(commenttime).toLocaleString("chinese", {
              hour12: false,
            });
            this.commentList[i].createtime = commenttime;
          }
        });
    },
    goBack() {
      console.log("go back");
      this.$router.push("/");
    },
    handleClose(done) {
      this.$confirm("是否关闭评论区？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
   
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
*::-webkit-scrollbar {
  display: none !important;
}

.mycommentson {
  // height: 830px;
  margin-top: 2px;
}
.mydiv {
  background-image: url(../assets/publish/background.jpg);
  width: 100%;
  height: 850px;
  display: flex;
  justify-content: center;
  .forlist {
    background-color: #f1f0ee;
    margin-top: 2px;
  }
  .head-time {
    display: flex;
    height: 80px;
    .headdiv {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 5px;
      .pinglunimg {
        width: 100%;
        height: 100%;
      }
    }
    span {
      display: block;
      line-height: 38px;
    }
    .smalltime {
      font-family: "Microsoft YaHei";
      font-size: 12px;
    }
  }
  .commentmycontent {
    font-family: "Microsoft JhengHei";
    padding-left: 15px;
  }

  .mycontent {
    width: 75%;
    height: 100%;
    background-color: rgb(253, 252, 245);
    display: flex;
    .mycontentleft {
      width: 25%;
      height: 100%;
      background-color: rgb(102, 206, 224);
      background-image: url(../assets/publish/star.png);
      display: flex;
      align-items: center;
      flex-direction: column;
      position: relative;
      .myheadimg {
        margin-top: 30px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: #fdfdfd;
        display: flex;
        align-items: center;
        justify-content: center;
        .userimg {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .myinfo {
        width: 100%;
        height: 60px;
        font-family: "Microsoft YaHei";
        line-height: 60px;
        color: #fff3e3;
        margin-top: 5px;
      }
      .myarticleinfo {
        position: absolute;
        width: 100%;
        height: 60px;
        text-align: center;
        bottom: 0;
        .item {
          margin-top: 13px;
          margin-right: 20px;
        }
      }
    }
    .mycontentright {
      width: 75%;
      height: 100%;
      background-color: rgb(255, 254, 247);
      position: relative;
      .mytitle {
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-family: "SimHei";
        font-size: 30px;
      }
      .myarticle {
        height: 500px;
        width: 100%;
        overflow: scroll;
        // 首行缩进
        text-indent: 2em;
      }
      .mycomment {
        width: 100%;
        height: 156px;
        bottom: 0;
        position: absolute;
      }
    }
  }
}
</style>