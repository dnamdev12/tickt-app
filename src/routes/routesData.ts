import Home from '../pages/home/home';
import Login from '../pages/login/login';
import NotFound from '../pages/notFound/notFound';
import Signup from '../pages/signup';
import ForgerPassword from '../pages/forgetPassword/forgetPassword';
import PostJob from '../pages/postJob';
import SavedJobs from '../pages/savedJobs/index';
import RecommendedJobs from '../pages/recommendedJobs/index';
import MostViewedJobs from '../pages/mostViewedJobs/index';
import TradieSearchJobResult from '../pages/tradieSearchJobResult/index';
import PopularBuilders from '../pages/popularBuilders/index';
import JobDetailsPage from '../pages/jobDetailsPage/index';
// @ts-ignore
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import JobDashboard from '../pages/jobDashboard';
import TradieListData from '../pages/shared/tradieListData';
import SearchResultTradie from '../pages/searchTradieResult/index';
import BuilderProfile from '../pages/builderProfile/builderProfile';

const routes = [
    {
        name: 'main',
        path: '/',
        component: Home,
        authRoute: false,
        privateRoute: true,
        exact: true,
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
        name: 'jobdetailspage',
        path: '/job-details-page',
        component: JobDetailsPage,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'builderprofile',
        path: '/builder-profile',
        component: BuilderProfile,
    },
    {
        name: 'jobdashboard',
        path: [
          '/active-jobs',
          '/applied-jobs',
          '/past-jobs',
          '/new-jobs',
          '/approved-milestones',
          '/mark-milestone',
        ],
        component: JobDashboard,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'linkedin-oauth',
        path: '/linkedin',
        component: LinkedInPopUp
    },
    {
        name: 'recommended-trade-people',
        path: '/recommended-trade-people',
        component: TradieListData
    },
    {
        name: 'saved-trade-people',
        path: '/saved-trade-people',
        component: TradieListData
    },
    {
        name: 'search-builder-result',
        path: '/search-builder-result',
        component: TradieListData
    },
    {
        name: 'search-tradie-results',
        path: '/search-tradie-results',
        component: SearchResultTradie,
        authRoute: false,
        privateRoute: true,
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
