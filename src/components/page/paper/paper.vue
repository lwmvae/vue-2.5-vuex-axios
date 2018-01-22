<template>
  <div class="container" v-title data-title="考试">
    <div class="loading" v-show="showPaper">
      <p><span>试卷加载中，请稍等</span><img src="http://localhost:8080/static/img/loading.gif" alt="加载中" width="32" height="32"></p>
    </div>
    <v-head :title="title"></v-head>
    <div class="content">
      <div class="exam" ref="exam" :class="{fixed:isfixed}">
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
          <div class="submit">
            <button @click="assignment">交卷</button>
          </div>
        </div>
      </div>
      <div class="exam-name">
        <h1>{{info.paperName}}</h1>
      </div>
      <div class="con">
        <div class="aside" :class="{'aside-fixed':isfixed}">
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
                  <li v-for="index in subjectNum" @click="goToNav(index)">{{index}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="all-subject">
          <div v-for="(subjectItem,tihao) in subjectList">
            <div class="title clearFix">
              <div class="type">
                {{optionType[tihao]}}、{{subjectItem.typeName}}
              </div>
              <div class="detail">
                (共{{subjectItem.list.length}}题,共计{{sumTypeScore(subjectItem.list)}}分)
              </div>
            </div>
            <ul>
              <li v-for="(item,index) in subjectItem.list" ref="getLiGroup">
                <div class="subject clearFix">
                  <p><i>{{index+1}}</i><span>(分数：{{item.fraction}})</span>{{item.content}}</p>
                  <a href="javascript:;" class="doubtful" @click="doubtful(index)">存疑</a>
                </div>
                <div class="source">
                  <img class="img" v-for="imgSrc in item.sourse" :src="imgSrc" @click="showbigimg(imgSrc)">
                </div>
                <div class="option option-double" v-if="subjectItem.type==='double'">
                  <ul>
                    <li v-for="(opt,optIndex) in item.option"><span>{{options[optIndex]}}</span>{{opt}}</li>
                  </ul>
                </div>
                <div class="option option-single" v-else>
                  <ul>
                    <li v-for="(opt,optIndex) in item.option" ref="getDouble"><span>{{[item.type]=='judge'?'':options[optIndex]}}</span>{{opt}}</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 点击图片展示大图 -->
    <div class="showbigimg" v-show="hideBigImg" @click="hideImg">
      <img src="#" ref="img">
    </div>
    <v-foot></v-foot>
  </div>
</template>
<script>
import vHead from '../../common/head.vue'
import vFoot from '../../common/foot.vue'
var time = 0;
export default {
  data() {
    return {
      title: '考试',
      options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      optionType: ['一', '二', '三', '四', '五', '六', '七', '八'],
      score: 0,
      info: [],
      subjectList: [],
      subjectNum: 0,
      showPaper: true,
      count: "00:00:00",
      isfixed: false,
      hideBigImg: false,
      subjectOffsetTop: []
    }
  },
  methods: {
    sumTypeScore(arr) {
      var sum = 0;
      for (let i = 0, len = arr.length; i < len; i++) {
        sum += arr[i].fraction;
      }
      return sum;
    },
    assignment() {
      // this.$router.push('/paper/examResult');
    },
    subjectTop() {
      const getLi = this.$refs.getLiGroup
      for (let i = 0; i < getLi.length; i++) {
        let height = getLi[i].offsetTop;
        this.subjectOffsetTop.push(height)
      }
    },
    doubtful(index) {
      console.log(index)
    },
    goToNav(index) {
      if (this.subjectOffsetTop.length) {
        this.scroll(index)
      } else {
        this.subjectTop()
        this.scroll(index)
      }
    },
    scroll(index) {
      var scrollH = document.documentElement.scrollTop;
      var backH = this.subjectOffsetTop[index - 1] - 200;
      console.log(scrollH, backH)
      if (scrollH > backH) {
        var timer1 = setInterval(() => {
          let scrollH1 = document.documentElement.scrollTop;
          let shiji1 = scrollH1 - backH;
          let speed1 = shiji1 / 5;
          document.documentElement.scrollTop = scrollH1 - speed1;
          if (scrollH1 < (backH + 5)) {
            clearInterval(timer1);
          }
        }, 30)
      } else {
        var timer2 = setInterval(function() {
          let scrollH2 = document.documentElement.scrollTop;
          let shiji2 = backH - scrollH2;
          let speed2 = shiji2 / 5;
          document.documentElement.scrollTop = scrollH2 + speed2;
          if (scrollH2 > (backH - 5)) {
            clearInterval(timer2);
          }
        }, 30)
      }
      // document.documentElement.scrollTop = this.subjectOffsetTop[index - 1] - 200
    },
    titleFixed() {
      var examTop = this.$refs.exam.offsetTop;
      window.addEventListener('scroll', () => {
        var scrollTop = document.documentElement.scrollTop;
        if (scrollTop > examTop) {
          this.isfixed = true;
        } else {
          this.isfixed = false;
        }
      }, false)
    },
    countDown(time) {
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
    callback() {
      this.$router.push('/');
    },
    hideImg() {
      this.hideBigImg = false
    },
    showbigimg(src) {
      this.hideBigImg = true;
      this.$refs.img.src = src;
    },
    _getDate() {
      this.$http.get('http://localhost:8080/static/json/paper.json').then((response) => {
        var data = response.data;
        this.info = data.info;
        this.subjectList = data.subjectList;
        this.subjectList.forEach((list) => {
          this.subjectNum += list.list.length;
          this.score += this.sumTypeScore(list.list);
        });
        time = this.info.paperTime;
        this.showPaper = false
      }, (error) => { console.log('失败') });
    }
  },
  mounted() {
    var self = this;
    var timer = window.setInterval(function() {
      time--;
      self.count = self.countDown(time);
      if (time < 0) {
        clearInterval(timer);
        self.callback();
      }
    }, 1000);

  },
  created() {
    setTimeout(() => {
      this._getDate()
      this.titleFixed()
    }, 20)
  },
  components: {
    vHead,
    vFoot
  }
}

</script>
<style scoped>
@import 'paper.css'

</style>
