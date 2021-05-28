<template>
  <div id="protect">
    <div class="protect">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="您注册的电话号码" prop="tel">
          <el-input v-model="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="您父亲的名字" prop="fname">
          <el-input v-model="ruleForm.fname"></el-input>
        </el-form-item>
        <el-form-item label="您母亲的名字" prop="mname">
          <el-input v-model="ruleForm.mname"></el-input>
        </el-form-item>
        <el-form-item label="您小学母校的名字" prop="sname">
          <el-input v-model="ruleForm.sname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即验证</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        tel: "",
        fname: "",
        mname: "",
        sname: "",
      },
      rules: {
        tel: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        fname: [
          { required: true, message: "请填写您父亲的名字", trigger: "change" },
        ],
        mname: [
          { required: true, message: "请填写您母亲的名字", trigger: "change" },
        ],
        sname: [
          {
            required: true,
            message: "请填写您小学学校的名字",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("./protect", {
              tel: this.ruleForm.tel,
              fname: this.ruleForm.fname,
              mname: this.ruleForm.mname,
              sname: this.ruleForm.sname,
            })
            .then((res) => {
              alert(res.data.msg);
              if(res.data.msg=="验证成功"){
                this.$emit("myevent",true)
                sessionStorage.setItem("protect",res.data.uid)
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
#protect{
  position: relative;
}
.protect {
  width: 500px;
  height: 300px;
  position: absolute;
  /* margin: 0 auto; */
  top:50% ;
  left: 50%;
  margin-left: -250px;
  margin-top: 150px;
}
</style>