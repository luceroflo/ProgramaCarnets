import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Principal from '../views/Principal.vue'
import Ingreso from '../views/Ingreso.vue'
import Registro from '../views/Registro.vue'
import Ver from '../views/Paginas/Ver.vue'
import Agregar from '../views/Paginas/Agregar.vue'
import NotFound from '../views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: Ingreso
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/ver',
    name: 'Ver',
    component: Ver
  },
  {
    path: '/agregar',
    name: 'Agregar',
    component: Agregar
  },
  //cathcall 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
