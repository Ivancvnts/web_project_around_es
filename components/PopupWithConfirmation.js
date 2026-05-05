import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  #_popupSelector;
  #_onSubmit;

  constructor(popupSelector, onSubmit) {
    super(popupSelector);
    this.#_popupSelector = popupSelector;
    this.#_onSubmit = onSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    const popupButton = document
      .querySelector(this.#_popupSelector)
      .querySelector(".popup__button");

    popupButton.addEventListener("click", () => {
      this.#_onSubmit();
    });
  }

  setConfirmationAction(action) {
    this.#_onSubmit = action;
  }
}
