import { PLATFORM } from 'aurelia-pal';
var App = (function () {
    function App() {
    }
    App.prototype.configureRouter = function (config, router) {
        this.router = router;
        config.title = 'Aurelia';
        config.map([
            { route: ['home'], name: 'login', moduleId: PLATFORM.moduleName('components/auth/authcomponent') },
            { route: ['register'], name: 'register', moduleId: PLATFORM.moduleName('components/auth/authcomponent') },
            { route: ['', 'add-applicant'], name: 'add-applicant', moduleId: PLATFORM.moduleName('components/applicants/add-applicant') }
        ]);
    };
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map