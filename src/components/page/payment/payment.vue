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
          <li class="active"><img src="http://localhost:8080/static/img/zfb.png"><i></i></li>
          <li><img src="http://localhost:8080/static/img/wx.png"><i></i></li>
        </ul>
      </div>
      <div class="pay">
        <p>支付<i>￥</i><span>168.00</span></p>
        <a href="javascript:;" target="blank" id="gopay">去付款</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['details']
}

</script>
<style scoped>
@import 'payment.css'

</style>
