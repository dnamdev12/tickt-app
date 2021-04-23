import Home from '../pages/home/home';
import Login from '../pages/login/login';
import NotFound from '../pages/notFound/notFound';
import Signup from '../pages/signup';
import ForgerPassword from '../pages/forgetPassword/forgetPassword';
import Guest from '../pages/home/guestLogin';
// @ts-ignore
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

const routes = [
    {
        name: 'main',
        path: '/',
        exact: true,
        component: Home,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        authRoute: true,
        privateRoute: false,
    },
    {
        name: 'signup',
        path: '/signup',
        component: Signup,
        authRoute: true,
        privateRoute: false,
    },
    {
        name: 'forgetpassword',
        path: '/reset-password',
        component: ForgerPassword,
        authRoute: true,
    },
    {
        name: 'guest',
        path: '/guest-guest',
        component: Guest,
    },
    {
        name: 'linkedin-oauth',
        path: '/linkedin',
        component: LinkedInPopUp
    },
    {
        name: 'notFound',
        path: '/404',
        component: NotFound
    },
    {
        name: '404',
        path: '/*',
        redirectTO: '/404'
    }
]

export default routes
