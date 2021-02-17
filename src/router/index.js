import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
  },
  {
    path: '/auth',
    component: () => import('../layouts/Default'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/Auth/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/Auth/Register'),
      },
      {
        path: 'forgot-password',
        name: 'Forgot Pasword',
        component: () => import('../views/Auth/ForgotPassword'),
      },
      {
        path: 'reset-password',
        name: 'Reset Pasword',
        component: () => import('../views/Auth/ResetPassword'),
      },
      {
        path: 'verify-email',
        name: 'Verify Email',
        component: () => import('../views/Auth/VerifyEmail'),
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../layouts/Default'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isAdmin) next()
      else next('/profile')
    },
    children: [
      {
        path: 'users',
        component: () => import('../views/Admin/Users'),
        meta: { requiresAuth: true },
      }
    ]
  },
  {
    path: '/profile',
    component: () => import('../views/Profile'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // La ruta requiere autentificación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuth) next();
    else next({ name: 'Login' });
  } else {
    // Evitamos que un usuario logeado ingrese a alguna vista con el path auth
    if (store.getters.isAuth && to.path.includes('auth')) {
      // En caso de ser así enviamos al usuario al Home
      next({ name: 'Home' });
    }
    else next();
  }
});

export default router