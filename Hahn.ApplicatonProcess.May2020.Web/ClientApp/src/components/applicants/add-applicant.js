var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ValidationControllerFactory, ValidationRules } from "aurelia-validation";
import { Router, activationStrategy } from "aurelia-router";
import { BootstrapFormRenderer } from "../../shared/bootstrap-form-renderer";
import { inject } from 'aurelia-dependency-injection';
import { I18N } from "aurelia-i18n";
import { ApplicantService } from "../../shared/services/applicantService";
import { Applicant } from "../../shared/models/applicant";
import { DialogService } from 'aurelia-dialog';
import { ConfirmationModal } from "../../shared/components/confirmation-modal";
import { InfoModal } from "../../shared/components/info-modal";
var AddApplicant = (function () {
    function AddApplicant(controllerFactory, i18n, router, applicantService, dialogService) {
        this.name = '';
        this.familyName = '';
        this.countryOfOrigin = '';
        this.address = '';
        this.email = '';
        this.hired = false;
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
            return this.name && this.name !== '' && this.name.length >= 5 && this.familyName !== '' && this.familyName.length >= 5
                && this.address !== '' && this.address.length >= 10 && this.countryOfOrigin && this.email !== '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddApplicant.prototype, "canReset", {
        get: function () {
            return this.name !== '' && this.familyName !== '' && this.address !== '' && this.email !== '' && this.age;
        },
        enumerable: true,
        configurable: true
    });
    AddApplicant.prototype.reset = function () {
        var _this = this;
        this.dialogService.open({ viewModel: ConfirmationModal, model: 'Are you sure to reset?', lock: false }).whenClosed(function (response) {
            if (!response.wasCancelled) {
                console.log('good - ', response.output);
                var dirtyFormID = 'add-applicant-form';
                var resetForm = document.getElementById(dirtyFormID);
                if (resetForm)
                    resetForm.reset();
                _this.name = '';
                _this.familyName = '';
                _this.address = '';
                _this.countryOfOrigin = '';
                _this.email = '';
                _this.hired = false;
                _this.age = null;
                _this.controller.reset();
            }
            else {
                console.log('bad');
            }
            console.log(response.output);
        });
    };
    AddApplicant.prototype.submit = function () {
        var _this = this;
        this.errors = null;
        this.controller.validate()
            .then(function (result) {
            debugger;
            if (result.valid) {
                var applicant = new Applicant();
                applicant.name = _this.name;
                applicant.familyName = _this.familyName;
                applicant.address = _this.address;
                applicant.countryOfOrigin = _this.countryOfOrigin;
                applicant.eMailAddress = _this.email;
                applicant.age = _this.age;
                applicant.hired = _this.hired;
                _this.applicantService.create(applicant)
                    .then(function (data) {
                    _this.router.navigateToRoute('applicant-submit-success');
                })
                    .catch(function (promise) {
                    _this.dialogService.open({ viewModel: InfoModal, model: promise.message, lock: false }).whenClosed(function (response) {
                        if (!response.wasCancelled) {
                        }
                        else {
                            console.log('bad');
                        }
                        console.log(response.output);
                    });
                });
            }
        });
    };
    AddApplicant = __decorate([
        inject(ValidationControllerFactory, I18N, Router, ApplicantService, DialogService),
        __metadata("design:paramtypes", [ValidationControllerFactory, I18N, Router, ApplicantService, DialogService])
    ], AddApplicant);
    return AddApplicant;
}());
export { AddApplicant };
//# sourceMappingURL=add-applicant.js.map