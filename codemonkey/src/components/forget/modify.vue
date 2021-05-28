<template>
  <div id="modify">
    <div class="modify">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="请确认电话号码" prop="tel">
          <el-input v-model="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" prop="pass">
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

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
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
        tel: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        tel: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          this.axios
            .post("/modify", {
              tel: this.ruleForm.tel,
              pass: this.ruleForm.pass,
            })
            .then((res) => {
              if (res.data.msg == "修改成功") {
                alert("修改成功")
                this.$router.push("/login");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("修改失败");
          return false;
        }
      });
    },
  },
  mounted(){
    this.axios.get("/gettel",{params:{
      uid:sessionStorage.getItem("protect")
    }}).then(res=>{
      this.ruleForm.tel=res.data[0].usertel
    }).catch(err=>{
      console.log(err);
    })
  }
};
</script>

<style>
#modify{
  position: relative;
}
.modify {
  position:absolute;
  width: 500px;
  height: 240px;
  top:50%;
  left:50%;
  margin-left: -250px;
  margin-top: 120px;
}
</style>