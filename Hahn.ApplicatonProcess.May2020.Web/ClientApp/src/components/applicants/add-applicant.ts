import { ValidationControllerFactory, ValidationRules, ValidationController } from "aurelia-validation";
import { Router, activationStrategy } from "aurelia-router";
import { BootstrapFormRenderer } from "../../shared/bootstrap-form-renderer";
import { inject, autoinject } from 'aurelia-dependency-injection';
import { I18N } from "aurelia-i18n";
import { ApplicantService } from "../../shared/services/applicantService";
import { Applicant } from "../../shared/models/applicant";
import { DialogService } from 'aurelia-dialog';
import { ConfirmationModal } from "../../shared/components/confirmation-modal";
import { InfoModal } from "../../shared/components/info-modal";


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
  sending: boolean = false;

  constructor(controllerFactory: ValidationControllerFactory, i18n: I18N, router: Router, applicantService: ApplicantService, dialogService: DialogService) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.i18n = i18n;

    this.router = router;
    this.applicantService = applicantService;

    this.dialogService = dialogService;

    ValidationRules
      .ensure('name').required().withMessage(this.i18n.tr('AddApplicant.Form.ErrorMessages.Name'))
      //.withMessage(this.i18n.tr('other-translations:title')).minLength(5).withMessage(this.i18n.tr('title'))
      .ensure('familyName').required().minLength(5).withMessage(this.i18n.tr('AddApplicant.Form.ErrorMessages.FamilyName'))
      .ensure('address').required().minLength(10).withMessage(this.i18n.tr('AddApplicant.Form.ErrorMessages.Address'))
      .ensure('countryOfOrigin').required().withMessage(this.i18n.tr('AddApplicant.Form.ErrorMessages.CountryOfOrigin'))
      .ensure('email').required().email().withMessage(this.i18n.tr('AddApplicant.Form.ErrorMessages.Email'))
      .ensure('age').required().between(19, 61).withMessage(this.i18n.tr('AddApplicant.Form.ErrorMessages.Age'))
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
    return this.name !== '' || this.familyName !== '' || this.address !== '' || this.email !== '' || this.age>0 || this.countryOfOrigin !=='' ;
  }


  reset() {
    this.dialogService.open({ viewModel: ConfirmationModal, model: 'Are you sure to reset?', lock: false }).whenClosed(response => {
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
        if (result.valid) {
          var applicant = new Applicant()
          applicant.name = this.name;
          applicant.familyName = this.familyName;
          applicant.address = this.address;
          applicant.countryOfOrigin = this.countryOfOrigin;
          applicant.eMailAddress = this.email;
          applicant.age = this.age;
          applicant.hired = this.hired;

          this.sending = true;

          this.applicantService.create(applicant)
            .then(data => {
              this.router.navigateToRoute('applicant-submit-success')
            })

            .catch(promise => {
              this.sending = false;

              this.dialogService.open({ viewModel: InfoModal, model: promise.message, lock: false }).whenClosed(response => {
                if (!response.wasCancelled) {

                } else {
                  console.log('bad');
                }
                console.log(response.output);
              });
              //promise.then(err => {
              
              //})

            });
        }
      })
  }
}
