<template>
  <div class="header">
    <div class="head clearFix">
      <router-link to="/firstPage">
        <div class="logo">
          <img src="http://localhost:8080/static/img/qxlogo.png">
        </div>
        <div class="title">
          <h1>中国气体行业从业人员在线培训平台</h1>
        </div>
      </router-link>
      <div class="mode">
        <p>{{title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title']
}

</script>
<style scoped>
.header {
  background-color: #fff;
  border-bottom: 1px solid #dfdfdf;
}

.head {
  width: 1200px;
  margin: 0 auto;
  height: 78px;
}

.head .logo {
  float: left;
  margin-top: 6px;
}

.head .title {
  float: left;
  margin-left: 20px;
  font-size: 24px;
  line-height: 78px;
}

.head .mode {
  float: left;
  color: #3481d0;
  margin-top: 35px;
  margin-left: 15px;
}

</style>
