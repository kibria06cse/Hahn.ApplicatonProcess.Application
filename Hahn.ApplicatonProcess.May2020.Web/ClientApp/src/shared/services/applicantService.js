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
import { ApiService } from './apiservice';
var ApplicantService = (function () {
    function ApplicantService(apiService) {
        this.apiService = apiService;
    }
    ApplicantService.prototype.get = function (applicantId) {
        return this.apiService.get('/Applicant/', this.apiService)
            .then(function (data) { return data; });
    };
    ApplicantService.prototype.create = function (applicant) {
        return this.apiService.post('/Applicant', { applicant: applicant })
            .then(function (data) {
            return data;
        });
    };
    ApplicantService.prototype.update = function (applicant) {
        return this.apiService.put('/Applicant', { applicant: applicant })
            .then(function (data) {
            return data;
        });
    };
    ApplicantService = __decorate([
        inject(ApiService),
        __metadata("design:paramtypes", [ApiService])
    ], ApplicantService);
    return ApplicantService;
}());
export { ApplicantService };
//# sourceMappingURL=applicantService.js.map