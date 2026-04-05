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
      { name: 'pw-reset', path: 'pw-reset', component: () => import('pages/user/PwResetPage.vue') },
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'user-modify', path: 'modify', component: () => import('pages/user/ModifyPage.vue') },
      { name: 'user-leave', path: 'leave', component: () => import('pages/user/LeavePage.vue') },

    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { name: 'adm-dashboard', path: 'dashboard', component: () => import('pages/admin/DashboardPage.vue') },
      { name: 'adm-user', path: 'user', component: () => import('pages/admin/AdmUserPage.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
