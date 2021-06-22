import NetworkOps, { FetchResponse } from "../../network/NetworkOps";
import Urls from "../../network/Urls";
import * as actionTypes from './constants';
import { setShowToast, setLoading, setSkeletonLoading } from '../common/actions';

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

export const setHomeBuilder = (data: any) => ({ type: actionTypes.FETCH_HOME_BUILDER, data });

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

export const getTradieQuestionList = async (data: any) => {
  const response: FetchResponse = await NetworkOps.get(Urls.tradieQuestionList + `?jobId=${data.jobId}&page=${data.page}`);
  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const getTradieReviewList = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.tradieReviewList + `?builderId=${data.builderId}&page=${data.page}`);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const postAskQuestion = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.askQuestion, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true, data: { questionData: response.result } };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const deleteQuestion = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.delete(Urls.deleteQuestion, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const updateQuestion = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.updateQuestion, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true, data: response.result };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const reviewBuilder = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.reviewBuilder, data);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const updateReviewBuilder = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.updateReviewBuilder, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const deleteReviewBuilder = async (reviewId: string) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.delete(Urls.removeReviewBuilder + `?reviewId=${reviewId}`);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const getBuildersJob = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.getBuildersJob + `?builderId=${data.builderId}&page=${data.page}`);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const tradieReviewReply = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.tradieReviewReply, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true, data: response.result };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const tradieUpdateReviewReply = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.tradieUpdateReviewReply, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message);
    return { success: true };
  }
  setShowToast(true, response.message);
  return { success: false };
}

export const tradieRemoveReviewReply = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.delete(Urls.tradieRemoveReviewReply + `?reviewId=${data.reviewId}&replyId=${data.replyId}`);
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
  const response: FetchResponse = await NetworkOps.get(Urls.builderProfile + `?builderId=${builderId}`);
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
export const getNewApprovalList = (page: any) => ({ type: actionTypes.GET_BUILDER_NEW_APPROVAL_LIST, page });

export const getMilestoneList = (jobId: string) => ({
  type: actionTypes.GET_MILESTONES_START,
  jobId,
});

export const markMilestoneComplete = (data: any, callback: (jobCompletedCount: number) => void) => ({
  type: actionTypes.MARK_MILESTONE_COMPLETE,
  data,
  callback,
});


// Tradie


export const getTradieReviewListOnBuilder = (data: any) => ({ type: actionTypes.GET_TRADIE_REVIEWS_LIST_ON_BUILDER, data })
export const getAcceptDeclineTradie = (data: any) => ({ type: actionTypes.GET_ACCEPT_DECLINE_TRADIE_REQUEST, data });

export const getQuestionsList = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(`${Urls.questionList}?jobId=${data?.jobId}&page=${data?.page}`)
  setLoading(false);

  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false, data: response.result };
}


export const answerQuestion = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.answerQuestion, data)
  setLoading(false);

  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false, data: response.result };
}

export const updateAnswer = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.updateAnswer, data)
  setLoading(false);

  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false, data: response.result };
}

export const deleteAnswer = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.delete(`${Urls.deleteAnswer}?questionId=${data.questionId}&answerId=${data.answerId}`)
  setLoading(false);

  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false, data: response.result };
}

export const reviewReply = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.reviewReply, data)
  setLoading(false);

  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false, data: response.result };
}

export const updateReviewReply = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.updateReviewReply, data)
  setLoading(false);

  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false, data: response.result };
}

export const removeReviewReply = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.delete(`${Urls.removeReviewReply}?reviewId=${data.reviewId}&replyId=${data.replyId}`)
  setLoading(false);

  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false, data: response.result };
}

export const getTradeReviews = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.reviewList + `?tradieId=${data.tradieId}&page=${data.page}`);
  setLoading(false);

  if (response?.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false, data: response.result };
}

export const getTradeProfile = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.tradieProfile + `?tradieId=${data.tradieId}&jobId=${data.jobId}`);
  setLoading(false);

  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false, data: response.result };
}


export const ratingTradieProfile = async (data: any) => {
  const response: FetchResponse = await NetworkOps.postToJson(Urls.reviewTradie, data);
  setShowToast(true, response.message);
  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false, data: response.result };
}


export const getJobDetails = async (jobId: string) => {
  setSkeletonLoading(true);
  const response: FetchResponse = await NetworkOps.get(Urls.jobDetailsTradie + `?jobId=${jobId}`);
  setSkeletonLoading(false);
  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false };
}


export const lodgeDispute = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(`${Urls.jobBuilder}lodgeDispute`, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message)
    return { success: true, data: response.result };
  }
  return { success: false };
}

export const tradielodgeDispute = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.tradieLodgeDispute, data);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true };
  }
  return { success: false };
}

export const CancelJob = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(`${Urls.jobBuilder}canceljob`, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message)
    return { success: true, data: response.result };
  }
  return { success: false };
}

export const tradieCancelJob = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(Urls.tradieCancelJob, data);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true };
  }
  return { success: false };
}

export const InviteForJob = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(`${Urls.jobBuilder}inviteForJob?tradieId=${data.tradieId}&jobId=${data.jobId}`, {});
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message)
    return { success: true, data: response.result };
  }
  return { success: false };
}

export const CancelInviteForJob = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.putToJson(`${Urls.jobBuilder}cancelInviteForJob`, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message)
    return { success: true, data: response.result };
  }
  return { success: false };
}

export const changeRequest = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(`${Urls.jobBuilder}changeRequest`, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message)
    return { success: true, data: response.result };
  }
  return { success: false };
}

export const replyCancellation = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.replyCancellation, data);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true };
  }
  return { success: false };
}

export const replyChangeRequest = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(Urls.replyChangeRequest, data);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true };
  }
  return { success: false };
}

export const SaveTradie = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(`${Urls.jobBuilder}saveTradie?tradieId=${data.tradieId}&isSave=${data.isSave}`,);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false };
}


export const HomeTradieProfile = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(`${Urls.jobHome}tradieProfile?tradieId=${data.tradieId}`,);
  setLoading(false);
  if (response?.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false };
}

export const AddVoucher = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.postToJson(`${Urls.jobBuilder}addVoucher`, data);
  setLoading(false);
  if (response.status_code === 200) {
    setShowToast(true, response.message)
    return { success: true, data: response.result };
  }
  return { success: false };
}

export const ChooseJob = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(`${Urls.jobBuilder}chooseJob?page=${data.page}`);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false };
}

export const getVouchers = async (data: any) => {
  setLoading(true);
  const response: FetchResponse = await NetworkOps.get(`${Urls.jobBuilder}getVoucher?tradieId=${data.tradieId}&page=${data.page}`);
  setLoading(false);
  if (response.status_code === 200) {
    return { success: true, data: response.result };
  }
  return { success: false };
}

