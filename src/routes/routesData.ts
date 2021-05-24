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
import JobAppliedSuccessfully from '../pages/jobDetailsPage/components/jobAppliedSuccess';
// @ts-ignore
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import JobDashboard from '../pages/jobDashboard';
import TradieListData from '../pages/shared/tradieListData';
import SearchResultTradie from '../pages/searchTradieResult/index';
// import BuilderProfile from '../pages/builderProfile/builderProfile';
import builderJobDasboard from '../pages/builderJobDasboard/index';
import TradieDetails from '../common/tradieDetails';
import BuilderInfo from '../pages/builderInfo/index';
import BuilderReviewSubmitted from '../pages/jobDashboard/components/builderReviewSubmitted';

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
        name: 'job-applied-successfully',
        path: '/job-applied-successfully',
        component: JobAppliedSuccessfully,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'builderinfo',
        path: '/builder-info',
        component: BuilderInfo,
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
            '/review-builder',
        ],
        component: JobDashboard,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'builderreviewsubmitted',
        path: '/builder-review-submitted',
        component: BuilderReviewSubmitted,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'linkedin-oauth',
        path: '/linkedin',
        component: LinkedInPopUp
    },
    {
        name: 'builder-jobs',
        path: '/jobs',
        component: builderJobDasboard
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
        name: 'tradie-details',
        path: '/tradie-details',
        component: TradieDetails
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
