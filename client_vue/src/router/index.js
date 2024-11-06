import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import SearchResults from '../components/SearchResults.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/search', name: 'SearchResults', component: SearchResults },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
