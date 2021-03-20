import Home from '../pages/home'
import Login from '../pages/login/login'
import NotFound from '../pages/notFound/notFound'
import Signup from '../pages/signup'
import ForgerPassword from '../pages/forgetPassword/forgetPassword'

 const routes = [
    {
        name: 'home',
        path: '/',
        exact: true,
        component: Home
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        privateRoute: true,
    },
    {
        name: 'signup',
        path: '/signup',
        component: Signup
    },
    {
        name: 'forgetpassword',
        path: '/forget-password/reset',
        component: ForgerPassword
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
