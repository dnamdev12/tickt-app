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
