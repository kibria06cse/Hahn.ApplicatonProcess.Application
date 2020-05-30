import { ValidationRules } from "aurelia-validation";
import { activationStrategy } from "aurelia-router";
import { BootstrapFormRenderer } from "../../shared/bootstrap-form-renderer";
var AddApplicant = (function () {
    function AddApplicant(controllerFactory, router) {
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
            .on(this);
    }
    AddApplicant.prototype.determineActivationStrategy = function () {
        return activationStrategy.replace;
    };
    AddApplicant.prototype.activate = function (params, routeConfig) {
        this.type = routeConfig.name;
    };
    Object.defineProperty(AddApplicant.prototype, "canSave", {
        get: function () {
            this.controller.validate()
                .then(function (result) {
                if (result.valid) {
                    return true;
                }
            });
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddApplicant.prototype, "canReset", {
        get: function () {
            return this.name !== '' && this.familyName !== '' && this.address !== '' && this.email !== '' && this.age !== '' && this.hired !== '';
        },
        enumerable: true,
        configurable: true
    });
    AddApplicant.prototype.reset = function () {
        this.controller.reset();
    };
    AddApplicant.prototype.submit = function () {
        var _this = this;
        this.errors = null;
        this.controller.validate()
            .then(function (result) {
            debugger;
            if (result.valid) {
                var applicant = {
                    name: _this.name,
                    familyName: _this.familyName,
                    address: _this.address,
                    email: _this.email,
                    age: _this.age,
                    hired: _this.hired
                };
            }
        });
    };
    return AddApplicant;
}());
export { AddApplicant };
//# sourceMappingURL=add-applicant.js.map