import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import * as actionTypes from './constants';
import { setShowToast, setLoading } from '../common/actions';

export const callTradieProfileData = () => ({ type: actionTypes.GET_TRADIE_PROFILE_DATA })
