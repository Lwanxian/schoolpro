<template>
  <div id="info">
    <div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="font-size: 20px; padding: 10px 0"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width: 500px; background-color: #fff; margin: 0 auto">
      <h1>个人信息设置</h1>
      <div style="width: 400px; background-color: #fff; padding: 10px 20px">
        <el-row class="demo-avatar demo-basic">
          <div style="display: flex; color: #936266; line-height: 60px">
            个人头像：
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="60" :src="circleUrl"></el-avatar>
                </div>
                <div class="block" v-for="size in sizeList" :key="size">
                  <el-avatar :size="size" :src="circleUrl"></el-avatar>
                </div>
                <el-upload
                  class="upload-demo"
                  action="http://localhost:8081/publishimg"
                  :on-success="handleAvatarSuccess"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </el-col>
          </div>
        </el-row>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="昵称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <span>{{ form.tel }}</span>
          </el-form-item>
          <el-form-item label="生日：">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 320px"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="爱好：">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="打篮球" name="type"></el-checkbox>
              <el-checkbox label="打游戏" name="type"></el-checkbox>
              <el-checkbox label="旅游" name="type"></el-checkbox>
              <el-checkbox label="养鱼" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="签名：">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: [],
      form: {
        name: "",
        date1: "",
        type: [],
        sex: "",
        desc: "",
        tel: "12345678911",
        uid: "",
      },
    };
  },
  created() {
    this.getinfo();
  },
  methods: {
    onSubmit() {
      this.uid = sessionStorage.getItem("login");
      this.axios
        .post("/info", {
          form: this.form,
          circleUrl: this.circleUrl,
          uid: this.uid,
        })
        .then((res) => {
          alert("信息修改成功");
        });
    },
    handleAvatarSuccess(res, file) {
      this.circleUrl = res;
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
          this.form.name = res.data[0].username;
          this.form.date1 = res.data[0].birthday;
          if (res.data[0].hobby.length != 0) {
            this.form.type = res.data[0].hobby.split(",");
          } else {
            this.form.type = [];
          }
          this.form.sex = res.data[0].psex;
          this.form.desc = res.data[0].sign;
          this.form.tel = res.data[0].usertel;
          this.circleUrl = res.data[0].userimg;
        });
    },
  },
};
</script>

<style lang="scss">
#info {
  width: 100vw;
  height: 100vh;
  background-image: url("../../public/img/infobgimg.jpg");
  text-align: center;
}
</style>