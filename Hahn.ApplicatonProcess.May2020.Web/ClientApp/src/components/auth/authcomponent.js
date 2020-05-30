var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-dependency-injection';
import { Router, activationStrategy } from 'aurelia-router';
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../shared/bootstrap-form-renderer';
var AuthComponent = (function () {
    function AuthComponent(controllerFactory, router) {
        this.type = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.errors = null;
        this.controller = controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new BootstrapFormRenderer());
        this.router = router;
        ValidationRules
            .ensure('email').required().email()
            .ensure('password').required().minLength(8)
            .ensure('username').required()
            .on(this);
    }
    AuthComponent.prototype.determineActivationStrategy = function () {
        return activationStrategy.replace;
    };
    AuthComponent.prototype.activate = function (params, routeConfig) {
        this.type = routeConfig.name;
    };
    Object.defineProperty(AuthComponent.prototype, "canSave", {
        get: function () {
            if (this.type === 'login') {
                return this.email !== '' && this.password !== '' && this.password.length >= 8;
            }
            else {
                return this.username !== '' && this.email !== '' && this.password !== '' && this.password.length >= 8;
            }
        },
        enumerable: true,
        configurable: true
    });
    AuthComponent.prototype.submit = function () {
        var _this = this;
        this.errors = null;
        this.controller.validate()
            .then(function (result) {
            debugger;
            if (result.valid) {
                var credentials = {
                    username: _this.username,
                    email: _this.email,
                    password: _this.password
                };
            }
        });
    };
    AuthComponent = __decorate([
        inject(ValidationControllerFactory),
        __metadata("design:paramtypes", [ValidationControllerFactory, Router])
    ], AuthComponent);
    return AuthComponent;
}());
export { AuthComponent };
//# sourceMappingURL=authcomponent.js.map