<template>
  <div class="container">
    <v-head :title="title"></v-head>
    <div class="content">
      <div class="content-wrapper clearFix">
        <div class="img">
          <img src="http://localhost:8080/static/img/train.png">
        </div>
        <div class="login">
          <div class="nav">
            <ul>
              <li v-show="login">
                <div class="title">
                  <h1>用户名登录</h1>
                </div>
                <div class="username">
                  <input type="text" placeholder="请输入用户名" v-model="info.username" >
                  <!-- <p>用户名错误</p> -->
                </div>
                <div class="password">
                  <input type="password" placeholder="请输入密码" v-model="info.password">
                  <!-- <p>密码错误</p> -->
                </div>
                <div class="img-code clearFix">
                  <input type="text" placeholder="请输入图形验证码">
                  <img src="http://localhost:8080/static/img/qx.png">
                  <!-- <p>图形验证码错误</p> -->
                </div>
              </li>
              <li v-show="register">
                <div class="title">
                  <h1>手机号登录</h1>
                </div>
                <div class="username">
                  <input type="text" placeholder="请输入手机号" v-model="info.phone">
                  <!-- <p>手机号错误</p> -->
                </div>
                <div class="img-code clearFix">
                  <input type="text" placeholder="请输入图形验证码">
                  <img src="http://localhost:8080/static/img/qx.png">
                  <!-- <p>图形验证码错误</p> -->
                </div>
                <div class="text-code clearFix">
                  <input type="text" placeholder="请输入手机验证码">
                  <button type="button" class="disabled" disabled="disabled">获取验证码</button>
                  <!-- <p>手机验证码错误</p> -->
                </div>
              </li>
            </ul>
          </div>
          <!-- <div class="warn">
            <p>密码错误</p>
          </div> -->
          <div class="button">
            <button @click="goLogin">立即登录</button>
          </div>
          <div class="aside clearFix">
            <div class="register">
              <router-link to="/register">立即注册</router-link>
            </div>
            <div class="change">
              <ul>
                <li v-show="login" @click="registerBtn"><a href="javascript:;">忘记密码，使用手机验证码登录</a></li>
                <li v-show="register" @click="loginBtn"><a href="javascript:;">账号登录</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-foot></v-foot>
  </div>
</template>
<script>
import vHead from './head.vue'
import vFoot from './foot.vue'
export default {
  data() {
    return {
      title: '用户名登录',
      login: true,
      register: false,
      info:{}
    }
  },
  methods: {
    registerBtn: function() {
      this.login = false;
      this.register = true;
      this.title = "手机号登录"
    },
    loginBtn: function() {
      this.login = true;
      this.register = false;
      this.title = "账号登录"
    },
    goLogin:function(){

    }
  },
  components: {
    vHead,
    vFoot
  }
}

</script>
<style scoped>
@import '../../../src/assets/css/login.css'

</style>
