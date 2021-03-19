import { get } from 'lodash';
import { urlFor } from './Urls';

export interface FetchResponse {
    status?: number | boolean,
    status_code?: number
    message: string,
    data: any
}

export class NetworkOps {

    async getRequest(type: string, options?: object): Promise<any> {
        const headerOverrides = get(options, 'headerOverrides', {});
        let request = {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic dGlja3RfYXBwOnRpY2t0X2FwcF8xMjNzYWRlZnNz`,
                ...headerOverrides
            },
        };

        if (localStorage.token) {
            request.headers = {
                ...request.headers,
                Authorization: `Bearer ${localStorage.token}`,
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
                    if (localStorage.token) {
                        localStorage.clear();
                        alert('Token Expired')
                    }
                }
                else if (response.status === 500 || response.status === 400) {
                    console.log('Got 401, now calling logout', response);
                }
                const err = await response.json();
                console.log('Error -> ',err)
                throw err;
            }
            else {
                const res = await response.text();
                console.log('res -->>', JSON.parse(res))
                try {
                    return JSON.parse(res);
                }
                catch {
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

    postRaw = async (service: string, data: any, options?: any): Promise<any> => {
        try {
            const request = await this.getRequest('POST', options);
            request.body = data;
            return this.wrapperWithOptions(urlFor(service), request)
        }
        catch (err) {
            throw err;
        }
    }

    putToJson = async (service: string, data: any): Promise<any> => {
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
            return this.wrapperWithOptions(urlFor(service), request)
        }
        catch (err) {
            throw err;
        }
    }

    delete = async (service: string): Promise<any> => {
        try {
            const request = await this.getRequest('DELETE');
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