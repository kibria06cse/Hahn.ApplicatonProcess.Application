import { DialogController } from "aurelia-dialog";

export class InfoModal {
  static inject = [DialogController];

  message: string;
  controller: DialogController;

  constructor(controller: DialogController) {
    this.controller = controller;
  }
  activate(message) {
    this.message = message;
  }
}
