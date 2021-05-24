import NetworkOps, { FetchResponse } from "../../network/NetworkOps";
import Urls from "../../network/Urls";
import * as actionTypes from './constants';
import { setShowToast, setLoading } from '../common/actions';

//jobTypeList
export const callCategories = async () => {
  const response: FetchResponse = await NetworkOps.get(Urls.jobTypeList);

  if (response.status_code === 200) {
    return { success: true, categories: response.result.resultData };
  }

  return { success: false };
}


// profileTemplateList
export const profileTemplateList = async () => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.profileTemplateList);
  setLoading(false);

  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }

  setShowToast(true, response.message);
  return { success: false };
}

// milestones
export const callMilestones = async () => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.milestones);
  setLoading(false);

  if (response.status_code === 200) {
    return { success: true, milestones: response.result.resultData };
  }

  setShowToast(true, response.message);
  return { success: false };
}

// Update Edit-MileStone
export const updateMileStoneIndex = (index: any) => ({ type: actionTypes.EDIT_MILESTONE_ID, payload: index });
export const updateMileStoneTimings = (timings: any) => ({ type: actionTypes.EDIT_MILESTONE_TIMINGS, payload: timings });


// Save Template
export const addTemplate = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.createTemplate, data);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }

  setShowToast(true, response.message);
  return { success: false };
}

//Get milestone by template-id
export const getMileStoneByTempId = async (id: any) => {
  setLoading(true);
  let url = `${Urls.milestones}?tempId=${id}`;
  const response: FetchResponse = await NetworkOps.get(url);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }

  setShowToast(true, response.message);
  return { success: false };
}

// Detail Page {currentScreen:12, editItems: {}}
export const updateDetailScreen = (data: any) => ({ type: actionTypes.EDIT_DETAIL_SCREEN, payload: data });

// Job Post 
export const createPostJob = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.createJob, data);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }

  setShowToast(true, response.message);
  return { success: false };
}

export const setHomeBuilder = (data: any) => ({ type: actionTypes.FETCH_HOME_BUILDER, data })

export const getBuilderHomeData = async (item: any) => {
  let url = `${Urls.home}?lat=${item.lat}&long=${item.long}`
  const response: FetchResponse = await NetworkOps.get(url);
  console.log({ response }, '---------------!!!!!!!!')
  if (response.status_code === 200) {
    return { status: true, response: response.result };
  }
  return { status: false }
}

export const isHandleChanges = (data: any) => ({ type: actionTypes.GET_LOCAL_CHANGES, data });
//tradie ask a question
export const postAskQuestion = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.askQuestion, data)
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}

//tradie delete question
export const deleteQuestion = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.delete(Urls.deleteQuestion, data)
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}

//tradie update question
export const updateQuestion = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.updateQuestion, data)
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const reviewBuilder = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.reviewBuilder, data)
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const getBuilderProfile = async (builderId: string) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.builderProfile + `?builderId=${builderId}`)
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const getActiveJobList = (page: number) => ({
  type: actionTypes.GET_ACTIVE_JOBS_START,
  page,
});

export const getAppliedJobList = (page: number) => ({
  type: actionTypes.GET_APPLIED_JOBS_START,
  page,
});

export const getPastJobList = (page: number) => ({
  type: actionTypes.GET_PAST_JOBS_START,
  page,
});

export const getNewJobList = (page: number) => ({
  type: actionTypes.GET_NEW_JOBS_START,
  page,
});

export const getApprovedMilestoneList = (page: number) => ({
  type: actionTypes.GET_APPROVED_MILESTONE_START,
  page,
});

export const getActiveJobsBuilder = (page: number) => ({ type: actionTypes.GET_BUILDER_ACTIVE_JOBS, page });
export const getOpenJobsBuilder = (page: number) => ({ type: actionTypes.GET_BUILDER_OPEN_JOBS, page });
export const getPastJobsBuilder = (page: number) => ({ type: actionTypes.GET_BUILDER_PAST_JOBS, page });
export const getNewApplicantsBuilder = (page: number) => ({ type: actionTypes.GET_BUILDER_NEW_APPLICANTS, page });
export const getnewJobApplicationListBuilder = (item: any) => ({ type: actionTypes.GET_BUILDER_NEW_APPLICANTS_LIST, item });

export const getMilestoneList = (jobId: string) => ({
  type: actionTypes.GET_MILESTONES_START,
  jobId,
});

export const markMilestoneComplete = (data: any, callback: () => void) => ({
  type: actionTypes.MARK_MILESTONE_COMPLETE,
  data,
  callback,
});
