import { I18N } from "aurelia-i18n";
import { inject, autoinject } from 'aurelia-dependency-injection';

@inject(I18N)
export class LanguageSwitcher {
  message: string;
    i18n: I18N;

  constructor(i18n: I18N) {
    this.message = 'Hello world';
    
    this.i18n = i18n;
  }
  changedValue;


  DropdownChanged(changedVal) {
    //alert(changedVal);
    if (changedVal == 1) {
      this.i18n
        .setLocale('de-DE')
        .then(() => {
          // locale is loaded
        });
    }
    else {
      this.i18n
        .setLocale('en')
        .then(() => {
          // locale is loaded
        });
    }
  }
}
