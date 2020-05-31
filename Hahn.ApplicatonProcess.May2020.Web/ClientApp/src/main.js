import * as environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';
import { Backend, TCustomAttribute } from "aurelia-i18n";
var resBundle = require('i18next-resource-store-loader!./locales/index');
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration();
    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }
    aurelia.use
        .plugin(PLATFORM.moduleName('aurelia-i18n'), function (instance) {
        var aliases = ['t', 'i18n'];
        TCustomAttribute.configureAliases(aliases);
        instance.i18next.use(Backend.with(aurelia.loader));
        return instance.setup({
            resources: resBundle,
            attributes: aliases,
            lng: 'de-DE',
            fallbackLng: 'en',
            debug: true,
            defaultNS: 'translation',
            ns: [
                'translation',
                'other-translations'
            ]
        });
    })
        .plugin(PLATFORM.moduleName('aurelia-validation'))
        .plugin(PLATFORM.moduleName('aurelia-dialog'));
    aurelia.start().then(function () { return aurelia.setRoot(PLATFORM.moduleName('app')); });
}
//# sourceMappingURL=main.js.map