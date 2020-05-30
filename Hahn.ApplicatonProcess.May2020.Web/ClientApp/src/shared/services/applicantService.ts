import { inject } from 'aurelia-dependency-injection';
import { ApiService } from './apiservice';


@inject(ApiService)
export class ApplicantService {
  apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  get(applicantId) {
    return this.apiService.get('/applicant/' , this.apiService)
      .then(data => data.profile)
  }

  create(applicant) {
    return this.apiService.post('/applicant', { applicant })
      .then(data => {
        return data.user;
      });
  }

  update(applicant) {
    return this.apiService.put('/applicant', { applicant })
      .then(data => {
        return data.user;
      });
  }
}
