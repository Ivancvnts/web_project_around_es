const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  { name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg" },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
const cardContainer = document.querySelector(".cards__list");

const profileEditBtn = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const closeEditPopup = editProfilePopup.querySelector(".popup__close");
const profileForm = editProfilePopup.querySelector("#edit-profile-form");

const addCardBtn = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#new-card-popup");
const closeAddBtn = addCardPopup.querySelector(".popup__close");
const addCardForm = addCardPopup.querySelector("#new-card-form");

const imagePopup = document.querySelector("#image-popup");
const imageCaption = imagePopup.querySelector(".popup__caption");
const imageEl = imagePopup.querySelector(".popup__image");
const closeImagePopup = imagePopup.querySelector(".popup__close");

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardContainer);
});

// Functions to open and close modals/Popups
function openModal(modal) {
  modal.classList.add("popup_is-opened");

  const form = modal.querySelector(".popup__form");
  validateForm(form);

  modal.addEventListener("click", (event) => {
    const isOutsidePopUp = event.target.id === modal.id;

    if (isOutsidePopUp) {
      closeModal(modal);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal(modal);
      console.log("se presiono esc");
    }
  });
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  resetValidation(modal.querySelector(`.popup__form`));
}

function showInputError(form, element, errorMessage) {
  const errorMessageEl = form.querySelector(`.${element.id}-input-error`);
  errorMessageEl.textContent = errorMessage;
  errorMessageEl.classList.add("popup_input-error-message_active");
  element.classList.add("popup_input-error");
}

function hideInputError(form, element) {
  const errorMessageEl = form.querySelector(`.${element.id}-input-error`);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove("popup_input-error-message_active");
  element.classList.remove("popup_input-error");
}

function validateForm(form) {
  const inputs = form.querySelectorAll(".popup__input");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
      } else {
        hideInputError(form, input);
      }

      const submitButton = form.elements.submitButton;

      const allValid = Array.from(inputs).every(
        (input) => input.validity.valid,
      );
      submitButton.disabled = !allValid;
    });
  });
}

function resetValidation(form) {
  const inputs = form.querySelectorAll(".popup__input");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      hideInputError(form, input);
    });
  });
}

//--------------------PROFILE-----------------------
//Fill profile form with current data
function fillProfileForm() {
  //Look for input values elements in DOM
  const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
  const descriptionInput = editProfilePopup.querySelector(
    ".popup__input_type_description",
  );
  //Get current profile data from DOM
  const profileTitleEl = document.querySelector(".profile__title");
  const profileDescriptionEl = document.querySelector(".profile__description");

  //Set input values to current profile data
  nameInput.value = profileTitleEl.textContent;
  descriptionInput.value = profileDescriptionEl.textContent;

  //Activate submitButton
  const submitButton = editProfilePopup.querySelector(".popup__button");
  submitButton.disabled = false;
}

//Handle opening edit profile popup
function handleOpenEditModal(editProfilePopup) {
  openModal(editProfilePopup);
  fillProfileForm();
}

// Handle profile form submission
function handleProfileFormSubmit(event) {
  event.preventDefault();

  //Look for input elements in DOM
  const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
  const descriptionInput = editProfilePopup.querySelector(
    ".popup__input_type_description",
  );

  //Get input values
  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  //Get profile elements in DOM
  const profileTitleEl = document.querySelector(".profile__title");
  const profileDescriptionEl = document.querySelector(".profile__description");

  //Update profile data in DOM with input values
  profileTitleEl.textContent = nameValue;
  profileDescriptionEl.textContent = descriptionValue;
}

//------------------CARDS------------------------
function getCardElement(title, imageLink) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");

  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = title;
  cardImage.src = imageLink;

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_is-active");
  });

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    imageCaption.textContent = title;
    imageEl.src = imageLink;
    imageEl.alt = title;
    openModal(imagePopup);
  });

  return cardElement;
}

function renderCard(title, imageLink, container) {
  const card = getCardElement(title, imageLink);
  container.append(card);
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  const nameInput = addCardForm.querySelector(".popup__input_type_card-name");
  const linkInput = addCardForm.querySelector(".popup__input_type_url");

  const name = nameInput.value;
  const link = linkInput.value;

  renderCard(name, link, cardContainer);
}

//----------------EVENTS--------------------------
profileEditBtn.addEventListener("click", () => {
  handleOpenEditModal(editProfilePopup);
});

closeEditPopup.addEventListener("click", () => {
  closeModal(editProfilePopup);
});

profileForm.addEventListener("submit", (event) => {
  handleProfileFormSubmit(event);
  closeModal(editProfilePopup);
});

addCardBtn.addEventListener("click", () => {
  openModal(addCardPopup);
});

closeAddBtn.addEventListener("click", () => {
  closeModal(addCardPopup);
});

addCardForm.addEventListener("submit", (event) => {
  handleCardFormSubmit(event);
  closeModal(addCardPopup);
});

closeImagePopup.addEventListener("click", () => {
  closeModal(imagePopup);
});
