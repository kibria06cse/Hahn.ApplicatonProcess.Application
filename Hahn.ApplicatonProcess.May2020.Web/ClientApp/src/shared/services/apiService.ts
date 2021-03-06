﻿import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-dependency-injection';
import * as qs from 'querystringify';
import { config } from './config';
import { InfoModal } from '../components/info-modal';
import { DialogService } from 'aurelia-dialog';

@inject(HttpClient, DialogService)
export class ApiService {
  http: HttpClient;
    dialogService: DialogService;

  constructor(http: HttpClient, dialogService: DialogService) {
    this.http = http;
    this.dialogService = dialogService;
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


   post(path, body = {}) {
    const options = {
      method: 'POST',
      //headers: this.setHeaders(),
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
    if (response) {
      if (response.status == false) {
       throw response;
      }

      return response.json();
    }

    throw response;
  }

  parseError(error) {
    if (!(error instanceof Error))
      return new Promise((resolve, reject) => reject(error))
  }
}
