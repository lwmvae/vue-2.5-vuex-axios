<template>
  <div>
    <ul>
      <li v-for="(item,index) in subjectList">
        <div class="subject clearFix">
          <p><i>{{index+1}}</i><span>(分数：{{item.fraction}})</span>{{item.content}}</p>
          <a href="javascript:;" class="doubtful">存疑</a>
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
      hideBigImg: false
    }
  },
  methods: {
    getOptionRd: function(e) {
      // var getLi = document.getElementsByClassName('option')[index].getElementsByTagName('li');
      // console.log(getLi);
      // getLi.className = '';
      // e.target.className = 'active';

      console.log(e.target);
      // e.children.className='';
      e.target.className='active';
      // console.log(e.target);
    },
    getOptionCkb:function(){},
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
