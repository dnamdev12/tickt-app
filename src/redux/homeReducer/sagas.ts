import { call, put, takeLatest } from 'redux-saga/effects'
//import { call,put, takeLatest, all } from "typed-redux-saga";
import * as actionTypes from './constants'
import { receiveApiData } from './actions'
import { fetchData } from './api'

function* getApiData() {
   try {
      //const user = yield* call(fetchData);
      const user: ReturnType<typeof fetchData> = yield call(fetchData);
      //yield put({type: actionTypes.FIRST_API_SUCCESSED, user: user});
      yield put(receiveApiData(user));
   } catch (e) {
      yield put({type: actionTypes.FAILED_API_DATA, message: e.message});
   }
}

function* mySaga() {
  yield takeLatest(actionTypes.REQUEST_API_DATA, getApiData);
}

export default mySaga;