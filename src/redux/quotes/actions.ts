import NetworkOps, { FetchResponse } from '../../network/NetworkOps';
import Urls from '../../network/Urls';
import * as actionTypes from './constants';
import { setShowToast, setLoading } from '../common/actions';
import storageService from '../../utils/storageService';


export const quoteByJobId = async (data: any) => {
    setLoading(true);
    const response: FetchResponse = await NetworkOps.get(`${Urls.quote}quoteByJobId?jobId=${data.jobId}`);
    setLoading(false);
    if (response.status_code === 200) {
        return { success: true, data: response?.result };
    }
    setShowToast(true, response.message);
    return { success: false };
}

export const addQuote = async (data: any) => {
    setLoading(true);
    const response: FetchResponse = await NetworkOps.postToJson(`${Urls.quote}addQuote`, data);
    setLoading(false);
    if (response.status_code === 200) {
        setShowToast(true, response.message);
        return { success: true, data: response?.result };
    }
    setShowToast(true, response.message);
    return { success: false };
}

export const deleteItem = async (data: any) => {
    setLoading(true);
    const response: FetchResponse = await NetworkOps.putToJson(`${Urls.quote}deleteItem`, data);
    setLoading(false);
    if (response.status_code === 200) {
        setShowToast(true, response.message);
        return { success: true, data: response?.result };
    }
    setShowToast(true, response.message);
    return { success: false };
}