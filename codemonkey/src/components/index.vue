<template>
  <div id="index">
    <div>
      <indexnav></indexnav>
    </div>
    <div class="index-center">
      <div class="index-center-div">
        <div class="block">
          <span class="demonstration"><b>程序员论坛</b></span>
          <el-carousel height="200px">
            <el-carousel-item v-for="item in 4" :key="item"> </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="index-list">
      <div class="index-listnav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/info' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>程序员论坛</el-breadcrumb-item>
          <el-breadcrumb-item>网站编程</el-breadcrumb-item>
          <el-breadcrumb-item>web前端</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="listbt">
          <div style="display: flex">
            <h2>如果没找到你想要的帖子，那就发布一个帖子吧。老铁！！！</h2>
            <el-button type="primary" @click="changepublish">发帖</el-button>
          </div>
        </el-row>
        <el-divider></el-divider>
        <div class="index-search">
          <el-input
            placeholder="请输入你想搜索的帖子标题"
            v-model="input"
            size="medium"
            class="inputsearch"
          >
          </el-input>
          <el-row>
            <el-button type="primary" @click="searchpaper">搜索</el-button>
          </el-row>
          <div
            class="searchend"
            v-if="status == '1'"
            @mouseleave="changepsearchpage"
          >
            <ul v-for="item in searchArr" :key="item.pid">
              <li style="margin: 10px 0" @click="topaper(item.pid)">
                <span style="">
                  <b>{{ item.ptitle }}</b>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="paper-list">
          <div class="paperlist-nav"></div>
          <div class="paperlist">
            <div
              v-for="(item, index) in paperlist"
              :key="index"
              class="addpaper"
            >
              <div
                @mouseover="changecolor(index)"
                @mouseleave="changei"
                @click="paperclickadd(item.pid)"
                style="width: 200px; display: inline-block"
              >
                <span
                  :class="{ myred: i === index }"
                  @click="topaper(item.pid)"
                >
                  {{ item.ptitle }}
                </span>
              </div>
              <div style="float: right">
                <div
                  style="text-align: center"
                  @mouseover="changecolortow(index)"
                  :class="{ myred: itow === index }"
                  @mouseleave="changeitow"
                  @click="searchauthor(item.uid)"
                >
                  作者：{{ item.username }}
                </div>
                发表时间： {{ item.createtime }}
              </div>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000"
              @current-change="changepage"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import indexnav from './commentsend/indexnav.vue';
export default {
  components: { indexnav },
  data() {
    return {
     
      input: "",
      searchArr: [],
      status: "0",
      paperlist: [],
      total: 1,
      i: "",
      itow: "",
      uid: "",
      p: 0,
    };
  },
  created() {
    this.getpaperlist();
  },
  methods: {
    changepublish() {
      this.$router.push("/publish");
    },
    searchpaper() {
      this.axios
        .get("/search", {
          params: {
            keywd: this.input,
          },
        })
        .then((res) => {
          this.searchArr = res.data;
          this.status = "1";
          this.input = "";
        });
    },
    changepsearchpage() {
      this.status = "0";
    },
    getpaperlist() {
      this.axios
        .get("/searchpaper", {
          params: {
            total: this.total,
          },
        })
        .then((res) => {
          this.paperlist = res.data;
          console.log(res);
          for (let i = 0; i < this.paperlist.length; i++) {
            this.paperlist[i].createtime = new Date(
              this.paperlist[i].createtime
            ).toLocaleString();
          }
        });
    },
    getinfo() {
      this.uid = sessionStorage.getItem("login");
      this.axios
        .get("/getinfo", {
          params: {
            uid: this.uid,
          },
        })
        .then((res) => {
          this.circleUrl = res.data[0].userimg;
        });
    },
    changepage(val) {
      this.total = val;
    },
    changecolor(index) {
      this.i = index;
    },
    changecolortow(index) {
      this.itow = index;
    },
    changei() {
      this.i = "";
    },
    changeitow() {
      this.itow = "";
    },
    topaper(pid) {
      sessionStorage.setItem("pid", pid);
      this.$router.push("/comment");
    },
    searchauthor(uid) {
      (this.p = 1),
        this.axios
          .get("/searchauthor", {
            params: {
              total: this.total,
              uid,
            },
          })
          .then((res) => {
            this.paperlist = res.data;
            for (let i = 0; i < this.paperlist.length; i++) {
              this.paperlist[i].createtime = new Date(
                this.paperlist[i].createtime
              ).toLocaleString();
            }
          });
    },
    paperclickadd(pid) {
      this.axios
        .post("/clickadd", {
          pid,
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
  watch: {
    total() {
      if (this.p == 0) {
        this.getpaperlist();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#index {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4f97e0;
  background-image:url(../assets/publish/indeximg.png);
}
.myred {
  color: red;
  text-decoration: underline;
}
.listbt {
  text-align: right;
}
.index-nav-right {
  display: flex;
  float: right;
  font-size: 10px;
}
.el-row {
  margin-top: 15px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-image: url("../../public/img/img1.jpg");
  background-repeat: no-repeat;
}

.el-carousel__item:nth-child(2n + 1) {
  background-image: url("../../public/img/img2.jpg");
  background-repeat: no-repeat;
}
.index-center {
  width: 550px;
  margin: 0 auto;
}
.index-list {
  width: 1000px;
  margin: 0 auto;
}
.index-listnav {
  margin-top: 10px;
}
.index-search {
  display: flex;
  position: relative;
}
.inputsearch {
  padding: 15px;
  width: 500px !important;
}
.searchend {
  color: black;
  width: 500px;
  text-align: left;
  border: 1px solid rgb(236, 230, 230);
  position: absolute;
  top: 50px;
  left: 15px;
  border-radius: 5px;
  background-color: #fff;
  li {
    list-style-type: none;
  }
}
.paperlist-nav {
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
}
.addpaper {
  text-align: left;
  font-size: 16px;
  padding: 30px 10px;
  color: #000;
  border-bottom: 2px dashed rgb(173, 173, 173);
  background-color: #bbe5f185;
  border-radius: 30px;
}
button {
  font-size: 16px;
  border: none;
  outline: none;
}
.demonstration {
  font-size: 40px;
}
</style>