import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import SearchResults from '../components/SearchResults.vue';
import SchulfaecherPage from '../components/SchulfaecherPage.vue';
import HowItWorksPage from '../components/HowItWorksPage.vue';
import InfoPage from '../components/InfoPage.vue';
import PricingPage from '../components/PricingPage.vue';
import LoginPage from '../components/LoginPage.vue';
// import ProfileMenu from '../components/ProfileMenu.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
  },
  {
    path: '/subjects',
    name: 'Subjects',
    component: SchulfaecherPage,
  },
  {
    path: '/how-it-works',
    name: 'HowItWorks',
    component: HowItWorksPage,
  },
  {
    path: '/info',
    name: 'Info',
    component: InfoPage,
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: PricingPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  // {
  //   path: '/profilemenu',
  //   name: 'ProfileMenu',
  //   component: ProfileMenu,
  // },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
