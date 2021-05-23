import { get } from 'lodash';
import storageService from '../utils/storageService';
import { urlFor } from './Urls';

export interface FetchResponse {
    status?: number | boolean,
    status_code?: number
    message: string,
    result: any,
    data: any
}

export class NetworkOps {

    async getRequest(type: string, options?: object): Promise<any> {
        const headerOverrides = get(options, 'headerOverrides', {});
        const request = {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic dGlja3RfYXBwOnRpY2t0X2FwcF8xMjNzYWRlZnNz`,
                ...headerOverrides
            },
        };

        //if giving multipart/form-data in Content-Type: giving boundary error
        //if also adding boundary: loader continues from server end 
        const token = storageService.getItem('jwtToken');
        if (headerOverrides['Content-Type'] === 'multipart/form-data') {
            delete request.headers['Content-Type'];
        }
        if (token) {
            request.headers = {
                ...request.headers,
                Authorization: token,
                // Authorization: `Bearer ${token}`,
            }
        }
        return request;
    }

    async wrapperWithOptions(url: string, request: any) {
        console.log('url -->>', url, request)
        try {
            const response = await fetch(url, request);
            if (!response.ok) {
                if (response.status === 401) {
                    if (storageService.getItem('jwtToken')) {
                        storageService.clearAll();
                        alert('Token Expired')
                    }
                }
                else if (response.status === 500 || response.status === 400) {
                    console.log('Got 401, now calling logout', response);
                }
                const err = await response.json();
                console.log('Error -> ', err)
                throw err;
            }
            else {
                const res = await response.text();
                console.log('res -->>', JSON.parse(res))
                try {
                    console.log('if',{res:JSON.parse(res)})
                    return JSON.parse(res);
                }
                catch {
                    console.log('else',{res})
                    return res;
                }
            }
        }
        catch (error) {
            console.log('Error', error);
            return error;
        }
    }

    postToJson = async (service: string, data: any): Promise<FetchResponse> => {
        try {
            const JSONData = JSON.stringify(data);
            return this.postRaw(service, JSONData)
        }
        catch (err) {
            throw err;
        }
    }

    postRaw = async (service: string, data: any, options?: any): Promise<FetchResponse> => {
        try {
            const request = await this.getRequest('POST', options);
            request.body = data;
            return this.wrapperWithOptions(urlFor(service), request)
        }
        catch (err) {
            throw err;
        }
    }

    putToJson = async (service: string, data: any): Promise<FetchResponse> => {
        try {
            const request = await this.getRequest('PUT');
            request.body = JSON.stringify(data);
            return this.wrapperWithOptions(urlFor(service), request)
        }
        catch (err) {
            throw err;
        }
    }

    get = async (service: any): Promise<FetchResponse> => {
        try {
            const request = await this.getRequest('GET');
            return this.wrapperWithOptions(urlFor(service), request);
        }
        catch (err) {
            throw err;
        }
    }

    delete = async (service: string, data?: any): Promise<FetchResponse> => {
        try {
            const request = await this.getRequest('DELETE');
            request.body = JSON.stringify(data);
            return this.wrapperWithOptions(urlFor(service), request)
        }
        catch (err) {
            throw err;
        }
    }

    getRaw = async (service: string): Promise<any> => {
        try {
            const request = await this.getRequest('GET');
            return this.wrapperWithOptions(service, request)
        }
        catch (err) {
            throw err;
        }
    }
}

export default new NetworkOps();