import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import * as actionTypes from './constants';
import { setShowToast, setLoading } from '../common/actions';
import storageService from '../../utils/storageService';


export const getSearchJobList = (searchJob: string) => ({ type: actionTypes.GET_SEARCH_JOB_LIST, searchJob })
export const getRecentSearchList = () => ({ type: actionTypes.GET_RECENT_SEARCH_LIST })
export const getJobTypeList = () => ({ type: actionTypes.GET_JOB_TYPE_LIST })
export const getHomeJobDetails = (jobId: string) => ({ type: actionTypes.GET_HOME_JOB_DETAILS, jobId })
export const getViewNearByJob = (data: object) => ({ type: actionTypes.GET_VIEW_NEARBY_JOBS, data })
// export const getJobType = () => ({ type: actionTypes.GET_JOB_TYPE})
export const getJobWithJobTypeLatLong = (jobData: object) => ({ type: actionTypes.GET_JOB_WITH_JOB_TYPE_AND_LATLONG, jobData })
export const postHomeSearchData = (jobData: object) => ({ type: actionTypes.POST_HOME_SEARCH_DATA, jobData })
