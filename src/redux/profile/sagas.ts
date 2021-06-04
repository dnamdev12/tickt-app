import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import { MARK_MILESTONE_COMPLETE } from '../jobs/constants';
import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import { setLoading, setShowToast } from '../common/actions';
import { markMilestoneComplete } from '../jobs/actions';
import * as commonActions from '../common/actions';

function* callTradieProfileData() {
  const response: FetchResponse = yield NetworkOps.get(Urls.profileTradie);
  if (response.status_code === 200) {
    yield put({
      type: actionTypes.SET_TRADIE_PROFILE_DATA,
      payload: response.result,
    });
  } else {
    yield put({ type: actionTypes.SET_TRADIE_PROFILE_DATA, payload: '' });
  }
}

function* getTradieProfileView() {
  const response: FetchResponse = yield NetworkOps.get(Urls.tradieProfileView);
  if (response.status_code === 200) {
    yield put({
      type: actionTypes.SET_TRADIE_PROFILE_VIEW,
      payload: response.result,
    });
  } else {
    yield put({ type: actionTypes.SET_TRADIE_PROFILE_VIEW, payload: '' });
  }
}

function* getTradieBasicDetails() {
  const response: FetchResponse = yield NetworkOps.get(Urls.getTradieBasicDetails);
  if (response.status_code === 200) {
    yield put({
      type: actionTypes.SET_TRADIE_BASIC_DETAILS,
      payload: response.result,
    });
  } else {
    yield put({ type: actionTypes.SET_TRADIE_BASIC_DETAILS, payload: '' });
  }
}

function* addBankDetails({ data, milestoneData, callback }: any) {
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.postToJson(
    Urls.addBankDetails,
    data
  );
  setLoading(false);

  if (response.status_code === 200) {
    yield put({
      type: actionTypes.ADD_BANK_DETAILS_END,
      payload: response.result
    });

    yield put({ type: MARK_MILESTONE_COMPLETE, data: milestoneData, callback });

    return;
  }

  setShowToast(true, response.message);
  yield put({ type: actionTypes.ADD_BANK_DETAILS_END, payload: data });
}

function* updateBankDetails({ data, milestoneData, callback }: any) {
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.putToJson(
    Urls.updateBankDetails,
    data
  );
  setLoading(false);

  if (response.status_code === 200) {
    yield put({
      type: actionTypes.UPDATE_BANK_DETAILS_END,
      payload: response.result
    });

    yield put({ type: MARK_MILESTONE_COMPLETE, data: milestoneData, callback });

    return;
  }

  setShowToast(true, response.message);
  yield put({ type: actionTypes.UPDATE_BANK_DETAILS_END, payload: data });
}

function* removeBankDetails() {
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.delete(
    Urls.removeBankDetails,
  );
  setLoading(false);

  if (response.status_code === 200) {
    yield put({
      type: actionTypes.REMOVE_BANK_DETAILS_END,
      payload: { success: true }
    });

    return;
  }

  setShowToast(true, response.message);
  yield put({ type: actionTypes.REMOVE_BANK_DETAILS_END, payload: { success: false } });
}

function* getBankDetails() {
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(Urls.getBankDetails);
  setLoading(false);

  if (response.status_code === 200) {
    yield put({
      type: actionTypes.GET_BANK_DETAILS_END,
      payload: response.result
    });

    return;
  }

  setShowToast(true, response.message);
  yield put({ type: actionTypes.UPDATE_BANK_DETAILS_END, payload: {} });
}

function* getTradieProfile({ data }: any) {
  const response: FetchResponse = yield NetworkOps.get(Urls.tradieProfile + `?tradieId=${data.tradieId}&jobId=${data.jobId}`);

  if (response.status_code === 200) {
    yield put({ type: actionTypes.SET_TRADIE_PROFILE, payload: response.result });
  } else {
    yield put({ type: actionTypes.SET_TRADIE_PROFILE, payload: [] });
  }
}

function* getProfileBuilder(){
  commonActions.setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(Urls.builder)
  commonActions.setLoading(false);
  if (response.status_code === 200) {
      yield put({ type: actionTypes.SET_PROFILE_BUILDER, payload: response.result });
  } else {
      yield put({ type: actionTypes.SET_PROFILE_BUILDER, payload: [] });
  }
}

function* authWatcher() {
  yield takeLatest(actionTypes.GET_TRADIE_PROFILE_DATA, callTradieProfileData);
  yield takeLatest(actionTypes.ADD_BANK_DETAILS_START, addBankDetails);
  yield takeLatest(actionTypes.UPDATE_BANK_DETAILS_START, updateBankDetails);
  yield takeLatest(actionTypes.REMOVE_BANK_DETAILS_START, removeBankDetails);
  yield takeLatest(actionTypes.GET_BANK_DETAILS_START, getBankDetails);
  yield takeLatest(actionTypes.GET_TRADIE_PROFILE, getTradieProfile);
  yield takeLatest(actionTypes.GET_PROFILE_BUILDER, getProfileBuilder);
  yield takeLatest(actionTypes.GET_TRADIE_PROFILE_VIEW, getTradieProfileView);
  yield takeLatest(actionTypes.GET_TRADIE_PROFILE_VIEW, getTradieBasicDetails);
}

export default authWatcher;
