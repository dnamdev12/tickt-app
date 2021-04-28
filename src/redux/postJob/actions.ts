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
  // setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.profileTemplateList);
  // setLoading(false);

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
export const updateMileStoneIndex = (index: number) => ({ type: actionTypes.EDIT_MILESTONE_ID, payload: index })