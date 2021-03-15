import * as actionTypes from './constants'

export const requestApiData = () => ({ type: actionTypes.REQUEST_API_DATA })
export const receiveApiData = (data: any) => ({ type: actionTypes.RECEIVE_API_DATA, data })