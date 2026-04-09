export default class Popup {
  #_element;

  constructor(popupSelector) {
    this.#_element = document.querySelector(popupSelector);
  }

  #_handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    const closeButton = this.#_element.querySelector(".popup__close");

    closeButton.addEventListener("click", () => {
      this.close();
    });

    this.#_element.addEventListener("mousedown", (event) => {
      if (event.target === this.#_element) {
        this.close();
        console.log("ola");
      }
    });
  }

  open() {
    this.#_element.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.#_handleEscClose);
  }

  close() {
    this.#_element.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.#_handleEscClose);
  }
}
