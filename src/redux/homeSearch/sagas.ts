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

function* getJobTypeList() {
    const response: FetchResponse = yield NetworkOps.get(Urls.jobTypeList)
    if (response.status_code === 200) {
        yield put({ type: actionTypes.SET_JOB_TYPE_LIST, payload: response.result.resultData });
    } else {
        yield put({ type: actionTypes.SET_JOB_TYPE_LIST, payload: [] });
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
        yield put({ type: actionTypes.GET_JOB_WITH_JOB_TYPE_AND_LATLONG, payload: {} });
    }
}

function* authWatcher() {
    yield takeLatest(actionTypes.GET_SEARCH_JOB_LIST, getSearchJobList);
    yield takeLatest(actionTypes.GET_JOB_TYPE_LIST, getJobTypeList);
    // yield takeLatest(actionTypes.GET_JOB_TYPE, getJobType);
    yield takeLatest(actionTypes.GET_JOB_WITH_JOB_TYPE_AND_LATLONG, getJobWithJobTypeLatLong);
}

export default authWatcher;