import { DialogController } from 'aurelia-dialog';
var ConfirmationModal = (function () {
    function ConfirmationModal(controller) {
        this.controller = controller;
    }
    ConfirmationModal.prototype.activate = function (message) {
        this.message = message;
    };
    ConfirmationModal.inject = [DialogController];
    return ConfirmationModal;
}());
export { ConfirmationModal };
//# sourceMappingURL=confirmation-modal.js.map