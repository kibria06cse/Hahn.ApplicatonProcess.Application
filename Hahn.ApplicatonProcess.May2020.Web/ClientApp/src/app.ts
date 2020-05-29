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
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('components/auth/authcomponent') }
      //{ route: 'users', name: 'users', moduleId: 'users/index', nav: true, title: 'Users' },
      //{ route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' },
      //{ route: 'files/*path', name: 'files', moduleId: 'files/index', nav: 0, title: 'Files', href: '#files' }
    ]);
  }
}


