<template>
  <div>
    <ul>
      <li v-for="(item,index) in subjectList">
        <div class="subject clearFix">
          <p><i>{{index+1}}</i><span>(分数：{{item.fraction}})</span>{{item.content}}</p>
          <a href="javascript:;" class="doubtful" @click="doubtful">存疑</a>
        </div>
        <div class="source">
          <img class="img" v-for="imgSrc in item.sourse" :src="imgSrc" @click="showbigimg(imgSrc)">
        </div>
        <div class="option option-double" v-if="item.type==='double'">
          <ul @click="getOptionCkb">
            <li v-for="(opt,optIndex) in item.option"><span>{{options[optIndex]}}</span>{{opt}}</li>
          </ul>
        </div>
        <div class="option option-single" v-else>
          <ul @click="getOptionRd">
            <li v-for="(opt,optIndex) in item.option" ref="getDouble"><span>{{[item.type]=='judge'?'':options[optIndex]}}</span>{{opt}}</li>
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
import { addClass, removeClass, toggleClass } from 'assets/js/dom'

export default {
  data() {
    return {
      options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      hideBigImg: false
    }
  },
  methods: {
    doubtful:function(e){
      toggleClass(e.target, 'active');
    },
    getOptionRd: function(e) {
      var el = '';
      if (e.target.tagName === 'SPAN') {
        el = e.target.parentNode;
      } else {
        el = e.target;
      }
      var children=e.currentTarget.children;
      for(let i=0;i<children.length;i++){
        removeClass(children[i],'active');
      }
      addClass(el, 'active');
    },
    getOptionCkb: function(e) {
      var el = '';
      if (e.target.tagName === 'SPAN') {
        el = e.target.parentNode;
      } else {
        el = e.target;
      }
      toggleClass(el, 'active');
    },
    hideImg: function() {
      this.hideBigImg = false
    },
    showbigimg: function(src) {
      this.hideBigImg = true;
      this.$refs.img.src = src;
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
