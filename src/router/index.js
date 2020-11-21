import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Processes from '@/views/processes/main.vue';
import StepsOfProcess from '@/views/steps/main.vue';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

function isAuthenticated() {
  const auth = localStorage.getItem('AUTH_TOKEN');
  if (auth) {
    return true;
  }

  return false;
}

function requiresAuth(to, from, next) {
  if (isAuthenticated()) {
    next();
  } else {
    next('/login');
  }
}

function noRequiresAuth(to, from, next) {
  if (!isAuthenticated()) {
    next();
  } else {
    next('/home');
  }
}

const routes = [
  {
    path: '/',
    redirect: 'home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: requiresAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: noRequiresAuth,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: noRequiresAuth,
  },
  {
    path: '/processes',
    name: 'Processes',
    component: Processes,
    beforeEnter: requiresAuth,
  },
  {
    path: '/process/:processId/steps',
    name: 'Steps',
    component: StepsOfProcess,
    beforeEnter: requiresAuth,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
