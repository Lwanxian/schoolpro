<template>
  <div>
    <div class="bgimg" :style="{ height: bgheight }">
      <div class="regform">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <div class="inforeg">
            <el-form-item label="用户昵称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="用户电话" prop="tel">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="个性签名" prop="sign">
              <el-input v-model="ruleForm.sign"></el-input>
            </el-form-item>
          </div>

          <div class="protect">
            <h5 class="tip">请回答问题设置密保，方便您找回密码\(^o^)/~</h5>
            <el-form-item label="您父亲的名字" prop="fname">
              <el-input v-model="ruleForm.fname"></el-input>
            </el-form-item>
            <el-form-item label="您母亲的名字" prop="mname">
              <el-input v-model="ruleForm.mname"></el-input>
            </el-form-item>
            <el-form-item label="您的小学校名" prop="sname">
              <el-input v-model="ruleForm.sname"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即注册</el-button
            >
            <el-button @click="resetForm('ruleForm')">去登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        tel: "",
        pass: "",
        checkPass: "",
        sign: "",
        fname: "",
        mname: "",
        sname: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "请正确输入电话号码", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "至少6个字符，含有字母、数字", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "至少6个字符，含有字母、数字",
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        sign: [
          { required: false, message: "请输入密码", trigger: "blur" },
          { min: 0, max: 30, message: "签名长度小于30字符", trigger: "blur" },
        ],
        fname: [{ required: true, message: "请输入密码", trigger: "blur" }],
        mname: [{ required: true, message: "请输入密码", trigger: "blur" }],
        sname: [{ required: true, message: "请输入密码", trigger: "blur" }],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  computed: {
    bgheight() {
      return window.innerHeight > 839 ? window.innerHeight + "px" : "839px";
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
          if (reg.test(this.ruleForm.pass)) {
            this.axios
              .post("/reg", {
                username: this.ruleForm.name,
                tel: this.ruleForm.tel,
                password: this.ruleForm.pass,
                sign: this.ruleForm.sign,
                protect1: this.ruleForm.fname,
                protect2: this.ruleForm.mname,
                protect3: this.ruleForm.sname,
              })
              .then((res) => {
                alert(res.data.msg);
                if (res.data.msg == "注册成功") {
                  this.$router.push("/login");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else{
            alert("密码格式不对")
          }
        }else {
            alert("请填完必填项");
            return false;
          }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.bgimg {
  background-image: url("../../public/img/bgimg.jpg");
  background-size: 100% 100%;
  height: 839px;
  width: 100vw;
  background-repeat: no-repeat;
  position: relative;
}
.inforeg {
  width: 80%;
}
.regform {
  width: 500px;
  position: absolute;
  background-color: rgb(248, 246, 246, 0.8);
  border-radius: 15px;
  right: 100px;
  top: 120px;
  padding: 20px;
}

.protect {
  margin-top: 110px;
  width: 350px;
}
.tip {
  margin-bottom: 10px;
}
</style>
