<template>
  <div class="container">
      <v-head :title="title"></v-head>
      <div class="content" ref="content">
        <div class="content-wrapper">
          <div class="result-head">
            <img :src="[items.state?imgSrc.success:imgSrc.fail]">
          </div>
          <div class="result" :class="[items.state?'result-success':'result-fail']">
            <p class="score"><span>{{items.score}}</span>分</p>
          </div>
          <div class="result-explain">
            <p :class="[items.state?'':'p']">{{items.state?'已':'未'}}通过考试</p>
          </div>
          <div class="result-return clearFix">
            <div class="view">
              <a href="javascript:;" :class="[items.state?'':'a']">{{items.state?'查看证书':'补考'}}</a>
            </div>
            <div class="return">
              <a href="javascript:;">返回</a>
            </div>
          </div>
          <div class="result-footer"></div>
        </div>
      </div>
    <v-foot></v-foot>
  </div>
</template>
<script>
import vHead from '../../common/head.vue'
import vFoot from '../../common/footer.vue'
export default {
  data() {
    return {
      title: '考试结果',
      items: {},
      imgSrc: {
        success: "http://localhost:8080/static/img/pass.png",
        fail: "http://localhost:8080/static/img/nopass.png",
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.$refs.content.style.minHeight = document.documentElement.clientHeight - 140 + 'px';
    });
  },
  created() {
    this.$http.get('http://localhost:8080/static/json/examResult.json').then((response) => {
      var data = response.data;
      this.items = data;
      // console.log(data);
    }, (error) => { console.log('失败') })
  },
  components: {
    vHead,
    vFoot
  }
}

</script>
<style scoped>
@import 'examResult.css'

</style>
