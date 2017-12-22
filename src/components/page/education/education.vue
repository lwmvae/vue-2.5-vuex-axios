<template>
  <div class="content" v-title data-title="继续教育">
    <div class="education">
      <ul class="clearFix">
        <li><a href="http://www.baidu.com" target="_blank"><img src="http://localhost:8080/static/img/labgasuser.png"><p>实验室瓶装气体使用人员继续教育</p></a></li>
        <li><a href="http://www.baidu.com" target="_blank"><img src="http://localhost:8080/static/img/gastransport.png"><p>瓶装气体运输人员继续教育</p></a></li>
        <li><a href="http://www.baidu.com" target="_blank"><img src="http://localhost:8080/static/img/gasenterprise.png"><p>气瓶充装企业人员继续教育</p></a></li>
        <li><a href="http://www.baidu.com" target="_blank"><img src="http://localhost:8080/static/img/gassale.png"><p>瓶装气体经销企业人员继续教育</p></a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  
}

</script>
<style scoped>
.content {
  width: 1200px;
  margin: 0 auto;
}

.education ul {
  overflow: auto;
  margin-left: -34px;
  padding-bottom: 20px;
}

.education li {
  float: left;
  background-color: #333;
  border: 2px solid #f6f6f6;
  margin-left: 32px;
  margin-top: 30px;
  position: relative;
}

.education li img {
  width: 580px;
  height: 200px;
  overflow: hidden;
  display: block;
}

.education li p {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  font-size: 30px;
  text-align: center;
  color: #fff;
  -webkit-text-stroke: 0.3px #333;
  line-height: 200px;
  transition: all 0.3s;
}

.education li:hover {
  border: 2px solid #398fe5;
}

</style>
