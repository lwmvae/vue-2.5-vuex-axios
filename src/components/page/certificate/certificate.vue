<template>
  <div class="content">
    <div class="query">
      <div class="title">
        <h1><span>证书</span>查询</h1>
      </div>
      <div class="info">
        <ul class="clearFix">
          <li class="name clearFix">
            <div class="left">
              <span>姓名</span>
            </div>
            <div class="right">
              <input type="text" v-model="name">
              <p v-show="isNameShow">姓名不能为空</p>
            </div>
          </li>
          <li class="idcard clearFix">
            <div class="left">
              <span>身份证号码</span>
            </div>
            <div class="right">
              <input type="text" v-model="idNum">
              <p v-show="isIdNumShow">身份证号码输入错误</p>
            </div>
          </li>
          <li class="num clearFix">
            <div class="left">
              <span>证书编号</span>
            </div>
            <div class="right">
              <input type="text" v-model="number">
              <!-- <p>证书编号输入错误</p> -->
            </div>
          </li>
          <li class="img-code clearFix">
            <div class="left">
              <span>图形验证码</span>
            </div>
            <div class="right">
              <input type="text" v-model="code">
              <img src="http://localhost:8080/static/img/qx.png" title="看不清？点击更换验证码">
              <p v-show="isCodeShow">图形验证码输入错误</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="search">
        <button class="find" @click="submit" ref="find">查询</button>
        <button class="reset" @click="reset">重置</button>
      </div>
    </div>
    <div class="result" v-show="isResultShow">
      <div class="result-wrapper">
        <p>查询结果</p>
      </div>
      <div class="noresult" v-show="noresult">
        <p>暂无查询结果</p>
      </div>
      <div class="table" v-show="table">
        <table>
          <thead>
            <tr>
              <th>姓名</th>
              <th>身份证号码</th>
              <th>单位名称</th>
              <th>所学课程</th>
              <th>考试时间</th>
              <th>到期时间</th>
              <th>证书预览</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items">
              <td>{{item.name}}</td>
              <td>{{item.idcard}}</td>
              <td>{{item.company}}</td>
              <td>{{item.courseName}}</td>
              <td>{{item.getDate}}</td>
              <td>{{item.expireTime}}</td>
              <td><img :src="item.certificateAvatar" width="94px" height="68px" @click="showbigimg(item.certificateAvatar)"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="showbigimg" v-show="bigimg" @click="hidebigimg">
        <img src="#" ref="img">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      isNameShow: false,
      idNum: '',
      isIdNumShow: false,
      number: '',
      code: '',
      isCodeShow: false,
      isResultShow: false,
      items: [],
      noresult: false,
      table: false,
      bigimg:false
    }
  },
  watch: {
    name: function() {
      if (this.name != '') {
        this.isNameShow = false;
      }
    },
    idNum: function() {
      if (this.idNum != '') {
        this.isIdNumShow = false;
      }
    },
    code: function() {
      if (this.code != '') {
        this.isCodeShow = false;
      }
    }
  },
  methods: {
    reset: function() {
      this.isResultShow = false;
      this.name = '';
      this.idNum = '';
      this.number = '';
      this.code = '';
      this.isNameShow = false;
      this.isIdNumShow = false;
      this.isCodeShow = false;
    },
    submit: function() {
      if (this.name == '') {
        this.isNameShow = true;
      }
      if (this.idNum == '') {
        this.isIdNumShow = true;
      }
      if (this.code == '') {
        this.isCodeShow = true;
      }
      if (!this.isNameShow && !this.isIdNumShow && !this.isCodeShow) {
        this.isResultShow = true;
        this.$http.get('http://localhost:8080/static/json/certificateSearch.json').then((response) => {
          var data = response.data;
          if (data.length) {
            this.table = true;
            this.items = data;
          } else {
            this.noresult = true;
          }
        }, (error) => { console.log('失败') })
      }
    },
    showbigimg:function(item){
      this.bigimg=true;
      this.$refs.img.src=item;
    },
    hidebigimg:function(){
      this.bigimg=false;
    }
  }
}

</script>
<style scoped>
.content {
	width: 1200px;
	margin: 0 auto;
  padding-bottom: 20px;
}

.query {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #dfdfdf;
  background-color: #fff;
}

.query .title {
  font-size: 20px;
  text-align: center;
  margin: 10px 0 20px 30px;
}

.query .title span {
  color: #3481d0;
}

.query .info li {
  float: left;
  margin-top: 35px;
  margin-left: 113px;
}

.query .info .left {
  float: left;
  width: 72px;
}

.query .info .left span {
  display: block;
  text-align: justify;
  text-justify: inter-ideograph;
  height: 47px;
  line-height: 47px;
  color: #888;
}

.query .info .left span:after {
  content: '.';
  width: 100%;
  display: inline-block;
  overflow: hidden;
  height: 0;
}

.query .info .right {
  float: left;
  margin-left: 10px;
  position: relative;
}

.query .info .right input {
  border: 1px solid #dfdfdf;
  padding-left: 10px;
  width: 335px;
  height: 45px;
  line-height: 45px;
}

.query .info .right input:focus {
  border: 1px solid #3481d0;
}

.query .info .right p {
  position: absolute;
  /*display: none;*/
  font-size: 12px;
  color: #ec5a47;
  /*visibility: hidden;*/
}

.query .info .img-code input {
  float: left;
  width: 220px;
}

.query .info .img-code img {
  margin-left: 12px;
  width: 100px;
  height: 45px;
  overflow: hidden;
  border: 1px solid #999;
  cursor: pointer;
}

.query .search {
  margin-top: 35px;
  text-align: center;
}

.query .search button {
  width: 80px;
  height: 37px;
  line-height: 37px;
  font-size: 16px;
  border: none;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  cursor: pointer;
}

.query .search .find {
  color: #fff;
  background-color: #3481d0;
  margin-right: 30px;
}

.query .search .reset {
  color: #666;
}

.query .search .disabled {
  cursor: not-allowed;
  background-color: #ccc;
}

.result {
  /*display: none;*/
  margin-top: 20px;
  border: 1px solid #dfdfdf;
  padding-bottom: 20px;
  background-color: #fff;
}

.result .result-wrapper {
  height: 38px;
  line-height: 38px;
  font-size: 16px;
  text-align: center;
  background-color: #cfe1f5;
  color: #3481d0;
  border: 1px solid #3481d0;
}

.result .noresult {
  display: none;
  margin-top: 20px;
  font-size: 20px;
  color: #ec5a47;
  text-align: center;
}

.result .table {
  margin-top: 30px;
}

.result .table table {
  width: 100%;
}

.result .table thead {
  font-size: 16px;
  height: 43px;
  line-height: 43px;
  color: #3481d0;
  border: 1px solid #3481d0;
}

.result .table th {
  font-weight: 100;
}

.result .table tr td {
  height: 80px;
  text-align: center;
}

.result .table tr td img {
  cursor: pointer;
}

.showbigimg {
  /*display: none;*/
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#4C000000, 0, endColorstr=#4C000000, 0);
}

.showbigimg img {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

</style>
