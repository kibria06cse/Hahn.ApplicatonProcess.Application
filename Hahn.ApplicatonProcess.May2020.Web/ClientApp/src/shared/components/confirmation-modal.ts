import { DialogController } from 'aurelia-dialog';


export class ConfirmationModal {

  static inject = [DialogController];
  //person = { firstName: '' };

  message: string;
  controller: DialogController;

  constructor(controller: DialogController) {
    this.controller = controller;
  }
  activate(message) {
    this.message = message;
  }
}

