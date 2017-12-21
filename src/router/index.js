import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/common/home'
import login from '@/components/common/login'
import register from '@/components/common/register'
import firstPage from '@/components/page/firstPage/firstPage'
import userCenter from '@/components/page/userCenter/userCenter'
import courseCenter from '@/components/page/courseCenter/courseCenter'
import mineExam from '@/components/page/mineExam/mineExam'
import certificate from '@/components/page/certificate/certificate'
import education from '@/components/page/education/education'
import paper from '@/components/page/paper/paper'
import examResult from '@/components/page/examResult/examResult'
import courseDetail from '@/components/page/courseDetail/courseDetail'
import payment from '@/components/page/payment/payment'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: home,
      children: [{
        path: '/',
        redirect: 'firstPage'
      }, {
        path: '/firstPage',
        component: firstPage
      }, {
        path: '/userCenter',
        component: userCenter
      }, {
        path: '/courseCenter',
        component: courseCenter
      }, {
        path: '/courseCenter/courseDetail',
        component: courseDetail
      }, {
        path: '/courseCenter/courseDetail/payment',
        component: payment
      }, {
        path: '/mineExam',
        component: mineExam
      }, {
        path: '/certificate',
        component: certificate
      }, {
        path: '/education',
        component: education
      }]
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/mineExam/paper',
      component: paper
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/paper/examResult',
      component: examResult
    }
  ],
  linkActiveClass: 'active'
})
