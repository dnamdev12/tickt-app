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
import builderJobDasboard from '../pages/builderJobDasboard/index';
import TradieDetails from '../common/tradieDetails';
import BuilderInfo from '../pages/builderInfo/index';
import BuilderReviewSubmitted from '../pages/jobDashboard/components/reviewBuilder/builderReviewSubmitted';
import TradieInfo from '../pages/tradieInfo';
import BuilderPostedJobs from '../pages/builderInfo/builderPostedJobs';
import JobDetailsPageBuilder from '../pages/jobDetailsPageBuilder/index';
import TradieEditProfile from '../pages/tradieEditProfile';
import EmailUpdatedSuccess from '../pages/tradieEditProfile/components/personalInformation/changeEmailModal/components/successPage';
import RateSuccessTradie from '../pages/builderJobDasboard/components/rateSuccess';
import TradieVouchers from '../pages/tradieInfo/vouchers';

import LodgeSuccess from '../pages/builderJobDasboard/components/lodgeDispute/success';
import CancelJobSuccess from '../pages/builderJobDasboard/components/cancelJobs/success';

import ChooseTheJob from '../pages/chooseTheJob/index';
import ChooseJobToStartChat from '../pages/chooseJobToStartChat/chooseJobToStartChat';
import ChooseJobSuccess from '../pages/chooseTheJob/success';

import MilestoneRequestSentSuccess from '../pages/builderJobDasboard/components/editMilestones/sucess'
import RequestMonitored from '../pages/jobDetailsPage/components/requestMonitored';
import ChangePasswordSuccess from '../pages/tradieEditProfile/components/personalInformation/changePasswordSuccess';
import NeedApprovalSuccess from '../pages/builderJobDasboard/components/confirmAndPay/suceess';
import declineMilestoneSuccess from '../pages/builderJobDasboard/components/declineMilestoneSuccess'

import PostJobSuccess from '../pages/postJob/sucess';
import CommonViewAll from '../pages/home/builderHome/components/commonViewAll';

import ChatComponent from '../pages/chat';
import SupportChat from '../pages/tradieEditProfile/components/supportChat'
import PaymentHistory from '../pages/paymentHistory';

import TemplateSavedSuccess from '../pages/postJob/components/templateSavedSucess';
import GuestPage from '../pages/home/guestHome';
import AdminAnnouncementPage from '../pages/adminAnnouncementPage/adminAnnouncementPage';

const routes = [
    {
        name: 'main',
        path: ['/', '/home'],
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
        name: 'guest-user',
        path: '/guest-user',
        component: GuestPage,
    },
    {
        name: 'postnewjob',
        path: '/post-new-job',
        component: PostJob,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'recommendedjobs',
        path: '/recommended-jobs',
        component: RecommendedJobs,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'savedjobs',
        path: '/saved-jobs',
        component: SavedJobs,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'template-suceess',
        path: '/template-sucess',
        component: TemplateSavedSuccess,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'view-all',
        path: [
            '/saved-tradespeople',
            '/popular-tradespeople',
            '/recommended-tradespeople',
            '/most-viewed-tradespeople'
        ],
        component: CommonViewAll,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'mostviewedjobs',
        path: '/most-viewed-jobs',
        component: MostViewedJobs,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'milestoneRequestSent',
        path: '/milestone-request-sent-success',
        component: MilestoneRequestSentSuccess,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'decline-milestone-success',
        path: '/decline-milestone-success',
        component: declineMilestoneSuccess,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'requestMonitered',
        path: '/request-monitored/:id',
        component: RequestMonitored,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'changePasswordSuccess',
        path: '/change-password-success',
        component: ChangePasswordSuccess,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'popularbuilders',
        path: '/popular-builders',
        component: PopularBuilders,
        authRoute: false,
        privateRoute: true
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
        name: 'jobdetail',
        path: '/job-detail',
        component: JobDetailsPageBuilder,
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
        name: 'ratesuccess',
        path: '/rate-success',
        component: RateSuccessTradie,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'lodgesuccess',
        path: '/lodge-success',
        component: LodgeSuccess,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'cancelsuccess',
        path: '/cancel-job-success',
        component: CancelJobSuccess,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'postJobSuccess',
        path: '/post-job-success',
        component: PostJobSuccess,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'builderinfo',
        path: '/builder-info',
        component: BuilderInfo,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'tradieinfo',
        path: '/tradie-info',
        component: TradieInfo,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'tradievouchers',
        path: '/tradie-vouchers',
        component: TradieVouchers,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'chooseTheJob',
        path: ['/choose-the-job', '/cancel-the-job'],
        component: ChooseTheJob,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'chooseJobToStartChat',
        path: '/choose-job-to-start-chat',
        component: ChooseJobToStartChat,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'needApprovalSuccess',
        path: '/need-approval-success',
        component: NeedApprovalSuccess,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'chooseTheJob',
        path: '/choose-the-job-success',
        component: ChooseJobSuccess,
        authRoute: false,
        privateRoute: true
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
        name: 'builderpostedjobs',
        path: '/builder-posted-jobs',
        component: BuilderPostedJobs,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'update-user-info',
        path: '/update-user-info',
        component: TradieEditProfile,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'email-updated-successfully',
        path: '/email-updated-successfully',
        component: EmailUpdatedSuccess,
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
        component: builderJobDasboard,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'recommended-trade-people',
        path: '/recommended-trade-people',
        component: TradieListData,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'saved-trade-people',
        path: '/saved-trade-people',
        component: TradieListData,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'tradie-details',
        path: '/tradie-details',
        component: TradieDetails,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'chat',
        path: '/chat',
        component: ChatComponent,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'support-chat',
        path: '/support-chat',
        component: SupportChat,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'search-builder-result',
        path: '/search-builder-result',
        component: TradieListData,
        authRoute: false,
        privateRoute: true
    },
    {
        name: 'search-tradie-results',
        path: '/search-tradie-results',
        component: SearchResultTradie,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'payment-history',
        path: '/payment-history',
        component: PaymentHistory,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'admin-announcement-page',
        path: '/admin-announcement-page',
        component: AdminAnnouncementPage,
        authRoute: false,
        privateRoute: true,
    },
    {
        name: 'notFound',
        path: '/404',
        component: NotFound,
        authRoute: false,
        privateRoute: true
    },
    {
        name: '404',
        path: '/*',
        redirectTO: '/404'
    },
]

export default routes;
