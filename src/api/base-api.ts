import HTTPTransport from "../utils/core/HTTPTransport";

interface IHTTPTransport {
    path: string,
    baseUrl?: string,
    headers?: Record<string, string>
}

type HTTPOption = Record<string, any>

const host = 'https://ya-praktikum.tech/api/v2';

const defaultHeaders = {
    "Content-type": 'application/json; charset=UTF-8'
};

class BaseApi {
    protected transport: HTTPTransport;
    protected baseUrl: string;
    protected path: string;
    protected headers: Record<string, string>;

    constructor(data: IHTTPTransport) {
        this.baseUrl = data.baseUrl || host;
        this.headers = data.headers || defaultHeaders;
        this.path = data.path;
        this.transport = new HTTPTransport();

    }

    handleResponse(resp: XMLHttpRequest) {
        if (resp.response === "OK") {
            return {ans: true}
        }

        return JSON.parse(resp.response);
    }

    getFullPath(endpoint: string): string {
        return `${this.baseUrl}${this.path}${endpoint}`
    }

    getOptions(newOptions?: HTTPOption) {
        const options = newOptions || {};
        options.headers = newOptions?.headers || this.headers;
        console.log("options", options, options.headers);
        return options;
    }

    get(endpoint: string, options?: HTTPOption) {
        if (options) {
            return this.transport.get(this.getFullPath(endpoint), this.getOptions(options))
        } else {
            return this.transport.get(this.getFullPath(endpoint), this.getOptions())
        }
    }


    post(endpoint: string, options?: HTTPOption) {
        if (options) {
            return this.transport.post(this.getFullPath(endpoint), this.getOptions(options))
        } else {
            return this.transport.post(this.getFullPath(endpoint))
        }
    }


    put(endpoint: string, options?: HTTPOption) {
        if (options) {
            return this.transport.put(this.getFullPath(endpoint), this.getOptions(options))
        } else {
            return this.transport.put(this.getFullPath(endpoint))
        }
    }

    delete(endpoint: string, options?: HTTPOption) {
        if (options) {
            return this.transport.delete(this.getFullPath(endpoint), this.getOptions(options))
        } else {
            return this.transport.delete(this.getFullPath(endpoint))
        }
    }
}

export {BaseApi, IHTTPTransport, host};
