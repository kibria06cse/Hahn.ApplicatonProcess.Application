import { DialogController } from 'aurelia-dialog';
var ConfirmationModal = (function () {
    function ConfirmationModal(controller) {
        this.person = { firstName: '' };
        this.controller = controller;
    }
    ConfirmationModal.prototype.activate = function (person) {
        this.person = person;
    };
    ConfirmationModal.inject = [DialogController];
    return ConfirmationModal;
}());
export { ConfirmationModal };
//# sourceMappingURL=confirmation-modal.js.map