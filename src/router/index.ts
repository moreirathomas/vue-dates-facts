import { createRouter, createWebHistory } from 'vue-router';
import PageSearch from '../views/PageSearch.vue';
import PageHistory from '../views/PageHistory.vue';

const routes = [
  { path: '/', component: PageSearch },
  { path: '/history', component: PageHistory },
];

const router = createRouter({ history: createWebHistory(), routes: routes });
export default router;
