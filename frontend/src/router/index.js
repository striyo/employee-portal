import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import store from '../store';

// pages
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Users from '../views/Users.vue';
import Personal from '../views/Personal.vue';
import Hours from '../views/Hours.vue';
import Events from '../views/Events.vue';
import Resources from '../views/Resources.vue';
import Timesheets from '../views/Timesheets.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/forgotpassword',
    name: 'Forgot Password',
    component: ForgotPassword,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true },
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal,
    meta: { requiresAuth: true },
  },
  {
    path: '/hours',
    name: 'Hours',
    component: Hours,
    meta: { requiresAuth: true },
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: { requiresAuth: true },
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources,
    meta: { requiresAuth: true },
  },
  {
    path: '/timesheets',
    name: 'Timesheets',
    component: Timesheets,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.user == null) {
      // make api call to server
      axios.get('/api/users/status').then((res) => {
        // if logged in, update state.user next
        if (res.data.user) {
          store.dispatch('setUser', res.data.user);
          next();
        } else {
          next('/');
        }
      }).catch((err) => {
        console.log(err);
        // else redirect to login
        next('/');
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
