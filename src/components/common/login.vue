<template>
  <div class="container" v-title data-title="登录">
    <v-head :title="title"></v-head>
    <div class="content" ref="content">
      <div class="content-wrapper clearFix">
        <div class="img">
          <img src="http://localhost:8080/static/img/train.png">
        </div>
        <div class="login">
          <div class="nav">
            <ul>
              <li v-show="loginUserName">
                <div class="title">
                  <h1>用户名登录</h1>
                </div>
                <div class="username">
                  <input type="text" placeholder="请输入用户名" v-model.trim="info.username">
                  <!-- <p>用户名错误</p> -->
                </div>
                <div class="password">
                  <input type="password" placeholder="请输入密码" v-model.trim="info.password">
                  <!-- <p>密码错误</p> -->
                </div>
                <div class="img-code clearFix">
                  <input type="text" placeholder="请输入图形验证码">
                  <img src="http://localhost:8080/static/img/qx.png">
                  <!-- <p>图形验证码错误</p> -->
                </div>
              </li>
              <li v-show="loginPhone">
                <div class="title">
                  <h1>手机号登录</h1>
                </div>
                <div class="username">
                  <input type="text" placeholder="请输入手机号" v-model.trim="info.phone" @keyup="textPhoneNum">
                  <!-- <p>手机号错误</p> -->
                </div>
                <div class="img-code clearFix">
                  <input type="text" placeholder="请输入图形验证码">
                  <img src="http://localhost:8080/static/img/qx.png">
                  <!-- <p>图形验证码错误</p> -->
                </div>
                <div class="text-code clearFix">
                  <input type="text" placeholder="请输入手机验证码">
                  <button type="button" class="disabled" @click="getTextCode" ref="getCode">{{codeMsg}}</button>
                  <!-- <p></p> -->
                </div>
              </li>
            </ul>
          </div>
          <div class="button">
            <button @click="goLogin">立即登录</button>
          </div>
          <div class="aside clearFix">
            <div class="register">
              <router-link to="/register">立即注册</router-link>
            </div>
            <div class="change">
              <ul>
                <li v-show="loginUserName" @click="registerBtn"><a href="javascript:;">忘记密码，使用手机验证码登录</a></li>
                <li v-show="loginPhone" @click="loginBtn"><a href="javascript:;">账号登录</a></li>
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
import { mapMutations } from 'vuex'

import vHead from './head.vue'
import vFoot from './foot.vue'
var countdown = 60;
export default {
  data() {
    return {
      title: '用户名登录',
      codeMsg: '获取验证码',
      loginUserName: true,
      loginPhone: false,
      info: {}
    }
  },
  methods: {
    getTextCode: function() {
      if (this.$refs.getCode.className == '') {
        var self = this;
        self.$refs.getCode.className = 'disabled';
        self.codeMsg = "重新发送(" + countdown + "s)";
        countdown--;
        var timer = setInterval(function() {
          if (countdown == 0) {
            self.$refs.getCode.className = '';
            self.codeMsg = "获取验证码";
            clearInterval(timer);
            countdown = 60;
          } else {
            self.codeMsg = "重新发送(" + countdown + "s)";
            countdown--;
          }
        }, 1000);
      } else {
        console.log(1);
      }
    },
    textPhoneNum: function() {
      var phoneFlag = /^1[3|4|5|7|8|9][0-9]{9}$/.test(this.info.phone);
      if (phoneFlag) {
        this.$refs.getCode.className = '';
      } else {
        this.$refs.getCode.className = 'disabled';
      }
    },
    registerBtn: function() {
      this.loginUserName = false;
      this.loginPhone = true;
      this.title = "手机号登录"
    },
    loginBtn: function() {
      this.loginUserName = true;
      this.loginPhone = false;
      this.title = "用户名登录"
    },
    goLogin: function() {
      if (this.loginUserName) {
        if (this.info.username != undefined && this.info.password != undefined) {
          window.localStorage.setItem('username', this.info.username);
          this.goToFirstpage();
        } else {
          alert('用户名和密码不能为空');
        }
      } else {
        if (this.info.phone != undefined) {
          window.localStorage.setItem('username', this.info.phone);
          this.goToFirstpage();
        } else {
          alert('手机号不能为空');
        }
      }
    },
    goToFirstpage: function() {
      this.$router.push('/');
      this.signIn()
    },
    ...mapMutations(["signIn"])
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.content.style.minHeight = document.documentElement.clientHeight - 140 + 'px';
    });
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
