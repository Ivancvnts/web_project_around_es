export class Card {
  #title;
  #imageLink;
  #templateSelector;
  #cardElement;
  #handleOpenImagePopupCallback;

  constructor(data, templateSelector, handleOpenImagePopupCallback) {
    this.#title = data.name;
    this.#imageLink = data.link;
    this.#templateSelector = templateSelector;
    this.#handleOpenImagePopupCallback = handleOpenImagePopupCallback;
  }

  #_GetTemplate() {
    return document
      .querySelector(this.#templateSelector)
      .content.querySelector(".card");
  }

  #_HandleLikeBtnClick(event) {
    event.target.classList.toggle("card__like-button_is-active");
  }

  #_HandleRemoveBtnClick() {
    this.#cardElement.remove();
  }

  #_SetEventListeners() {
    const likeBtn = this.#cardElement.querySelector(".card__like-button");
    const deleteBtn = this.#cardElement.querySelector(".card__delete-button");
    const cardImage = this.#cardElement.querySelector(".card__image");

    likeBtn.addEventListener("click", (event) => {
      this.#_HandleLikeBtnClick(event);
    });

    deleteBtn.addEventListener("click", () => {
      this.#_HandleRemoveBtnClick();
    });

    cardImage.addEventListener("click", () => {
      this.#handleOpenImagePopupCallback(this.#title, this.#imageLink);
    });
  }

  GetCardElement() {
    this.#cardElement = this.#_GetTemplate().cloneNode(true);
    const cardTitle = this.#cardElement.querySelector(".card__title");
    const cardImage = this.#cardElement.querySelector(".card__image");

    cardTitle.textContent = this.#title;
    cardImage.src = this.#imageLink;
    cardImage.alt = this.#title;

    this.#_SetEventListeners();

    return this.#cardElement;
  }
}
