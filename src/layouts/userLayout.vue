<template lang="">
  <div class="user-layout">
    <router-view class="box"></router-view>
  </div>
</template>
<script>
/**
 * @name 登录注册外层组件
 * */ 
export default {
  
}
</script>
<style lang="scss" scoped>
.user-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  min-height: 500px;
  overflow: auto;
  background-image: url('../assets/images/bg-smooth.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  align-items: center;
  .box {
    animation: f1 .3s forwards linear;
  }
  @keyframes f1{
    0%{
      transform: translateY(-50px);
      opacity: 0;
    }
    100%{
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>