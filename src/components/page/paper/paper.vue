<template>
  <div class="container">
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
                <img src="http://localhost:8080/static/img/qx.png">
              </div>
              <div class="p-info">
                <p>姓名：张三</p>
              </div>
            </div>
            <div class="aside-down">
              <div class="remaining-time">
                <i></i>剩余时间：<span>00:00:00</span>
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
                  <li v-for="index in single.length">{{num+index-1}}</li>
                  <p>二、多选题</p>
                  <li v-for="index in double.length">{{index}}</li>
                  <p>三、判断题</p>
                  <li v-for="index in judge.length">{{index}}</li>
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
            <ul>
              <li v-for="(item,index) in single">
                <div class="subject clearFix">
                  <p><i>{{5}}</i><span>(分数：{{item.fraction}})</span>{{item.content}}</p>
                  <a href="javascript:;" class="doubtful">存疑</a>
                </div>
                <div class="source">
                  <div class="source-detail">
                    <div class="close"></div>
                  </div>
                  <div class="source-wrapper">
                    <img class="img" v-for="img in item.sourse" :src="img">
                  </div>
                </div>
                <!-- 单选题/判断题添加类名为 option-single -->
                <!-- 多选题添加类名为 option-double -->
                <div class="option option-single">
                  <ul>
                    <li v-for="opt in item.option"><span>A</span>{{opt}}</li>
                  </ul>
                </div>
              </li>
            </ul>
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
            <ul>
              <li v-for="(item,index) in double">
                <div class="subject clearFix">
                  <p><i>{{index}}</i><span>(分数：{{item.fraction}})</span>{{item.content}}</p>
                  <a href="javascript:;" class="doubtful">存疑</a>
                </div>
                <div class="source">
                  <div class="source-detail">
                    <div class="close"></div>
                  </div>
                  <div class="source-wrapper">
                    <img class="img" v-for="img in item.sourse" :src="img">
                  </div>
                </div>
                <div class="option option-double">
                  <ul>
                    <li v-for="opt in item.option"><span>A</span>{{opt}}</li>
                  </ul>
                </div>
              </li>
            </ul>
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
            <ul>
              <li v-for="(item,index) in judge">
                <div class="subject clearFix">
                  <p><i>{{index}}</i><span>(分数：{{item.fraction}})</span>{{item.content}}</p>
                  <a href="javascript:;" class="doubtful">存疑</a>
                </div>
                <div class="source">
                  <div class="source-detail">
                    <div class="close"></div>
                  </div>
                  <div class="source-wrapper">
                    <img class="img" v-for="img in item.sourse" :src="img">
                  </div>
                </div>
                <div class="option option-single">
                  <ul>
                    <li v-for="opt in item.option"><span></span>{{opt}}</li>
                  </ul>
                </div>
              </li>
            </ul>
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
export default {
  data() {
    return {
      title: '考试',
      score:[],
      num:1,
      info: [],
      single: [],
      double: [],
      judge: []
    }
  },
  methods:{
    sum:function(arr){
      var sum=0;
      for(let i=0,len=arr.length;i<len;i++){
        sum+=arr[i].fraction;
      }
      return sum;
    },
    assignment:function () {
      this.$router.push('/paper/examResult');
    }
  },
  created() {
    this.$http.get('http://localhost:8080/static/json/paper.json').then((response) => {
      var data = response.data;
      this.info = data.info;
      this.single = data.single;
      this.double = data.double;
      this.judge = data.judge;
      this.score=this.sum(this.single)+this.sum(this.double)+this.sum(this.judge);
      // console.log(this.sum(this.single));
    }, (error) => { console.log('失败') })
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
