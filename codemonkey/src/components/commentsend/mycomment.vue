<template>
  <div>
    <div class="sixsixsix">
      <el-popover
        placement="bottom"
        title="请选择你想发送的emoji表情"
        width="500"
        height="700"
        trigger="click"
        v-model="emojiShow"
      >
        <el-button slot="reference">😀</el-button>
        <div class="browBox">
          <ul>
            <li
              v-for="(item, index) in faceList"
              :key="index"
              @click="getBrow(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </el-popover>
      <el-badge style="margin-right: 2px; margin-left: 2px">
        <islike></islike>
      </el-badge>
    </div>
    <el-input
      :rows="3"
      type="textarea"
      placeholder="请输入内容"
      @keyup.enter.native="sendcontent"
      v-model="content"
    >
    </el-input>

    <el-button
      class="submit-btn"
      type="primary"
      @click="sendcontent"
      :disabled="content == ''"
      >发送
    </el-button>
  </div>
</template>

<script>
const appData = require("../../assets/emojis.json");
import islike from "./islike";
export default {
  components: {
    islike,
  },
  data() {
    return {
      //聊天输入内容
      content: "",
      //表情框是否展示
      emojiShow: false,
      //表情列表
      faceList: [],
      //表情文本
      getBrowString: "",
    };
  },
  created() {
    this.loadEmojis();
  },
  methods: {
    //加载表情，存放到表情列表中
    loadEmojis() {
      for (let i in appData) {
        this.faceList.push(appData[i].char);
      }
    },
    // 获取用户点击之后的标签 ，存放到输入框内
    getBrow(index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.getBrowString = this.faceList[index];
          this.content += this.getBrowString;
        }
      }
      this.emojiShow = false;
    },
    sendcontent() {
      this.uid = sessionStorage.getItem("login");
      this.pid = sessionStorage.getItem("pid");
      console.log(this.content);
      this.axios
        .get("/sendcontent", {
          params: {
            //用户 pinglun
            uid: this.uid,
            // 文章 pinglun
            pid: this.pid,
            
            // 内容 plinglun
            content: encodeURI(this.content),
          },
        })
        .then((res) => {
          console.log(res);
          location.reload();
        });
        console.log(new Date().toLocaleDateString());
    },
  },
};
</script>

<style lang="scss">
.sixsixsix {
  display: flex;
}
.browBox {
  width: 100%;
  height: 200px;
  background: #e6e6e6;
  z-index: 100;
  overflow: scroll;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    li {
      cursor: pointer;
      width: 10%;
      font-size: 26px;
      list-style: none;
      text-align: center;
    }
  }
}
.submit-btn {
  margin: 0 15px 10px 0;
  float: right;
}
</style>