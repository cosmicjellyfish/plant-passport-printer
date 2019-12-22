import {
  DefaultPage,
} from './';

export default {
  path: '/',
  name: 'Plant passports',
  childRoutes: [
    { path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
  ],
};
