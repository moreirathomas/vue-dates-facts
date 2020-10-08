import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import History from '../views/History.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/history', component: History },
];

const router = createRouter({ history: createWebHistory(), routes: routes });
export default router;
