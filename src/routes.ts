import Home from './containers/home/home'
import Login from './pages/login/login'
import NotFound from './pages/notFound/notFound'
import Signup from './pages/signup'
import ForgerPassword from '../src/pages/forgetPassword/forgetPassword'
import SendOtp from './common//sendOtp'
import VerifyOtp from './common/verifyOtp'

 const routes = [
    {
        name: 'home',
        path: '/builder',
        exact: true,
        component: Home
    },
    {
        name: 'login',
        path: '/builder/login',
        component: Login
    },
    {
        name: 'buildersignup',
        path: '/builder/signup',
        component: Signup
    },
    {
        name: 'forgetpassword',
        path: '/builder/forget-password/reset/:step',
        component: ForgerPassword
    },
    {
        name: 'sendotp',
        path: '/builder/send-otp',
        component: SendOtp
    },
    {
        name: 'verifyotp',
        path: '/builder/verify-otp',
        component: VerifyOtp
    },

    {
        name: 'notFound',
        path: '/builder/404',
        component: NotFound
    },
    {
        name: '404',
        path: '/*',
        redirectTO:'/builder/404'
    }
]

export default routes
