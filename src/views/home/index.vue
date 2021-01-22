<template>
  <div class="warp">
    <Welcome></Welcome>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="item">
        <Card title="今天活跃">
          <template v-slot:main>哈哈哈 </template>
        </Card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="item">
        <Card title="你好">
          <template v-slot:main> 哈哈哈 </template>
        </Card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="item">
        <Card title="今天活跃">
          <template v-slot:main>哈哈哈 </template>
        </Card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="item">
        <Card title="今天活跃">
          <template v-slot:main>哈哈哈 </template>
        </Card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Card from "./card.vue";
import Welcome from "./welcome.vue";
export default {
  components: {
    Card,
    Welcome,
  },
};
</script>
<style lang="scss" scoped>
.warp {
  padding: 20px;
  box-sizing: border-box;
}
.item {
  margin-bottom: 20px;
}
</style>
