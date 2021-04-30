import NetworkOps, { FetchResponse } from "../../network/NetworkOps";
import Urls from "../../network/Urls";
import * as actionTypes from './constants';
import { setShowToast, setLoading } from './../common/actions';

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