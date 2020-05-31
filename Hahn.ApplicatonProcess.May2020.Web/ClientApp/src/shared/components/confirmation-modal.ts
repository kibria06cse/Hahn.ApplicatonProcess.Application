import { DialogController } from 'aurelia-dialog';


export class ConfirmationModal {

  static inject = [DialogController];
  person = { firstName: '' };

  message: string;
  controller: DialogController;

  constructor(controller: DialogController) {
    this.controller = controller;
  }
  activate(person) {
    this.person = person;
  }
}


//import { DialogController } from 'aurelia-dialog';

//export class EditPerson {
//  static inject = [DialogController];
//  person = { firstName: '' };
//  constructor(controller) {
//    this.controller = controller;
//  }
//  activate(person) {
//    this.person = person;
//  }
//}


