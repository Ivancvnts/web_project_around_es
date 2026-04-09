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

    popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this.#_getInputValues();
      this.#_onSubmit(inputValues);
      this.close();
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
