export class FormValidator {
  #config;
  #formElement;
  #inputList;
  #buttonElement;

  constructor(config, formElement) {
    this.#config = config;
    this.#formElement = formElement;
    this.#inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector),
    );
    this.#buttonElement = formElement.querySelector(
      config.submitButtonSelector,
    );
  }

  #showInputError(inputElement, errorMessage) {
    const errorMessageEl = this.#formElement.querySelector(
      `.${inputElement.id}-input-error`,
    );

    errorMessageEl.textContent = errorMessage;
    errorMessageEl.classList.add(this.#config.errorClass);
    inputElement.classList.add(this.#config.inputErrorClass);
  }

  #hideInputError(inputElement) {
    const errorMessageEl = this.#formElement.querySelector(
      `${inputElement.id}-input-error`,
    );
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this.#config.errorClass);
    inputElement.classList.remove(this.#config.inputErrorClass);
  }

  #checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #toggleBtnState() {
    const isValid = this.#inputList.every((input) => input.validity.valid);

    this.#buttonElement.disabled = !isValid;
  }

  #setEventListeners() {
    this.#inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
        this.#toggleBtnState();
      });
    });
  }

  setEventListeners() {
    this.#setEventListeners();
    this.#toggleBtnState();
  }
}
