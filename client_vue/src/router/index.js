import { createRouter, createWebHistory } from 'vue-router';

const HomePage = () => import('../components/HomePage.vue');
const SearchResults = () => import('../components/SearchResults.vue');
const SchulfaecherPage = () => import('../components/SchulfaecherPage.vue');
const HowItWorksPage = () => import('../components/HowItWorksPage.vue');
const PricingPage = () => import('../components/PricingPage.vue');
const Contact = () => import('../components/Contact.vue');
const LoginPage = () => import('../components/LoginPage.vue');
const Privacy = () => import('../components/Privacy.vue');
const Imprint = () => import('../components/Imprint.vue');
const AboutUs = () => import('../components/AboutUs.vue');
const HelpAndFAQ = () => import('../components/HelpAndFAQ.vue');
const Register = () => import('../components/Register.vue');
const MyProfile = () => import('../components/MyProfile.vue');
const NotFoundPage = () => import('../components/NotFoundPage.vue');

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
    path: '/pricing',
    name: 'Pricing',
    component: PricingPage,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
  },
  {
    path: '/imprint',
    name: 'Imprint',
    component: Imprint,
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: AboutUs,
  },
  {
    path: '/helpandfaq',
    name: 'HelpAndFAQ',
    component: HelpAndFAQ,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: MyProfile,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
