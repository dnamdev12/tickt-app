import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import * as commonActions from '../common/actions';


function* getSearchJobList(action: any) {
    // commonActions.setLoading(true);
    const response: FetchResponse = yield NetworkOps.get(Urls.getSearchData + `?search_text=${action.searchJob}`);
    // commonActions.setLoading(false);
    console.log(response)
    if (response.status_code === 200) {
        yield put({ type: actionTypes.SET_SEARCH_JOB_LIST, payload: response.result });
    } else {
        yield put({ type: actionTypes.SET_SEARCH_JOB_LIST, payload: [] });
    }
}

function* authWatcher() {
    yield takeLatest(actionTypes.GET_SEARCH_JOB_LIST, getSearchJobList);
}

export default authWatcher;