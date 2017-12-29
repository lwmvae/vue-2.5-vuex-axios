<template>
  <div class="content" v-title data-title="课程中心">
    <div class="nav-course">
      <ul class="clearFix">
        <li v-for="(nav,index) in navItems" :class="{active:index==num}" @click="changeCourse(index)"><a href="javascript:;">{{nav}}</a></li>
      </ul>
    </div>
    <div class="course">
      <h5 v-show="noCourse">暂无该课程</h5>
      <ul class="clearFix" v-show="showCourse">
        <li v-for="item in items" @click="goToDetail(item.id,item.title)">
          <div class="img">
            <img :src="item.avatar">
          </div>
          <div class="title">
            <p>{{item.title}}</p>
          </div>
          <div class="product clearFix">
            <div class="price">
              <p>￥{{item.price}}</p>
            </div>
            <div class="purchase">
              <!-- 未购买的课程 -->
              <a v-show="item.myCourse" class="btn">开始学习</a>
              <a v-show="!item.myCourse">{{item.purchase}}人购买</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="page">
      <div class="pre-page">
        <a href="javascript:;" class="notAllow">&lt;</a>
      </div>
      <div class="now-page">
        <a href="javascript:;" class="on">1</a>
        <a href="javascript:;">2</a>
        <a href="javascript:;">3</a>
        <a href="javascript:;">4</a>
      </div>
      <div class="next-page">
        <a href="javascript:;">&gt;</a>
      </div>
    </div> -->
  </div>
</template>
<script>
import { getCourse } from 'api/course'
import { ERR_OK } from 'api/config'
import { mapGetters } from 'vuex'
var data;
export default {
  data() {
    return {
      navItems: ['全部课程', '实验室瓶装气体使用人员', '瓶装气体运输人员', '气瓶充装企业人员', '瓶装气体经销企业人员'],
      num: 0,
      items: [],
      noCourse: false,
      showCourse: false
    }
  },
  methods: {
    goToDetail: function(id, title) {
      this.$router.push({ path: '/courseCenter/courseDetail', query: { 'id': id, 'title': title } });
    },
    changeCourse: function(index) {
      this.num = index;
      if (index == 0) {
        this.items = data;
      } else {
        this.items = this.filterData(data, index)
      }
    },
    filterData: (data, num) => {
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].type == num) {
          arr.push(data[i]);
        }
      }
      return arr;
    },
    _getData: function() {
      getCourse().then((res) => {
        if (res.code === ERR_OK) {
          data = res.courseList;
          if (data.length) {
            this.showCourse = true;
            this.items = data;
            //未登录
            if (!this.isLogin) {
              for (let i in this.items) {
                this.items[i].myCourse = false;
              }
            }
          } else {
            this.noCourse = true;
          }

        }
      })
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this._getData();
  }
}

</script>
<style scoped>
@import 'courseCenter.css'

</style>
