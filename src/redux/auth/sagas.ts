import { call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './constants'
import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';

function* postSignup({data}: any) {
      const response: FetchResponse = yield NetworkOps.postToJson(Urls.signup, data);
      if(response.status === 200) {
        //yield put({type: actionTypes.FIRST_API_SUCCESSED, user: user});
        return {success: true};
      }
      return {success: false};
   
}

function* authWatcher() {
  yield takeLatest(actionTypes.POST_SIGNUP_API, postSignup);
}

export default authWatcher;