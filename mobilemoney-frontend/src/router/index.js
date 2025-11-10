import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Operateurs from '@/views/Operateurs.vue';
import Transactions from '@/views/Transactions.vue';
import Utilisateurs from '@/views/Utilisateurs.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/operateurs', name: 'Operateurs', component: Operateurs },
  { path: '/transactions', name: 'Transactions', component: Transactions },
  { path: '/utilisateurs', name: 'Utilisateurs', component: Utilisateurs },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
