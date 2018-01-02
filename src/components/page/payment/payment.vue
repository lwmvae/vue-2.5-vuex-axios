<template>
  <div class="content" v-title data-title="付款">
    <div class="payment">
      <div class="info clearFix">
        <div class="name">
          <p>课程名称：<span>{{payInfo.title}}</span></p>
        </div>
        <div class="money">
          <p>应付金额<i>￥</i><span>{{payInfo.price}}</span></p>
        </div>
      </div>
      <div class="mode">
        <span>支付方式：</span>
        <ul class="clearFix">
          <li :class="{active:index==num}" v-for="(list,index) in lists" @click="choiceType(index)"><img :src="list"><i></i></li>
        </ul>
      </div>
      <div class="pay">
        <p>支付<i>￥</i><span>{{payInfo.price}}</span></p>
        <a :href="[num===0?'https://wwww.baidu.com':'javascript:;']" target="blank" id="gopay" @click="goToPay">去付款</a>
      </div>
    </div>
    <div id="add-popup" v-show="zfbPay">
      <div id="gray" class="gray"></div>
      <div class="zfb-popup" id="popup">
        <div class="popup-title clearFix">
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
          <button class="sure" @click="hasPay(payInfo.id,payInfo.title)">已完成付款</button>
          <a href="javascript:;" class="cancel" @click="close">返回选择其他付款方式</a>
        </div>
      </div>
    </div>
    <div id="add-popup" v-show="wxPay">
      <div id="gray" class="gray"></div>
      <div class="wx-popup" id="popup">
        <div class="popup-title clearFix">
          <div class="delete" @click="close">
            <i></i>
          </div>
        </div>
        <div class="popup-content clearFix">
          <div class="c-left">
            <div class="left-head">
              <p>请使用<span>微信</span><i></i><span>扫一扫</span></p>
              <p>扫描二维码支付</p>
            </div>
            <div class="left-content">
              <img src="http://localhost:8080/static/img/wxPay.png">
              <p><i></i>二维码有效时长为2小时，请尽快支付</p>
            </div>
          </div>
          <div class="c-right">
            <img src="http://localhost:8080/static/img/weixin.jpg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCourse } from 'api/course'
import { ERR_OK } from 'api/config'

export default {
  data() {
    return {
      lists: ["http://localhost:8080/static/img/zfb.png", "http://localhost:8080/static/img/wx.png"],
      payInfo: {},
      num: 0,
      zfbPay: false,
      wxPay: false
    }
  },
  methods: {
    goToPay: function() {
      if (this.num === 0) {
        this.zfbPay = true;
      } else if (this.num === 1) {
        this.wxPay = true
      }
    },
    close: function() {
      this.zfbPay = false;
      this.wxPay = false;
    },
    hasPay: function(id,title) {
      this.$router.push({path:'/courseCenter/courseDetail',query:{'id':id,'title':title}});
    },
    choiceType: function(index) {
      this.num = index;
    },
    _getData: function() {
      getCourse().then((res) => {
        if (res.code === ERR_OK) {
          var data = res.courseList;
          data.forEach((item) => {
            if (item.id == this.$route.query.id) {
              this.payInfo = item;
              console.log(this.payInfo);
            }
          })
        }
      })
    }
  },
  created() {
    this._getData()
  }
}

</script>
<style scoped>
@import 'payment.css'

</style>
