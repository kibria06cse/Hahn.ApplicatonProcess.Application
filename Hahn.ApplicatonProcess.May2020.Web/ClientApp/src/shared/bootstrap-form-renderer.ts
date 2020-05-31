﻿import {
  ValidationRenderer,
  RenderInstruction,
  ValidateResult
} from 'aurelia-validation';


export class BootstrapFormRenderer {
  render(instruction: RenderInstruction) {
    for (let { result, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, result);
      }
    }

    for (let { result, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, result);
      }
    }
  }

  add(element: Element, result: ValidateResult) {
    const formGroup = element.closest('.form-group');
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
    } else {
      // add the has-error class to the enclosing form-group div
      formGroup.classList.remove('has-success');
      formGroup.classList.add('has-error');
      if (formControl) {
        formControl.classList.add('is-invalid');
        formControl.classList.remove('is-valid');
      }
      // add help-block
      const message = document.createElement('span');
      message.className = 'invalid-feedback';
      message.textContent = result.message;
      message.id = `validation-message-${result.id}`;
      formGroup.appendChild(message);
    }
  }

  remove(element: Element, result: ValidateResult) {
    const formGroup = element.closest('.form-group');
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
    } else {
      // remove help-block
      const message = formGroup.querySelector(`#validation-message-${result.id}`);
      if (message) {
        formGroup.removeChild(message);

        // remove the has-error class from the enclosing form-group div
        if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
          formGroup.classList.remove('has-error');
        }
      }

      if (formControl) {
        formControl.classList.remove('is-invalid');
      }
    }
  }
}

