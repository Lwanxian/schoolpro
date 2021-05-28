<template>
  <div class="index-nav">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgb(238, 234, 245)"
    >
      <el-menu-item index="1"><b>首页</b></el-menu-item>
      <el-menu-item index="2"><b>个人中心</b></el-menu-item>
      <div class="index-nav-right">
        <el-row class="demo-avatar demo-basic">
          <el-col :span="7">
            <div class="demo-basic--circle">
              <div class="block">
                <el-avatar :size="30" :src="circleUrl"></el-avatar>
              </div>
              <div class="block" v-for="size in sizeList" :key="size">
                <el-avatar :size="size" :src="circleUrl"></el-avatar>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-menu-item index="3"><b>切换用户</b></el-menu-item>
        <el-menu-item index="4"><b>申请注册</b></el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: [],

    };
  },
   created() {
    this.getinfo();
  },
  methods: {
    handleSelect(key, keyPath) {
      let page = "/";
      switch (key) {
        case "1":
          page = "/";
          break;
        case "2":
          page = "/info";
          break;
        case "3":
          page = "/login";
          break;
        case "4":
          page = "/reg";
          break;
      }
      if (this.$route.path !== page) {
        this.$router.push(page);
      }
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
  },
};
</script>

<style>
.index-nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.index-nav-right {
  display: flex;
  float: right;
  font-size: 10px;
}
.el-row {
  margin-top: 15px;
}
</style>