import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login'
import Register from './views/Register'
import Public from './views/Public'
import Quiz from './views/Quiz'
import AddQuiz from './views/AddQuiz'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/public',
      name: 'public',
      component: Public
    },
    {
      path: '/quiz/:uuid',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/new',
      name: 'new',
      component: AddQuiz
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
