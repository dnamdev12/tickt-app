import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import * as commonActions from '../common/actions';
import storageService from '../../utils/storageService';


function* getSearchJobList(action: any) {
    // commonActions.setLoading(true);
    const response: FetchResponse = yield NetworkOps.get(Urls.getSearchData + `?search_text=${action.searchJob}`);
    // commonActions.setLoading(false);
    if (response.status_code === 200) {
        yield put({ type: actionTypes.SET_SEARCH_JOB_LIST, payload: response.result });
    } else {
        yield put({ type: actionTypes.SET_SEARCH_JOB_LIST, payload: [] });
    }
}

function* getRecentSearchList() {
    const response: FetchResponse = yield NetworkOps.get(Urls.getRecentSearch);
    if (response.status_code === 200) {
        yield put({ type: actionTypes.SET_RECENT_SEARCH_LIST, payload: response.result.resultData });
    } else {
        yield put({ type: actionTypes.SET_RECENT_SEARCH_LIST, payload: [] });
    }
}

function* getJobTypeList() {
    // commonActions.setLoading(true);
    const response: FetchResponse = yield NetworkOps.get(Urls.jobTypeList);
    // commonActions.setLoading(false);
    if (response.status_code === 200) {
        yield put({ type: actionTypes.SET_JOB_TYPE_LIST, payload: response.result.resultData });
    } else {
        yield put({ type: actionTypes.SET_JOB_TYPE_LIST, payload: [] });
    }
}

function* getViewNearByJob(action: any) {
    const { data } = action; 
    commonActions.setLoading(true);
    const response: FetchResponse = yield NetworkOps.get(Urls.viewNearByJob + `?lat=${data.lat}&long=${data.long}&page=${1}`)
    commonActions.setLoading(false);
    if (response.status_code === 200) {
        yield put({ type: actionTypes.SET_VIEW_NEARBY_JOBS, payload: response.result });
    } else {
        yield put({ type: actionTypes.SET_VIEW_NEARBY_JOBS, payload: [] });
    }
}

// function* getJobType() {
//     const response: FetchResponse = yield NetworkOps.get(Urls.jobType)
//     if (response.status_code === 200) {
//         yield put({ type: actionTypes.SET_JOB_TYPE, payload: response.result.resultData });
//     } else {
//         yield put({ type: actionTypes.SET_JOB_TYPE, payload: [] });
//     }
// }

function* getJobWithJobTypeLatLong(action: any) {
    var url = '';
    const { jobData } = action;
    if (jobData.jobType) {
        url = Urls.home + `?jobType=${jobData.jobType}` + `&lat=${jobData.lat}` + `&long=${jobData.long}`
    } else {
        url = Urls.home + `?lat=${jobData.lat}` + `&long=${jobData.long}`
    }
    console.log(jobData, url, "okk")
    const response: FetchResponse = yield NetworkOps.get(url)
    if (response.status_code === 200) {
        yield put({ type: actionTypes.SET_JOB_WITH_JOB_TYPE_AND_LATLONG, payload: response.result });
    } else {
        yield put({ type: actionTypes.SET_JOB_WITH_JOB_TYPE_AND_LATLONG, payload: {} });
    }
}

function* postHomeSearchData(action: any) {
    commonActions.setLoading(true);
    const response: FetchResponse = yield NetworkOps.postToJson(Urls.homeSearch, action.jobData)
    commonActions.setLoading(false);
    if (response.status_code === 200) {
        yield put({ type: actionTypes.SET_HOME_SEARCH_DATA, payload: response.result });
    } else {
        yield put({ type: actionTypes.SET_HOME_SEARCH_DATA, payload: [] });
    }
}

function* getHomeJobDetails(action: any) {
    const response: FetchResponse = yield NetworkOps.get(Urls.homeJobDetails + `?jobId=${action.jobId}`);
    if (response.status_code === 200) {
        yield put({ type: actionTypes.SET_HOME_JOB_DETAILS, payload: response.result });
    } else {
        yield put({ type: actionTypes.SET_HOME_JOB_DETAILS, payload: '' });
    }
}

function* authWatcher() {
    yield takeLatest(actionTypes.GET_SEARCH_JOB_LIST, getSearchJobList);
    yield takeLatest(actionTypes.GET_RECENT_SEARCH_LIST, getRecentSearchList);
    yield takeLatest(actionTypes.GET_JOB_TYPE_LIST, getJobTypeList);
    yield takeLatest(actionTypes.GET_VIEW_NEARBY_JOBS, getViewNearByJob);
    // yield takeLatest(actionTypes.GET_JOB_TYPE, getJobType);
    yield takeLatest(actionTypes.GET_JOB_WITH_JOB_TYPE_AND_LATLONG, getJobWithJobTypeLatLong);
    yield takeLatest(actionTypes.POST_HOME_SEARCH_DATA, postHomeSearchData);
    yield takeLatest(actionTypes.GET_HOME_JOB_DETAILS, getHomeJobDetails);
}

export default authWatcher;