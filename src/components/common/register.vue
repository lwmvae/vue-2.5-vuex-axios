<template>
  <div class="container">
    <v-head :title="title"></v-head>
    <div class="content">
      <div class="title">
        <h1>新用户注册</h1>
      </div>
      <div class="username clearFix">
        <div class="left">
          <span>用户名</span>
        </div>
        <div class="right">
          <input type="text" placeholder="请设置用户名" v-model="info.username">
          <!-- <p>支持中文、数字、字母的组合，4-20个字符</p> -->
        </div>
      </div>
      <div class="password clearFix">
        <div class="left">
          <span>登录密码</span>
        </div>
        <div class="right">
          <input type="password" placeholder="请设置登录密码" v-model="info.password">
          <!-- <p>建议使用数字、字母的组合，6-20个字符</p> -->
        </div>
      </div>
      <div class="sure-psw clearFix">
        <div class="left">
          <span>确认密码</span>
        </div>
        <div class="right">
          <input type="password" placeholder="请再次输入登录密码" v-model="info.repassword" @blur="pswValidate">
          <p class="p" v-show="psw">两次密码输入不一致</p>
        </div>
      </div>
      <div class="name clearFix">
        <div class="left">
          <span>真实姓名</span>
        </div>
        <div class="right">
          <input type="text" placeholder="请输入真实姓名" v-model="info.name">
        </div>
      </div>
      <div class="idcard clearFix">
        <div class="left">
          <span>身份证号码</span>
        </div>
        <div class="right">
          <input type="text" placeholder="请输入身份证号码" v-model="info.idcard" @blur="idcardVal">
          <p class="p" v-show="idcardNum">身份证号码错误</p>
        </div>
      </div>
      <div class="phone clearFix">
        <div class="left">
          <span>手机号码</span>
        </div>
        <div class="right">
          <input type="text" placeholder="请输入手机号码" v-model="info.phone" @blur="phoneVal">
          <p v-show="phoneNum" class="p">手机号码输入错误</p>
        </div>
      </div>
      <!-- <div class="img-code clearFix">
        <div class="left">
          <span>图形验证码</span>
        </div>
        <div class="right clearFix">
          <input type="text" placeholder="请输入图形验证码">
          <img src="http://localhost:8080/static/img/qx.png">
          <p>看不清？点击图片更换验证码</p>
        </div>
      </div> -->
      <div class="text-code clearFix">
        <div class="left">
          <span>手机验证码</span>
        </div>
        <div class="right clearFix">
          <input type="text" placeholder="请输入六位手机验证码">
          <button type="button">获取验证码</button>
          <!-- <p class="p">验证码输入错误</p> -->
        </div>
      </div>
      <div class="button">
        <button @click="submit">立即注册</button>
      </div>
      <div class="login">
        <span>已有账号？</span>
        <router-link to="/login">立即登录</router-link>
      </div>
    </div>
    <v-foot></v-foot>
  </div>
</template>
<script>
import vHead from './head.vue'
import vFoot from './footer.vue'
export default {
  data() {
    return {
      title: '新用户注册',
      info: {},
      psw: false,
      phoneNum: false,
      idcardNum: false
    }
  },
  methods: {
    pswValidate: function() {
      if (this.info.password != this.info.repassword) {
        this.psw = true
      } else {
        this.psw = false
      }
    },
    idcardVal: function() {
      var idFlag = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test(this.info.idcard);
      if (idFlag) {
        this.idcardNum = false;
      } else {
        this.idcardNum = true;
      }
    },
    phoneVal: function() {
      var phoneFlag = /^1[3|4|5|7|8|9][0-9]{9}$/.test(this.info.phone);
      if (phoneFlag) {
        this.phoneNum = false;
      } else {
        this.phoneNum = true;
      }
    },
    submit: function() {
      if (this.info.repassword != undefined) {
        if (this.info.idcard != undefined) {
          if (this.info.phone != undefined) {
            window.localStorage.setItem("username",this.info.username);
            this.$router.push('/');
          } else {
            this.phoneNum = true;
          }
        } else {
          this.idcardNum = true;
        }
      } else {
        this.psw = true;
      }
    }
  },
  components: {
    vHead,
    vFoot
  }
}

</script>
<style scoped>
@import '../../../src/assets/css/register.css'

</style>
