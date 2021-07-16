import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import { MARK_MILESTONE_COMPLETE } from '../jobs/constants';
import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import { setLoading, setShowToast, setSkeletonLoading } from '../common/actions';
import { markMilestoneComplete } from '../jobs/actions';
import * as commonActions from '../common/actions';
import storageService from '../../utils/storageService';

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
  yield put({ type: actionTypes.SET_TRADIE_PROFILE_VIEW, payload: '' });
  setSkeletonLoading(true);
  const response: FetchResponse = yield NetworkOps.get(storageService.getItem('userType') === 1 ? Urls.tradieProfileView : Urls.builderProfileView);
  setSkeletonLoading(false);
  if (response.status_code === 200) {
    yield put({
      type: actionTypes.SET_TRADIE_PROFILE_VIEW,
      payload: response.result,
    });
  } else {
    yield put({ type: actionTypes.SET_TRADIE_PROFILE_VIEW, payload: '' });
  }
}

function* cleanTradieProfileViewData() {
  yield put({ type: actionTypes.SET_TRADIE_PROFILE_VIEW, payload: '' });
}

function* getBuilderProfileView() {
  yield put({ type: actionTypes.SET_BUILDER_PROFILE_VIEW, payload: '' });
  setSkeletonLoading(true);
  const response: FetchResponse = yield NetworkOps.get(Urls.builderProfileView);
  setSkeletonLoading(false);
  if (response.status_code === 200) {
    yield put({
      type: actionTypes.SET_BUILDER_PROFILE_VIEW,
      payload: response.result,
    });
  } else {
    yield put({ type: actionTypes.SET_BUILDER_PROFILE_VIEW, payload: '' });
  }
}

function* getTradieBasicDetails() {
  const response: FetchResponse = yield NetworkOps.get(storageService.getItem('userType') === 1 ? Urls.getTradieBasicDetails : Urls.getBuilderBasicDetails);
  if (response.status_code === 200) {
    yield put({
      type: actionTypes.SET_TRADIE_BASIC_DETAILS,
      payload: response.result,
    });
  } else {
    yield put({ type: actionTypes.SET_TRADIE_BASIC_DETAILS, payload: '' });
  }
}

function* cleanTradieBasicDetails() {
  yield put({ type: actionTypes.SET_TRADIE_BASIC_DETAILS, payload: '' });
}

function* addBankDetails({ data }: any) {
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

    return;
  }

  setShowToast(true, response.message);
  yield put({ type: actionTypes.ADD_BANK_DETAILS_END, payload: data });
}

function* updateBankDetails({ data }: any) {
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
  yield put({
    type: actionTypes.GET_BANK_DETAILS_END,
    payload: {},
  });
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

function* getProfileBuilder() {
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(Urls.builder)
  setLoading(false);
  if (response.status_code === 200) {
    yield put({ type: actionTypes.SET_PROFILE_BUILDER, payload: response.result });
  } else {
    yield put({ type: actionTypes.SET_PROFILE_BUILDER, payload: [] });
  }
}

function* getSavedJobList({ page }: any) {
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(`${Urls.tradieSavedJobs}?page=${page}`);
  setLoading(false);
  if (response.status_code === 200) {
    yield put({ type: actionTypes.SET_SAVED_JOBS, payload: response.result });
  } else {
    yield put({ type: actionTypes.SET_SAVED_JOBS, payload: [] });
  }
}

function* getSettings() {
  const userType = storageService.getItem('userType');

  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(userType === 1 ? Urls.tradieSettings : Urls.builderSettings);
  setLoading(false);
  if (response.status_code === 200) {
    yield put({ type: actionTypes.SET_SETTINGS, payload: response.result });
  } else {
    yield put({ type: actionTypes.SET_SETTINGS, payload: {} });
  }
}

function* updateSettings({ settings, newSettings }: any) {
  const userType = storageService.getItem('userType');

  setLoading(true);
  const response: FetchResponse = yield NetworkOps.putToJson(userType === 1 ? Urls.tradieUpdateSettings : Urls.builderUpdateSettings, settings);
  setLoading(false);
  if (response.status_code === 200) {
    yield put({ type: actionTypes.SET_SETTINGS, payload: newSettings });
  } else {
    yield put({ type: actionTypes.SET_SETTINGS, payload: {} });
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
  yield takeLatest(actionTypes.GET_BUILDER_PROFILE_VIEW, getBuilderProfileView);
  yield takeLatest(actionTypes.GET_TRADIE_BASIC_DETAILS, getTradieBasicDetails);
  yield takeLatest(actionTypes.CLEAN_TRADIE_BASIC_DETAILS, cleanTradieBasicDetails);
  yield takeLatest(actionTypes.CLEAN_TRADIE_PROFILE_VIEW_DATA, cleanTradieProfileViewData);
  yield takeLatest(actionTypes.GET_SAVED_JOBS, getSavedJobList);
  yield takeLatest(actionTypes.GET_SETTINGS, getSettings);
  yield takeLatest(actionTypes.UPDATE_SETTINGS, updateSettings);
}

export default authWatcher;
