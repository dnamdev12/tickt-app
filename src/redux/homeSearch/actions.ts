import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import * as actionTypes from './constants';
import { setShowToast, setLoading } from '../common/actions';
import storageService from '../../utils/storageService';


export const getSearchJobList = (searchJob: string) => ({ type: actionTypes.GET_SEARCH_JOB_LIST, searchJob })
export const getJobTypeList = () => ({ type: actionTypes.GET_JOB_TYPE_LIST})
// export const getJobType = () => ({ type: actionTypes.GET_JOB_TYPE})
export const getJobWithJobTypeLatLong = (jobData: object) => ({ type: actionTypes.GET_JOB_WITH_JOB_TYPE_AND_LATLONG, jobData })