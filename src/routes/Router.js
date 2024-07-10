import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Enrollment = Loadable(lazy(() => import('../views/dashboard/components/Enrollment')));
const Genealogy = Loadable(lazy(() => import('../views/dashboard/components/Genealogy')));
const Profile = Loadable(lazy(() => import('../views/dashboard/components/Profile')));
const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth/login" /> },
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/pages',
    element: <FullLayout />,
    children: [
      { path: '/pages', element: <Navigate to="/pages/dashboard" /> },
      { path: '/pages/enrollment', exact: true, element: <Enrollment /> },
      { path: '/pages/genealogy', exact: true, element: <Genealogy /> },
      { path: '/pages/profile', exact: true, element: <Profile /> },
      { path: '/pages/dashboard', exact: true, element: <Dashboard /> },
      { path: '/pages/sample-page', exact: true, element: <SamplePage /> },
      { path: '/pages/icons', exact: true, element: <Icons /> },
      { path: '/pages/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/pages/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
