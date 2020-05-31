import { ValidationControllerFactory, ValidationRules, ValidationController } from "aurelia-validation";
import { Router, activationStrategy } from "aurelia-router";
import { BootstrapFormRenderer } from "../../shared/bootstrap-form-renderer";
import { inject, autoinject } from 'aurelia-dependency-injection';
import { I18N } from "aurelia-i18n";
import { ApplicantService } from "../../shared/services/applicantService";
import { Applicant } from "../../shared/models/applicant";
import { DialogService } from 'aurelia-dialog';
import { ConfirmationModal } from "../../shared/components/confirmation-modal";


@inject(ValidationControllerFactory, I18N, Router, ApplicantService, DialogService)
export class AddApplicant {
  controller: ValidationController;
  errors: any;
  router: Router;
  type: string;
  name: any = '';
  familyName: any = '';
  countryOfOrigin: any = '';
  address: any = '';
  email: any = '';
  age?: number;
  hired: boolean = false;
  i18n: I18N;
  applicantService: ApplicantService;
  dialogService: DialogService;


  constructor(controllerFactory: ValidationControllerFactory, i18n: I18N, router: Router, applicantService: ApplicantService, dialogService: DialogService) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.i18n = i18n;

    this.router = router;
    this.applicantService = applicantService;

    this.dialogService = dialogService;

    ValidationRules
      .ensure('name').required().withMessage(this.i18n.tr('other-translations:title')).minLength(5).withMessage(this.i18n.tr('title'))
      .ensure('familyName').required().minLength(5)
      .ensure('address').required().minLength(10)
      .ensure('countryOfOrigin').required()
      .ensure('email').required().email()
      .ensure('age').required().between(20, 60)
      .ensure('hired').required()
      //.when((auth) => auth.type === 'register')
      .on(this);
  }


  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  activate(params, routeConfig) {
    this.type = routeConfig.name;
  }


  get canSave() {
    return this.name && this.name !== '' && this.name.length >= 5 && this.familyName !== '' && this.familyName.length >= 5
      && this.address !== '' && this.address.length >= 10 && this.countryOfOrigin && this.email !== '';
  }


  get canReset() {
    return this.name !== '' && this.familyName !== '' && this.address !== '' && this.email !== '' && this.age;
  }


  reset() {
    this.dialogService.open({ viewModel: ConfirmationModal, model: new Applicant(), lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('good - ', response.output);


        var dirtyFormID = 'add-applicant-form';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        if (resetForm) resetForm.reset();

        this.name = '';
        this.familyName = '';
        this.address = '';
        this.countryOfOrigin = '';
        this.email = '';
        this.hired = false;
        this.age = null;

        this.controller.reset();

      } else {
        console.log('bad');
      }
      console.log(response.output);
    });
  }

  submit() {
    this.errors = null;

    this.controller.validate()
      .then(result => {
        debugger
        if (result.valid) {
          var applicant = new Applicant()
          applicant.name = this.name;
          applicant.familyName = this.familyName;
          applicant.address = this.address;
          applicant.countryOfOrigin = this.countryOfOrigin;
          applicant.eMailAddress = this.email;
          applicant.age = this.age;
          applicant.hired = this.hired;

          this.applicantService.create(applicant)
            .then(data => this.router.navigateToRoute('home'))
            .catch(promise => {
              promise.then(err => this.errors = err.errors)
            });
        }
      })
  }
}
