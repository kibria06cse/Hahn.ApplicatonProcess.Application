var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { I18N } from "aurelia-i18n";
import { inject } from 'aurelia-dependency-injection';
var LanguageSwitcher = (function () {
    function LanguageSwitcher(i18n) {
        this.message = 'Hello world';
        this.i18n = i18n;
    }
    LanguageSwitcher.prototype.DropdownChanged = function (changedVal) {
        if (changedVal == 1) {
            this.i18n
                .setLocale('de-DE')
                .then(function () {
            });
        }
        else {
            this.i18n
                .setLocale('en')
                .then(function () {
            });
        }
    };
    LanguageSwitcher = __decorate([
        inject(I18N),
        __metadata("design:paramtypes", [I18N])
    ], LanguageSwitcher);
    return LanguageSwitcher;
}());
export { LanguageSwitcher };
//# sourceMappingURL=language-switcher.js.map