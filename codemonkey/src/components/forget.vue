<template>
  <div>
    <components :is="page" @myevent="changepage"></components>
  </div>
</template>

<script>
import protect from "./forget/protect.vue";
import modify from "./forget/modify";
export default {
  components: {
    protect,
    modify,
  },
  data(){
      return{
          page:"protect",
      }
  },
  methods:{
      changepage(val){
          if(val){
              this.page="modify"
          }
      }
  }
};
</script>

<style scoped>
body{
    width: 100vw;
}
</style>