import { DialogController } from "aurelia-dialog";
var InfoModal = (function () {
    function InfoModal(controller) {
        this.controller = controller;
    }
    InfoModal.prototype.activate = function (message) {
        this.message = message;
    };
    InfoModal.inject = [DialogController];
    return InfoModal;
}());
export { InfoModal };
//# sourceMappingURL=info-modal.js.map