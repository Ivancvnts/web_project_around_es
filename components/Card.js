export class Card {
  #_title;
  #_imageLink;
  #_id;
  #_isLiked;
  #_templateSelector;
  #_cardElement;
  #_handleOpenImagePopupCallback;
  #_handleLikeBtnCallback;
  #_handleOpenConfirmationPopupCallback;

  constructor(
    data,
    templateSelector,
    handleOpenImagePopupCallback,
    handleLikeBtnCallback,
    handleOpenConfirmationPopupCallback,
  ) {
    this.#_title = data.name;
    this.#_imageLink = data.link;
    this.#_id = data._id;
    this.#_isLiked = data.isLiked;
    this.#_templateSelector = templateSelector;
    this.#_handleOpenImagePopupCallback = handleOpenImagePopupCallback;
    this.#_handleLikeBtnCallback = handleLikeBtnCallback;
    this.#_handleOpenConfirmationPopupCallback =
      handleOpenConfirmationPopupCallback;
  }

  #_GetTemplate() {
    return document
      .querySelector(this.#_templateSelector)
      .content.querySelector(".card");
  }

  #_HandleLikeBtnClick(event) {
    const isLiked = event.target.classList.contains(
      "card__like-button_is-active",
    );

    this.#_handleLikeBtnCallback(this.#_id, isLiked)
      .then((res) => {
        if (res.isLiked) {
          event.target.classList.add("card__like-button_is-active");
        } else {
          event.target.classList.remove("card__like-button_is-active");
        }
        this.#_isLiked = res.isLiked;
      })
      .catch((err) => console.log(err));
  }

  #_HandleRemoveBtnClick() {
    this.#_handleOpenConfirmationPopupCallback(this);
  }

  #_SetEventListeners() {
    const likeBtn = this.#_cardElement.querySelector(".card__like-button");
    const deleteBtn = this.#_cardElement.querySelector(".card__delete-button");
    const cardImage = this.#_cardElement.querySelector(".card__image");

    likeBtn.addEventListener("click", (event) => {
      this.#_HandleLikeBtnClick(event);
    });

    deleteBtn.addEventListener("click", () => {
      this.#_HandleRemoveBtnClick();
    });

    cardImage.addEventListener("click", () => {
      this.#_handleOpenImagePopupCallback(this.#_title, this.#_imageLink);
    });
  }

  GetCardElement() {
    this.#_cardElement = this.#_GetTemplate().cloneNode(true);
    const cardTitle = this.#_cardElement.querySelector(".card__title");
    const cardImage = this.#_cardElement.querySelector(".card__image");

    cardTitle.textContent = this.#_title;
    cardImage.src = this.#_imageLink;
    cardImage.alt = this.#_title;

    this.#_SetEventListeners();

    const likeBtn = this.#_cardElement.querySelector(".card__like-button");

    if (this.#_isLiked) {
      likeBtn.classList.add("card__like-button_is-active");
    } else {
      likeBtn.classList.remove("card__like-button_is-active");
    }
    return this.#_cardElement;
  }

  getId() {
    return this.#_id;
  }

  removeCard() {
    this.#_cardElement.remove();
  }
}
