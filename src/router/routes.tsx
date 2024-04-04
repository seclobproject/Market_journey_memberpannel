import { lazy } from 'react';
const DematAccount = lazy(() => import('../pages/DematAccount'));
const Awards = lazy(() => import('../pages/Awards'));
const Subscriptions = lazy(() => import('../pages/Subscriptions'));
const News = lazy(() => import('../pages/News'));
const Member = lazy(() => import('../pages/Member'));
const Notifications = lazy(() => import('../pages/Notifications'));
const Package = lazy(() => import('../pages/package'));
const Report = lazy(() => import('../pages/Report'));
const Withdrawal = lazy(() => import('../pages/Withdrawal'));
const Index = lazy(() => import('../pages/Index'));
const Profile = lazy(() => import('../pages/Users/Profile'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const UnlockBoxed = lazy(() => import('../pages/Authentication/UnlockBox'));
const RecoverIdBoxed = lazy(() => import('../pages/Authentication/RecoverIdBox'));
const Error = lazy(() => import('../components/Error'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
    },

    // Users page
    {
        path: '/users/profile',
        element: <Profile />,
    },

    // pages

    {
        path: '/pages/member',
        element: <Member />,
    },
    {
        path: '/pages/report',
        element: <Report />,
    },
    {
        path: '/pages/package',
        element: <Package />,
    },

    {
        path: '/pages/withdrawal',
        element: <Withdrawal />,
    },

    {
        path: '/pages/notifications',
        element: <Notifications />,
    },
    {
        path: '/pages/awards',
        element: <Awards />,
    },
    {
        path: '/pages/news',
        element: <News />,
    },
    {
        path: '/pages/subscription',
        element: <Subscriptions />,
    },
    {
        path: '/pages/demataccount',
        element: <DematAccount />,
    },

    {
        path: '*',
        element: <ERROR404 />,
        layout: 'blank',
    },
    {
        path: '/pages/error500',
        element: <ERROR500 />,
        layout: 'blank',
    },

    //Authentication
    {
        path: '/auth/boxed-signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-signup/:id',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-lockscreen',
        element: <UnlockBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-password-reset',
        element: <RecoverIdBoxed />,
        layout: 'blank',
    },

    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
