import { call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import { MARK_MILESTONE_COMPLETE } from '../jobs/constants';
import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import { setLoading, setShowToast, setSkeletonLoading } from '../common/actions';
import { markMilestoneComplete } from '../jobs/actions';
import * as commonActions from '../common/actions';
import storageService from '../../utils/storageService';



function* quoteWatcher() {
    // yield takeLatest(actionTypes.GET_TRADIE_PROFILE_DATA, callTradieProfileData);
}

export default quoteWatcher;
