import { inject } from 'aurelia-dependency-injection';
import { ApiService } from './apiservice';
import { Applicant } from '../models/applicant';
import { InfoModal } from '../components/info-modal';
import { DialogService } from 'aurelia-dialog';


@inject(ApiService, DialogService)
export class ApplicantService {
  apiService: ApiService;
  dialogService: any;

  constructor(apiService: ApiService, dialogService: DialogService) {
    this.apiService = apiService;
    this.dialogService = dialogService;
  }

  get(applicantId) {
    return this.apiService.get('/Applicant/', this.apiService)
      .then(data => data)
  }

  create(applicant: Applicant) {
    return this.apiService.post('/Applicant', applicant)
      .then(data => {


        return data;
      })
      .catch(e => {
        //this.dialogService.open({ viewModel: InfoModal, model: e.message, lock: false }).whenClosed(response => {
        //  if (!response.wasCancelled) {

        //  } else {
        //    console.log('bad');
        //  }
        //  console.log(response.output);
        //});

        throw e;
      });
  }

  update(applicant) {
    return this.apiService.put('/Applicant', applicant)
      .then(data => {
        return data;
      });
  }
}
