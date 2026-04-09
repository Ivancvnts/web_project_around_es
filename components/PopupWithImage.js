import Popup from "./PopUp.js";

export default class PopupWithImage extends Popup {
  #_imageElement;
  #_captionElement;
  constructor(popupSelector) {
    super(popupSelector);

    this.#_imageElement = document
      .querySelector(popupSelector)
      .querySelector(".popup__image");
    this.#_captionElement = document
      .querySelector(popupSelector)
      .querySelector(".popup__caption");
  }

  open(name, link) {
    super.open();

    this.#_imageElement.src = link;
    this.#_imageElement.alt = name;
    this.#_captionElement.textContent = name;
  }
}
