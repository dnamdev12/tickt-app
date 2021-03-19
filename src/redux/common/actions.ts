import * as actionTypes from './constants'
import {store} from '../../index';

export const setLoading = (isLoading: boolean) => {
    store.dispatch({type: actionTypes.SET_LOADING, payload: isLoading})
};