import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-dependency-injection';
import * as qs from 'querystringify';
import { config } from './config';

@inject(HttpClient)
export class ApiService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  setHeaders() {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return new Headers(headersConfig);
  }

  get(path, params) {
    const options = {
      method: 'GET',
      headers: this.setHeaders()
    };
    return this.http.fetch(`${config.api_url}${path}?${qs.stringify(params)}`, options)
      .then(response => response.json())
      .then(this.returnStatus)
      .catch(this.parseError)
  }

  put(path, body = {}) {
    const options = {
      method: 'PUT',
      headers: this.setHeaders(),
      body: json(body)
    };
    return this.http.fetch(`${config.api_url}${path}`, options)
      .then(response => response.json())
      .then(this.returnStatus)
      .catch(this.parseError)
  }

  //post(path, body = {}) {
  //  const options = {
  //    method: 'POST',
  //    headers: this.setHeaders(),
  //    body: json(body)
  //  };
  //  return this.http.fetch(`${config.api_url}${path}`, options)
  //    .then(response => response.json())
  //    .then(this.returnStatus)
  //    .catch(this.parseError)
  //}

  post(path, body = {}) {
    const options = {
      method: 'POST',
      headers: this.setHeaders(),
      body: json(body)
    };
    return this.http.fetch(`${config.api_url}${path}`, options)
      .then(response => response.json())
      .then(this.returnStatus)
      .catch(this.parseError)
  }

  delete(path) {
    const options = {
      method: 'DELETE',
      headers: this.setHeaders()
    };
    return this.http.fetch(`${config.api_url}${path}`, options)
      .then(response => response.json())
      .then(this.returnStatus)
      .catch(this.parseError)
  }

  returnStatus(response) {
    if (response.status >= 200 && response.status < 400) {
      return response.json();
    }

    throw response;
  }

  parseError(error) {
    if (!(error instanceof Error))
      return new Promise((resolve, reject) => reject(error.json()))
  }
}
