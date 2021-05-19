import { put, takeLatest } from 'redux-saga/effects';
import NetworkOps, { FetchResponse } from "../../network/NetworkOps";
import Urls from "../../network/Urls";
import * as actionTypes from './constants';
import { setShowToast, setLoading } from '../common/actions';

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

// activeJobList
function* getActiveJobList({ page }: any) {
  yield put({ type: actionTypes.GET_ACTIVE_JOBS_END, payload: { active: [] } });
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(
    `${Urls.activeJobList}?page=${page}`
  );
  setLoading(false);

  if (response.status_code === 200) {
    yield put({
      type: actionTypes.GET_ACTIVE_JOBS_END,
      payload: response.result,
    });

    return;
  }

  setShowToast(true, response.message);
  yield put({ type: actionTypes.GET_ACTIVE_JOBS_END });
}

// appliedJobList
function* getAppliedJobList({ page }: any) {
  yield put({ type: actionTypes.GET_APPLIED_JOBS_END, payload: { applied: [] } });
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(
    `${Urls.appliedJobList}?page=${page}`
  );
  setLoading(false);

  if (response.status_code === 200) {
    yield put({
      type: actionTypes.GET_APPLIED_JOBS_END,
      payload: response.result,
    });

    return;
  }

  setShowToast(true, response.message);
  yield put({ type: actionTypes.GET_APPLIED_JOBS_END });
}

// pastJobList
function* getPastJobList({ page }: any) {
  yield put({ type: actionTypes.GET_PAST_JOBS_END, payload: { completed: [] } });
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(
    `${Urls.pastJobList}?page=${page}`
  );
  setLoading(false);

  if (response.status_code === 200) {
    yield put({
      type: actionTypes.GET_PAST_JOBS_END,
      payload: response.result,
    });

    return;
  }

  setShowToast(true, response.message);
  yield put({ type: actionTypes.GET_PAST_JOBS_END });
}

// newJobList
function* getNewJobList({ page }: any) {
  yield put({ type: actionTypes.GET_NEW_JOBS_END, payload: [] });
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(
    `${Urls.newJobList}?page=${page}`
  );
  setLoading(false);

  if (response.status_code === 200) {
    yield put({
      type: actionTypes.GET_NEW_JOBS_END,
      payload: response.result,
    });

    return;
  }

  setShowToast(true, response.message);
  yield put({ type: actionTypes.GET_NEW_JOBS_END });
}

// approvedMilestoneList
function* getApprovedMilestoneList({ page }: any) {
  yield put({ type: actionTypes.GET_APPROVED_MILESTONE_END, payload: [] });
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(
    `${Urls.approvedMilestoneList}?page=${page}`
  );
  setLoading(false);

  if (response.status_code === 200) {
    yield put({
      type: actionTypes.GET_APPROVED_MILESTONE_END,
      payload: response.result,
    });

    return;
  }

  setShowToast(true, response.message);
  yield put({ type: actionTypes.GET_APPROVED_MILESTONE_END });
}

// milestoneList
function* getMilestoneList({ jobId }: any) {
  yield put({ type: actionTypes.GET_MILESTONES_END, payload: {} });
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(`${Urls.milestoneList}?jobId=${jobId}`);
  setLoading(false);

  if (response.status_code === 200) {
    yield put({
      type: actionTypes.GET_MILESTONES_END,
      payload: response.result,
    });

    return;
  }

  setShowToast(true, response.message);
  yield put({ type: actionTypes.GET_MILESTONES_END });
}


function* getActiveJobsBuilder({ page }: any) {
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(`${Urls.activeJobListBuilder}?page=${page}`);
  setLoading(false);
  if (response.status_code === 200) {
    yield put({
      type: actionTypes.SET_BUILDER_ACTIVE_JOBS,
      payload: response.result,
    });

    return;
  }
}

function* getPastJobsBuilder({ page }: any) {
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(`${Urls.pastJobListBuilder}?page=${page}`);
  setLoading(false);
  if (response.status_code === 200) {
    yield put({
      type: actionTypes.SET_BUILDER_PAST_JOBS,
      payload: response.result,
    });

    return;
  }
}

function* getOpenJobsBuilder({ page }: any) {
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(`${Urls.OpenJobLisBuilder}?page=${page}`);
  setLoading(false);
  if (response.status_code === 200) {
    yield put({
      type: actionTypes.SET_BUILDER_OPEN_JOBS,
      payload: response.result,
    });

    return;
  }
}

function* getBuilderNewApplicants({ page }: any) {
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(`${Urls.newApplicantsBuilder}?page=${page}`);
  setLoading(false);
  if (response.status_code === 200) {
    yield put({
      type: actionTypes.SET_BUILDER_NEW_APPLICANTS,
      payload: response.result,
    });

    return;
  }
}

function* getnewJobApplicationListBuilder({ page, jobId }: any) {
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.get(`${Urls.newJobApplicationListBuilder}?page=${page}`);
  setLoading(false);
  if (response.status_code === 200) {
    yield put({
      type: actionTypes.SET_BUILDER_NEW_APPLICANTS_LIST,
      payload: response.result,
    });

    return;
  }
}

function* postJobWatcher() {
  try {
    yield takeLatest(actionTypes.FETCH_HOME_BUILDER, setHomeBuilder);
    yield takeLatest(actionTypes.GET_LOCAL_CHANGES, setLocalChanges);
    yield takeLatest(actionTypes.GET_ACTIVE_JOBS_START, getActiveJobList);
    yield takeLatest(actionTypes.GET_APPLIED_JOBS_START, getAppliedJobList);
    yield takeLatest(actionTypes.GET_PAST_JOBS_START, getPastJobList);
    yield takeLatest(actionTypes.GET_NEW_JOBS_START, getNewJobList);
    yield takeLatest(actionTypes.GET_APPROVED_MILESTONE_START, getApprovedMilestoneList);
    yield takeLatest(actionTypes.GET_MILESTONES_START, getMilestoneList);

    yield takeLatest(actionTypes.GET_BUILDER_ACTIVE_JOBS, getActiveJobsBuilder);
    yield takeLatest(actionTypes.GET_BUILDER_PAST_JOBS, getPastJobsBuilder);
    yield takeLatest(actionTypes.GET_BUILDER_OPEN_JOBS, getOpenJobsBuilder);
    yield takeLatest(actionTypes.GET_BUILDER_NEW_APPLICANTS, getBuilderNewApplicants);
    yield takeLatest(actionTypes.GET_BUILDER_NEW_APPLICANTS_LIST, getnewJobApplicationListBuilder);

  } catch (e) {
    console.log(e);
  }
}

export default postJobWatcher;