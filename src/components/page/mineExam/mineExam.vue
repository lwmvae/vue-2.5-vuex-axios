<template>
  <div class="content">
    <div class="mine-exam">
      <h5 v-show="noExam">暂无任何考试</h5>
      <ul class="clearFix" v-show="showExam">
        <li v-for="item in items">
          <div class="img">
            <img :src="item.avatar">
          </div>
          <div class="title">
            <p>{{item.name}}</p>
          </div>
          <div class="product clearFix">
            <div class="time">
              <!-- 剩余时间3天以内加类名on -->
              <p>剩余<span :class="[item.daysRemaining < 3 ? 'on':'']">{{item.daysRemaining}}</span>天</p>
            </div>
            <div class="attend">
              <a href="javascript:;" :class="{on:item.state}" @click="goToTest">{{item.state?'补考':'立即考试'}}</a>
            </div>
          </div>
        </li>
      </ul>
      <!-- <div class="page">
        <div class="pre-page">
          <a href="javascript:;" class="notAllow">
            &lt;</a>
        </div>
        <div class="now-page">
          <a href="javascript:;" class="on">1</a>
          <a href="javascript:;">2</a>
          <a href="javascript:;">3</a>
          <a href="javascript:;">4</a>
        </div>
        <div class="next-page">
          <a href="javascript:;"> &gt;</a>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data(){
  	return{
  		items:[],
  		noExam:false,
  		showExam:false
  	}
  },
  methods:{
    goToTest:function () {
      this.$router.push('/mineExam/paper');
    }
  },
  created(){
  	this.$http.get('http://localhost:8080/static/json/mineExam.json').then((response) => {
          var data = response.data;
          if (data.length) {
            this.showExam = true;
            this.items = data;
          } else {
            this.noExam = true;
          }
        }, (error) => { console.log('失败') })
  }
}

</script>
<style scoped>
@import 'mineExam.css'

</style>
