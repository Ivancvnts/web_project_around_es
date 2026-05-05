import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #_popupSelector;
  #_onSubmit;

  constructor(popupSelector, onSubmit) {
    super(popupSelector);
    this.#_popupSelector = popupSelector;
    this.#_onSubmit = onSubmit;
  }

  #_getInputValues() {
    const inputList = document
      .querySelector(this.#_popupSelector)
      .querySelectorAll(".popup__input");

    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    const popupForm = document
      .querySelector(this.#_popupSelector)
      .querySelector(".popup__form");

    const submitButton = document
      .querySelector(this.#_popupSelector)
      .querySelector(".popup__button");

    popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this.#_getInputValues();
      submitButton.textContent = "Guardando...";
      this.#_onSubmit(inputValues)
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        })
        .finally(() => {
          submitButton.textContent = "Guardar";
        });
    });
  }

  close() {
    super.close();
    const formEl = document
      .querySelector(this.#_popupSelector)
      .querySelector(".popup__form");
    formEl.reset();
  }
}
