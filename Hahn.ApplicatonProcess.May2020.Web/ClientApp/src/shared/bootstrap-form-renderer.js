var BootstrapFormRenderer = (function () {
    function BootstrapFormRenderer() {
    }
    BootstrapFormRenderer.prototype.render = function (instruction) {
        for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
            var _b = _a[_i], result = _b.result, elements = _b.elements;
            for (var _c = 0, elements_1 = elements; _c < elements_1.length; _c++) {
                var element = elements_1[_c];
                this.remove(element, result);
            }
        }
        for (var _d = 0, _e = instruction.render; _d < _e.length; _d++) {
            var _f = _e[_d], result = _f.result, elements = _f.elements;
            for (var _g = 0, elements_2 = elements; _g < elements_2.length; _g++) {
                var element = elements_2[_g];
                this.add(element, result);
            }
        }
    };
    BootstrapFormRenderer.prototype.add = function (element, result) {
        var formGroup = element.closest('.form-group');
        if (!formGroup) {
            return;
        }
        var formControl = element.parentNode.firstElementChild;
        if (result.valid) {
            if (!formGroup.classList.contains('has-error')) {
                formGroup.classList.add('has-success');
                if (formControl) {
                    formControl.classList.add('is-valid');
                    formControl.classList.remove('is-invalid');
                }
            }
        }
        else {
            formGroup.classList.remove('has-success');
            formGroup.classList.add('has-error');
            if (formControl) {
                formControl.classList.add('is-invalid');
                formControl.classList.remove('is-valid');
            }
            var message = document.createElement('span');
            message.className = 'invalid-feedback';
            message.textContent = result.message;
            message.id = "validation-message-" + result.id;
            formGroup.appendChild(message);
        }
    };
    BootstrapFormRenderer.prototype.remove = function (element, result) {
        var formGroup = element.closest('.form-group');
        if (!formGroup) {
            return;
        }
        var formControl = element.parentNode.firstElementChild;
        if (result.valid) {
            if (formGroup.classList.contains('has-success')) {
                formGroup.classList.remove('has-success');
                if (formControl) {
                    formControl.classList.remove('is-valid');
                }
            }
        }
        else {
            var message = formGroup.querySelector("#validation-message-" + result.id);
            if (message) {
                formGroup.removeChild(message);
                if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
                    formGroup.classList.remove('has-error');
                }
            }
            if (formControl) {
                formControl.classList.remove('is-invalid');
            }
        }
    };
    return BootstrapFormRenderer;
}());
export { BootstrapFormRenderer };
//# sourceMappingURL=bootstrap-form-renderer.js.map