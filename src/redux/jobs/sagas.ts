import { call, put, takeLatest } from 'redux-saga/effects';
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
  yield put({ type: actionTypes.GET_ACTIVE_JOBS_END, payload: { active: [] } });
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
  yield put({ type: actionTypes.GET_ACTIVE_JOBS_END, payload: { active: [] } });
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
  yield put({ type: actionTypes.GET_PAST_JOBS_END, payload: { completed: [] } });
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
  yield put({ type: actionTypes.GET_NEW_JOBS_END, payload: [] });
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
  yield put({ type: actionTypes.GET_APPROVED_MILESTONE_END, payload: [] });
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
  yield put({ type: actionTypes.GET_MILESTONES_END, payload: {} });
}

// milestoneList
function* markMilestoneComplete({ data, callback }: any) {
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.postToJson(Urls.markComplete, data);
  setLoading(false);

  if (response.status_code === 200) {
    if (callback) {
      yield call(callback);
      yield call(callback, response.result?.jobCompletedCount);
    }

    return;
  }

  setShowToast(true, response.message);
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

function* getnewJobApplicationListBuilder({ item }: any) {
  console.log({ item }, '--------------->')
  setLoading(true);
  const response: FetchResponse = yield NetworkOps.postToJson(Urls.newJobApplicationListBuilder, item);
  // const response: FetchResponse = yield NetworkOps.get(`${Urls.newJobApplicationListBuilder}?page=${page}`);
  setLoading(false);
  if (response.status_code === 200) {
    yield put({
      type: actionTypes.SET_BUILDER_NEW_APPLICANTS_LIST,
      payload: response.result,
    });

    return;
  }
}

// function* getTradieReviewList({ data }: any) {
//   const response: FetchResponse = yield NetworkOps.get(Urls.tradieReviewList + `?builderId=${data.builderId}&page=${data.page}`);
//   console.log(response.result, "response.result")
//   if (response.status_code === 200) {
//     yield put({ type: actionTypes.SET_TRADIE_REVIEW_LIST, payload: response.result });
//   } else {
//     yield put({ type: actionTypes.SET_TRADIE_REVIEW_LIST, payload: [] });
//   }
// }



function* getTradieReviewListOnBuilder({ data }: any) {
  const response: FetchResponse = yield NetworkOps.get(Urls.reviewList + `?tradieId=${data.tradieId}&page=${data.page}`);
  if (response.status_code === 200) {
    yield put({ type: actionTypes.SET_TRADIE_REVIEWS_LIST_ON_BUILDER, payload: response.result });
  } else {
    yield put({ type: actionTypes.SET_TRADIE_REVIEWS_LIST_ON_BUILDER, payload: [] });
  }
}

function* getAcceptDeclineTradie({ data }: any) {
  const response: FetchResponse = yield NetworkOps.putToJson(Urls.acceptDeclineRequest, data);
  setShowToast(true, response.message);
  if (response.status_code === 200) {
    yield put({ type: actionTypes.SET_ACCEPT_DECLINE_TRADIE_REQUEST, payload: true });
  } else {
    yield put({ type: actionTypes.SET_ACCEPT_DECLINE_TRADIE_REQUEST, payload: false });
  }
}

function* getNewApprovalList({ page }: any) {
  console.log({page},'--->?')
  const response: FetchResponse = yield NetworkOps.get(`${Urls.needApproval}?page=${page}`);
  if (response.status_code === 200) {
    yield put({ type: actionTypes.SET_BUILDER_NEW_APPROVAL_LIST, payload: response.result });
  } else {
    yield put({ type: actionTypes.SET_BUILDER_NEW_APPROVAL_LIST, payload: false });
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
    yield takeLatest(actionTypes.MARK_MILESTONE_COMPLETE, markMilestoneComplete);

    yield takeLatest(actionTypes.GET_BUILDER_ACTIVE_JOBS, getActiveJobsBuilder);
    yield takeLatest(actionTypes.GET_BUILDER_PAST_JOBS, getPastJobsBuilder);
    yield takeLatest(actionTypes.GET_BUILDER_OPEN_JOBS, getOpenJobsBuilder);
    yield takeLatest(actionTypes.GET_BUILDER_NEW_APPLICANTS, getBuilderNewApplicants);
    yield takeLatest(actionTypes.GET_BUILDER_NEW_APPLICANTS_LIST, getnewJobApplicationListBuilder);

    yield takeLatest(actionTypes.GET_TRADIE_REVIEWS_LIST_ON_BUILDER, getTradieReviewListOnBuilder);
    yield takeLatest(actionTypes.GET_ACCEPT_DECLINE_TRADIE_REQUEST, getAcceptDeclineTradie)

    yield takeLatest(actionTypes.GET_BUILDER_NEW_APPROVAL_LIST, getNewApprovalList);

  } catch (e) {
    console.log(e);
  }
}

export default postJobWatcher;