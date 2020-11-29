import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Processes from '@/views/processes/main.vue';
import StepsOfProcess from '@/views/steps/main.vue';
import StudentSteps from '@/views/steps/student/progress.vue';
import AdminSteps from '@/views/steps/admin/progress.vue';
import Unauthorized from '@/views/Unauthorized.vue';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const ADMIN_TYPE = 1;
const STUDENT_TYPE = 2;

function isAuthenticated() {
  const auth = localStorage.getItem('AUTH_TOKEN');
  if (auth) {
    return true;
  }

  return false;
}

function isAdmin() {
  const userType = parseInt(localStorage.getItem('USER_TYPE'), 10);
  if (userType === ADMIN_TYPE) {
    return true;
  }

  return false;
}

function isStudent() {
  const userType = parseInt(localStorage.getItem('USER_TYPE'), 10);
  if (userType === STUDENT_TYPE) {
    return true;
  }

  return false;
}

function requiresAuthAdmin(to, from, next) {
  if (isAuthenticated()) {
    if (isAdmin()) {
      next();
    } else {
      next('/unauthorized');
    }
  } else {
    next('/login');
  }
}

function requiresAuthStudent(to, from, next) {
  if (isAuthenticated()) {
    if (isStudent()) {
      next();
    } else {
      next('/unauthorized');
    }
  } else {
    next('/login');
  }
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
    path: '/student/process/:processId/steps',
    name: 'Student Steps',
    component: StudentSteps,
    beforeEnter: requiresAuthStudent,
  },
  {
    path: '/admin/process/:processId/steps',
    name: 'Admin Steps',
    component: AdminSteps,
    beforeEnter: requiresAuthAdmin,
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
