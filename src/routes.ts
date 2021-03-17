import Home from './containers/home/home'
import Login from './pages/login/login'
import NotFound from './pages/notFound/notFound'
import Signup from './pages/signup/signup'
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
        exact: true,
        component: Login
    },
    {
        name: 'buildersignup',
        path: '/builder/signup/:step',
        exact: false,
        component: Signup
    },
    {
        name: 'forgetpassword',
        path: '/builder/forget-password/reset/:step',
        exact: true,
        component: ForgerPassword
    },
    {
        name: 'sendotp',
        path: '/builder/send-otp',
        exact: true,
        component: SendOtp
    },
    {
        name: 'verifyotp',
        path: '/builder/verify-otp',
        exact: true,
        component: VerifyOtp
    },

    {
        name: 'notFound',
        path: '/builder/404',
        exact: true,
        component: NotFound
    },
    {
        name: '404',
        path: '/*',
        exact: true,
        redirectTO:'/builder/404'
    }
]

export default routes
