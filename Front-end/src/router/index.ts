import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Principal from '../views/Principal.vue'
import Ingreso from '../views/Ingreso.vue'
import Registro from '../views/Registro.vue'
import Ver from '../views/Paginas/VerUsers.vue'
import VerAdmin from '../views/Paginas/VerAdmin.vue'
import EditUser from '../views/Paginas/EditUser.vue'
import Agregar from '../views/Paginas/Agregar.vue'
import NotFound from '../views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: Ingreso,
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/',
    name: 'Principal',
    component: Principal,
    meta: { requiresAuth: true }
  },
  {
    path: '/ver',
    name: 'Ver',
    component: Ver,
    meta: { requiresAuth: true }
  },
  {
    path: '/VerAdmin',
    name: 'VerAdmin',
    component: VerAdmin,
    meta: { requiresAuth: true }
  },
  {
    path: '/EditUser',
    name: 'EditUser',
    component: EditUser,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/agregar',
    name: 'Agregar',
    component: Agregar,
    meta: { requiresAuth: true }
  },
  //cathcall 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  // history: createWebHashHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    //need to login
    next()
  }
  else {
    next();
  }
})

export default router
