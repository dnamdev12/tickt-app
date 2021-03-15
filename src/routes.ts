import Home from './containers/home/home'
import Login from './pages/login/login'
import NotFound from './pages/notFound/notFound'
import Signup from './pages/signup/signup'

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
        exact: true,
        component: Login
    },
    {
        name: 'signup',
        path: '/signup',
        exact: true,
        component: Signup
    },
    {
        name: 'notFound',
        path: '/404',
        exact: true,
        component: NotFound
    },
    {
        name: '404',
        path: '/*',
        exact: true,
        redirectTO:'/404'
    }
]

export default routes
