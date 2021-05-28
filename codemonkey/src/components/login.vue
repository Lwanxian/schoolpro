<template>
  <div>
    <div class="bgimg">
      <div class="loginbox">
        <div class="tip1"><p>用户名密码登录</p></div>
        <div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            ><div class="loginform">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
            <div class="captcha">
              <span class="tipyanz">请输入验证码：</span
              ><input type="text" v-model="svgcode" /><span
                class="svg"
                v-html="svg"
              ></span
              ><span class="tipchange" @click="tipchange">点击换一张</span>
            </div>
            <div class="submitbtn">
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >立即登录</el-button
                >
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="forgetText">
          <p @click="forgetpass">忘记密码？</p>
          <p @click="toreg">立即注册</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      svg: "",
      svgcode: "",
      ruleForm: {
        pass: "",
        name: "",
      },
      rules: {
        pass: [ { required: true, message: "请输入密码", trigger: "blur" },],
        name: [{ required: true, message: "输入用户名", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let svglow = this.svgcode.toLowerCase();
          this.axios
            .post("/login", {
              username: this.ruleForm.name,
              password: this.ruleForm.pass,
              svgcode: svglow,
            })
            .then((res) => {
              alert(res.data.msg);
              if (res.data.msg == "登录成功") {
                sessionStorage.setItem("login", res.data.uid);
                this.$router.push("/");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    forgetpass() {
      this.$router.push("/forget");
    },
    toreg() {
      this.$router.push("/reg");
    },
    toloadcaptcha() {
      this.axios.get("/captcha").then((res) => {
        this.svg = res.data;
      });
    },
    tipchange() {
      this.toloadcaptcha();
    },
  },
  mounted() {
    this.toloadcaptcha();
  },
};
</script>
<style lang="scss" scoped>
.bgimg {
  background-image: url("../../public/img/bgimg.jpg");
  height: 100vh;
  width: 100vm;
  position: relative;
}
.loginbox {
  width: 370px;
  height: 380px;
  background-color: rgba(241, 240, 240, 0.9);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -175px;
  margin-top: -190px;
}
.loginform {
  width: 350px;
  margin-left: -30px;
}
.forgetText {
  width: 250px;
  display: inline-block;
  color: #3f89ec;
  font-size: 10px;
  margin-left: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  p {
    cursor: pointer;
  }
}

.tip1 {
  width: 200px;
  height: 80px;
  text-align: center;
  margin: 0 auto;
  font-size: 20px;
  line-height: 80px;
}
.submitbtn {
  width: 200px;
  margin-left: 30px;
  margin-top: 30px;
}
.captcha {
  .tipyanz {
    padding: 5px;
    color: #606266;
    font-size: 13px;
  }
  input {
    width: 100px;
    height: 20px;
    border: none;
    &:focus {
      outline: none;
      border: 1px solid #3f89ec;
    }
    border-radius: 2px;
  }
  .tipchange {
    font-size: 5px;
    cursor: pointer;
    color: #3f89ec;
  }
}
</style>
