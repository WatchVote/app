import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },
  {
    path: '/create',
    component: () => import('layouts/DialogLayout.vue'),
    children: [{ path: '', component: () => import('pages/CreateObservation/Index.vue'), meta: { title: 'Новое наблюдение' }  }],
  },
  {
    path: '/observation',
    component: () => import('src/layouts/ObservationLayout.vue'),
    children: [
      { path: '', redirect: '/observation/actions' },
      { path: 'status', component: () => import('pages/Observation/Status.vue'), meta: { title: 'Информация' } },
      { path: 'actions', component: () => import('pages/Observation/Actions.vue'), meta: { title: 'Чек-лист' } },
      { path: 'turnouts', component: () => import('pages/Observation/Turnouts.vue'), meta: { title: 'Явка' } },
      { path: 'warnings', component: () => import('src/pages/Observation/Violations.vue'), meta: { title: 'Нарушения' } },
      { path: 'results', component: () => import('pages/Observation/Results.vue'), meta: { title: 'Протокол' } }
    ]
  },
  {
    path: '/action',
    component: () => import('src/layouts/DialogLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Action/Index.vue'), meta: { title: 'Подробности' }  }
    ]
  },
  {
    path: '/violation',
    component: () => import('src/layouts/DialogLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Violation/Index.vue'), meta: { title: 'Грубые нарушения' }  }
    ]
  },
  {
    path: '/template',
    component: () => import('src/layouts/DialogLayout.vue'),
    children: [
      { path: 'general', component: () => import('src/pages/Templates/General.vue'), meta: { title: 'Общий шаблон жалобы' }  }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
