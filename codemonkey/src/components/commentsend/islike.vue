<template>
  <div class="is-like">
    <div @click="like" class="mouselike">
      <div class="btn b1" v-if="isClick == 0">点赞</div>
      <div class="btn b2" v-if="isClick == 1">取消点赞</div>
    </div>
    <span class="clicknum">
      {{ clickNum }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickNum: 11,
      isClick: "",
    };
  },
  methods: {
    like: function () {
      if (this.isClick == 0) {
        this.isClick = 1;
        this.clickNum = this.clickNum + 1;
        console.log(this.clickNum);
      } else {
        this.isClick = 0;
        this.clickNum = this.clickNum - 1;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.is-like {
  display: flex;
  width: 100px;
  height: 38px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid silver;
  font-family: "微软雅黑";
  font-size: 14px;
  text-align: center;
  line-height: 38px;
  .mouselike :hover{
    cursor: pointer;
  }
  .btn {
    width: 76px;
    height: 38px;
    background-color: #ffffff;
  }
  .b2 {
    background-color: rgb(255, 224, 219);
    border-radius: 6px;
  }
}
</style>
