import { ValidationControllerFactory, ValidationRules, ValidationController } from "aurelia-validation";
import { Router, activationStrategy } from "aurelia-router";
import { BootstrapFormRenderer } from "../../shared/bootstrap-form-renderer";
import { inject, autoinject } from 'aurelia-dependency-injection';
import { I18N  } from "aurelia-i18n";

@inject(ValidationControllerFactory, I18N, Router)
export class AddApplicant {
  controller: ValidationController;
  errors: any;
  router: Router;
  type: string;
  name: any;
  familyName: any;
  address: any;
  email: any;
  age: any;
  hired: any;
  i18n: I18N;


  constructor(controllerFactory: ValidationControllerFactory, i18n: I18N, router: Router) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.i18n = i18n;

    this.router = router;

    debugger

    ValidationRules
      .ensure('name').required().minLength(5).withMessage(this.i18n.tr('title'))
      .ensure('familyName').required().minLength(5)
      .ensure('address').required().minLength(10)
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
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          return true;
        }
      });
    return false;
  }


  get canReset() {
    return this.name !== '' && this.familyName !== '' && this.address !== '' && this.email !== '' && this.age !== '' && this.hired !== '';
  }


  reset() {
    this.controller.reset();
  }

  submit() {
    this.errors = null;

    this.controller.validate()
      .then(result => {
        debugger
        if (result.valid) {
          const applicant = {
            name: this.name,
            familyName: this.familyName,
            address: this.address,
            email: this.email,
            age: this.age,
            hired: this.hired
          };
          //this.userService.attemptAuth(this.type, credentials)
          //  .then(data => this.router.navigateToRoute('home'))
          //  .catch(promise => {
          //    promise.then(err => this.errors = err.errors)
          //  });
        }
      })
  }
}
