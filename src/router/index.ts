import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';

import TabsPage from '../views/TabsPage.vue';

const rute: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/tabs/ringkasan',
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/ringkasan',
      },
      {
        path: 'ringkasan',
        component: () => import('../views/RingkasanPage.vue'),
      },
      {
        path: 'tabel',
        component: () => import('../views/TabelPage.vue'),
      },
      {
        path: 'biodata',
        component: () => import('../views/BiodataPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: rute,
});

export default router;
