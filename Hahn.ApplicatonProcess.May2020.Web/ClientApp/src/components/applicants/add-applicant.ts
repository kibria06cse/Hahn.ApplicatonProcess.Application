import { ValidationControllerFactory, ValidationRules, ValidationController } from "aurelia-validation";
import { Router, activationStrategy } from "aurelia-router";
import { BootstrapFormRenderer } from "../../shared/bootstrap-form-renderer";
import { inject, autoinject } from 'aurelia-dependency-injection';

@inject(ValidationControllerFactory)

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

  constructor(controllerFactory: ValidationControllerFactory, router: Router) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());

    this.router = router;

    ValidationRules
      .ensure('name').required().minLength(8)
      .ensure('familyName').required().minLength(8)
      .ensure('address').required().minLength(8)
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
