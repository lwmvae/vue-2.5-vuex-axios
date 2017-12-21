<template>
  <div>
    <ul>
      <li v-for="(item,index) in subjectList">
        <div class="subject clearFix">
          <p><i>{{num}}</i><span>(分数：{{item.fraction}})</span>{{item.content}}</p>
          <a href="javascript:;" class="doubtful">存疑</a>
        </div>
        <div class="source">
          <img class="img" v-for="imgSrc in item.sourse" :src="imgSrc" @click="showbigimg(imgSrc)">
        </div>
        <div class="option" :class="[item.type]=='double'?'option-double':'option-single'">
          <ul>
            <li v-for="(opt,optIndex) in item.option"><span>{{[item.type]=='judge'?'':options[optIndex]}}</span>{{opt}}</li>
          </ul>
        </div>
      </li>
    </ul>
    <!-- 点击图片展示大图 -->
    <div class="showbigimg" v-show="hideBigImg" @click="hideImg">
      <img src="#" ref="img">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      hideBigImg:false,
      num:1
    }
  },
  methods:{
  	hideImg:function(){
  		this.hideBigImg=false
  	},
  	showbigimg:function(src){
  		this.hideBigImg=true;
  		this.$refs.img.src=src;
  	}
  },
  props: {
    subjectList: Array
  }
}

</script>
<style scoped>
@import 'subject.css'

</style>
