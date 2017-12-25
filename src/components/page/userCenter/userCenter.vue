<template>
  <div class="content clearFix" v-title data-title="用户中心">
    <div class="data-certificate">
      <div class="data">
        <div class="photo">
          <img :src="info.userAvatar">
          <div class="img-gray"></div>
          <input type="file" @click="changeHead">
        </div>
        <div class="username">
          <p>{{info.userName}}</p>
        </div>
        <div class="edit">
          <a href="javascript:;" @click="editInfo">编辑资料</a>
        </div>
      </div>
      <div class="certificate">
        <div class="title clearFix">
          <p>所获证书</p>
          <a href="javascript:;" @click="viewMore">更多</a>
        </div>
        <div class="list">
          <ul>
            <li v-for="list in certificateList"><i></i>{{list.ctfTitle}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="detail">
      <div class="detail-nav">
        <ul class="clearFix">
          <li :class="{active:index==navListNum}" v-for="(list,index) in navList"><a href="javascript:;" @click="navChange(index)">{{list}}</a></li>
        </ul>
      </div>
      <div class="detail-content">
        <ul class="content-nav">
          <li class="mine-course" v-show="navListNum==0">
            <div class="course-nav clearFix">
              <div class="all">
                <a href="javascript:;" class="a active">全部</a>
              </div>
              <div class="learing">
                <a href="javascript:;" class="a">学习中<i></i></a>
                <ul>
                  <li><a href="javascript:;">已考试</a></li>
                  <li><a href="javascript:;">未考试</a></li>
                </ul>
              </div>
              <div class="overdue">
                <a href="javascript:;" class="a">已过期<i></i></a>
                <ul>
                  <li><a href="javascript:;">获得证书</a></li>
                  <li><a href="javascript:;">未获得证书</a></li>
                </ul>
              </div>
              <div class="course-search">
                <input type="text" placeholder="高校实验室">
                <a href="javascript:;"></a>
              </div>
            </div>
            <div class="course-list">
              <h5>暂无课程</h5>
              <ul class="clearFix">
                <li v-for="list in mineCourse">
                  <div class="img">
                    <img :src="list.mcAvatar">
                  </div>
                  <div class="title">
                    <p>{{list.mcTitle}}</p>
                  </div>
                  <div class="product clearFix">
                    <div class="time">
                      <!-- 天数少于三天，span添加类名span -->
                      <p v-show="list.examDeadLine >= 0">剩余<span class="span">{{list.examDeadLine}}</span>天</p>
                    </div>
                    <div class="card">
                      <!-- 状态为即将考试时，添加类名exam -->
                      <p v-show="!list.pay" class="not-pay" @click="goToPay(list.id)">立即付款</p>
                      <p v-show="list.forgetTest" class="forgot"><i></i>忘记考试</p>
                      <p v-show="!list.getCtf && list.examDeadLine <= 3 && list.examDeadLine > 0" class="exam"><i></i>即将考试</p>
                      <p v-show="list.getCtf"><i></i>获得证书</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li class="mine-exam" v-show="navListNum==1">
            <h5>暂无任何试卷</h5>
            <table>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>课程名称</th>
                  <th>试卷名称</th>
                  <th>试卷类型</th>
                  <th>分数</th>
                  <th>查看</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(list,index) in minePpaer">
                  <td>{{index+1}}</td>
                  <td>{{list.courseTitle}}</td>
                  <td>{{list.paperTitle}}</td>
                  <td>{{list.paperType?'考试试卷':'模拟试卷'}}</td>
                  <td>{{list.score}}</td>
                  <td><a href="javascript:;" @click="goToAns(list.paperId)">查看解析</a></td>
                </tr>
              </tbody>
            </table>
            <!-- <div class="page">
              <div class="pre-page">
                <a href="javascript:;" class="notAllow">
                  <</a>
              </div>
              <div class="now-page">
                <a href="javascript:;" class="on">1</a>
                <a href="javascript:;">2</a>
                <a href="javascript:;">3</a>
                <a href="javascript:;">4</a>
              </div>
              <div class="next-page">
                <a href="javascript:;">></a>
              </div>
            </div> -->
          </li>
          <li class="mine-certificate" v-show="navListNum==2">
            <h5 v-show="certificateList.length==0">暂无证书</h5>
            <ul class="clearFix" v-show="certificateList.length>0">
              <li v-for="list in certificateList">
                <img :src="list.ctfAvatar" @click="showBig(list.ctfAvatar)">
                <p>{{list.ctfTitle}}</p>
              </li>
            </ul>
            <div class="showbigimg" v-show="showbigimg" @click="hideBig">
              <img src="#" ref="bigImg">
            </div>
          </li>
          <li class="personal-data li" v-show="navListNum==3">
            <div class="personal-warn">
              <p><i></i>温馨提醒：审核通过后，真实姓名、身份证号码、身份证照片将不能再次更改，请慎重填写！</p>
              <span>审核需要1-3个工作日，请耐心等待！</span>
            </div>
            <div class="personal-info">
              <div class="username clearFix">
                <div class="left">
                  <span>用户名</span>
                </div>
                <div class="right">
                  <input type="text" :value="info.userName">
                </div>
              </div>
              <div class="name clearFix">
                <div class="left">
                  <span>真实姓名</span>
                </div>
                <div class="right">
                  <input type="text" :value="info.name">
                </div>
              </div>
              <div class="sex clearFix">
                <div class="left">
                  <span>性别</span>
                </div>
                <div class="right">
                  <span><input type="radio" name="sex" value="男" checked="checked">男</span>
                  <span><input type="radio" name="sex" value="女">女</span>
                </div>
              </div>
              <div class="idcard clearFix">
                <div class="left">
                  <span>身份证号码</span>
                </div>
                <div class="right">
                  <input type="text" :value="info.idCard">
                </div>
              </div>
              <div class="idimg clearFix">
                <div class="left">
                  <span>身份证照片</span>
                </div>
                <div class="right">
                  <ul class="clearFix">
                    <li class="positive">
                      <div class="upload-img">
                        <img src="http://localhost:8080/static/img/idpositive.png">
                        <div class="upload">
                          <button>上传照片</button>
                        </div>
                      </div>
                      <span>身份证正面</span>
                    </li>
                    <li class="negative">
                      <div class="upload-img">
                        <img src="http://localhost:8080/static/img/idnegative.png">
                        <div class="upload">
                          <button>上传照片</button>
                        </div>
                      </div>
                      <span>身份证背面</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="phonenum clearFix">
                <div class="left">
                  <span>手机号码</span>
                </div>
                <div class="right">
                  <input type="text" :value="info.phoneNum">
                </div>
              </div>
              <div class="adress clearFix">
                <div class="left">
                  <span>通讯地址</span>
                </div>
                <div class="right">
                  <input type="text">
                </div>
              </div>
              <div class="company clearFix">
                <div class="left">
                  <span>单位名称</span>
                </div>
                <div class="right">
                  <input type="text">
                </div>
              </div>
              <div class="audit clearFix">
                <div class="left">
                  <span>审核</span>
                </div>
                <div class="right">
                  <!-- 添加类名on -->
                  <h6 class="on">未通过</h6>
                </div>
              </div>
              <div class="explain clearFix">
                <div class="left">
                  <span>审核说明</span>
                </div>
                <div class="right">
                  <h6>真实姓名、身份证号码、身份证照片均未通过审核真实姓名、身份证号码、身份证照片均未通过审核</h6>
                </div>
              </div>
              <div class="btn">
                <button class="save">保存</button>
                <button class="cancel">取消</button>
              </div>
            </div>
          </li>
          <li class="change-psw li" v-show="navListNum==4">
            <div class="new-psw clearFix">
              <div class="left">
                <span>新密码</span>
              </div>
              <div class="right">
                <input type="password">
              </div>
            </div>
            <div class="sure-psw clearFix">
              <div class="left">
                <span>确认密码</span>
              </div>
              <div class="right">
                <input type="password">
                <p>两次密码输入不一致</p>
              </div>
            </div>
            <div class="btn">
              <button class="save">保存</button>
              <button class="cancel">取消</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: ['我的课程', '我的试卷', '取得证书', '个人资料', '更改密码'],
      navListNum: 0,
      info: {},
      certificateList: [],
      mineCourse: [],
      minePpaer:[],
      showbigimg:false
    }
  },
  methods: {
    changeHead:function () {
      
    },
    editInfo:function () {
      this.navListNum=3;
    },
    viewMore:function(){
      this.navListNum=2;
    },
    navChange: function(index) {
      this.navListNum = index;
    },
    goToPay:function (id) {
      console.log(id);
    },
    showBig:function(src){
      this.showbigimg=true;
      this.$refs.bigImg.src=src;
    },
    hideBig:function(){
      this.showbigimg=false;
    }
  },
  created() {
    this.$http.get('http://localhost:8080/static/json/userCenter.json').then((response) => {
      var data = response.data;
      this.info = data.info;
      this.certificateList = data.certificateList;
      this.mineCourse = data.mineCourse;
      this.minePpaer = data.minePpaer;
    }, (error) => { console.log('失败') })
  }
}

</script>
<style scoped>
@import 'userCenter.css'

</style>
