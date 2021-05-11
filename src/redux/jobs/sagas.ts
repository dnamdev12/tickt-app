import { call, put, takeLatest } from 'redux-saga/effects';
import NetworkOps, { FetchResponse } from "../../network/NetworkOps";
import Urls from "../../network/Urls";
import * as actionTypes from './constants';


function* setHomeBuilder(action: any) {
    const { data } = action;
    let url = `${Urls.home}?lat=${data.lat}&long=${data.long}`
    const response: FetchResponse = yield NetworkOps.get(url);
    console.log({ response }, '---------------!!!!!!!!')
    if (response.status_code === 200) {
        yield put({ type: actionTypes.SET_FETCH_HOME_BUILDER, payload: response.result });
    } else {
        yield put({ type: actionTypes.SET_FETCH_HOME_BUILDER, payload: null });
    }
}

function* setLocalChanges(action: any) {
    yield put({ type: actionTypes.SET_LOCAL_CHANGES, payload: action });
}

function* postJobWatcher() {
    yield takeLatest(actionTypes.FETCH_HOME_BUILDER, setHomeBuilder);
    yield takeLatest(actionTypes.GET_LOCAL_CHANGES, setLocalChanges)
}

export default postJobWatcher;