import Home from '../pages/home';
import Login from '../pages/login/login';
import NotFound from '../pages/notFound/notFound';
import Signup from '../pages/signup';
import ForgerPassword from '../pages/forgetPassword/forgetPassword';
import GoogleAuth from '../common/auth/socialAuth';
// @ts-ignore
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

 const routes = [
    {
        name: 'home',
        path: '/',
        exact: true,
        component: Home,
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        authRoute: true,
    },
    {
        name: 'signup',
        path: '/signup',
        component: Signup,
        authRoute: true,
        // privateRoute: true
    },
    {
        name: 'forgetpassword',
        path: '/reset-password',
        component: ForgerPassword,
        authRoute: true,
    },
    {
        name: 'google-oauth',
        path: '/google-oauth',
        component: GoogleAuth
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
        redirectTO:'/404'
    }
]

export default routes
