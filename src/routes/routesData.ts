import Home from '../pages/home/home';
import Login from '../pages/login/login';
import NotFound from '../pages/notFound/notFound';
import Signup from '../pages/signup';
import ForgerPassword from '../pages/forgetPassword/forgetPassword';
import PostJob from '../pages/postJob';
import TradieHome from '../pages/home/tradieHome';
import SavedJobs from '../pages/savedJobs/index';
import RecommendedJobs from '../pages/recommendedJobs/index';
import MostViewedJobs from '../pages/mostViewedJobs/index';
import TradieSearchJobResult from '../pages/tradieSearchJobResult/index';
import PopularBuilders from '../pages/popularBuilders/index';
import RenderMap from '../pages/tradieSearchJobResult/renderMap';
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
        name: 'postnewjob',
        path: '/post-new-job',
        component: PostJob,
        // authRoute: true,
    },
    // {
    //     name: 'tradiehome',
    //     path: '/tradie',
    //     component: TradieHome,
    // },
    {
        name: 'recommendedjobs',
        path: '/recommended-jobs',
        component: RecommendedJobs,
    },
    {
        name: 'savedjobs',
        path: '/saved-jobs',
        component: SavedJobs,
    },
    {
        name: 'mostviewedjobs',
        path: '/most-viewed-jobs',
        component: MostViewedJobs,
    },
    {
        name: 'popularbuilders',
        path: '/popular-builders',
        component: PopularBuilders,
    },
    {
        name: 'searchjobresults',
        path: '/search-job-results',
        component: TradieSearchJobResult,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'map',
        path: '/map',
        component: RenderMap,
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
    },
]

export default routes
