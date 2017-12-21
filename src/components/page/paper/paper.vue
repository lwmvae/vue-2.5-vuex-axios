<template>
  <div class="container">
    <div class="loading" v-show="showPaper">
      <p><span>试卷加载中，请稍等</span><img src="http://localhost:8080/static/img/loading.gif" alt="加载中"></p>
    </div>
    <v-head :title="title"></v-head>
    <div class="content">
      <div class="exam">
        <div class="exam-wrapper clearFix">
          <div class="name">
            <p>{{info.courseName}}</p>
          </div>
          <div class="score">
            <p>总分：{{score}}分</p>
          </div>
          <div class="pass">
            <p>及格分：{{score*0.6}}分</p>
          </div>
          <div class="speed">
            <p>做题进度：<span>0</span>/{{single.length+double.length+judge.length}}</p>
          </div>
          <div class="submit">
            <button @click="assignment">交卷</button>
          </div>
        </div>
      </div>
      <div class="exam-name">
        <h1>{{info.paperName}}</h1>
      </div>
      <div class="con">
        <div class="aside">
          <div class="aside-wrapper">
            <div class="person clearFix">
              <div class="p-img">
                <img :src="info.userAvatar">
              </div>
              <div class="p-info">
                <p>姓名：{{info.userName}}</p>
              </div>
            </div>
            <div class="aside-down">
              <div class="remaining-time">
                <i></i>剩余时间：<span>{{count}}</span>
              </div>
              <div class="legend">
                <h6>说明</h6>
                <p class="p1"><span></span>已完成</p>
                <p class="p2"><span></span>未完成</p>
                <p class="p3"><span></span>存疑</p>
              </div>
              <div class="subject-type">
                <ul>
                  <p>一、单选题</p>
                  <li v-for="index in single.length">{{index}}</li>
                  <p>二、多选题</p>
                  <li v-for="index in double.length">{{single.length+index}}</li>
                  <p>三、判断题</p>
                  <li v-for="index in judge.length">{{single.length+double.length+index}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="all-subject">
          <!-- 单选题 -->
          <div class="single">
            <div class="title clearFix">
              <div class="type">
                一、单选题
              </div>
              <div class="detail">
                (共{{single.length}}题,共计{{sum(single)}}分)
              </div>
            </div>
            <subject :subjectList="single"></subject>
          </div>
          <!-- 多选题 -->
          <div class="double">
            <div class="title clearFix">
              <div class="type">
                二、多选题
              </div>
              <div class="detail">
                (共{{double.length}}题,共计{{sum(double)}}分)
              </div>
            </div>
            <subject :subjectList="double"></subject>
          </div>
          <!-- 判断题 -->
          <div class="judge">
            <div class="title clearFix">
              <div class="type">
                三、判断题
              </div>
              <div class="detail">
                (共{{judge.length}}题,共计{{sum(judge)}}分)
              </div>
            </div>
            <subject :subjectList="judge"></subject>
          </div>
        </div>
      </div>
    </div>
    <v-foot></v-foot>
  </div>
</template>
<script>
import vHead from '../../common/head.vue'
import vFoot from '../../common/foot.vue'
import subject from '../subject/subject.vue'
var time = 0;
export default {
  data() {
    return {
      title: '考试',
      score: [],
      info: [],
      single: [],
      double: [],
      judge: [],
      showPaper: true,
      count: "00:00:00"
    }
  },
  methods: {
    sum: function(arr) {
      var sum = 0;
      for (let i = 0, len = arr.length; i < len; i++) {
        sum += arr[i].fraction;
      }
      return sum;
    },
    assignment: function() {
      this.$router.push('/paper/examResult');
    },
    countDown: function(time) {
      var t = time;
      var h = 0,
        m = 0,
        s = 0;
      if (t >= 0) {
        h = Math.floor(t / 60 / 60 % 24);
        m = Math.floor(t / 60 % 60);
        s = Math.floor(t % 60);
      }

      function checkTime(i) {
        return i < 10 ? "0" + i : i;
      }

      h = checkTime(h);
      m = checkTime(m);
      s = checkTime(s);
      return h + ':' + m + ':' + s;
    },
    callback: function() {
      // this.$router.push('/');
    }
  },
  created() {
    this.$http.get('http://localhost:8080/static/json/paper.json').then((response) => {
      var data = response.data;
      this.info = data.info;
      this.single = data.single;
      this.double = data.double;
      this.judge = data.judge;
      this.score = this.sum(this.single) + this.sum(this.double) + this.sum(this.judge);
      time = this.info.paperTime;
    }, (error) => { console.log('失败') })
  },
  mounted() {
    var self = this;
    self.showPaper = false;
    var timer = window.setInterval(function() {
      time--;
      self.count = self.countDown(time);
      if (time < 0) {
        clearInterval(timer);
        self.callback();
      }
    }, 1000);
  },
  components: {
    vHead,
    vFoot,
    subject
  }
}

</script>
<style scoped>
@import 'paper.css'

</style>
