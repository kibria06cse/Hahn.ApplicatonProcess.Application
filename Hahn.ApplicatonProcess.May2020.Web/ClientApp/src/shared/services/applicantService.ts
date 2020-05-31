﻿import { inject } from 'aurelia-dependency-injection';
import { ApiService } from './apiservice';
import { Applicant } from '../models/applicant';


@inject(ApiService)
export class ApplicantService {
  apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  get(applicantId) {
    return this.apiService.get('/Applicant/' , this.apiService)
      .then(data => data)
  }

  create(applicant: Applicant) {
    return this.apiService.post('/Applicant', applicant)
      .then(data => {
        return data;
      });
  }

  update(applicant) {
    return this.apiService.put('/Applicant', applicant )
      .then(data => {
        return data;
      });
  }
}
