<template>
  <div>
    <div class="banner" v-title data-title="首页">
      <div class="banner-wrapper">
        <img src="http://localhost:8080/static/img/qxbanner.png">
      </div>
    </div>
    <div class="content">
      <div class="hot-course">
        <div class="course-title">
          <span>热门课程</span>
        </div>
        <ul class="clearFix">
          <!-- 共8个 -->
          <li v-for="course in hotCourse" @click="goToDetail(course.id)">
            <div class="img">
              <img :src="course.avatar">
            </div>
            <div class="title">
              <p>{{course.title}}</p>
            </div>
            <div class="product clearFix">
              <div class="price">
                <p>￥{{course.price}}</p>
              </div>
              <div class="purchase">
                <p>{{course.purchase}}人购买</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="certificate">
        <div class="certificate-title">
          <span>证书喜报</span>
        </div>
        <div class="table-head">
          <table>
            <tr>
              <td width="100px">姓名</td>
              <td width="450px">课程名称</td>
              <td width="500px">证书名称</td>
              <td width="150px">时间</td>
            </tr>
          </table>
        </div>
        <div class="table-content" id="demo">
          <table id="demo1">
            <tr v-for="list in getCertificate">
              <td width="100px">{{list.name}}</td>
              <td width="450px">{{list.courseName}}</td>
              <td width="500px">{{list.certificateName}}</td>
              <td width="150px">{{list.date}}</td>
            </tr>
          </table>
          <table id="demo2">
          </table>
        </div>
        <div class="table-foot"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCourse } from 'api/course'
import { ERR_OK } from 'api/config'
var HOTCOURSELENGTH = 8;

export default {
  data() {
    return {
      hotCourse: [],
      getCertificate: [],
    }
  },
  methods: {
    goToDetail: function(id) {
      this.$router.push({ path: '/courseCenter/courseDetail', query: { id: id } });
    },
    scroll: function() {
      function $(ele) {
        return document.getElementById(ele);
      }
      var demo = $("demo"),
        demo1 = $("demo1"),
        demo2 = $("demo2");
      var speed = 50;
      demo2.innerHTML = demo1.innerHTML;

      function Marquee() {
        if (demo2.offsetTop - demo.scrollTop == 1306) {
          demo.scrollTop -= demo1.offsetHeight
        } else {
          demo.scrollTop++
        }
      }
      var MyMar = setInterval(Marquee, speed);
      demo.onmouseover = function() { clearInterval(MyMar) };
      demo.onmouseout = function() { MyMar = setInterval(Marquee, speed) };
    },
    _getHotList() {
      getCourse().then((res) => {
        if (res.code === ERR_OK) {
          var data = res.courseList;
          data.forEach((item, index) => {
            if ((index+1) <= HOTCOURSELENGTH) {
              this.hotCourse.push(item);
            }
          })

        }
      })
    }
  },
  created() {
    this._getHotList();
    this.$http.get('http://localhost:8080/static/json/firstPage.json').then((response) => {
      var data = response.data;
      // this.hotCourse = data.hotCourse;
      this.getCertificate = data.getCertificate;
    }, (error) => { console.log('失败') });
  },
  mounted() {
    setTimeout(() => {
      this.scroll();
    }, 20)
  }
}

</script>
<style scoped>
@import 'firstPage.css'

</style>
