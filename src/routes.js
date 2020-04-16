import { lazy } from 'react';

export default [
  {
    path: '/',
    label: 'Home',
    exact: true,
    component: lazy(() =>
      import('./views/HomePage' /* webpackChunkName: "home" */),
    ),
    private: false,
    restricted: false,
  },
  {
    path: '/register',
    label: 'Register',
    exact: false,
    component: lazy(() =>
      import('./views/RegisterPage' /* webpackChunkName: "register-page" */),
    ),
    private: false,
    restricted: true,
  },
  {
    path: '/login',
    label: 'Login',
    exact: false,
    component: lazy(() =>
      import('./views/LoginPage' /* webpackChunkName: "login-page" */),
    ),
    private: false,
    restricted: true,
  },
  {
    path: '/profile',
    label: 'Profile',
    exact: false,
    component: lazy(() =>
      import('./views/ProfilePage' /* webpackChunkName: "profile-page" */),
    ),
    private: true,
    restricted: false,
  },
  {
    path: '/contacts',
    label: 'Contacts',
    exact: false,
    component: lazy(() =>
      import('./views/ContactsPage' /* webpackChunkName: "contacts-page" */),
    ),
    private: true,
    restricted: false,
  },
];
