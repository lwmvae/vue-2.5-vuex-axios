<template>
  <div class="content">
    <div class="payment">
      <div class="info clearFix">
        <div class="name">
          <p>课程名称：<span>2</span></p>
        </div>
        <div class="money">
          <p>应付金额<i>￥</i><span>168.00</span></p>
        </div>
      </div>
      <div class="mode">
        <span>支付方式：</span>
        <ul class="clearFix">
          <li :class="{active:index==num}" v-for="(list,index) in lists" @click="choiceType(index)"><img :src="list"><i></i></li>
        </ul>
      </div>
      <div class="pay">
        <p>支付<i>￥</i><span>168.00</span></p>
        <a href="https://www.baidu.com" target="blank" id="gopay" @click="goToPay">去付款</a>
      </div>
    </div>
    <div id="add-popup" v-show="payOrNot">
      <div id="gray" class="gray"></div>
      <div class="popup" id="popup">
        <div class="popup-title clearFix">
          <div class="title">
            <!-- <p>用户注册协议</p> -->
          </div>
          <div class="delete" @click="close">
            <i></i>
          </div>
        </div>
        <div class="popup-content">
          <p class="p1">请您在新打开的页面完成付款</p>
          <p class="p2">支付完成前，请不要关闭此窗口</p>
          <p class="p3">支付完成后请根据您的情况点击下面的按钮</p>
        </div>
        <div class="popup-button">
          <button class="sure" @click="hasPay">已完成付款</button>
          <a href="javascript:;" class="cancel" @click="close">返回选择其他付款方式</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lists: ["http://localhost:8080/static/img/zfb.png", "http://localhost:8080/static/img/wx.png"],
      num: 0,
      payOrNot: false
    }
  },
  methods: {
    goToPay: function() {
      this.payOrNot = true
    },
    close: function() {
      this.payOrNot = false
    },
    hasPay: function() {
      this.$router.push('/courseCenter/courseDetail');
    },
    choiceType: function(index) {
      this.num = index
    }
  }
}

</script>
<style scoped>
@import 'payment.css'

</style>
