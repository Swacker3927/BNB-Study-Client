const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/IndexPage.vue') },
      { name: 'join', path: 'join', component: () => import('pages/user/JoinPage.vue') },
      { name: 'login', path: 'login', component: () => import('pages/user/LoginPage.vue') },
      { name: 'find-email', path: 'find-email', component: () => import('pages/user/FindEmailPage.vue') },
      { name: 'find-pw', path: 'find-pw', component: () => import('pages/user/FindPwPage.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
