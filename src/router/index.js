import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/deviceList',
      name: 'deviceList',
      component: () => import('../views/DeviceList.vue')
    },
    {
      path: '/maintenanceplan',
      name: 'maintenanceplan',
      component: () => import('../views/MaintenanceList.vue')
    },
    {
      path: '/locationlist',
      name: 'locationlist',
      component: () => import('../views/Location.vue')
    },
    {
      path: '/equipments',
      name: 'equipments',
      component: () => import('../views/Equipments.vue')
    }
  ]
})

export default router
