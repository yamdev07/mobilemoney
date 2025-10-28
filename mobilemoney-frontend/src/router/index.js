import { createRouter, createWebHistory } from 'vue-router';
import Operateurs from '../views/MmOperateurs.vue';
import Utilisateurs from '../views/MmUtilisateurs.vue';
import Transactions from '../views/MmTransactions.vue';

const routes = [
  { path: '/', redirect: '/operateurs' },
  { path: '/operateurs', component: Operateurs },
  { path: '/utilisateurs', component: Utilisateurs },
  { path: '/transactions', component: Transactions },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
