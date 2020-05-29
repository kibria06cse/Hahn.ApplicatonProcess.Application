//export class Authcomponent {
//  message: string;

//  constructor() {
//    this.message = 'Hello world';
//  }
//}

import { inject, autoinject } from 'aurelia-dependency-injection';

import { Router, activationStrategy } from 'aurelia-router';
import { ValidationControllerFactory, ValidationRules, ValidationController } from 'aurelia-validation';
//import { UserService } from '../../shared/services/userservice';
//import { SharedState } from '../../shared/state/sharedstate';


@autoinject
export class AuthComponent {
  type = '';
  username = '';
  email = '';
  password = '';
  errors = null;
  controller: ValidationController;
  router: Router;

  constructor(controllerFactory: ValidationControllerFactory,router: Router) {
    this.controller = controllerFactory.createForCurrentScope();
    this.router = router;

    ValidationRules
      .ensure('email').required().email()
      .ensure('password').required().minLength(8)
      .ensure('username').required()
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
    if (this.type === 'login') {
      return this.email !== '' && this.password !== '';
    } else {
      return this.username !== '' && this.email !== '' && this.password !== '';
    }
  }

  submit() {
    this.errors = null;

    this.controller.validate()
      .then(result => {
        if (result.valid) {
          const credentials = {
            username: this.username,
            email: this.email,
            password: this.password
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

