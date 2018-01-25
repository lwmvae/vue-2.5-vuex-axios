<template>
  <div class="loading">
    <p><span>{{msg}}</span><img src="http://localhost:8080/static/img/loading.gif" alt="加载中" width="32" height="32"></p>
  </div>
</template>
<script>
export default {
	props:{
		msg:{
			type:String,
			default:''
		}
	}
}

</script>
<style scoped>
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f6f6f6;
  z-index: 200;
}

.loading p {
  font-size: 30px;
  margin: 50px 0;
  text-align: center;
}

.loading img {
  position: relative;
  top: 4px;
  left: 5px;
}

</style>
