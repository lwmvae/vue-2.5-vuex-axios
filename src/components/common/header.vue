<template>
  <div class="header">
    <div class="head">
      <div class="head-wrapper clearFix">
        <div class="logo-title clearFix">
          <router-link to="/firstPage">
            <div class="logo">
              <img src="http://localhost:8080/static/img/qxlogo.png">
            </div>
            <div class="title">
              <h1>中国气体行业从业人员在线培训平台</h1>
            </div>
          </router-link>
        </div>
        <div class="login-register" v-show="isLogin">
          <router-link to="/login" class="login">立即登录</router-link>
          <router-link to="/register" class="register">免费注册</router-link>
        </div>
        <div class="head-img" v-show="!isLogin">
          <img src="http://localhost:8080/static/img/header.jpg">
          <a href="javascript:;" @click="exitLogin">退出登录</a>
        </div>
      </div>
    </div>
    <div class="nav">
      <div class="nav-wrapper">
        <router-link to="/firstPage">首页</router-link>
        <router-link to="/userCenter">用户中心</router-link>
        <router-link to="/courseCenter">课程中心</router-link>
        <router-link to="/mineExam">我的考试</router-link>
        <router-link to="/certificate">证书查询</router-link>
        <router-link to="/education">继续教育</router-link>
      </div>
    </div>
    <div class="warn" ref="warn">
      <div class="warn-wrapper">
        <p>您的资料未完善，不能购买课程，请点击<a href="javascript:;" @click="setInfo">立刻设置</a></p>
        <i class="close" @click="closeWarn"></i>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data(){
    return{
      isLogin:true
    }
  },
  methods: {
    exitLogin:function(){
      this.isLogin=!this.isLogin;
      window.localStorage.setItem("username","");
    },
    setInfo: function() {
      this.$router.push('/userCenter');
    },
    closeWarn: function() {
      this.$refs.warn.style.display = 'none';
    }
  },
  created(){
    var getUserName=window.localStorage.getItem("username");
    if(getUserName){
      this.isLogin=false;
    }
  }
}

</script>
<style scoped>
.head,
.nav,
.warn {
  width: 100%;
}

.head-wrapper,
.nav-wrapper,
.warn-wrapper {
  width: 1200px;
  margin: 0 auto;
}

.head {
  height: 78px;
  background-color: #fff;
}

.head-wrapper .logo-title {
  float: left;
}

.head-wrapper .logo-title .logo {
  float: left;
  margin-top: 6px;
}

.head-wrapper .logo-title .title {
  float: left;
  margin-left: 20px;
  font-size: 24px;
  line-height: 78px;
}

.head-wrapper .head-img {
  float: right; 
}

.head-wrapper .head-img img {
  width: 60px;
  height: 60px;
  margin-top: 9px;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
}
.head-wrapper .head-img a{
  display: inline-block;
  vertical-align: top;
  line-height: 78px;
  cursor: pointer;
  
}
.head-wrapper .login-register {
  float: right;
  line-height: 78px;
}

.head-wrapper .login-register .login {
  color: #3481d0;
  margin-right: 10px;
}

.nav {
  background-color: #3481d0;
}

.nav-wrapper a {
  display: inline-block;
  padding: 11px 25px;
  font-size: 18px;
  color: #fff;
}

.nav-wrapper a.active {
  background-color: #2f74ba;
}

.warn {
  background-color: #f1f5cf;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  border-bottom: 1px solid #bc9760;
}

.warn .warn-wrapper {
  text-align: center;
  position: relative;
}

.warn .warn-wrapper p {
  color: #bf914b;
}

.warn .warn-wrapper p a {
  color: #ec5a47;
}

.warn .warn-wrapper .close {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  width: 25px;
  height: 25px;
  background: url('http://localhost:8080/static/img/qxicon.png') no-repeat -29px -279px;
  cursor: pointer;
}

</style>
