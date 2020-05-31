import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';


export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Aurelia';
    //config.map([
    //  { route: ['', 'home'], name: 'home', moduleId: 'home/index' },
    //  { route: 'users', name: 'users', moduleId: 'users/index', nav: true, title: 'Users' },
    //  { route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' },
    //  { route: 'files/*path', name: 'files', moduleId: 'files/index', nav: 0, title: 'Files', href: '#files' }
    //]);


    config.map([
      { route: [ 'home'], name: 'login', moduleId: PLATFORM.moduleName('components/auth/authcomponent') },
      { route: ['register'], name: 'register', moduleId: PLATFORM.moduleName('components/auth/authcomponent') },
      { route: ['','add-applicant'], name: 'add-applicant', moduleId: PLATFORM.moduleName('components/applicants/add-applicant') },
      { route: ['applicant-submit-success'], name: 'add-applicant', moduleId: PLATFORM.moduleName('components/applicants/applicant-submit-success') }
      //{ route: 'users', name: 'users', moduleId: 'users/index', nav: true, title: 'Users' },
      //{ route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' },
      //{ route: 'files/*path', name: 'files', moduleId: 'files/index', nav: 0, title: 'Files', href: '#files' }
    ]);
  }
}


