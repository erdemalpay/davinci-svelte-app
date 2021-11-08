import { Dictionary, isNil, omitBy } from 'lodash';
import config from '../config';
import { serialize } from 'object-to-formdata';
import { UiError } from './errors';

export class Api {
  rootUrl = config('API_URL');
  resourcePath: string;

  constructor(resourcePath?: string) {
    this.resourcePath = resourcePath || '';
  }

  getFullUrl(url: string) {
    return `${this.rootUrl}${this.resourcePath}${url}`;
  }

  async fetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const requestOptions: RequestInit = {
      credentials: 'include',
      ...options,
    };
    const response = await window.fetch(this.getFullUrl(url), requestOptions);

    if (!response.ok) {
      const resError = await response.json();

      throw new UiError(resError);
    }

    if (response.status === 204) {
      return;
    }

    const json = await response.json();

    return json as T;
  }

  async get<T>(url: string, params?: Dictionary<any>) {
    if (params) {
      const paramsString = new URLSearchParams(omitBy(params, isNil));
      url = `${url}?${paramsString}`;
    }

    return this.fetch<T>(url);
  }

  async post<T>(url: string, body?: any, files?: File[]) {
    const reqBody = files ? serialize({ ...body, files }) : JSON.stringify(body);

    const reqOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: reqBody,
    };

    if (files) {
      delete reqOptions.headers;
    }

    return this.fetch<T>(url, reqOptions);
  }

  async put<T>(url: string, body?: any, files?: File[]) {
    const reqBody = files ? serialize({ ...body, files }) : JSON.stringify(body);

    const reqOptions: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: reqBody,
    };

    if (files) {
      delete reqOptions.headers;
    }

    return this.fetch<T>(url, reqOptions);
  }

  async delete<T>(url: string, params?: Dictionary<any>) {
    if (params) {
      url = `${url}?${new URLSearchParams(params)}`;
    }

    const reqOptions: RequestInit = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    return this.fetch<T>(url, reqOptions);
  }
}

export function UiErrorByStatus(messageMap?: any) {
  const defaultMessage = 'An error occurred!';

  return function (_: any, __: any, descriptor: TypedPropertyDescriptor<any>): any {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const res = await originalMethod.apply(this, args);
        return res;
      } catch (responseError) {
        const message =
          messageMap?.[String(responseError.status)] ||
          messageMap?.default ||
          defaultMessage;

        throw responseError;
      }
    };

    return descriptor;
  };
}
