import Aurelia from 'aurelia';
import { PLATFORM } from 'aurelia-pal';
import { MyApp } from './my-app';
import { Backend, TCustomAttribute } from 'aurelia-i18n';
Aurelia
    .app(MyApp)
    .start();
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
        let aliases = ['t', 'i18n'];
        // add aliases for 't' attribute
        TCustomAttribute.configureAliases(aliases);
        // register backend plugin
        instance.i18next.use(Backend.with(aurelia.loader));
        // adapt options to your needs (see http://i18next.com/docs/options/)
        // make sure to return the promise of the setup method, in order to guarantee proper loading
        return instance.setup({
            backend: {
                loadPath: './locales/{{lng}}/{{ns}}.json',
            },
            attributes: aliases,
            lng: 'de-DE',
            fallbackLng: 'en-us',
            debug: true,
            defaultNS: 'translation',
            ns: [
                'translation',
                'other-translations'
            ]
        });
    });
    //.plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
    //    let aliases = ['t', 'i18n'];
    //    // add aliases for 't' attribute
    //    TCustomAttribute.configureAliases(aliases);
    //    // register backend plugin
    //    instance.i18next.use(Backend.with(aurelia.loader));
    //    return instance.setup({
    //        backend: {                                  // <-- configure backend settings
    //            loadPath: './locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
    //        },
    //        attributes: aliases,
    //        lng: 'de-DE',
    //        fallbackLng: 'en-us',
    //        debug: true,
    //        defaultNS: 'translation',
    //        ns: [
    //            'translation',
    //            'other-translations'
    //        ]
    //    });
    //});
    aurelia.start().then(a => a.setRoot(PLATFORM.moduleName('MyApp')));
}
