import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import * as commonActions from '../common/actions';
import storageService from '../../utils/storageService';


function* callTradieProfileData() {
    const response: FetchResponse = yield NetworkOps.get(Urls.profileTradie);
    if (response.status_code === 200) {
        yield put({ type: actionTypes.SET_TRADIE_PROFILE_DATA, payload: response.result });
    } else {
        yield put({ type: actionTypes.SET_TRADIE_PROFILE_DATA, payload: '' });
    }
}

function* authWatcher() {
    yield takeLatest(actionTypes.GET_TRADIE_PROFILE_DATA, callTradieProfileData);
}

export default authWatcher;