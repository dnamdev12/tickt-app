import Home from './containers/home/home'
import Login from './pages/login/login'
import NotFound from './pages/notFound/notFound'
import Signup from './pages/signup/signup'
import ForgerPassword from './common/forgetPassword'
import ResetPassword from './common/resetPassword'
import SendOtp from './common/sendOtp'
import VerifyOtp from './common/verifyOtp'

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
        name: 'forgetpassword',
        path: '/forgetpassword',
        exact: true,
        component: ForgerPassword
    },
    {
        name: 'resetpassword',
        path: '/resetpassword',
        exact: true,
        component: ResetPassword
    },
    {
        name: 'sendotp',
        path: '/sendotp',
        exact: true,
        component: SendOtp
    },
    {
        name: 'verifyotp',
        path: '/verifyotp',
        exact: true,
        component: VerifyOtp
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
